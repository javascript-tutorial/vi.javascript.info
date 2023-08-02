```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Lệnh gọi `debounce` trả về một wrapper. Khi được gọi, nó lên lịch cuộc gọi hàm ban đầu sau `ms` đã cho và hủy bỏ thời gian chờ như vậy trước đó.

