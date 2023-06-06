importance: 5

---

# setTimeout sẽ hiển thị cái gì?

Trong mã bên dưới có một cuộc gọi `setTimeout` được lên lịch, sau đó một phép tính nặng được chạy, mất hơn 100 mili giây để hoàn thành.

Khi nào hàm được lên lịch sẽ chạy?

1. Sau vòng lặp.
2. Trước vòng lặp.
3. Ở đầu vòng lặp.


`alert` sẽ hiển thị cái gì?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// giả sử rằng thời gian để thực hiện hàm này là >100 mili giây
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
