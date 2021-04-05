# Xem lại các hàm mũi tên

Hãy xem lại các hàm mũi tên.

Các hàm mũi tên không chỉ là một "cách viết nhanh" để viết những thứ nhỏ. Chúng có một số tính năng rất cụ thể và hữu ích.

JavaScript chứa đầy các tình huống mà chúng ta cần viết một hàm nhỏ được thực thi ở một nơi khác.

Ví dụ:

- `arr.forEach(func)` -- `func` được thực thi bởi `forEach` với mỗi phần tử của mảng.
- `setTimeout(func)` -- `func` được thực thi bởi bộ lập lịch.
- ...và nhiều nữa.

Đó là tinh thần của JavaScript để tạo một hàm và truyền nó tới đâu đó.

Và trong các hàm như vậy, chúng ta thường không muốn rời khỏi bối cảnh hiện tại. Đó là nơi các hàm mũi tên trở nên hữu ích.

## Các hàm mũi tên không có "this"

Như chúng ta nhớ từ chương <info:object-method>, các hàm mũi tên không có `this`. Nếu `this` được truy cập, nó được lấy từ bên ngoài.

Ví dụ, chúng ta có thể sử dụng nó để lặp bên trong một phương thức của đối tượng:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

Ở đây trong `forEach`, hàm mũi tên được sử dụng, vì vậy `this.title` trong nó giống hệt như trong phương thức bên ngoài `showList`. Đó là: `group.title`.

Nếu chúng ta sử dụng một hàm "thông thường", sẽ xảy ra lỗi:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Lỗi: Không thể truy cập thuộc tính 'title' của undefined
      alert(this.title + ': ' + student);
    });
*/!*
  }
};

group.showList();
```

Lỗi xảy ra do `forEach` chạy các hàm với `this=undefined` theo mặc định, vì vậy việc truy cập `undefined.title` được thực hiện.

Điều đó không ảnh hưởng đến các hàm mũi tên, bởi vì chúng không có `this`.

```warn header="Hãm mũi tên không thể chạy với `new`"
Không có `this` tất nhiên là nguyên nhân của một hạn chế khác: không thể sử dụng các hàm mũi tên làm hàm tạo. Chúng không thể được gọi với `new`.
```

```smart header="Các hàm mũi tên so với bind"
Có một sự khác biệt nhỏ giữa hàm mũi tên `=>` và hàm thông thường được gọi bằng `.bind(this)`:

- `.bind(this)` tạo một "phiên bản ràng buộc" của hàm.
- Mũi tên `=>` không tạo bất kỳ ràng buộc nào. Đơn giản là hàm không có `this`. Việc tra cứu `this` được thực hiện giống hệt như tìm kiếm theo biến thông thường: trong môi trường từ vựng bên ngoài.
```

## Các hàm mũi tên không có "arguments"

Các hàm mũi tên cũng không có biến `arguments`.

Điều đó thật tuyệt vời cho các decorator, khi chúng ta cần chuyển tiếp lời gọi với `this` và `arguments` hiện tại.

Ví dụ: `defer(f, ms)` nhận một hàm và trả về một hàm bao xung quanh nó làm trễ lời gọi `ms` mili giây:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Xin chào, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John sau 2 giây
```

Tương tự nếu không có hàm mũi tên sẽ giống như sau:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

Chúng ta cần tạo thêm các biến `args` và `ctx` để hàm bên trong `setTimeout` có thể nhận chúng.

## Tóm tắt

Các hàm mũi tên:

- Không có `this`
- Không có `arguments`
- Không thể gọi bằng `new`
- Chúng cũng không có `super`, nhưng chúng ta chưa học nó. Chúng ta sẽ học ở chương <info:class-inheritance>

Đó là bởi vì chúng dành cho các đoạn mã ngắn không có "ngữ cảnh" của riêng chúng, mà hoạt động trong bối cảnh hiện tại. Và chúng thực sự tỏa sáng trong trường hợp sử dụng đó.
