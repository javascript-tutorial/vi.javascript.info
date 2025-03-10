
Sử dụng `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

Sử dụng `setTimeout` lồng nhau:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

Lưu ý rằng trong cả hai giải pháp, có độ trễ ban đầu trước đầu ra đầu tiên. Hàm được gọi sau `1000ms` lần đầu tiên.

Nếu chúng ta cũng muốn hàm chạy ngay lập tức, thì chúng ta có thể thêm lệnh gọi bổ sung trên một dòng riêng, như sau:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
