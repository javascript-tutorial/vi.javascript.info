Đó là bởi vì `i` sẽ không bao giờ bằng `10`.

Chạy nó để xem các giá trị *thực* của `i`:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Không cái nào trong số chúng chính xác là `10`.

Những điều như vậy xảy ra do mất độ chính xác khi cộng các phân số như `0,2`.

Kết luận: Tránh kiểm tra bằng nhau khi làm việc với phân số thập phân.
