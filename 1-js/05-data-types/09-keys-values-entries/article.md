
# Object.keys, values, entries

Hãy bỏ qua các cấu trúc dữ liệu riêng lẻ và nói về các lần lặp lại trên chúng.

Trong chương trước chúng ta đã thấy các phương thức `map.keys()`, `map.values()`, `map.entries()`.

Các phương pháp này là chung chung, có một thỏa thuận chung để sử dụng chúng cho các cấu trúc dữ liệu. Nếu chúng ta từng tạo cấu trúc dữ liệu của riêng mình, chúng ta cũng nên triển khai chúng.

Chúng được hỗ trợ cho:

- `Map`
- `Set`
- `Array`

Các đối tượng đơn giản cũng hỗ trợ các phương thức tương tự, nhưng cú pháp hơi khác một chút.

## Object.keys, values, entries

Đối với các đối tượng đơn giản, có các phương thức sau:

- [Object.keys(obj)](mdn:js/Object/keys) -- trả về một array khóa.
- [Object.values(obj)](mdn:js/Object/values) -- trả về một array giá trị.
- [Object.entries(obj)](mdn:js/Object/entries) -- trả về một array các cặp `[key, value]`.

Hãy lưu ý các điểm khác biệt (ví dụ so với map):

| | Map | Đối tượng |
|---------------------|------------------|--------------|
| Cú pháp gọi | `map.keys()` | `Object.keys(obj)`, chứ không phải `obj.keys()` |
| Trả lại | iterable | Array "thực" |

Sự khác biệt đầu tiên là chúng ta phải gọi `Object.keys(obj)`, chứ không phải `obj.keys()`.

Tại sao như vậy? Lý do chính là tính linh hoạt. Hãy nhớ rằng, các đối tượng là cơ sở của tất cả các cấu trúc phức tạp trong JavaScript. Vì vậy, chúng ta có thể có một đối tượng của riêng mình như `data` thực hiện phương thức `data.values()` của chính nó. Và chúng ta vẫn có thể gọi `Object.values(data)` trên đó.

Điểm khác biệt thứ hai là các phương thức `Object.*` trả về các đối tượng array "thực", không chỉ là một đối tượng iterable. Đó chủ yếu là vì lý do lịch sử.

Ví dụ:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Đây là một ví dụ về việc sử dụng `Object.values` để lặp qua các giá trị thuộc tính:

```js run
let user = {
  name: "John",
  age: 30
};

// lặp lại các giá trị
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

```warn header="Object.keys/values/entries bỏ qua các thuộc tính tượng trưng"
Giống như vòng lặp `for..in`, các phương thức này bỏ qua các thuộc tính sử dụng `Symbol(...)` làm khóa.

Thông thường đó là thuận tiện. Nhưng nếu chúng ta cũng muốn có các khóa tượng trưng, thì có một phương thức riêng [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) trả về một array chỉ các khóa tượng trưng. Ngoài ra, tồn tại một phương thức [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) trả về các khóa *tất cả*.
```


## Chuyển đổi đối tượng

Các đối tượng thiếu nhiều phương thức tồn tại cho array, ví dụ: `map`, `filter` và những thứ khác.

Nếu chúng ta muốn áp dụng chúng, thì chúng ta có thể sử dụng `Object.entries` theo sau là `Object.fromEntries`:

1. Sử dụng `Object.entries(obj)` để lấy một array các cặp khóa/giá trị từ `obj`.
2. Sử dụng các phương thức array trên array đó, ví dụ `map`.
3. Sử dụng `Object.fromEntries(array)` trên array kết quả để biến nó trở lại thành một đối tượng.

Ví dụ: chúng ta có một đối tượng có giá và muốn nhân đôi chúng:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // chuyển đổi thành array, map và sau đó fromEntries trả lại đối tượng
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

Nó có thể trông khó khăn ngay từ cái nhìn đầu tiên, nhưng sẽ trở nên dễ hiểu sau khi bạn sử dụng nó một hoặc hai lần. Chúng ta có thể tạo ra những chuỗi biến đổi mạnh mẽ theo cách này.
