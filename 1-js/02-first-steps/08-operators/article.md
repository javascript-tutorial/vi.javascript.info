
# Các toán tử

Chúng ta đã biết rất nhiều toán tử trường học. Chúng là những thứ như cộng `+`, nhân `*`, trừ `-`, và các toán tử khác.

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
- Một toán tử là *binary* nếu nó có hai toán hạng. Trừ cũng tồn tại tương tự ở dạng đơn nguyên:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binary minus subtracts values
    ```

    Về hình thức, trong các ví dụ trên, chúng ta có hai toán tử khác nhau có chung ký hiệu: toán tử phủ định, toán tử một ngôi đảo ngược dấu và toán tử trừ, toán tử nhị phân trừ một số khỏi một số khác.

## Toán học

Các hoạt động toán học sau đây được hỗ trợ:

- Cộng `+`,
- Trừ `-`,
- Nhân `*`,
- Chia `/`,
- Chia lấy dư `%`,
- Lũy thừa `**`.

Bốn cái đầu tiên rất đơn giản, trong khi `%` và `**` cần một vài giải thích về chúng.

### Chia lấy dư %

Toán tử chia lấy dư `%`, mặc dù xuất hiện nhưng không liên quan đến phần trăm.

Kết quả của `a % b` là [phần dư](https://en.wikipedia.org/wiki/Remainder) của phép chia số nguyên của `a` cho `b`.

Ví dụ:

```js run
alert( 5 % 2 ); // 1, phần dư của 5 chia 2
alert( 8 % 3 ); // 2, phần dư của 8 chia 3
```

### Exponentiation **

The exponentiation operator `a ** b` raises `a` to the power of `b`.

In school maths, we write that as a<sup>b</sup>.

For instance:

```js run
alert( 2 ** 2 ); // 2² = 4  
alert( 2 ** 3 ); // 2³ = 8 
alert( 2 ** 4 ); // 2⁴ = 16
```

Just like in maths, the exponentiation operator is defined for non-integer numbers as well. 

For example, a square root is an exponentiation by ½:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet features of JavaScript operators that are beyond school arithmetics.

Usually, the plus operator `+` sums numbers.

But, if the binary `+` is applied to strings, it merges (concatenates) them:

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

Đây là một ví dụ phức tạp hơn:

```js run
alert(2 + 2 + '1' ); // "41" chứ không phải "221"
```

Nối chuỗi và chuyển đổi chuỗi là một tính năng đặc biệt của cộng nhị phân `+`. Các toán tử số học khác chỉ làm việc với các số và luôn chuyển đổi toán hạng của chúng thành các số.

Ví dụ, phép trừ và phép chia:

```js run
alert(2 + 2 + '1' ); // "41" and not "221"
```

Tại đây, các toán tử lần lượt làm việc. `+` đầu tiên tính tổng hai số, do đó, nó trả về `4`, sau đó `+` tiếp theo thêm chuỗi `1` vào nó, do đó, nó giống như `4 + '1' = '41'`.

```js run
alert('1' + 2 + 2); // "122" không phải "14"
```

Ở đây, toán hạng đầu tiên là một chuỗi, trình biên dịch cũng coi hai toán hạng còn lại là các chuỗi. `2` được nối với `'1'`, vì vậy nó giống như `'1' + 2 = "12"` và `"12" + 2 = "122"`.

Nhị phân `+` là toán tử duy nhất hỗ trợ các chuỗi theo cách như vậy. Các toán tử số học khác chỉ làm việc với các số và luôn chuyển đổi toán hạng của chúng thành số.

Đây là bản demo cho phép trừ và phép chia:

```js run
alert( 6 - '2' ); // 4, chuyển '2' thành một số
alert( '6' / '2' ); // 3, chuyển đổi cả hai toán hạng thành số
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

Từ quan điểm của một nhà toán học, sự phong phú của các phép cộng có vẻ lạ. Nhưng theo quan điểm của một lập trình viên, không có gì đặc biệt: các phép cộng đơn được áp dụng trước tiên, họ chuyển đổi chuỗi thành số và sau đó phép cộng nhị phân cộng chúng lại.

Tại sao các phép cộng đơn nguyên được áp dụng cho các giá trị trước các giá trị nhị phân? Như chúng ta thấy, đó là vì *sự ưu tiên cao hơn* của nó.

## Toán tử ưu tiên

Nếu một biểu thức có nhiều hơn một toán tử, thì thứ tự thực thi được xác định theo *độ ưu tiên* của chúng, hay nói cách khác, thứ tự ưu tiên mặc định của các toán tử.

Từ trường học, tất cả chúng ta đều biết rằng phép nhân trong biểu thức `1 + 2 * 2` nên được tính trước khi cộng. Đó chính xác là độ ưu tiên. Phép nhân được cho là có *độ ưu tiên cao hơn* phép cộng.

Dấu ngoặc đơn ghi đè bất kỳ quyền ưu tiên nào, vì vậy nếu chúng ta không hài lòng với thứ tự mặc định, chúng ta có thể sử dụng chúng để thay đổi. Ví dụ, viết `(1 + 2) * 2`.

Có nhiều toán tử trong JavaScript. Mỗi toán tử có một số ưu tiên tương ứng. Cái có số lượng lớn hơn được thực hiện đầu tiên. Nếu quyền ưu tiên là như nhau, thứ tự thực hiện là từ trái sang phải.

Đây là đoạn trích từ [bảng độ ưu tiên](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (bạn không cần phải nhớ nó, nhưng nhớ rằng các toán tử đơn nguyên có độ ưu tiên cao hơn các toán tử nhị phân):

| Độ ưu tiên | Tên | Kí hiệu |
|------------|-----|---------|
| ... | ... | ... |
| 17 | cộng đơn nguyên | `+` |
| 17 | trừ đơn nguyên | `-` |
| 16 | lũy thừa | `**` |
| 15 | nhân | `*` |
| 15 | chia | `/` |
| 13 | cộng | `+` |
| 13 | trừ | `-` |
| ... | ... | ... |
| 3 | gán | `=` |
| ... | ... | ... |

Như chúng ta thấy, phép "cộng đơn nguyên" có độ ưu tiên là `17` cao hơn `13` của phép "cộng" (cộng nhị phân). Đó là lý do, trong biểu thức `"+apples + +oranges"`, cộng đơn nguyên chạy trước cộng nhị phân.

## Phép gán

Hãy lưu ý rằng một phép gán `=` cũng là một toán tử. Nó được liệt kê trong bảng ưu tiên với mức ưu tiên rất thấp là `3`.

Đó là lý do tại sao, khi chúng ta gán một biến, như `x = 2 * 2 + 1`, các phép tính được thực hiện trước và sau đó dấu ` = `được chạy, lưu trữ kết quả trong` x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Phép gán = trả về một giá trị

Việc `=` là một toán tử, không phải là một cấu trúc ngôn ngữ "ma thuật" có một hàm ý thú vị.

Một toán tử trong JavaScript trả về một giá trị. Điều đó rõ ràng đúng với phép cộng `+` hoặc phép trừ `-`, nhưng cũng đúng với `=`.

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

Lập trình thật hài hước, phải không? Chúng ta nên hiểu cách thức hoạt động của nó, bởi vì đôi khi chúng ta thấy nó trong các thư viện JavaScript.

Tuy nhiên, đừng nên viết code như thế. Viết như vậy chắc chắn không làm cho code rõ ràng hay dễ đọc hơn.

## Phép gán chuỗi

Một tính năng thú vị khác là khả năng gán chuỗi:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Gán chuỗi đánh giá từ phải sang trái. Đầu tiên, biểu thức ngoài cùng bên phải `2 + 2` được tính rồi gán cho các biến ở bên trái: `c`, `b` và `a`. Cuối cùng, tất cả các biến chia sẻ một giá trị duy nhất.

Một lần nữa, với mục tiêu dễ đọc dễ hiểu, ta nên chia code thành nhiều dòng:

```js
c = 2 + 2;
b = c;
a = c;
```

Nó khiến code dễ đọc, đặc biệt khi quan sát nhanh code.

## Sửa-trực-tiếp

Chúng ta thường thực hiện phép tính trên một biến và lưu kết quả và chính nó.

Ví dụ:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Điều này có thể làm ngắn hơn bằng cách dùng `+=` và `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Phép tính ngắn "sửa-và-gán" tồn tại cho tất cả các toán tử số học và bitwise: `/=`, `-=`, vv.

Các toán tử như vậy có cùng mức độ ưu tiên như một phép gán thông thường, vì vậy chúng chạy sau hầu hết các phép tính khác:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (phần bên phải thực hiện trước, giống như n *= 8)
```

## Tăng/giảm

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Tăng hoặc giảm một số là một trong những hoạt động số phổ biến nhất.

Vì vậy, có các toán tử đặc biệt cho nó:

- **Phép tăng** `++` làm tăng giá trị của biến lên 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // hoạt động giống như counter = counter + 1, nhưng ngắn hơn
    alert( counter ); // 3
    ```
- **Phép giảm** `--` giảm giá trị của biến đi 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // hoạt động giống như counter = counter - 1, nhưng ngắn hơn
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

Trong dòng `(*)`, dạng *tiền tố* `++counter` tăng `counter` và trả về giá trị mới là `2`. Vì vậy, hàm `alert` sẽ hiển thị `2`.

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
    
- Nếu chúng tâ muốn tăng một giá trị nhưng sử dụng giá trị trước đó của nó, thì chúng ta cần dạng hậu tố:

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

Mặc dù không sai về mặt kỹ thuật, ký hiệu như vậy thường làm cho code khó đọc hơn. Làm nhiều việc trên cùng một dòng - không tốt.

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

Các toán tử này rất hiếm khi được sử dụng, khi chúng ta cần xử lý các số ở mức rất thấp (bitwise). Chúng ta sẽ không cần đến những toán tử này trong thời gian tới, vì việc phát triển web ít sử dụng chúng, nhưng trong một số lĩnh vực đặc biệt, chẳng hạn như mật mã, chúng rất hữu ích. Bạn có thể đọc chương [Toán tử Bitwise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) trên MDN khi có nhu cầu.

## Dấu phẩy

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:

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

Các thủ thuật như vậy được sử dụng trong nhiều JavaScript frameworks. Đó là lý do tại sao chúng ta đề cập đến chúng. Nhưng thường thì nó không cải thiện khả năng dễ đọc của code vì vậy chúng ta nên suy nghĩ kỹ trước khi sử dụng chúng.
