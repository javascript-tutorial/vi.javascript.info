Theo định nghĩa, giai thừa `n!` có thể được viết là `n * (n-1)!`.

Nói cách khác, kết quả của `giai thừa(n)` có thể được tính bằng `n` nhân với kết quả của `giai thừa(n-1)`. Và lệnh gọi `n-1` có thể đệ quy giảm xuống thấp hơn và thấp hơn cho đến `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

Cơ sở của đệ quy là giá trị `1`. Chúng ta cũng có thể đặt `0` làm cơ sở ở đây, không quan trọng lắm, nhưng cung cấp thêm một bước đệ quy:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
