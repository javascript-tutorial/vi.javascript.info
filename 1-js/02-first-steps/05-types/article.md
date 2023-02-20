# Các kiểu dữ liệu

Một giá trị trong JavaScript luôn thuộc một loại nhất định. Ví dụ, một chuỗi hoặc một số.

Có tám kiểu dữ liệu cơ bản trong JavaScript. Ở đây, chúng ta sẽ trình bày tổng quát về chúng và trong các chương tiếp theo chúng ta sẽ nói chi tiết về chúng.

Chúng ta có thể đặt bất kỳ kiểu nào trong một biến. Ví dụ, một biến tại một thời điểm có thể là một chuỗi và sau đó lưu trữ một số:

```js
// no error
let message = "hello";
message = 123456;
```

Các ngôn ngữ lập trình cho phép điều đó, chẳng hạn như JavaScript, được gọi là "ngôn ngữ có kiểu động" hay "dynamically typed", có nghĩa là có tồn tại các kiểu dữ liệu, nhưng các biến không bị ràng buộc với bất kỳ kiểu nào trong số chúng.

## Kiểu số

```js
let n = 123;
n = 12.345;
```

Kiểu *số* (number) biểu diễn được cả số nguyên lẫn số thực.

Có nhiều toán tử làm việc với các số như: nhân `*`, chia `/`, cộng `+`, trừ `-`, v.v.

Ngoài các số thông thường, còn có các giá trị số đặc biệt khác là: `Infinity`, `-Infinity` và `NaN`.

- `Infinity` biểu diễn giá trị [vô cùng](https://vi.wikipedia.org/wiki/V%C3%B4_t%E1%BA%ADn) ∞ trong toán học. Nó là một giá trị đặc biệt lớn hơn bất kỳ số nào.

    Chúng ta có thể thu được giá trị này bằng cách chia một số dương cho không:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Or just reference it directly:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` biểu diễn một lỗi tính toán. Nó là kết quả của một phép tính sai hoặc không xác định, ví dụ:

    ```js run
    alert( "not a number" / 2 ); // NaN, phép chia như vậy là sai lầm
    ```

    `NaN` rất khó chịu. Bất kỳ thao tác nào khác trên `NaN` sẽ trả về` NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    Cho nên, nếu `NaN` xuất hiện trong một biểu thức toán học, nó lan truyền tới kết quả của cả biểu thức.

```smart header="Các phép tính toán học luôn an toàn"
Làm toán trong JavaScript rất "an toàn". Ta có thể làm bất cứ thứ gì: chia cho không, coi một chuỗi như một số, ...

Tập lệnh sẽ không bao giờ dừng lại. Tệ nhất, chúng ta cũng nhận được giá trị `NaN`.
```

Các giá trị số đặc biệt chính thức thuộc về kiểu "number". Tất nhiên chúng không phải là những con số theo nghĩa thông thường của từ này.

Ta sẽ học được nhiều hơn về các số ở chương <info:number>.

## BigInt

Trong JavaScript, loại "số" không thể biểu diễn cho các giá trị số nguyên lớn hơn <code>(2<sup>53</sup>-1)</code> (đó là 9007199254740991) hoặc nhỏ hơn <code>-(2<sup>53</sup>-1)</code> đối với số âm. Đó là một hạn chế kỹ thuật do sự biểu diễn nội bộ của chúng gây ra.

Đối với hầu hết các mục đích đó là đủ, nhưng đôi khi chúng ta cần những con số thực sự lớn, ví dụ cho mật mã hoặc thời điểm chính xác đến micro giây.

Kiểu `BigInt` gần đây đã được thêm vào ngôn ngữ để biểu diễn các số nguyên có độ dài tùy ý.

Một giá trị `BigInt` được tạo bằng cách thêm `n` vào cuối một số nguyên:

```js
// "n" ở cuối nghĩa là nó là một BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Vì các số `BigInt` hiếm khi cần thiết, chúng tôi không trình bày chúng ở đây mà dành cho chúng một chương riêng <info: bigint>. Hãy đọc nó khi bạn cần những con số lớn như vậy.

```smart header="Vấn đề tương thích"
Hiện tại, `BigInt` được hỗ trợ trong Firefox / Chrome / Edge / Safari, nhưng không hỗ trợ trong IE.
```

Bạn có thể kiểm tra [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) để biết phiên bản trình duyệt nào có hỗ trợ.

## Kiểu chuỗi

Một chuỗi trong JavaScript bắt buộc phải nằm giữa các dấu nháy.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;
```

Trong JavaScript, có 3 kiểu dấu nháy:

1. Dấu nháy kép: `"Hello"`.
2. Dấu nháy đơn: `'Hello'`.
3. Backticks: <code>&#96;Hello&#96;</code>.

Dấu nháy kép và dấu nháy đơn là những dấu nháy "đơn giản". Thực tế không có sự khác biệt giữa chúng trong JavaScript.

Backtick là các dấu nháy với tính năng mở rộng. Nó cho phép ta nhúng biến và biểu thức vào chuỗi bằng cách đặt chúng trong `${…}`, ví dụ:

```js run
let name = "John";

// nhúng một biến
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// nhúng một biểu thức
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

Biểu thức trong `${…}` được chạy và kết quả của nó trở thành một phần của chuỗi. Chúng ta có thể đặt bất cứ gì vào đó: một biến như `name` hay một biểu thức số học như `1 + 2` hoặc biểu thức phức tạp hơn.

Chú ý rằng chỉ backtick cho phép tính năng này. Dấu nháy đơn và nháy kép không hỗ trợ!
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (nháy kép không làm gì cả)
```

Chúng ta sẽ tìm hiểu về chuỗi kỹ hơn ở chương <info:string>.

```smart header="Không có kiểu *ký tự*."
Trong một số ngôn ngữ, có một kiểu "ký tự" đặc biệt cho một ký tự đơn lẻ. Ví dụ, trong ngôn ngữ C và trong Java, nó được gọi là "char".

Trong JavaScript, không có kiểu như vậy. Chỉ có một kiểu: `string` (chuỗi). Một chuỗi có thể bao gồm 0 ký tự (rỗng), một ký tự hoặc nhiều ký tự.
```

## Boolean (kiểu lôgic)

Kiểu lôgic chỉ có hai giá trị: `true` và `false`.

Kiểu này thường dùng để lưu các giá có/không: `true` nghĩa là "có, đúng", và `false` nghĩa là "không, sai".

Ví dụ:

```js
let nameFieldChecked = true; // có, trường name đã được kiểm tra
let ageFieldChecked = false; // không, trường age chưa được kiểm tra
```

Giá trị lôgic cũng là kết quả của các phép so sánh:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (kết quả so sánh là "đúng")
```

Chúng ta sẽ tìm hiểu sâu hơn về kiểu này trong chương <info:logical-operators>.

## Giá trị "null"

Giá trị đặc biệt `null` không thuộc về bất cứ kiểu nào đã nói ở trên.

Mình nó tạo nên một kiểu riêng, kiểu này chỉ có duy nhất giá trị `null`:

```js
let age = null;
```

Trong JavaScript, `null` không phải là "tham chiếu tới đối tượng không tồn tại" hoặc một "con trỏ null" như vài ngôn ngữ khác.

Nó chỉ là một giá trị đặc biệt biểu diễn sự "trống rỗng" hoặc "không có gì" hoặc một "giá trị không biết".

Đoạn mã trên cho biết rằng `age` không xác định.

## Giá trị "undefined"

Giá trị đặc biệt `undefined` cũng đứng một mình. Nó tạo ra một kiểu riêng, giống như `null`.

Ý nghĩa của `undefined` là "chưa được gán giá trị".

Nếu một biến đã được khai báo, nhưng chưa được gán, giá trị của nó là `undefined`:

```js run
let age;

alert(age); // hiện "undefined"
```

Về mặt kỹ thuật, có thể gán `undefined` cho một biến một cách tường minh:

```js run
let age = 100;

// đổi giá trị thành undefined
age = undefined;

alert(age); // "undefined"
```

...Nhưng chúng ta không nên làm điều đó. Thông thường, người ta sử dụng `null` để gán giá trị "trống" hoặc "không xác định" cho một biến, trong khi `undefined` được dành riêng làm giá trị khởi tạo mặc định cho những thứ chưa được gán.

## Objects and Symbols

Kiểu `object` hay đối tượng là một kiểu đặc biệt.

Tất cả các kiểu khác được gọi là "primitive" (nguyên thủy) vì giá trị của chúng chỉ có thể chứa một thứ duy nhất (có thể là một chuỗi hoặc một số hoặc bất cứ thứ gì). Ngược lại, các đối tượng được sử dụng để lưu trữ các tập hợp dữ liệu và các thực thể phức tạp hơn.

Vì quan trọng như vậy, các đối tượng xứng đáng được đối xử đặc biệt. Chúng ta sẽ bàn về chúng sau trong chương <info:object>, sau khi chúng ta tìm hiểu thêm về các giá trị nguyên thủy.

Kiểu `symbol` (biểu tượng) được sử dụng để tạo các định danh duy nhất cho các đối tượng. Chúng ta buộc phải đề cập đến nó ở đây chỉ để khỏi thiếu sót, nhưng cũng trì hoãn các chi tiết cho đến khi chúng ta biết về các đối tượng.

## Toán tử typeof [#type-typeof]

Toán tử `typeof` trả về kiểu của đối số. Nó hữu dụng khi chúng ta muốn kiểm tra kiểu dữ liệu của một giá trị để thực hiện các công việc khác nhau dựa trên kết quả.

Nó hỗ trợ hai cú pháp:

1. Như một toán tử: `typeof x`.
2. Như một hàm: `typeof(x)`.

Nói cách khác, nó làm việc với cả dạng có dấu ngoặc đơn hoặc không có dấu ngoặc đơn. Kết quả hoàn toàn giống nhau.

Gọi `typeof x` trả về một chuỗi mô tả tên của kiểu dữ liệu:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Ba dòng cuối cần phải giải thích thêm:

1. `Math` là một đối tượng có sẵn cung cấp các phép tính toán học. Chúng ta sẽ tìm hiểu nó trong chương <info:number>. Ở đây, nó chỉ đóng vai trò như một ví dụ về một đối tượng.
2. Kết quả của `typeof null` là `"object"`. Đó là một lỗi được chính thức công nhận trong hành vi của `typeof`, xuất hiện từ những ngày đầu của JavaScript và được giữ lại để tương thích. Chắc chắn, `null` không phải là một đối tượng. Nó là một giá trị đặc biệt với một kiểu riêng biệt của nó.
3. Kết quả của `typeof alert` là `"function"`, vì `alert` là một hàm. Chúng ta sẽ nghiên cứu các hàm trong các chương tiếp theo, chúng ta cũng sẽ thấy rằng không có kiểu "function" đặc biệt nào trong JavaScript. Các hàm thuộc về kiểu đối tượng. Nhưng `typeof` xử lý chúng theo cách khác, trả về `"function"`. Điều đó cũng đến từ những ngày đầu của JavaScript. Về mặt kỹ thuật, hành vi như vậy không đúng, nhưng có thể thuận tiện trong thực tế.

## Tóm tắt

Có 8 kiểu dữ liệu cơ bản trong JavaScript.

- `number` dành cho các số thuộc bất kỳ loại nào: số nguyên hoặc dấu phẩy động, số nguyên được giới hạn bởi <code>±(2<sup>53</sup>-1)</code>.
- `bigint` dành cho các số nguyên có độ dài tùy ý.
- `string` dành cho các chuỗi. Một chuỗi có thể có không hoặc nhiều ký tự, không có kiểu ký tự đơn riêng biệt.
- `boolean` dành cho các giá trị `true`/`false`.
- `null` dành cho các giá trị không xác định -- một kiểu độc lập có một giá trị duy nhất `null`.
- `undefined` dành cho các giá trị chưa được gán -- một kiểu độc lập có một giá trị duy nhất `undefined`.
- `object` dành cho các cấu trúc dữ liệu phức tạp hơn.
- `symbol` dành cho các định danh duy nhất.

Toán tử `typeof` cho phép chúng ta xem kiểu nào được lưu trữ trong một biến.

- Hai dạng: `typeof x` hoặc `typeof(x)`.
- Trả về một chuỗi với tên của kiểu dữ liêu, ví dụ `"string"`.
- Với `null` nó trả về `"object"` -- đây là một lỗi còn tồn tại trong ngôn ngữ, nó không thực sự là một đối tượng.

Trong các chương tiếp theo, chúng ta sẽ tập trung vào các giá trị nguyên thủy và khi chúng ta đã quen thuộc với chúng, chúng ta sẽ chuyển sang các đối tượng.
