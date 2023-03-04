
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Vui lòng nhập số?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

Giải pháp phức tạp hơn một chút có thể là do chúng ta cần xử lý `null`/dòng trống.

Vì vậy, chúng ta thực sự chấp nhận đầu vào cho đến khi nó là "số thông thường". Cả `null` (hủy) và dòng trống cũng phù hợp với điều kiện đó, vì ở dạng số chúng là `0`.

Sau khi dừng, chúng ta cần xử lý đặc biệt `null` và dòng trống (trả về `null`), vì chuyển đổi chúng thành một số sẽ trả về `0`.

