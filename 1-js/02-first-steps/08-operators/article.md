# Các toán tử

Chúng ta đã biết rất nhiều toán tử từ học đường. Chúng là những thứ như cộng `+`, nhân `*`, trừ `-`, và các toán tử khác.

Trong chương này, chúng ta sẽ tập trung vào các khía cạnh của các toán tử không được bao gồm trong môn số học của học đường.

## Số hạng: "đơn nguyên", "nhị phân", "toán hạng"

Trước khi tiếp tục, hãy nắm bắt một số thuật ngữ phổ biến.

- *Toán hạng* -- áp dụng cho các toán tử. Chẳng hạn, trọng phép nhân của `5 * 2` có hai toán hạng: toán hạng bên trái là `5` và toán hạng bên phải là `2`. Đôi khi, mọi người gọi là những "đối số" thay vì "toán hạng".
- Một toán hạng là *đơn nguyên* nếu nó có một toán hạng đơn. Ví dụ: phủ định đơn nguyên `-` đảo ngược dấu của một số:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, phủ định đơn nguyên được áp dụng
    ```
- Một toán tử là *nhị phân* nếu nó có hai toán hạng. Dấu trừ tương tự cũng tồn tại ở dạng nhị phân:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, trừ nhị phân trừ đi các giá trị
    ```

    Chính thức, chúng ta đang nói về hai toán tử khác nhau ở đây: phủ định đơn nguyên (toán hạng đơn: đảo ngược dấu) và phép trừ nhị phân (hai toán hạng: phép trừ).

## Nối chuỗi, nhị phân +

Bây giờ, chúng ta hãy xem các tính năng đặc biệt của các toán tử JavaScript nằm ngoài phạm vi của học đường.

Thông thường, toán tử cộng `+` dùng để cộng hai số.

Nhưng, nếu trong nhị phân `+` được dùng cho chuỗi, nó nối (tiếp) chúng:

```js
let s = "my" + "string";
alert(s); // mystring
```

Nhớ rằng nếu một toán tử là chuỗi, toán tử còn lại cũng sẽ được chuyển đổi thành một chuỗi.

Ví dụ:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Thấy không, nó không quan trọng toán tử đầu tiên hay thứ hai là chuỗi. Luật ở đây rất đơn giản: nếu một trong hai toán tử là chuỗi, toán tử còn lại cũng sẽ được chuyển thành chuỗi.

Tuy nhiên, nhớ rằng các toán tử được đọc từ trái sang phải. Nếu có hai số được theo sau bởi một chuỗi, các số đó sẽ được cộng trước khi được chuyển đổi thành một chuỗi:


```js run
alert(2 + 2 + '1' ); // "41" chứ không phải "221"
```

Nối chuỗi và chuyển đổi chuỗi là một tính năng đặc biệt của cộng nhị phân `+`. Các toán tử số học khác chỉ làm việc với các số và luôn chuyển đổi toán hạng của chúng thành các số.

Ví dụ, phép trừ và phép chia:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Chuyển đổi số, đơn nguyên +

Dấu cộng `+` tồn tại ở hai dạng: dạng nhị phân chúng ta đã dùng ở trên và dạng đơn nguyên.

Cộng đơn nguyên, hay nói cách khác, toán tử cộng `+` áp dụng cho giá trị đơn, không đụng gì đến các số. Nhưng nếu toán hạng không phải là một số, thì dấu cộng đơn nguyên sẽ chuyển nó thành một số.

Ví dụ:

```js run
// Không đụng đến số
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Chuyển đổi những thứ không phải số
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Nó làm điều tương tự như là `Number(...)`, nhưng ngắn hơn.

Nhu cầu chuyển đổi chuỗi thành số phát sinh rất thường xuyên. Ví dụ: nếu chúng ta đang nhận các giá trị từ các trường nhập liệu HTML, thì chúng thường là các chuỗi. Nếu chúng ta muốn cộng chúng thì sao?

Cộng nhị phân sẽ cộng chúng như là các chuỗi:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", cộng nhị nhân nối chuỗi
```

Nếu ta muốn xem chúng như là các số, ta cần biến đổi chúng và sau đó cộng:

```js run
let apples = "2";
let oranges = "3";

*!*
// cả hai giá trị được chuyển đổi sang số trước khi cộng nhị phân
alert( +apples + +oranges ); // 5
*/!*

// biến thể dài hơn
// alert( Number(apples) + Number(oranges) ); // 5
```

Từ quan điểm của một nhà toán học, sự phong phú của các phép cộng có vẻ lạ. Nhưng theo quan điểm của một lập trình viên, không có gì đặc biệt: các phép cộng đơn được áp dụng trước tiên, họ chuyển đổi chuỗi thành số và sau đó phép cộng nhị phân cộng  chúng lại.

Tại sao các phép cộng đơn nguyên được áp dụng cho các giá trị trước các giá trị nhị phân? Như chúng ta thấy, đó là vì *sự ưu tiên cao hơn* của nó.

## Toán tử ưu tiên

Nếu một biểu thức có nhiều toán tử, thứ tự thực hiện được xác định bởi *độ ưu tiên* của chúng, hay nói cách khác, thứ tự ưu tiên mặc định của các toán tử.

Từ trường học, tất cả chúng ta đều biết rằng phép nhân trong biểu thức `1 + 2 * 2` nên được tính trước khi cộng. Đó chính xác là độ ưu tiên. Phép nhân được cho là có *độ ưu tiên cao hơn* phép cộng.

Dấu ngoặc đơn ghi đè bất kỳ quyền ưu tiên nào, vì vậy nếu chúng ta không hài lòng với thứ tự mặc định, chúng ta có thể sử dụng chúng để thay đổi. Ví dụ, viết `(1 + 2) * 2`.

Có nhiều toán tử trong JavaScript. Mỗi toán tử có một số ưu tiên tương ứng. Cái có số lượng lớn hơn được thực hiện đầu tiên. Nếu quyền ưu tiên là như nhau, thứ tự thực hiện là từ trái sang phải.

Đây là đoạn trích từ [bảng độ ưu tiên](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (bạn không cần phải nhớ nó, nhưng nhớ rằng các toán tử đơn nguyên có độ ưu tiên cao hơn các toán tử nhị phân):

| Độ ưu tiên | Tên | Kí hiệu |
|------------|------|------|
| ... | ... | ... |
| 16 | cộng đơn nguyên | `+` |
| 16 | trừ đơn nguyên | `-` |
| 14 | nhân | `*` |
| 14 | chia | `/` |
| 13 | cộng | `+` |
| 13 | trừ | `-` |
| ... | ... | ... |
| 3 | gán | `=` |
| ... | ... | ... |

Như chúng ta thấy, phép "cộng đơn nguyên" có độ ưu tiên là `16` cao hơn `13` của phép "cộng" (cộng nhị phân). Đó là lý do, trong biểu thức `"+apples + +oranges"`, cộng đơn nguyên chạy trước cộng nhị phân.

## Phép gán

Hãy lưu ý rằng một phép gán `=` cũng là một toán tử. Nó được liệt kê trong bảng ưu tiên với mức ưu tiên rất thấp là `3`.

Đó là lý do tại sao, khi chúng ta gán một biến, như `x = 2 * 2 + 1`, các phép tính được thực hiện trước và sau đó dấu ` = `được chạy, lưu trữ kết quả trong` x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

Có thể xâu chuỗi các phép gán:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Chuỗi các phép gán được xác định từ phải sang trái. Đầu tiên, biểu thức ngoài cùng bên phải `2 + 2` được ước tính và sau đó được gán cho các biến ở bên trái:` c`, `b` và` a`. Cuối cùng, tất cả các biến chia sẻ một giá trị duy nhất.

````smart header="Toán tử phép gán `\"=\"` trả về một giá trị"
Một toán tử luôn luôn trả về một giá trị. Điều đó rõ ràng đối với hầu hết trong số chúng như phép cộng `+` hoặc phép nhân `*`. Nhưng toán tử gán cũng tuân theo quy tắc này.

Gọi `x = value` nghĩa là gán `value` vào `x` *và sau đó trả về nó*.

Đây là demo sử dụng một phép gán như một phần của biểu thức phức tạp hơn:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

Trong ví dụ trên, kết quả của biểu thức `(a = b + 1)` được gán cho `a` (đó là `3`). Sau đó nó được sử dụng tiếp để tính toán.

Lập trình thật hài hước, phải không? Chúng ta nên hiểu cách thức hoạt động của nó, bởi vì đôi khi chúng ta thấy nó trong các thư viện JavaScript, nhưng đừng nên tự viết bất cứ thứ gì như thế. Viết như vậy chắc chắn không làm cho code rõ ràng hơn hay dễ đọc hơn.

## Phần dư %

Toán tử phần dư `%`, mặt dù sự xuất hiện của nó, không liên quan đến phần trăm.

Kết quả của `a % b` là phần dư phép chia số nguyên của `a` cho `b`.

Ví dụ:

```js run
alert( 5 % 2 ); // 1 là phần dư của 5 chia cho 2
alert( 8 % 3 ); // 2 là phần dư của 8 chia cho 3
alert( 6 % 3 ); // 0 là phần dư của 6 chia cho 3
```

## Lũy thừa **

Toán tử lũy thừa `**` là phần mới được thêm vào ngôn ngữ gần đây.

Cho một số tự nhiên `b`, kết quả của `a ** b` là `a` nhân với chính nó `b` lần.

Ví dụ:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

Toán tử này cũng hoạt động với số không phải số nguyên.

Ví dụ:

```js run
alert( 4 ** (1/2) ); // 2 (lũy thừa của 1/2 giống như căn bậc hai, đó là toán học)
alert( 8 ** (1/3) ); // 2 (lũy thừa 1/3 giống như căn bậc ba)
```

## Phép tăng/phép giảm

<!-- Can't use -- in title, because built-in parse turns it into – -->

Tăng hoặc giảm một số là một trong những thao tác số phổ biến nhất.

Vì vậy, có các toán tử đặc biệt cho nó:

- **Phép tăng** `++` tăng giá trị của biến thêm 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // hoạt động như counter = counter + 1, nhưng ngắn hơn
    alert( counter ); // 3
    ```
- **Phép giảm** `--` giảm giá trị của biến đi 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // hoạt động như counter = counter - 1, nhưng ngắn hơn
    alert( counter ); // 1
    ```

```warn
Phép tăng/phép giảm chỉ có thể được áp dụng cho các biến. Nếu sử dụng nó trên một giá trị như `5++` sẽ báo lỗi.
```

Toán tử `++` và `--` có thể được đặt trước hoặc sau một biến.

- Khi toán tử đi sau biến, nó ở "dạng hậu tố": `counter++`.
- "Dạng tiền tố" là khi toán tử đi trước biến: `++counter`.

Cả hai câu lệnh này đều làm cùng một điều: tăng `counter` lên `1`.

Có gì khác biệt không? Có, nhưng chúng ta chỉ thấy chúng nếu ta sử dụng giá trị trả về của `++/--`.

Hãy làm rõ. Như chúng ta biết, tất cả các toán tử đều trả về một giá trị. Phép tăng/phép giảm cũng không ngoại lệ. Dạng tiền tố trả về giá trị mới trong khi dạng hậu tố trả về giá trị cũ (trước khi tăng/giảm).

Để thấy sự khác biệt, xem ví dụ sau:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

Trong dòng `(*)`, dạng *tiền tố* `++counter` tăng `counter` và trả về giá trị mới, `2`. Vì vậy, hàm `alert` sẽ hiển thị `2`.

Giờ, hãy sử dụng dạng hậu tố:

```js run
let counter = 1;
let a = counter++; // (*) thay đổi ++counter sang counter++

alert(a); // *!*1*/!*
```

Trong dòng `(*)`, dạng *hậu tố* `counter++` cũng tăng `counter` nhưng trả về giá trị *cũ* (trước khi tăng). Do đó, hàm `alert` sẽ hiển thị `1`.

Tóm tắt:

- Nếu kết quả tăng/giảm không được sử dụng, sẽ không có sự khác biệt trong các dạng được sử dụng:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, những dòng phía trên đều giống nhau
    ```
- Nếu chúng ta muốn tăng giá trị *và* ngay lập tức sử dụng kết quả của toán tử, chúng ta cần dạng tiền tố:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Nếu chúng ta muốn tăng giá trị * và * muốn sử dụng kết quả trước của nó, chúng ta cần dạng hậu tố:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Tăng/giảm giữa các toán tử khác"
Toán tử `++/--` cũng có thể được sử dụng trong các biểu thức. Ưu tiên của nó cao hơn hầu hết các toán tử số học khác.

Ví dụ:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

So sánh với:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, vì counter++ trả về giá trị "cũ"
```

Mặc dù không sai về mặt kỹ thuật, ký hiệu như vậy thường làm cho code khó đọc hơn. Làm nhiều việc trên một dòng - không tốt.

Trong lúc đọc code, lướt mắt theo chiều "dọc" nhanh có thể khiến ta bỏ lỡ thứ gì đó như `counter++` và không biết rằng biến đã được tăng lên.

Chúng tôi khuyến khích kiểu "mỗi dòng - một hành động":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Toán tử Bitwise

Toán tử bitwise coi các đối số là số nguyên 32 bit và hoạt động ở mức độ biểu diễn nhị phân của chúng.

Các toán tử này không dành riêng cho JavaScript. Chúng được hỗ trợ trong hầu hết các ngôn ngữ lập trình.

Danh sách các toán tử:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Các toán tử này rất hiếm khi được sử dụng. Để hiểu chúng, chúng ta cần đi sâu vào biểu diễn số cấp thấp và không nên làm điều đó ngay bây giờ, đặc biệt vì chúng ta sẽ không cần chúng sớm. Nếu bạn tò mò, bạn có thể đọc [Toán tử Bitwise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) bài viết trên MDN. Sẽ thực tế hơn khi làm điều đó khi có nhu cầu thực sự.

## Sửa đổi tại chỗ

Chúng ta thường cần áp dụng một toán tử cho một biến và lưu trữ kết quả mới trong cùng một biến đó.

Ví dụ:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Ký hiệu này có thể được rút ngắn bằng cách sử dụng các toán tử `+=` và `*=`:

```js run
let n = 2;
n += 5; // bây giờ n = 7 (giống như n = n + 5)
n *= 2; // bây giờ n = 14 (giống như n = n * 2)

alert( n ); // 14
```

Toán tử "sửa và gán" tồn tại cho tất cả các toán tử số học và bitwise: `/=`, `-=`, vâng vâng.

Các toán tử như vậy có cùng mức ưu tiên như một phép gán thông thường, vì vậy chúng chạy sau hầu hết các phép tính khác:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (phần bên phải được chạy đầu tiên, giống như n *= 8)
```

## Dấu phẩy

Toán tử dấu phẩy `,` là một trong những toán tử hiếm nhất và bất thường nhất. Đôi khi, nó được sử dụng để viết code ngắn hơn, vì vậy chúng ta cần biết nó để hiểu những gì đang xảy ra.

Toán tử dấu phẩy cho phép chúng ta chạy một số biểu thức, chia chúng bằng dấu phẩy `,`. Mỗi phần trong số chúng được chạy nhưng chỉ có kết quả của phần cuối cùng được trả về.

Ví dụ:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (kết quả của 3 + 4)
```

Đây, biểu thức đầu tiên `1 + 2` được chạy và kết quả của nó bị ném đi. Sau đó, `3 + 4` được chạy và trả về một kết quả.

```smart header="Dấu phẩy có độ ưu tiên rất thấp"
Xin lưu ý rằng toán tử dấu phẩy có độ ưu tiên rất thấp, thấp hơn `=`, vì vậy dấu ngoặc đơn rất quan trọng trong ví dụ trên.

Nếu không có chúng: `a = 1 + 2, 3 + 4` chạy `+` trước, tổng hợp các số thành `a = 3, 7`, sau đó phép gán `=` gán `a = 3`, và phần còn lại bị bỏ qua. Nó giống như `(a = 1 + 2), 3 + 4`.
```

Tại sao chúng ta cần một toán tử loại bỏ mọi thứ trừ biểu thức cuối cùng?

Đôi khi, mọi người sử dụng nó trong các cấu trúc phức tạp hơn để đặt một số hành động trên một dòng.

Ví dụ:

```js
// ba toán tử trên một dòng
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Các thủ thuật như vậy được sử dụng trong nhiều JavaScript frameworks. Đó là lý do tại sao chúng tôi đề cập đến chúng. Nhưng thường thì nó không cải thiện khả năng dễ đọc của code vì vậy chúng ta nên suy nghĩ kỹ trước khi sử dụng chúng.
