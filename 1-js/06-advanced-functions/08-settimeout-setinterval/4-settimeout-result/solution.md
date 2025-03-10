
Bất kỳ `setTimeout` nào sẽ chỉ chạy sau khi mã hiện tại kết thúc.

`i` sẽ là cái cuối cùng: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// giả sử rằng thời gian để chạy hàm này là >100 mili giây
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
