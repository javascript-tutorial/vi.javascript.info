# Chuyển đổi loại

Hầu hết thời gian, các toán tử và hàm tự động chuyển đổi các giá trị được cung cấp cho chúng thành đúng loại.

Ví dụ: `alert` tự động chuyển đổi bất kỳ giá trị nào thành chuỗi để hiển thị giá trị đó. Các phép toán chuyển đổi giá trị thành số.

Cũng có những trường hợp khi chúng ta cần chuyển đổi rõ ràng một giá trị thành loại dự kiến.

```smart header="Chưa nói về đối tượng"
Trong chương này, chúng tôi sẽ không đề cập đến các đối tượng. Bây giờ chúng ta sẽ chỉ nói về nguyên thủy.

Sau này, sau khi chúng ta tìm hiểu về các đối tượng, trong chương <info:object-toprimitive> chúng ta sẽ xem các đối tượng phù hợp như thế nào.
```

## Chuyển đổi chuỗi

Chuyển đổi chuỗi xảy ra khi chúng ta cần dạng chuỗi của một giá trị.

Ví dụ: `alert(value)` thực hiện việc này để hiển thị giá trị.

Chúng ta cũng có thể gọi hàm `String(value)` để chuyển đổi một giá trị thành một chuỗi:

```js chạy
để giá trị = true;
cảnh báo (loại giá trị); // boolean

*!*
giá trị = Chuỗi (giá trị); // bây giờ giá trị là một chuỗi "true"
cảnh báo (loại giá trị); // sợi dây
*/!*
```

Chuyển đổi chuỗi chủ yếu là rõ ràng. `false` trở thành `"false"`, `null` trở thành `"null"`, v.v.

## Chuyển đổi số

Chuyển đổi số xảy ra tự động trong các hàm và biểu thức toán học.

Ví dụ: khi phép chia `/` được áp dụng cho các số không phải là số:

```js chạy
cảnh báo ("6" / "2" ); // 3, chuỗi được chuyển thành số
```

Chúng ta có thể sử dụng hàm `Number(value)` để chuyển đổi rõ ràng một `giá trị` thành một số:

```js chạy
cho str = "123";
cảnh báo (typeof str); // sợi dây

hãy để num = Số (str); // trở thành số 123

cảnh báo (loại số); // con số
```

Chuyển đổi rõ ràng thường được yêu cầu khi chúng tôi đọc một giá trị từ nguồn dựa trên chuỗi như biểu mẫu văn bản nhưng mong muốn nhập một số.

Nếu chuỗi không phải là số hợp lệ, thì kết quả của việc chuyển đổi đó là `NaN`. Ví dụ:

```js chạy
let age = Number("một chuỗi tùy ý thay vì một số");

cảnh báo (tuổi); // NaN, chuyển đổi không thành công
```

Quy tắc chuyển đổi số:

| Giá trị | Trở thành... |
|-------|-------------|
|`không xác định`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;và&nbsp;false</code> | `1` và `0` |
| `chuỗi` | Khoảng trắng từ đầu và cuối được loại bỏ. Nếu chuỗi còn lại trống, kết quả là `0`. Mặt khác, số được "đọc" từ chuỗi. Một lỗi đưa ra `NaN`. |

Ví dụ:

```js chạy
cảnh báo (Số (" 123 ")); // 123
cảnh báo (Số ("123z")); // NaN (lỗi đọc số tại "z")
cảnh báo (Số (đúng)); // 1
cảnh báo (Số (sai)); // 0
```

Xin lưu ý rằng `null` và `undefined` hoạt động khác nhau ở đây: `null` trở thành 0 trong khi `undefined` trở thành `NaN`.

Hầu hết các toán tử toán học cũng thực hiện chuyển đổi như vậy, chúng ta sẽ thấy điều đó trong chương tiếp theo.

## Chuyển đổi Boolean

Chuyển đổi Boolean là chuyển đổi đơn giản nhất.

Nó xảy ra trong các phép toán logic (sau này chúng ta sẽ gặp các bài kiểm tra điều kiện và những thứ tương tự khác) nhưng cũng có thể được thực hiện một cách rõ ràng bằng lệnh gọi `Boolean(value)`.

Quy tắc chuyển đổi:

- Các giá trị "trống" theo trực giác, như `0`, một chuỗi trống, `null`, `undefined` và `NaN`, trở thành `false`.
- Các giá trị khác trở thành `true`.

Ví dụ:

```js chạy
cảnh báo ( Boolean(1) ); // ĐÚNG
cảnh báo( Boolean(0) ); // SAI

cảnh báo ( Boolean ("xin chào")); // ĐÚNG
cảnh báo( Boolean("") ); // SAI
```

````warn header="Xin lưu ý: chuỗi có số 0 `\"0\"` là `true`"
Một số ngôn ngữ (cụ thể là PHP) coi `"0"` là `false`. Nhưng trong JavaScript, một chuỗi không trống luôn là `true`.

```js chạy
cảnh báo( Boolean("0") ); // ĐÚNG
cảnh báo( Boolean(" ") ); // dấu cách, cũng đúng (bất kỳ chuỗi không trống nào cũng đúng)
```
````

## Bản tóm tắt

Ba chuyển đổi loại được sử dụng rộng rãi nhất là chuỗi, số và boolean.

**`Chuyển đổi chuỗi`** -- Xảy ra khi chúng tôi xuất nội dung nào đó. Có thể được thực hiện với `Chuỗi(giá trị)`. Việc chuyển đổi thành chuỗi thường rõ ràng đối với các giá trị nguyên thủy.

**`Chuyển đổi số`** -- Xảy ra trong các phép toán. Có thể được thực hiện với `Số(giá trị)`.

Việc chuyển đổi tuân theo các quy tắc:

| Giá trị | Trở thành... |
|-------|-------------|
|`không xác định`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1/0` |
| `chuỗi` | Chuỗi được đọc "nguyên trạng", khoảng trắng ở cả hai bên được bỏ qua. Một chuỗi rỗng trở thành `0`. Một lỗi đưa ra `NaN`. |

**`Chuyển đổi Boolean`** -- Xảy ra trong các hoạt động logic. Có thể được thực hiện với `Boolean(value)`.

Thực hiện theo các quy tắc:

| Gía trị | Trở thành... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|bất kỳ giá trị nào khác| `đúng` |


Hầu hết các quy tắc này đều dễ hiểu và dễ ghi nhớ. Các trường hợp ngoại lệ đáng chú ý mà mọi người thường mắc lỗi là:

- `undefined` là `NaN` dưới dạng một số, không phải `0`.
- `"0"` và các chuỗi chỉ có dấu cách như `" "` là true dưới dạng boolean.

Các đối tượng không được đề cập ở đây. Chúng ta sẽ quay lại với chúng sau trong chương <info:object-toprimitive> dành riêng cho đối tượng sau khi chúng ta tìm hiểu thêm những điều cơ bản về JavaScript.
