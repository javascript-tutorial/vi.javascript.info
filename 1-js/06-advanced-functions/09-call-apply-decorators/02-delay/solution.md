Lời giải:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("kiểm tra"); // hiển thị "kiểm tra" sau 1000ms
```

Hãy lưu ý cách sử dụng arrow function ở đây. Như chúng ta đã biết, các arrow function không có `this` và `arguments` riêng, vì vậy `f.apply(this, arguments)` lấy `this` và `arguments` từ wrapper.

Nếu chúng ta chuyển một hàm thông thường, `setTimeout` sẽ gọi nó mà không có đối số và `this=window` (giả sử chúng ta đang ở trong trình duyệt).

Chúng ta vẫn có thể chuyển `this` bên phải bằng cách sử dụng một biến trung gian, nhưng điều đó hơi rườm rà hơn một chút:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // lưu cái này vào một biến trung gian
    setTimeout(function() {
      f.apply(savedThis, args); // sử dụng nó ở đây
    }, ms);
  };

}
```
