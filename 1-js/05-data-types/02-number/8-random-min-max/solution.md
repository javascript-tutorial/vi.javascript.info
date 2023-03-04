Chúng ta cần "sắp xếp" tất cả các giá trị từ khoảng 0..1 thành các giá trị từ `min` đến `max`.

Điều đó có thể được thực hiện trong hai giai đoạn:

1. Nếu chúng ta nhân một số ngẫu nhiên từ 0..1 với `max-min`, thì khoảng các giá trị có thể tăng `0..1` thành `0..max-min`.
2. Bây giờ nếu chúng ta thêm `min`, thì khoảng thời gian có thể sẽ trở thành từ `min` đến `max`.

Hàm:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

