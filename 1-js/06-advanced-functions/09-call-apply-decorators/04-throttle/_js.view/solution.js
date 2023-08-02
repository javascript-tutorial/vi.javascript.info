function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // ghi nhớ đối số cuối cùng để gọi sau thời gian hồi
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // nếu không thì chuyển sang trạng thái hồi
    func.apply(this, arguments);

    isThrottled = true;

    // kế hoạch thiết lập lại isThrottled sau sự chậm trễ
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // nếu có cuộc gọi, thì saveThis/savedArgs có cuộc gọi cuối cùng
        //cuộc gọi đệ quy chạy hàm và đặt lại thời gian hồi
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
