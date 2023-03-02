# Các phương thức đối tượng, "this"

Các đối tượng thường được tạo để đại diện cho các thực thể của thế giới thực, như người dùng, đơn đặt hàng, v.v.:

```js
let user = {
  name: "John",
  age: 30
};
```

Và, trong thế giới thực, người dùng có thể *hành động*: chọn thứ gì đó từ giỏ hàng, đăng nhập, đăng xuất, v.v.

Các hành động được thể hiện trong JavaScript bằng các hàm trong thuộc tính.

## Các ví dụ về phương pháp

Để bắt đầu, hãy dạy `user` nói xin chào:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
   alert("Xin chào!");
};
*/!*

user.sayHi(); // Xin chào!
```

Ở đây chúng ta vừa sử dụng một Biểu thức Hàm để tạo một hàm và gán nó cho thuộc tính `user.sayHi` của đối tượng.

Sau đó, chúng ta có thể gọi nó là `user.sayHi()`. Người dùng bây giờ có thể nói!

Hàm là thuộc tính của một đối tượng được gọi là *phương thức* của nó.

Vì vậy, ở đây chúng ta có một phương thức `sayHi` của đối tượng `user`.

Tất nhiên, chúng ta có thể sử dụng một hàm được khai báo trước như một phương thức, như sau:

```js run
let user = {
  // ...
};

*!*
// first, declare
function sayHi() {
  alert("Xin chào!");
};

// sau đó thêm như một phương thức
user.sayHi = sayHi;
*/!*

user.sayHi(); // Xin chào!
```

```smart header="Lập trình hướng đối tượng"
Khi chúng ta viết mã bằng cách sử dụng các đối tượng để biểu diễn các thực thể, điều đó được gọi là [lập trình hướng đối tượng](https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91i_t%C6%B0%E1%BB%A3ng), nói ngắn gọn trong tiếng Anh: "OOP".

OOP là một vấn đề lớn, một môn khoa học thú vị của riêng nó. Làm thế nào để chọn đúng thực thể? Làm thế nào để tổ chức sự tương tác giữa chúng? Đó là kiến trúc, và có những cuốn sách hay về chủ đề đó, như "Design Patterns: Elements of Reusable Object-Oriented Software" của E. Gamma, R. Helm, R. Johnson, J. Vissides hoặc "Object-Oriented Analysis and Design with Applications" của G. Booch, và còn nhiều hơn thế nữa.
```
### Phương pháp tốc ký

Tồn tại một cú pháp ngắn hơn cho các phương thức trong một đối tượng theo nghĩa đen:

```js
// các đối tượng này làm tương tự

user = {
  sayHi: function() {
    alert("Xin chào");
  }
};

// phương pháp tốc ký có vẻ tốt hơn, phải không?
user = {
*!*
  sayHi() { // giống như "sayHi: function()"
*/!*
    alert("Xin chào");
  }
};
```

Như đã minh họa, chúng ta có thể bỏ qua `"function"` và chỉ cần viết `sayHi()`.

Nói thật, các ký hiệu không hoàn toàn giống nhau. Có những khác biệt tinh tế liên quan đến kế thừa đối tượng (sẽ được đề cập sau), nhưng hiện tại chúng không quan trọng. Trong hầu hết các trường hợp, cú pháp ngắn hơn được ưa thích hơn.

## "this" trong các phương thức

Thông thường, một phương thức đối tượng cần truy cập thông tin được lưu trữ trong đối tượng để thực hiện công việc của nó.

Chẳng hạn, mã bên trong `user.sayHi()` có thể cần tên của `user`.

**Để truy cập đối tượng, một phương thức có thể sử dụng từ khóa `this`.**

Giá trị của `this` là đối tượng "trước dấu chấm", đối tượng được sử dụng để gọi phương thức.

Ví dụ:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" là "đối tượng hiện tại"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Ở đây, trong quá trình thực thi `user.sayHi()`, giá trị của `this` sẽ là `user`.

Về mặt kỹ thuật, bạn cũng có thể truy cập đối tượng mà không cần `this`, bằng cách tham chiếu nó qua biến bên ngoài:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" thay vì "this"
*/!*
  }

};
```

...Nhưng mã như vậy là không đáng tin cậy. Nếu chúng ta quyết định sao chép `user` sang một biến khác, ví dụ: `admin = user` và ghi đè `user` bằng thứ khác, thì nó sẽ truy cập sai đối tượng.

Điều đó được chứng minh dưới đây:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // dẫn đến một lỗi
*/!*
  }

};


let admin = user;
user = null; // ghi đè lên để làm cho mọi thứ rõ ràng

*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
```

Nếu chúng ta sử dụng `this.name` thay vì `user.name` bên trong `alert` thì mã sẽ hoạt động.

## "this" không bị ràng buộc

Trong JavaScript, từ khóa `this` hoạt động không giống hầu hết các ngôn ngữ lập trình khác. Nó có thể được sử dụng trong bất kỳ hàm nào, ngay cả khi nó không phải là phương thức của đối tượng.

Không có lỗi cú pháp trong ví dụ sau:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

Giá trị của `this` được đánh giá trong thời gian chạy, tùy thuộc vào ngữ cảnh.

Chẳng hạn, ở đây, cùng một chức năng được gán cho hai đối tượng khác nhau và có "this" khác nhau trong các lệnh gọi:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// sử dụng cùng một hàm trong hai đối tượng
user.f = sayHi;
admin.f = sayHi;
*/!*

// những lần gọi này có this khác nhau
// "this" bên trong hàm là đối tượng "trước dấu chấm"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dấu chấm hoặc dấu ngoặc vuông truy cập phương thức – không quan trọng)
```

Quy tắc rất đơn giản: nếu `obj.f()` được gọi, thì `this` là `obj` trong khi gọi `f`. Vì vậy, đó là `user` hoặc `admin` trong ví dụ trên.

````smart header="Gọi mà không có đối tượng: `this == undefined`"
Chúng ta thậm chí có thể gọi hàm mà không có đối tượng nào cả:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

Trong trường hợp này, `this` là `undefined` ở chế độ nghiêm ngặt. Nếu chúng ta cố gắng truy cập `this.name`, sẽ có lỗi.

Ở chế độ không nghiêm ngặt, giá trị của `this` trong trường hợp này sẽ là *đối tượng toàn cục* (`cửa sổ` trong trình duyệt, chúng ta sẽ tìm hiểu về nó sau trong chương [](info:global-object)). Đây là một hành vi lịch sử mà `"sử dụng nghiêm ngặt"` sửa chữa.

Thông thường cuộc gọi như vậy là một lỗi lập trình. Nếu có `this` bên trong một hàm, thì hàm này sẽ được gọi trong ngữ cảnh đối tượng.
````

```smart header="Hậu quả của `this`" không liên kết
Nếu bạn đến từ một ngôn ngữ lập trình khác, thì có lẽ bạn đã quen với ý tưởng về một "`this` bị ràng buộc", trong đó các phương thức được định nghĩa trong một đối tượng luôn có `this` tham chiếu đến đối tượng đó.

Trong JavaScript `this` là "tự do", giá trị của nó được đánh giá tại thời điểm gọi và không phụ thuộc vào vị trí khai báo phương thức, mà phụ thuộc vào đối tượng nào "trước dấu chấm".

Khái niệm về thời gian chạy được đánh giá `this` có cả ưu điểm và nhược điểm. Một mặt, một chức năng có thể được sử dụng lại cho các đối tượng khác nhau. Mặt khác, tính linh hoạt cao hơn tạo ra nhiều khả năng mắc sai lầm hơn.

Ở đây, vị trí của chúng ta không phải là đánh giá liệu quyết định thiết kế ngôn ngữ này là tốt hay xấu. Chúng ta sẽ hiểu làm thế nào để làm việc với nó, làm thế nào để nhận được lợi ích và tránh các vấn đề.
```

## Các arrow function không có "this"

Các hàm mũi tên rất đặc biệt: chúng không có `this` "của riêng chúng". Nếu chúng ta tham chiếu `this` từ một hàm như vậy, thì nó được lấy từ hàm "bình thường" bên ngoài.

Chẳng hạn, ở đây `arrow()` sử dụng `this` từ phương thức `user.sayHi()` bên ngoài:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

Đó là một tính năng đặc biệt của hàm mũi tên, nó rất hữu ích khi chúng ta thực sự không muốn có một `this` riêng biệt, mà muốn lấy nó từ ngữ cảnh bên ngoài. Ở phần sau của chương <info:arrow-functions> chúng ta sẽ đi sâu hơn vào các hàm mũi tên.


## Tóm tắt

- Các hàm được lưu trữ trong các thuộc tính đối tượng được gọi là "phương thức".
- Các phương thức cho phép các đối tượng "hành động" như `object.doSomething()`.
- Các phương thức có thể tham chiếu đối tượng như `this`.

Giá trị của `this` được xác định trong thời gian chạy.
- Khi một hàm được khai báo, nó có thể sử dụng `this`, nhưng `this` đó không có giá trị cho đến khi hàm được gọi.
- Một hàm có thể được sao chép giữa các đối tượng.
- Khi một hàm được gọi theo cú pháp "phương thức": `object.method()`, giá trị của `this` trong khi gọi là `object`.

Hãy lưu ý rằng các chức năng mũi tên là đặc biệt: chúng không có `this`. Khi `this` được truy cập bên trong một hàm mũi tên, nó được lấy từ bên ngoài.
