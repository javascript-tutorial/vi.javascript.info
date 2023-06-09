# Giải pháp đơn giản nhưng sai lầm

Giải pháp đơn giản nhưng sai lầm là tạo ra một giá trị từ `min` đến `max` và làm tròn giá trị đó:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

Hàm hoạt động, nhưng nó không chính xác. Xác suất nhận được các giá trị cạnh `min` và `max` thấp hơn hai lần so với bất kỳ giá trị nào khác.

Nếu chạy ví dụ trên nhiều lần, bạn sẽ dễ dàng thấy rằng `2` xuất hiện thường xuyên nhất.

Điều đó xảy ra vì `Math.round()` nhận các số ngẫu nhiên từ khoảng `1..3` và làm tròn chúng như sau:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

Bây giờ chúng ta có thể thấy rõ ràng rằng `1` có giá trị ít hơn `2` hai lần. Và tương tự với `3`.

# Giải pháp chính xác

Có nhiều giải pháp chính xác cho nhiệm vụ. Một trong số đó là điều chỉnh đường viền khoảng cách. Để đảm bảo các khoảng giống nhau, chúng ta có thể tạo các giá trị từ `0,5 đến 3,5`, do đó thêm các xác suất cần thiết cho các cạnh:

```js run
*!*
function randomInteger(min, max) {
  // bây giờ rand đến từ  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Một cách khác có thể là sử dụng `Math.floor` cho một số ngẫu nhiên từ `min` đến `max+1`: 45

```js run
*!*
function randomInteger(min, max) {
  // ở đây rand là từ tối thiểu đến (tối đa + 1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Bây giờ tất cả các khoảng thời gian được sắp xếp theo cách này:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

Tất cả các khoảng có cùng độ dài, làm cho phân phối cuối cùng đồng nhất.
