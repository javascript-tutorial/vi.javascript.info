# Nhắc lại về hàm mũi tên

Cùng xem lại hàm mũi tên.

<<<<<<< HEAD
Hàm mũi tên không đơn giản chỉ là một cách viết tắt của hàm.
=======
Arrow functions are not just a "shorthand" for writing small stuff. They have some very specific and useful features.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

<<<<<<< HEAD
JavaScript có đầy những tình huống ở đó chúng ta cần viết một hàm nhỏ để chạy ở một nơi khác.
=======
JavaScript is full of situations where we need to write a small function that's executed somewhere else.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Ví dụ:

- `arr.forEach(func)` -- `func` được chạy bởi `forEach` với mỗi phần tử của mảng.
- `setTimeout(func)` -- `func` được chạy bởi bộ lập lịch.
- ...và nhiều nữa.

Nó cũng là linh hồn của JavaScript khi mà ta cần tạo một hàm và truyền nó tới một nơi khác.

<<<<<<< HEAD
Những hàm này tạo ra để chạy ở chỗ khác cho nên nó không cần đến ngữ cảnh nơi nó được tạo.
=======
And in such functions we usually don't want to leave the current context. That's where arrow functions come in handy.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

## Các hàm mũi tên không có "this"

Như ta đã nói ở bài <info:object-methods>, hàm mũi tên không có `this`. Nếu `this` được truy cập nó được lấy từ bên ngoài.

Ví dụ, chúng ta có thể sử dụng nó trong vòng lặp bên trong phương thức của một đối tượng:

```js run
let group = {
  title: "Nhóm của chúng tôi",
  students: ["Hùng", "Mạnh", "Ngọc"],

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

Hàm mũi tên được sử dụng trong `forEach`, `this.title` của nó giống như của phương thức ngoài `showList`. Đó là: `group.title`.

Nếu sử dụng hàm bình thường, sẽ có lỗi:

```js run
let group = {
  title: "Nhóm của chúng tôi",
  students: ["Hùng", "Mạnh", "Ngọc"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Lỗi: Không thể truy cập thuộc tính 'title' của undefined
      alert(this.title + ': ' + student)
    });
*/!*
  }
};

group.showList();
```

Lỗi này xuất hiện bởi `forEach` chạy hàm với `this=undefined`, dẫn tới việc truy cập `undefined.title`.

Điều này không sảy ra với hàm mũi tên vì nó không có `this`.

```warn header="Hãm mũi tên không thể chạy với `new`"
Bởi không có `this`, hàm mũi tên không thể sử dụng làm constructor và do đó không thể chạy với toán tử `new`.
```

```smart header="Hàm mũi tên khi sử dụng với `bind`"
Có một sự khác biệt nhỏ giữa hàm mũi tên `=>` và hàm thông thường khi sử dụng `.bind(this)`:

- `.bind(this)` tạo "phiên bản ràng buộc `this`" của hàm thông thường.
- Hàm mũi tên `=>` không tạo ra bất cứ ràng buộc nào. Đơn giản là bởi vì nó không có `this`.
```

## Hàm mũi tên không có "arguments"

Hàm mũi tên cũng không có biến `arguments`.

Nó rất tối ưu cho các decorator, khi chúng ta cần chuyển lời gọi hàm cùng với `this` và `arguments` của hàm hiện tại.

Ví dụ, `defer(f, ms)` nhận hàm `f` và trả về hàm bao làm trễ việc chạy `f` đi `ms` mi-li-giây.

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('Xin chào, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("Hùng"); // Xin chào, Hùng sau 2 giây
```

Nếu không dùng hàm mũi tên thì phải viết như sau:

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

Ta cần tạo thêm hai biến `args` và `ctx` để hàm bên trong `setTimeout` có thể nhận chúng.

## Tóm tắt

Hàm mũi tên:

<<<<<<< HEAD
- Không có `this`.
- Không có `arguments`.
- Không thể gọi bằng `new`.
- (Chúng cũng không có `super`, nhưng chúng ta chưa học. Sẽ học ở bài <info:class-inheritance>).

Đó là bởi vì hàm mũi tên là một hàm ngắn được tạo ra với mục địch chạy ở bất cứ đâu, nên nó không cần giữ lại ngữ cảnh nơi nó được tạo.
=======
- Do not have `this`
- Do not have `arguments`
- Can't be called with `new`
- They also don't have `super`, but we didn't study it yet. We will on the chapter <info:class-inheritance>

That's because they are meant for short pieces of code that do not have their own "context", but rather work in the current one. And they really shine in that use case.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5
