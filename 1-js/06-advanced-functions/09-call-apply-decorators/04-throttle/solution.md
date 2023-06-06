```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Lệnh gọi `throttle(func, ms)` trả về `wrapper`.

1. Trong lần gọi đầu tiên, `wrapper` chỉ chạy `func` và đặt trạng thái hồi (`isThrottled = true`).
2. Ở trạng thái này, tất cả các lệnh gọi đều được ghi nhớ trong `savedArgs/savedThis`. Hãy lưu ý rằng cả ngữ cảnh và đối số đều quan trọng như nhau và cần được ghi nhớ. Chúng ta cần chúng đồng thời để tái tạo cuộc gọi.
3. Sau khi `ms` mili giây trôi qua, `setTimeout` sẽ kích hoạt. Trạng thái hồi bị loại bỏ (`isThrottled = false`) và nếu chúng ta đã bỏ qua các lệnh gọi, `wrapper` sẽ được thực thi với các đối số và ngữ cảnh được ghi nhớ cuối cùng.

Bước thứ 3 chạy không phải `func`, mà là `wrapper`, bởi vì chúng ta không chỉ cần thực thi `func`, mà một lần nữa vào trạng thái hồi và thiết lập thời gian chờ để đặt lại nó.
