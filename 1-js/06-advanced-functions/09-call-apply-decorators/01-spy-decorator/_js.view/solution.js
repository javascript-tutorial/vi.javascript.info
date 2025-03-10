function spy(func) {

  function wrapper(...args) {
    // sử dụng ... args thay vì đối số để lưu trữ array "thực" trong wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
