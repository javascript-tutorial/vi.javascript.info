# Chuỗi

Trong JavaScript, dữ liệu văn bản được lưu trữ dưới dạng chuỗi. Không có loại riêng cho một ký tự.

Định dạng bên trong của chuỗi luôn là [UTF-16](https://en.wikipedia.org/wiki/UTF-16), định dạng này không bị ràng buộc với mã hóa trang.

## Dấu ngoặc kép

Hãy nhớ lại các loại dấu ngoặc kép.

Các chuỗi có thể được đặt trong dấu ngoặc đơn, dấu ngoặc kép hoặc dấu backticks:

```js
let single = 'dấu ngoặc đơn';
let double = "dấu ngoặc kép";

let backticks = `dấu backticks`;
```

Dấu ngoặc đơn và dấu ngoặc kép về cơ bản là giống nhau. Tuy nhiên, Backticks cho phép chúng ta nhúng bất kỳ biểu thức nào vào chuỗi, bằng cách gói nó trong `${…}`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Một ưu điểm khác của việc sử dụng backticks là chúng cho phép một chuỗi trải dài trên nhiều dòng:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // một danh sách khách, nhiều dòng
```

Trông tự nhiên nhỉ? Nhưng dấu ngoặc đơn hoặc dấu ngoặc kép không hoạt động theo cách này.

Nếu chúng ta sử dụng chúng và cố gắng sử dụng nhiều dòng, sẽ có lỗi:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

Dấu ngoặc đơn và dấu ngoặc kép xuất hiện từ thời cổ đại khi tạo ngôn ngữ, khi nhu cầu về chuỗi nhiều dòng không được tính đến. Backticks xuất hiện muộn hơn nhiều và do đó linh hoạt hơn.

Backticks cũng cho phép chúng ta chỉ định một "hàm mẫu" trước backtick đầu tiên. Cú pháp là: <code>func&#96;string&#96;</code>. Hàm `func` được gọi tự động, nhận chuỗi và các biểu thức được nhúng và có thể xử lý chúng. Tính năng này được gọi là "mẫu được gắn thẻ", nó hiếm khi được nhìn thấy, nhưng bạn có thể đọc về nó trong MDN: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Ký tự đặc biệt

Vẫn có thể tạo chuỗi nhiều dòng với dấu nháy đơn và kép bằng cách sử dụng cái gọi là "ký tự dòng mới", được viết là `\n`, biểu thị ngắt dòng:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // một danh sách khách nhiều dòng, giống như trên
```

Như một ví dụ đơn giản hơn, hai dòng này bằng nhau, chỉ được viết khác nhau:

```js run
let str1 = "Hello\nWorld"; // hai dòng sử dụng một "ký tự dòng mới"

// hai dòng sử dụng một dòng mới bình thường và backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Có các ký tự đặc biệt khác, ít phổ biến hơn:

| Nhân vật | Mô tả |
|--------|-------------|
|`\n`|Dòng mới|
|`\r`|Trong các tệp văn bản Windows, sự kết hợp của hai ký tự `\r\n` biểu thị một ngắt mới, trong khi trên hệ điều hành không phải Windows, nó chỉ là `\n`. Đó là vì lý do lịch sử, hầu hết các phần mềm Windows cũng hiểu `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Trích dẫn|
|`\\`|Dấu gạch chéo ngược|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Tab Dọc -- nhắc đến cho đầy đủ, có từ xưa, nay không dùng (có thể quên ngay)). |

Như bạn có thể thấy, tất cả các ký tự đặc biệt đều bắt đầu bằng ký tự gạch chéo ngược `\`. Nó còn được gọi là "ký tự thoát".

Bởi vì nó rất đặc biệt, nên nếu chúng ta cần hiển thị dấu gạch chéo ngược `\` thực sự trong chuỗi, chúng ta cần nhân đôi nó:

```js run
alert( `Dấu gạch chéo ngược: \\` ); // Dấu gạch chéo ngược: \
```

Cái gọi là trích dẫn "thoát" `\'`, `\"`, <code>\\`</code> được sử dụng để chèn một trích dẫn vào cùng một chuỗi được trích dẫn.

Ví dụ:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Như bạn có thể thấy, chúng ta phải thêm vào trước trích dẫn bên trong bằng dấu gạch chéo ngược `\'`, vì nếu không nó sẽ cho biết kết thúc chuỗi.

Tất nhiên, chỉ những trích dẫn giống với những trích dẫn kèm theo mới cần được thoát. Vì vậy, như một giải pháp tao nhã hơn, thay vào đó, chúng ta có thể chuyển sang dấu ngoặc kép hoặc dấu nháy ngược:

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

Bên cạnh những ký tự đặc biệt này, còn có một ký hiệu đặc biệt cho mã Unicode `\u…`, ký hiệu này hiếm khi được sử dụng và được trình bày trong chương tùy chọn về [Unicode](info:unicode).

## Chiều dài chuỗi

Thuộc tính `length` có độ dài chuỗi:

```js run
alert( `My\n`.length ); // 3
```

Lưu ý rằng `\n` là một ký tự "đặc biệt", vì vậy độ dài thực sự là `3`.

```warn header="`length` là thuộc tính"
Những người có kiến thức cơ bản về một số ngôn ngữ khác đôi khi gõ nhầm bằng cách gọi `str.length()` thay vì chỉ `str.length`. Điều đó không hiệu quả.

Hãy lưu ý rằng `str.length` là thuộc tính số, không phải hàm. Không cần thêm dấu ngoặc đơn sau nó. Không phải `.length()`, mà là `.length`.
```

## Truy cập ký tự

Để lấy một ký tự ở vị trí `pos`, hãy sử dụng dấu ngoặc vuông `[pos]` hoặc gọi phương thức [str.at(pos)](mdn:js/String/at). Ký tự đầu tiên bắt đầu từ vị trí số 0:

```js run
let str = `Xin chào`;

// ký tự đầu tiên
alert( str[0] ); // X
alert( str.at(0) ); // X

// ký tự cuối cùng
alert( str[str.length - 1] ); // o
alert( str.at(-1) );
```

Như bạn có thể thấy, phương thức `.at(pos)` có lợi ích là cho phép vị trí âm. Nếu `pos` là số âm, thì nó được tính từ cuối chuỗi.

Vì vậy, `.at(-1)` có nghĩa là ký tự cuối cùng và `.at(-2)` là ký tự trước nó, v.v.

Ví dụ: dấu ngoặc vuông luôn trả về `undefined` cho các chỉ mục phủ định:

```js run
let str = `Xin chào`;

alert( str[-2] ); // undefined
alert( str.at(-2) ); // 'à'
```

Chúng ta cũng có thể lặp lại các ký tự bằng cách sử dụng `for..of`:

```js run
for (let char of "Xin chào") {
  alert(char); // X,i,n, ,c,h,à,o (char trở thành "X", rồi "i", rồi "n", v.v.)
}
```

## Chuỗi là bất biến

Không thể thay đổi chuỗi trong JavaScript. Không thể thay đổi một nhân vật.

Hãy thử để chứng minh rằng nó không hoạt động:

```js run
let str = 'Hi';

str[0] = 'h'; // lỗi
alert( str[0] ); // không hoạt động
```

Cách giải quyết thông thường là tạo một chuỗi hoàn toàn mới và gán nó cho `str` thay vì chuỗi cũ.

Ví dụ:

```js run
let str = 'Hi';

str = 'h' + str[1]; // thay thế chuỗi

alert( str ); // hi
```

Trong các phần sau chúng ta sẽ thấy nhiều ví dụ hơn về điều này.

## Thay đổi kiểu chữ

Các phương thức [toLowerCase()](mdn:js/String/toLowerCase) và [toUpperCase()](mdn:js/String/toUpperCase) thay đổi kiểu chữ:

```js run
  alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // Interface
```

Hoặc, nếu chúng ta muốn một ký tự được viết thường:

```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Tìm kiếm một chuỗi con

Có nhiều cách để tìm kiếm một chuỗi con trong một chuỗi.

### str.indexOf

Phương thức đầu tiên là [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Nó tìm kiếm `substr` trong `str`, bắt đầu từ vị trí đã cho `pos` và trả về vị trí tìm thấy kết quả khớp hoặc `-1` nếu không tìm thấy gì.

Ví dụ:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, bởi vì 'Widget' được tìm thấy ngay từ đầu
alert( str.indexOf('widget') ); // -1, không tìm thấy, tìm kiếm phân biệt chữ hoa chữ thường

alert( str.indexOf("id") ); // 1, "id" được tìm thấy ở vị trí 1 (..idget với id)
```

Tham số thứ hai tùy chọn cho phép chúng ta bắt đầu tìm kiếm từ một vị trí nhất định.

Chẳng hạn, lần xuất hiện đầu tiên của `"id"` là ở vị trí `1`. Để tìm kiếm lần xuất hiện tiếp theo, hãy bắt đầu tìm kiếm từ vị trí `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Nếu chúng ta quan tâm đến tất cả các lần xuất hiện, chúng tôi có thể chạy `indexOf` trong một vòng lặp. Mỗi cuộc gọi mới được thực hiện với vị trí sau sự trùng khớp trước đó:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // hãy tìm kiếm nó

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Đã tìm thấy tại ${foundPos}` );
  pos = foundPos + 1; // tiếp tục tìm kiếm từ vị trí tiếp theo
}
```

Thuật toán tương tự có thể được trình bày ngắn hơn:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Ngoài ra còn có một phương thức tương tự [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) tìm kiếm từ cuối chuỗi đến đầu chuỗi.

Nó sẽ liệt kê các lần xuất hiện theo thứ tự ngược lại.
```

Có một chút bất tiện với `indexOf` trong bài kiểm tra `if`. Chúng ta không thể đặt nó trong `if` như thế này:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("Chúng ta đã tìm thấy nó"); // không hoạt động!
}
```

`alert` trong ví dụ trên không hiển thị vì `str.indexOf("Widget")` trả về `0` (có nghĩa là nó tìm thấy kết quả khớp ở vị trí bắt đầu). Đúng, nhưng `if` coi `0` là `false`.

Vì vậy, chúng ta thực sự nên kiểm tra `-1`, như sau:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Chúng ta đã tìm thấy nó"); // bây giờ hoạt động!
}
```

### includes, startsWith, endsWith

Phương thức hiện đại hơn [str.includes(substr, pos)](mdn:js/String/includes) trả về `true/false` tùy thuộc vào việc `str` có chứa `substr` bên trong hay không.

Đó là lựa chọn phù hợp nếu chúng ta cần kiểm tra sự trùng khớp, nhưng không cần vị trí của nó:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

Đối số thứ hai tùy chọn của `str.includes` là vị trí để bắt đầu tìm kiếm từ:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, từ vị trí 3 không có "id"
```

Các phương thức [str.startsWith](mdn:js/String/startsWith) và [str.endsWith](mdn:js/String/endsWith) thực hiện chính xác những gì chúng nói:

```js run
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" bắt đầu bằng "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" kết thúc bằng "get"
```

## Lấy một chuỗi con

Có 3 phương thức trong JavaScript để lấy chuỗi con: `substring`, `substr` và `slice`.

`str.slice(start [, end])`
: Trả về một phần của chuỗi từ `start` đến (nhưng không bao gồm) `end`.

    Ví dụ:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', chuỗi con từ 0 đến 5 (không bao gồm 5)
    alert( str.slice(0, 1) ); // 's', từ 0 đến 1, nhưng không bao gồm 1, vì vậy chỉ ký tự ở 0
    ```

    Nếu không có đối số thứ hai, thì `slice` sẽ đi đến cuối chuỗi:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', từ vị trí thứ 2 đến cuối
    ```

   Cũng có thể có các giá trị âm cho `start/end`. Chúng có nghĩa là vị trí được tính từ cuối chuỗi:

    ```js run
    let str = "strin*!*gif*/!*y";

    // bắt đầu ở vị trí thứ 4 từ bên phải, kết thúc ở vị trí thứ 1 từ bên phải
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Trả về một phần của chuỗi *giữa* `start` và `end` (không bao gồm lớn hơn của chúng).

    Điều này gần giống với `slice`, nhưng nó cho phép `start` lớn hơn `end`.

     Ví dụ:

    ```js run
    let str = "st*!*ring*/!*ify";

    // những cái này giống nhau đối với chuỗi con
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...nhưng không phải cho lát cắt:
    alert( str.slice(2, 6) ); // "ring" (giống nhau)
    alert( str.slice(6, 2) ); // "" (một chuỗi rỗng)

    ```

    Các đối số phủ định (không giống như lát cắt) không được hỗ trợ, chúng được coi là `0`.

`str.substr(start [, length])`
: Trả về một phần của chuỗi từ `bắt đầu`, với `độ dài` đã cho.

     Ngược lại với các phương pháp trước, phương pháp này cho phép chúng ta chỉ định `độ dài` thay vì vị trí kết thúc:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', từ vị trí thứ 2 nhận được 4 ký tự
    ```

    Đối số đầu tiên có thể là số âm, được tính từ cuối:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', từ vị trí thứ 4 lấy 2 ký tự
    ```
   Phương pháp này nằm trong [Phụ lục B](https://tc39.es/ecma262/#sec-string.prototype.substr) của đặc điểm kỹ thuật ngôn ngữ. Điều đó có nghĩa là chỉ các JavaScript engine được lưu trữ trên trình duyệt mới hỗ trợ nó, và nó không được đề nghị sử dụng. Trong thực tế, nó được hỗ trợ ở khắp mọi nơi.

Hãy tóm tắt lại các phương pháp này để tránh nhầm lẫn:

| phương pháp | chọn... | âm bản |
|---|------------|--------|
| `slice(start, end)` | từ `start` đến `end` (không bao gồm `end`) | cho phép số âm |
| `substring(start, end)` | giữa `start` và `end` (không bao gồm `end`)| giá trị âm có nghĩa là `0` |
| `substr(start, length)` | từ `start` lấy các ký tự `length` | cho phép `start` âm |

```smart header="Chọn cái nào?"
Tất cả chúng có thể làm công việc. Về mặt hình thức, `substr` có một nhược điểm nhỏ: nó không được mô tả trong thông số kỹ thuật JavaScript cốt lõi mà trong Phụ lục B, bao gồm các tính năng chỉ dành cho trình duyệt tồn tại chủ yếu vì lý do lịch sử. Vì vậy, các môi trường không có trình duyệt có thể không hỗ trợ nó. Nhưng trong thực tế, nó hoạt động ở mọi nơi.

Trong số hai biến thể còn lại, `slice` linh hoạt hơn một chút, nó cho phép đối số âm và viết ngắn hơn.

Vì vậy, để sử dụng thực tế, chỉ cần nhớ `slice` là đủ.
```

## So sánh chuỗi

Như chúng ta đã biết từ chương <info:comparison>, các chuỗi được so sánh theo từng ký tự theo thứ tự bảng chữ cái.

Mặc dù, có một số điều kỳ lạ.

1. Chữ thường luôn lớn hơn chữ hoa:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Các chữ cái có dấu phụ là "không theo thứ tự":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Điều này có thể dẫn đến kết quả lạ nếu chúng ta sắp xếp các tên quốc gia này. Thông thường mọi người sẽ mong đợi `Zealand` sẽ đứng sau `Österreich` trong danh sách.

Để hiểu điều gì sẽ xảy ra, chúng ta nên biết rằng các chuỗi trong Javascript được mã hóa bằng [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Đó là: mỗi ký tự có một mã số tương ứng.

Có các phương thức đặc biệt cho phép lấy ký tự cho mã và ngược lại:

`str.codePointAt(pos)`
: Trả về một số thập phân biểu thị mã cho ký tự ở vị trí `pos`:

    ```js run
    // các chữ cái viết hoa và viết thường có mã khác nhau
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (nếu chúng ta cần một giá trị thập lục phân)
    ```

`String.fromCodePoint(code)`
: Tạo một ký tự bằng số `code` của nó

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    alert( String.fromCodePoint(0x5a) ); // Z (chúng ta cũng có thể sử dụng giá trị hex làm đối số)
    ```

Bây giờ, hãy xem các ký tự có mã `65..220` (bảng chữ cái Latinh và thêm một chút) bằng cách tạo một chuỗi gồm chúng:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Đầu ra:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
// ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Thấy chưa? Các ký tự viết hoa xuất hiện trước, sau đó là một vài ký tự đặc biệt, sau đó là các ký tự viết thường và `Ö` ở gần cuối đầu ra.

Bây giờ thì rõ ràng là tại sao `a > Z`.

Các ký tự được so sánh bằng mã số của chúng. Mã lớn hơn có nghĩa là ký tự lớn hơn. Mã của `a` (97) lớn hơn mã của `Z` (90).

- Tất cả các chữ thường đi sau các chữ in hoa vì mã của chúng lớn hơn.
- Một số chữ cái như `Ö` đứng ngoài bảng chữ cái chính. Ở đây, mã của nó lớn hơn bất kỳ thứ gì từ `a` đến `z`.

### So sánh đúng [#true-comparisons]

Thuật toán "đúng" để thực hiện so sánh chuỗi phức tạp hơn vẻ ngoài của nó, bởi vì các bảng chữ cái khác nhau đối với các ngôn ngữ khác nhau.

Vì vậy, trình duyệt cần biết ngôn ngữ để so sánh.

May mắn thay, các trình duyệt hiện đại hỗ trợ tiêu chuẩn quốc tế hóa [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).

Nó cung cấp một phương pháp đặc biệt để so sánh các chuỗi trong các ngôn ngữ khác nhau, tuân theo các quy tắc của chúng.

Lệnh gọi [str.localeCompare(str2)](mdn:js/String/localeCompare) trả về một số nguyên cho biết `str` nhỏ hơn, bằng hay lớn hơn `str2` theo quy tắc ngôn ngữ:

- Trả về số âm nếu `str` nhỏ hơn `str2`.
- Trả về một số dương nếu `str` lớn hơn `str2`.
- Trả về `0` nếu chúng bằng nhau.

Ví dụ:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Phương thức này thực sự có hai đối số bổ sung được chỉ định trong [tài liệu](mdn:js/String/localeCompare), cho phép phương thức này chỉ định ngôn ngữ (theo mặc định được lấy từ môi trường, thứ tự chữ cái phụ thuộc vào ngôn ngữ) và thiết lập các quy tắc bổ sung như phân biệt chữ hoa chữ thường hoặc nên coi `"a"` và `"á"` như nhau, v.v.

## Tóm tắt

- Có 3 loại trích dẫn. Backticks cho phép một chuỗi mở rộng trên nhiều dòng và nhúng các biểu thức `${…}`.
- Chúng ta có thể sử dụng các ký tự đặc biệt, chẳng hạn như ngắt dòng `\n`.
- Để lấy một ký tự, sử dụng: `[]`.
- Để lấy chuỗi con, dùng: `slice` hoặc `substring`.
- Để viết thường/viết hoa một chuỗi, sử dụng: `toLowerCase/toUpperCase`.
- Để tìm một chuỗi con, hãy sử dụng: `indexOf`, hoặc `includes/startsWith/endsWith` để kiểm tra đơn giản.
- Để so sánh các chuỗi theo ngôn ngữ, hãy sử dụng: `localeCompare`, nếu không thì chúng được so sánh bằng mã ký tự.

Có một số phương pháp hữu ích khác trong chuỗi:

- `str.trim()` -- xóa khoảng trắng ("trims") khỏi đầu và cuối chuỗi.
- `str.repeat(n)` -- lặp lại chuỗi `n` lần.
- ...và nhiều hơn nữa được tìm thấy trong [hướng dẫn sử dụng](mdn:js/String).

Các chuỗi cũng có các phương thức để thực hiện tìm kiếm/thay thế bằng các biểu thức thông thường. Nhưng đó là chủ đề lớn nên nó được giải thích trong phần hướng dẫn riêng biệt <info:regular-expressions>.

Ngoài ra, hiện tại, điều quan trọng cần biết là các chuỗi dựa trên mã hóa Unicode và do đó, có vấn đề khi so sánh. Có thêm thông tin về Unicode trong chương <info:unicode>.
