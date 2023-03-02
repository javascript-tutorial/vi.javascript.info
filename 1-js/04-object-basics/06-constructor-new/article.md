# Hàm tạo, toán tử "mới"

Cú pháp `{...}` thông thường cho phép tạo một đối tượng. Nhưng thường thì chúng ta cần tạo nhiều đối tượng tương tự, như nhiều người dùng hoặc mục menu, v.v.

Điều đó có thể được thực hiện bằng cách sử dụng hàm khởi tạo và toán tử `"new"`.

## Hàm tạo

Hàm xây dựng về mặt kỹ thuật là các hàm thông thường. Có hai quy ước mặc dù:

1. Chúng được đặt tên bằng chữ in hoa đầu tiên.
2. Chúng chỉ nên được thực thi với toán tử `"new"`.

Ví dụ:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

Khi một chức năng được thực thi với `new`, nó sẽ thực hiện các bước sau:

1. Một đối tượng trống mới được tạo và gán cho `this`.
2. Thân hàm thực thi. Thông thường, nó sửa đổi `this`, thêm các thuộc tính mới cho nó.
3. Giá trị của `this` được trả về.

Nói cách khác, `new User(...)` thực hiện điều gì đó như:

```js
function User(name) {
*!*
  // this = {};  (implicitly)
*/!*

  // thêm thuộc tính vào đây
  this.name = name;
  this.isAdmin = false;

*!*
  // trả về cái này;  (mặc nhiên)
*/!*
}
```

Vì vậy, `let user = new User("Jack")` cho kết quả tương tự như:

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

Bây giờ nếu chúng ta muốn tạo những người dùng khác, chúng ta có thể gọi `new User("Ann")`, `new User("Alice")`, v.v. Ngắn hơn nhiều so với việc luôn sử dụng chữ và cũng dễ đọc.

Đó là mục đích chính của hàm tạo -- để triển khai mã tạo đối tượng có thể tái sử dụng.

Hãy lưu ý một lần nữa -- về mặt kỹ thuật, bất kỳ hàm nào cũng có thể được sử dụng làm hàm tạo. Đó là: bất kỳ chức năng nào cũng có thể được chạy với `new` và nó sẽ thực thi thuật toán ở trên. "Chữ viết hoa trước" là một thỏa thuận phổ biến, để làm rõ rằng một chức năng sẽ được chạy với `new`.

````smart header="new function() { ... }"
Nếu chúng ta có nhiều dòng mã về việc tạo một đối tượng phức tạp duy nhất, chúng ta có thể gói chúng trong hàm tạo, như sau:

```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...... mã khác để tạo người dùng
   // có thể là logic và câu lệnh phức tạp
   // biến cục bộ, v.v.
};
```

Hàm tạo không thể được gọi lại vì nó không được lưu ở bất kỳ đâu, chỉ được tạo và gọi. Vì vậy, thủ thuật này nhằm mục đích đóng gói mã xây dựng một đối tượng mà không sử dụng lại trong tương lai.
````

## Kiểm tra chế độ hàm tạo: new.target

```smart header="Nội dung nâng cao"
Cú pháp từ phần này hiếm khi được sử dụng, hãy bỏ qua trừ khi bạn muốn biết mọi thứ.
```

Bên trong một hàm, chúng ta có thể kiểm tra xem nó có được gọi với `new` hay không, bằng cách sử dụng thuộc tính `new.target` đặc biệt.

Nó không được xác định cho các cuộc gọi thông thường và bằng hàm nếu được gọi bằng `new`:

```js run
function User() {
  alert(new.target);
}

// không có "new":
*!*
User(); // undefined
*/!*

// với "new":
*!*
new User(); // hàm User { ... }
*/!*
```

Điều đó có thể được sử dụng bên trong hàm để biết liệu nó được gọi với `new`, "ở chế độ hàm tạo" hay không có nó, "ở chế độ thông thường".

Chúng tôi cũng có thể thực hiện cả lệnh gọi `new` và thông thường để làm như vậy, như sau:

```js run
function User(name) {
  if (!new.target) { // nếu bạn chạy tôi mà không có mới
    return new User(name); // ...Tôi sẽ thêm mới cho bạn
  }

  this.name = name;
}

let john = User("John"); // chuyển hướng cuộc gọi đến new User
alert(john.name); // John
```

Cách tiếp cận này đôi khi được sử dụng trong các thư viện để làm cho cú pháp linh hoạt hơn. Vì vậy, mọi người có thể gọi hàm có hoặc không có `new`, và nó vẫn hoạt động.

Tuy nhiên, có lẽ không phải là một điều tốt để sử dụng ở mọi nơi, bởi vì việc bỏ qua `new` làm cho nó ít rõ ràng hơn về những gì đang diễn ra. Với `mới`, tất cả chúng ta đều biết rằng đối tượng mới đang được tạo.

## Trả về từ hàm tạo

Thông thường, hàm tạo không có câu lệnh `return`. Nhiệm vụ của chúng là viết tất cả nội dung cần thiết vào `this`, và nó sẽ tự động trở thành kết quả.

Nhưng nếu có câu lệnh `return`, thì quy tắc rất đơn giản:

- Nếu `return` được gọi với một đối tượng, thì đối tượng đó sẽ được trả về thay vì `this`.
- Nếu `return` được gọi với kiểu nguyên thủy, thì nó sẽ bị bỏ qua.

Nói cách khác, `return` với một đối tượng sẽ trả về đối tượng đó, trong tất cả các trường hợp khác, `this` được trả về.

Chẳng hạn, ở đây `return` ghi đè `this` bằng cách trả về một đối tượng:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- trả về đối tượng này
}

alert( new BigUser().name );  // Godzilla, có đối tượng đó
```

Và đây là một ví dụ với một `return` trống (hoặc chúng ta có thể đặt một nguyên hàm sau nó, không thành vấn đề):

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- trả về cái này
}

alert( new SmallUser().name );  // John
```

Thông thường các hàm tạo không có câu lệnh `return`. Ở đây chúng ta đề cập đến hành vi đặc biệt với các đối tượng trả về chủ yếu vì mục đích hoàn chỉnh.

````smart header="Bỏ qua dấu ngoặc đơn"
Nhân tiện, chúng ta có thể bỏ qua dấu ngoặc đơn sau `new`, nếu nó không có đối số:

```js
let user = new User; // <-- không có dấu ngoặc đơn
// giống như
let user = new User();
```

Bỏ qua dấu ngoặc đơn ở đây không được coi là "phong cách tốt", nhưng cú pháp được cho phép theo thông số kỹ thuật.
````

## Các phương thức trong hàm tạo

Việc sử dụng các hàm tạo để tạo các đối tượng mang lại rất nhiều tính linh hoạt. Hàm tạo có thể có các tham số xác định cách tạo đối tượng và những gì cần đặt trong đó.

Tất nhiên, chúng ta có thể thêm vào `this` không chỉ các thuộc tính mà cả các phương thức.

Chẳng hạn, `new User(name)` bên dưới tạo một đối tượng với `name` đã cho và phương thức `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "Tên tôi là: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // Tên tôi là: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

Để tạo các đối tượng phức tạp, có một cú pháp nâng cao hơn, [classes](info:classes), chúng ta sẽ đề cập sau.

## Bản tóm tắt

- Các hàm khởi tạo hay ngắn gọn, hàm tạo là các hàm thông thường, nhưng có một thỏa thuận chung là đặt tên chúng bằng chữ in hoa trước.
- Hàm tạo chỉ nên được gọi bằng cách sử dụng `new`. Một cuộc gọi như vậy ngụ ý việc tạo ra `this` trống ở đầu và trả về cái được điền ở cuối.

Chúng ta có thể sử dụng các hàm tạo để tạo nhiều đối tượng tương tự.

JavaScript cung cấp các hàm tạo cho nhiều đối tượng ngôn ngữ dựng sẵn: như `Date` cho ngày tháng, `Set` cho bộ và các đối tượng khác mà chúng ta dự định nghiên cứu.

```smart header="Đối tượng, chúng ta sẽ trở lại!"
Trong chương này, chúng ta chỉ trình bày những điều cơ bản về đối tượng và hàm tạo. Chúng rất cần thiết để tìm hiểu thêm về các kiểu dữ liệu và chức năng trong các chương tiếp theo.

Sau khi biết được điều đó, chúng ta quay lại các đối tượng và tìm hiểu sâu hơn về chúng trong các chương <info:prototypes> và <info:classes>.
```
