importance: 5

---

# Dãy Fibonacci

Dãy [số Fibonacci](https://vi.wikipedia.org/wiki/D%C3%A3y_Fibonacci) có công thức <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. Nói cách khác, số tiếp theo là tổng của hai số trước.

Hai số đầu tiên là `1`, sau đó là `2(1+1)`, sau đó là `3(1+2)`, `5(2+3)`, v.v.: `1, 1, 2, 3, 5 , 8, 13, 21...`.

Các số Fibonacci có liên quan đến [Tỷ lệ vàng](https://vi.wikipedia.org/wiki/T%E1%BB%B7_l%E1%BB%87_v%C3%A0ng) và nhiều hiện tượng tự nhiên xung quanh chúng ta.

Viết hàm `fib(n)` trả về số Fibonacci thứ n-th`.

Một ví dụ về công việc:

```js
function fib(n) { /* mã của bạn */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

Tái bút: Các hàm nên được nhanh chóng. Lệnh gọi `fib(77)` sẽ mất không quá một phần giây.
