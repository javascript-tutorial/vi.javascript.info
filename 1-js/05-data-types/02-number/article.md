# Số

Trong JavaScript hiện đại, có hai loại số:

1. Các số thông thường trong JavaScript được lưu trữ ở định dạng 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), còn được gọi là "số dấu phẩy động có độ chính xác kép". Đây là những con số mà chúng ta sử dụng trong phần lớn thời gian và chúng ta sẽ nói về chúng trong chương này.

2. Số BigInt đại diện cho số nguyên có độ dài tùy ý. Đôi khi chúng cần thiết vì một số nguyên thông thường không thể an toàn vượt quá <code>(2<sup>53</sup>-1)</code> hoặc nhỏ hơn <code>-(2<sup>53</ sup>-1)</code>, như chúng ta đã đề cập trước đó trong chương <info:types>. Vì bigint được sử dụng trong một vài lĩnh vực đặc biệt nên chúng ta dành cho chúng một chương đặc biệt <info:bigint>.

Vì vậy, ở đây chúng ta sẽ nói về các số thông thường. Hãy mở rộng kiến thức của chúng ta về chúng.

## Nhiều cách khác để viết một số

```js
let billion = 1000000000;
```

Chúng ta cũng có thể sử dụng dấu gạch dưới `_` làm dấu phân cách:

```js
let billion = 1_000_000_000;
```

Ở đây, dấu gạch dưới `_` đóng vai trò của "[đường cú pháp](https://en.wikipedia.org/wiki/Syntactic_sugar)", nó làm cho số dễ đọc hơn. JavaScript engine chỉ cần bỏ qua `_` giữa các chữ số, do đó, nó chính xác là một tỷ như trên.

Tuy nhiên, trong cuộc sống thực, chúng ta cố gắng tránh viết các chuỗi số 0 dài. Chúng ta quá lười biếng cho việc đó. Chúng ta sẽ cố gắng viết thứ gì đó như `"1 tỷ"` cho một tỷ hoặc `"7,3 tỷ"` cho 7 tỷ 300 triệu. Điều này cũng đúng với hầu hết các số lớn.

Trong JavaScript, chúng ta có thể rút ngắn một số bằng cách thêm chữ cái `"e"` vào nó và chỉ định số lượng số 0:

```js run
let billion = 1e9;  // 1 tỷ, nghĩa đen: 1 và 9 số 0

alert( 7.3e9 );  // 7,3 tỷ (giống như 7300000000 hoặc 7_300_000_000)
```

Nói cách khác, `e` nhân số với `1` với số lượng các số 0 đã cho.

```js
1e3 === 1 * 1000; // e3 nghĩa là *1000
1.23e6 === 1.23 * 1000000; // e6 nghĩa là *1000000
```

Bây giờ chúng ta hãy viết một cái gì đó rất nhỏ. Giả sử, 1 micro giây (một phần triệu giây):

```js
let mcs = 0.000001;
```

Giống như trước đây, việc sử dụng `"e"` có thể hữu ích. Nếu chúng ta muốn tránh viết các số 0 một cách rõ ràng, chúng ta có thể viết tương tự như:

```js
let mcs = 1e-6; // năm số không ở bên trái từ 1
```

Nếu chúng ta đếm các số 0 trong `0,000001`, thì có 6 số trong số đó. Vì vậy, tự nhiên đó là `1e-6`.

Nói cách khác, một số âm sau `"e"` có nghĩa là phép chia cho 1 với số lượng các số 0 đã cho:

```js
// -3 chia cho 1 với 3 số 0
1e-3 === 1 / 1000; // 0.001

// -6 chia hết cho 1 với 6 chữ số 0
1.23e-6 === 1.23 / 1000000; // 0.00000123

// một ví dụ với một số lớn hơn
1234e-2 === 1234 / 100; // 12.34, dấu thập phân di chuyển 2 lần
```

### Số hex, nhị phân và bát phân

[Hệ thập lục phân](https://vi.wikipedia.org/wiki/Hệ_thập_lục_phân) được sử dụng rộng rãi trong JavaScript để thể hiện màu sắc, ký tự mã hóa và cho nhiều thứ khác. Vì vậy, một cách tự nhiên, tồn tại một cách viết ngắn hơn: `0x` và sau đó là số.

Ví dụ:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (giống nhau, viết hoa không quan trọng)
```

Các hệ thống số nhị phân và bát phân hiếm khi được sử dụng, nhưng cũng được hỗ trợ bằng cách sử dụng tiền tố `0b` và `0o`:


```js run
let a = 0b11111111; // dạng nhị phân của 255
let b = 0o377; // dạng bát phân của 255

alert( a == b ); // true, cùng một số 255 ở cả hai bên
```

Chỉ có 3 hệ thống số với sự hỗ trợ như vậy. Đối với các hệ thống số khác, chúng ta nên sử dụng hàm `parseInt` (mà chúng ta sẽ thấy ở phần sau của chương này).

## toString(base)

Phương thức `num.toString(base)` trả về một chuỗi đại diện cho `num` trong hệ thống số với `base` đã cho.

Ví dụ:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` có thể thay đổi từ `2` đến `36`. Theo mặc định, đó là `10`.

Các trường hợp sử dụng phổ biến cho việc này là:

- **base=16** được sử dụng cho màu hex, mã hóa ký tự, v.v., các chữ số có thể là `0..9` hoặc `A..F`.
- **base=2** chủ yếu dùng để gỡ lỗi các hoạt động theo bit, các chữ số có thể là `0` hoặc `1`.
- **base=36** là giá trị lớn nhất, các chữ số có thể là `0..9` hoặc `A..Z`. Toàn bộ bảng chữ cái Latinh được sử dụng để đại diện cho một số. Một trường hợp buồn cười nhưng hữu ích cho `36` là khi chúng ta cần biến một định danh số dài thành một số khác ngắn hơn, chẳng hạn như để tạo một url ngắn. Có thể đơn giản biểu diễn nó trong hệ thống số với cơ số `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Hai dấu chấm để gọi một phương thức"
Hãy lưu ý rằng hai dấu chấm trong `123456..toString(36)` không phải là lỗi đánh máy. Nếu chúng ta muốn gọi một phương thức trực tiếp trên một số, như `toString` trong ví dụ trên, thì chúng ta cần đặt hai dấu chấm `..` sau nó.

Nếu chúng ta đặt một dấu chấm đơn: `123456.toString(36)`, thì sẽ xảy ra lỗi, vì cú pháp JavaScript ngụ ý phần thập phân sau dấu chấm đầu tiên. Và nếu chúng ta đặt thêm một dấu chấm, thì JavaScript sẽ biết rằng phần thập phân trống và bây giờ sẽ thực hiện phương thức.

Cũng có thể viết `(123456).toString(36)`.

```

## Làm tròn

Một trong những thao tác được sử dụng nhiều nhất khi làm việc với số là làm tròn số.

Có một số chức năng tích hợp để làm tròn:

`Math.floor`
: Làm tròn xuống: `3.1` trở thành `3` và `-1.1` trở thành `-2`.

`Math.ceil`
: Làm tròn lên: `3.1` trở thành `4` và `-1.1` trở thành `-1`.

`Math.round`
: Làm tròn đến số nguyên gần nhất: `3.1` trở thành `3`, `3.6` trở thành `4`, trường hợp ở giữa: `3.5` cũng làm tròn lên `4`.

`Math.trunc` (không được Internet Explorer hỗ trợ)
: Xóa mọi thứ sau dấu thập phân mà không làm tròn: `3.1` trở thành `3`, `-1.1` trở thành `-1`.

Đây là bảng để tóm tắt sự khác biệt giữa chúng:

| | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`| `3` | `4` | `3` | `3` |
|`3.6`| `3` | `4` | `4` | `3` |
|`-1.1`| `-2` | `-1` | `-1` | `-1` |
|`-1.6`| `-2` | `-1` | `-2` | `-1` |


Các hàm này bao gồm tất cả các cách có thể để xử lý phần thập phân của một số. Nhưng nếu chúng ta muốn làm tròn số đến chữ số `thứ n` sau dấu thập phân thì sao?

Chẳng hạn, chúng ta có `1.2345` và muốn làm tròn nó thành 2 chữ số, chỉ nhận được `1.23`.

Có hai cách để làm như vậy:

1. Nhân chia.

     Ví dụ: để làm tròn số đến chữ số thứ 2 sau dấu thập phân, chúng ta có thể nhân số đó với `100`, gọi hàm làm tròn rồi chia lại.
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. Phương thức [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) làm tròn số thành `n` chữ số sau dấu chấm và trả về một chuỗi đại diện của kết quả.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Điều này làm tròn lên hoặc xuống đến giá trị gần nhất, tương tự như `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Hãy lưu ý rằng kết quả của `toFixed` là một chuỗi. Nếu phần thập phân ngắn hơn yêu cầu, các số 0 sẽ được thêm vào cuối:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", thêm số 0 để tạo thành chính xác 5 chữ số
    ```

    Chúng ta có thể chuyển đổi nó thành một số bằng cách sử dụng phép cộng đơn nguyên hoặc lệnh gọi `Number()`, ví dụ viết `+num.toFixed(5)`.

## Tính toán không chính xác

Bên trong, một số được thể hiện ở định dạng 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), do đó, có chính xác 64 bit để lưu trữ một số: 52 bit trong số đó được sử dụng để lưu trữ các chữ số, 11 trong số chúng lưu trữ vị trí của dấu thập phân và 1 bit dành cho dấu.

Nếu một số thực sự lớn, nó có thể tràn bộ nhớ 64-bit và trở thành một giá trị số đặc biệt `Infinity`:

```js run
alert( 1e500 ); // Vô hạn
```

Điều có thể ít rõ ràng hơn một chút, nhưng lại xảy ra khá thường xuyên, đó là sự mất đi độ chính xác.

Hãy xem xét bài kiểm tra bằng nhau (sai!) này:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Đúng vậy, nếu chúng ta kiểm tra xem tổng của `0,1` và `0,2` có phải là `0,3` hay không, chúng ta sẽ nhận được `false`.

Lạ lùng! Vậy thì đó là gì nếu không phải là `0,3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Ôi! Hãy tưởng tượng bạn đang tạo một trang web mua sắm điện tử và khách truy cập đặt hàng hóa `$0,1` và `$0,2` vào giỏ hàng của họ. Tổng đơn đặt hàng sẽ là `$0,30000000000000004`. Điều đó sẽ làm bất cứ ai ngạc nhiên.

Nhưng tại sao điều này lại xảy ra?

Một số được lưu trữ trong bộ nhớ ở dạng nhị phân, một chuỗi các bit - số một và số không. Nhưng các phân số như `0,1`, `0,2` trông có vẻ đơn giản trong hệ thống số thập phân thực ra là các phân số vô tận ở dạng nhị phân của chúng.

`0,1` là gì? Nó là một chia cho mười `1/10`, một phần mười. Trong hệ thống số thập phân, những số như vậy có thể biểu diễn dễ dàng. So sánh nó với một phần ba: `1/3`. Nó trở thành phân số vô tận `0,33333(3)`.

Vì vậy, phép chia cho lũy thừa `10` được đảm bảo hoạt động tốt trong hệ thập phân, nhưng phép chia cho `3` thì không. Vì lý do tương tự, trong hệ thống số nhị phân, phép chia cho lũy thừa của `2` được đảm bảo hoạt động, nhưng `1/10` trở thành một phân số nhị phân vô tận.

Không có cách nào để lưu trữ *chính xác 0,1* hoặc *chính xác 0,2* bằng hệ thống nhị phân, giống như không có cách nào lưu trữ một phần ba dưới dạng phân số thập phân.

Định dạng số IEEE-754 giải quyết vấn đề này bằng cách làm tròn đến số gần nhất có thể. Các quy tắc làm tròn này thường không cho phép chúng ta thấy "sai số nhỏ" đó, nhưng nó tồn tại.

Chúng ta có thể thấy điều này trong hành động:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

Và khi chúng ta tính tổng hai số, "sai số chính xác" của chúng sẽ cộng lại.

Đó là lý do tại sao `0,1 + 0,2` không chính xác là `0,3`.

```smart header="Không chỉ JavaScript"
Vấn đề tương tự tồn tại trong nhiều ngôn ngữ lập trình khác.

PHP, Java, C, Perl, Ruby cho kết quả chính xác như nhau, bởi vì chúng dựa trên cùng một định dạng số.
```

Chúng ta có thể giải quyết vấn đề không? Chắc chắn rồi, phương pháp đáng tin cậy nhất là làm tròn kết quả với sự trợ giúp của một phương thức [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Hãy lưu ý rằng `toFixed` luôn trả về một chuỗi. Nó đảm bảo rằng nó có 2 chữ số sau dấu thập phân. Điều đó thực sự tiện lợi nếu chúng ta có một trang mua sắm điện tử và cần hiển thị `$0,3`. Đối với các trường hợp khác, chúng ta có thể sử dụng dấu cộng đơn nguyên để biến nó thành một số:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Chúng ta cũng có thể tạm thời nhân các số với 100 (hoặc một số lớn hơn) để biến chúng thành số nguyên, làm phép tính rồi chia lại. Sau đó, khi chúng ta làm toán với các số nguyên, sai số giảm đi phần nào, nhưng chúng ta vẫn nhận được nó khi chia:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

Vì vậy, phương pháp nhân/chia giúp giảm lỗi, nhưng không loại bỏ hoàn toàn.

Đôi khi chúng ta có thể cố gắng trốn tránh các phân số. Giống như nếu chúng ta đang giao dịch với một cửa hàng, thì chúng ta có thể lưu trữ giá bằng xu thay vì đô la. Nhưng nếu chúng ta áp dụng giảm giá 30% thì sao? Trong thực tế, hiếm khi có thể trốn tránh hoàn toàn các phân số. Chỉ cần làm tròn chúng để cắt "đuôi" khi cần thiết.

````smart header="Điều buồn cười"
Hãy thử chạy cái này:

```js run
// Xin chào! Tôi là một con số tự tăng lên!
alert( 9999999999999999 ); // shows 10000000000000000
```

Điều này bị cùng một vấn đề: mất độ chính xác. Có 64 bit cho số, 52 trong số đó có thể được sử dụng để lưu trữ các chữ số, nhưng đó là không đủ. Vì vậy, các chữ số ít quan trọng nhất biến mất.

JavaScript không gây ra lỗi trong các sự kiện như vậy. Nó cố gắng hết sức để khớp số vào định dạng mong muốn, nhưng thật không may, định dạng này không đủ lớn.
````

```smart header="Hai con số 0"
Một hệ quả buồn cười khác của biểu diễn bên trong các số là sự tồn tại của hai số 0: `0` và `-0`.

Đó là bởi vì một dấu hiệu được biểu thị bằng một bit duy nhất, vì vậy nó có thể được đặt hoặc không được đặt cho bất kỳ số nào kể cả số không.

Trong hầu hết các trường hợp, sự khác biệt là không đáng chú ý, bởi vì các toán tử phù hợp để coi chúng như nhau.
```

## Các bài kiểm tra: isFinite and isNaN

Nhớ hai giá trị số đặc biệt này không?

- `Infinity` (và `-Infinity`) là một giá trị số đặc biệt lớn hơn (nhỏ hơn) bất kỳ giá trị nào.
- `NaN` biểu thị lỗi.

Chúng thuộc loại `số`, nhưng không phải là số "bình thường", vì vậy có các hàm đặc biệt để kiểm tra chúng:


- `isNaN(value)` chuyển đổi đối số của nó thành một số và sau đó kiểm tra xem nó có phải là `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Nhưng chúng ta có cần hàm này không? Chúng ta không thể sử dụng phép so sánh `=== NaN` sao? Thật không may. Giá trị `NaN` là duy nhất ở chỗ nó không bằng bất kỳ giá trị nào, kể cả chính nó:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` chuyển đổi đối số của nó thành một số và trả về `true` nếu đó là một số thông thường, không phải `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, bởi vì một giá trị đặc biệt: NaN
    alert( isFinite(Infinity) ); // false, bởi vì một giá trị đặc biệt: Infinity
    ```

Đôi khi `isFinite` được sử dụng để xác thực xem giá trị chuỗi có phải là số thông thường hay không:


```js run
let num = +prompt("Nhập một số", '');

// sẽ đúng trừ khi bạn nhập Infinity, -Infinity hoặc không phải là số
alert( isFinite(num) );
```

Hãy lưu ý rằng một chuỗi trống hoặc chỉ có khoảng trắng được coi là `0` trong tất cả các hàm số bao gồm `isFinite`.

````smart header="`Number.isNaN` và `Number.isFinite`"
[Phương thức Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) và [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) là các phiên bản "nghiêm ngặt" hơn của các hàm `isNaN` và `isFinite`. Chúng không tự động chuyển đổi đối số của chúng thành một số, nhưng thay vào đó kiểm tra xem nó có thuộc loại `number` hay không.
- `Number.isNaN(value)` trả về `true` nếu đối số thuộc loại `number` và là `NaN`. Trong mọi trường hợp khác, nó trả về `false`.
    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true
    
    // Lưu ý sự khác biệt:
    alert( Number.isNaN("str") ); // false, vì "str" thuộc kiểu chuỗi, không phải kiểu số
    alert( isNaN("str") ); // true, bởi vì isNaN chuyển đổi chuỗi "str" thành một số và nhận được NaN do chuyển đổi này
    ```
- `Number.isFinite(value)` trả về `true` nếu đối số thuộc loại `number` và không phải là `NaN/Infinity/-Infinity`. Trong mọi trường hợp khác, nó trả về `false`.
    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false
    
    // Lưu ý sự khác biệt:
    alert( Number.isFinite("123") ); // false, vì "123" thuộc kiểu chuỗi, không phải kiểu số
    alert( isFinite("123") ); // true, bởi vì isFinite chuyển chuỗi "123" thành số 123
    ```
    
Theo một cách nào đó, `Number.isNaN` và `Number.isFinite` đơn giản và dễ hiểu hơn các hàm `isNaN` và `isFinite`. Tuy nhiên, trên thực tế, `isNaN` và `isFinite` chủ yếu được sử dụng vì chúng ngắn hơn để viết.
````


```smart header="So sánh với `Object.is`"

Có một phương thức tích hợp đặc biệt `Object.is` để so sánh các giá trị như `===`, nhưng đáng tin cậy hơn cho hai trường hợp cạnh:

1. Nó hoạt động với `NaN`: `Object.is(NaN, NaN) === true`, đó là một điều tốt.
2. Các giá trị `0` và `-0` là khác nhau: `Object.is(0, -0) === false`, về mặt kỹ thuật, điều đó đúng, bởi vì bên trong số có một bit dấu có thể khác ngay cả khi tất cả các giá trị khác bit là số không.

Trong tất cả các trường hợp khác, `Object.is(a, b)` giống như `a === b`.

Chúng ta đề cập đến `Object.is` ở đây, bởi vì nó thường được sử dụng trong đặc điểm kỹ thuật của JavaScript. Khi thuật toán nội bộ cần so sánh hai giá trị có giống nhau hoàn toàn không, thuật toán đó sẽ sử dụng `Object.is` (được gọi nội bộ là [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt và parseFloat

Chuyển đổi số bằng cách sử dụng dấu cộng `+` hoặc `Number()` là nghiêm ngặt. Nếu một giá trị không chính xác là một số, nó sẽ thất bại:

```js run
alert( +"100px" ); // NaN
```

Ngoại lệ duy nhất là khoảng trắng ở đầu hoặc cuối chuỗi, vì chúng bị bỏ qua.

Nhưng trong cuộc sống thực, chúng ta thường có các giá trị theo đơn vị, như `"100px"` hoặc `"12pt"` trong CSS. Ngoài ra, ở nhiều quốc gia, ký hiệu tiền tệ đi sau số tiền, vì vậy chúng ta có `"19€"` và muốn trích xuất một giá trị số từ đó.

Đó là mục đích của `parseInt` và `parseFloat`.

Chúng "đọc" một số từ một chuỗi cho đến khi chúng không thể. Trong trường hợp có lỗi, số đã thu thập được trả về. Hàm `parseInt` trả về một số nguyên, trong khi `parseFloat` sẽ trả về một số dấu phẩy động:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, chỉ có phần nguyên được trả về
alert( parseFloat('12.3.4') ); // 12.3, điểm thứ hai dừng việc đọc
```

Có những trường hợp khi `parseInt/parseFloat` sẽ trả về `NaN`. Nó xảy ra khi không có chữ số nào có thể đọc được:

```js run
alert( parseInt('a123') ); // NaN, ký tự đầu tiên dừng quá trình
```

````smart header="Đối số thứ hai của `parseInt(str, radix)`"
Hàm `parseInt()` có tham số thứ hai tùy chọn. Nó chỉ định cơ sở của hệ thống số, vì vậy `parseInt` cũng có thể phân tích cú pháp các chuỗi số hex, số nhị phân, v.v.:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, không có 0x cũng hoạt động

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Các hàm toán học khác

JavaScript có đối tượng [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) tích hợp sẵn chứa một thư viện nhỏ chứa các hằng số và hàm toán học.

Một vài ví dụ:

`Math.random()`
: Trả về một số ngẫu nhiên từ 0 đến 1 (không bao gồm 1).

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (bất kỳ số ngẫu nhiên nào)
    ```

`Math.max(a, b, c...)` và `Math.min(a, b, c...)`
: Trả về giá trị lớn nhất và nhỏ nhất từ số lượng đối số tùy ý.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Trả về `n` được nâng lên lũy thừa đã cho.

    ```js run
    alert( Math.pow(2, 10) ); // 2 lũy thừa 10 = 1024
    ```

Có nhiều hàm và hằng số hơn trong đối tượng `Math`, bao gồm lượng giác, mà bạn có thể tìm thấy trong [tài liệu cho đối tượng Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Tóm tắt

Để viết các số có nhiều số 0:

- Nối `"e"` với các số 0 được tính vào số. Chẳng hạn như: `123e6` giống như `123` với 6 số 0 `123000000`.
- Một số âm sau `"e"` làm cho số đó bị chia cho 1 với các số 0 đã cho. Ví dụ. `123e-6` có nghĩa là `0,000123` (`123` phần triệu).

Đối với các hệ thống số khác nhau:

- Có thể viết số trực tiếp trong hệ thống hex (`0x`), bát phân (`0o`) và nhị phân (`0b`).
- `parseInt(str, base)` phân tích chuỗi `str` thành một số nguyên trong hệ thống số với `base`, `2 ≤ base ≤ 36` đã cho.
- `num.toString(base)` chuyển đổi một số thành một chuỗi trong hệ thống số với `base` đã cho.

Đối với các bài kiểm tra số thông thường:

- `isNaN(value)` chuyển đổi đối số của nó thành một số và sau đó kiểm tra xem nó có phải là `NaN` không
- `isFinite(value)` chuyển đổi đối số của nó thành một số và trả về `true` nếu đó là số thông thường, không phải `NaN/Infinity/-Infinity`

Để chuyển đổi các giá trị như `12pt` và `100px` thành một số:

- Sử dụng `parseInt/parseFloat` cho chuyển đổi "mềm", đọc một số từ một chuỗi và sau đó trả về giá trị mà chúng có thể đọc được trước khi xảy ra lỗi.

Đối với phân số:

- Làm tròn bằng cách sử dụng `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` hoặc `num.toFixed(precision)`.
- Hãy nhớ rằng có sự mất độ chính xác khi làm việc với phân số.

Các hàm toán học khác:

- Xem đối tượng [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) khi bạn cần. Thư viện rất nhỏ, nhưng có thể đáp ứng nhu cầu cơ bản.
