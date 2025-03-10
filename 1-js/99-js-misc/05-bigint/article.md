# BigInt

[recent caniuse="bigint"]

`BigInt` là một kiểu số đặc biệt hỗ trợ cho các số nguyên có độ dài tùy ý.

Một bigint được tạo bằng cách thêm `n` vào cuối một chữ số nguyên hoặc bằng cách gọi hàm `BigInt`, hàm này tạo ra các bigint từ chuỗi, số, v.v.

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // giống với 10n
```

## Toán tử toán học

`BigInt` hầu hết có thể được sử dụng như một số thông thường, ví dụ:

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

Xin lưu ý: phép chia `5/2` trả về kết quả được làm tròn về 0, không có phần thập phân. Tất cả các phép toán trên bigint đều trả về một bigint.

Chúng ta không thể trộn lẫn số bigint và số thông thường:

```js run
alert(1n + 2); // Error: Không thể trộn BigInt and other types
```

Chúng ta nên chuyển đổi chúng một cách rõ ràng nếu cần: sử dụng một trong hai `BigInt()` hoặc `Number()`, như thế này:

```js run
let bigint = 1n;
let number = 2;

// number ➡ bigint
alert(bigint + BigInt(number)); // 3

// bigint ➡ number
alert(Number(bigint) + number); // 3
```

Các thao tác chuyển đổi luôn diễn ra âm thầm, không bao giờ có error, nhưng nếu bigint quá lớn và không vừa với kiểu số thì các bit thừa sẽ bị cắt đi, vì vậy chúng ta nên cẩn thận khi thực hiện chuyển đổi như vậy.

````smart header="Dấu cộng không được hỗ trợ trên bigint"
Toán tử cộng `+value` là một cách phổ biến để chuyển đổi `value` thành số.

Để tránh nhầm lẫn, nó không được hỗ trợ trên bigint:
```js run
let bigint = 1n;

alert( +bigint ); // error
```
Vì vậy chúng ta nên sử dụng `Number()` để chuyển đổi một bigint thành một số.
````

## So sánh

Các phép so sánh, chẳng hạn như `<`, `>` hoạt động tốt với các bigint và số:

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

Tuy nhiên, xin lưu ý vì số và bigint thuộc các loại khác nhau nên chúng có thể bằng nhau `==`, nhưng không hoàn toàn bằng nhau `===`:

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## Các phép toán Boolean

Khi ở bên trong `if` hoặc các phép toán boolean khác, bigint hoạt động giống như một số.

Ví dụ: trong `if`, bigint `0n` là false, các giá trị khác là true:

```js run
if (0n) {
  // không bao giờ thực thi
}
```

Các toán tử Boolean, chẳng hạn như `||`, `&&` và các toán tử khác cũng hoạt động với các bigint tương tự như số:

```js run
alert( 1n || 2 ); // 1 (1n được coi là true)

alert( 0n || 2 ); // 2 (0n được coi là false)
```

## Polyfill

Polyfill bigint là một công việc khó khăn. Lý do là nhiều toán tử JavaScript, chẳng hạn như `+`, `-` v.v., hoạt động khác với bigint so với các số thông thường.

Ví dụ: phép chia bigint luôn trả về một bigint (làm tròn nếu cần).

Để mô phỏng hành vi như vậy, một polyfill sẽ cần phân tích code và thay thế tất cả các toán tử đó bằng các hàm của nó. Nhưng làm như vậy thì cồng kềnh và tốn nhiều công sức.

Vì vậy, không có polyfill nào tốt được nhiều người biết.

Mặc dù vậy, một cách giải quyết khác đã được đề xuất bởi các nhà phát triển của thư viện [JSBI](https://github.com/GoogleChromeLabs/jsbi).

Thư viện này sử dụng các phương pháp riêng của mình để thực hiện big number. Chúng ta có thể sử dụng cái này thay vì bigint gốc:

| Thao tác | `BigInt` gốc | JSBI |
|-----------|-----------------|------|
| Tạo từ số | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Phép cộng | `c = a + b` | `c = JSBI.add(a, b)` |
| Phép trừ	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...Và sau đó, sử dụng polyfill (plugin Babel) để chuyển đổi lệnh gọi JSBI thành bigint gốc được trình duyệt hỗ trợ.

Nói cách khác, cách tiếp cận này gợi ý rằng chúng ta viết code bằng JSBI thay vì viết bằng bigint gốc. Nhưng JSBI hoạt động với các con số giống như với bigint trong nội bộ, mô phỏng chúng theo sát với thông số kỹ thuật nên code này "nhận biết được bigint".

Chúng ta có thể sử dụng mã JSBI "nguyên si" như vậy cho các công cụ không hỗ trợ bigint và cho cả những công cụ có hỗ trợ - polyfill sẽ chuyển đổi các lệnh gọi thành bigint gốc.

## Tham khảo

- [Tài liệu BigInt trên MDN](mdn:/JavaScript/Reference/Global_Objects/BigInt).
- [Đặc điểm kỹ thuật](https://tc39.es/ecma262/#sec-bigint-objects).
