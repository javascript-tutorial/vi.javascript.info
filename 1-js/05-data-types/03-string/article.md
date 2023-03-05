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

Dấu ngoặc đơn và dấu ngoặc kép xuất hiện từ thời cổ đại khi tạo ngôn ngữ khi nhu cầu về chuỗi nhiều dòng không được tính đến. Backticks xuất hiện muộn hơn nhiều và do đó linh hoạt hơn.

Backticks cũng cho phép chúng ta chỉ định một "hàm mẫu" trước backtick đầu tiên. Cú pháp là: <code>func&#96;string&#96;</code>. Hàm `func` được gọi tự động, nhận chuỗi và các biểu thức được nhúng và có thể xử lý chúng. Đây được gọi là "mẫu được gắn thẻ". Tính năng này giúp triển khai tạo khuôn mẫu tùy chỉnh dễ dàng hơn nhưng hiếm khi được sử dụng trong thực tế. Bạn có thể đọc thêm về nó trong [hướng dẫn sử dụng](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Ký tự đặc biệt

Vẫn có thể tạo chuỗi nhiều dòng với dấu nháy đơn và kép bằng cách sử dụng cái gọi là "ký tự dòng mới", được viết là `\n`, biểu thị ngắt dòng:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // một danh sách khách nhiều dòng
```

Ví dụ, hai dòng này bằng nhau, nhưng viết khác nhau:

```js run
let str1 = "Hello\nWorld"; // hai dòng sử dụng một "ký tự dòng mới"

// hai dòng sử dụng một dòng mới bình thường và backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Có những ký tự "đặc biệt" khác, ít phổ biến hơn.

Đây là danh sách đầy đủ:

| Nhân vật | Mô tả |
|--------|-------------|
|`\n`|Dòng mới|
|`\r`|Trở về đầu hàng: không được sử dụng một mình. Các tệp văn bản Windows sử dụng kết hợp hai ký tự `\r\n` để biểu thị ngắt dòng. |
|`\'`, `\"`|Trích dẫn|
|`\\`|Dấu gạch chéo ngược|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- được giữ lại để tương thích, không được sử dụng hiện nay. |
|`\xXX`|Ký tự Unicode với Unicode thập lục phân đã cho `XX`, ví dụ: `'\x7A'` giống như `'z'`.|
|`\uXXXX`|Một ký hiệu Unicode có mã hex `XXXX` trong mã hóa UTF-16, ví dụ `\u00A9` -- là một ký hiệu Unicode cho ký hiệu bản quyền `©`. Nó phải có chính xác 4 chữ số hex. |
|`\u{X…XXXXXX}` (1 đến 6 ký tự hex)|Ký hiệu Unicode với mã hóa UTF-32 nhất định. Một số ký tự hiếm được mã hóa bằng hai ký hiệu Unicode, chiếm 4 byte. Bằng cách này, chúng ta có thể chèn mã dài. |

Ví dụ với Unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, một chữ tượng hình hiếm của Trung Quốc (mã Unicode dài)
alert( "\u{1F60D}" ); // 😍, một biểu tượng khuôn mặt tươi cười (một mã Unicode dài khác)
```

Tất cả các ký tự đặc biệt đều bắt đầu bằng ký tự gạch chéo ngược `\`. Nó còn được gọi là "ký tự thoát".

Chúng ta cũng có thể sử dụng nó nếu chúng ta muốn chèn một trích dẫn vào chuỗi.

Ví dụ:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Như bạn có thể thấy, chúng ta phải thêm vào trước trích dẫn bên trong bằng dấu gạch chéo ngược `\'`, vì nếu không nó sẽ cho biết kết thúc chuỗi.

Tất nhiên, chỉ những trích dẫn giống với những trích dẫn kèm theo mới cần được thoát. Vì vậy, như một giải pháp tao nhã hơn, thay vào đó, chúng ta có thể chuyển sang dấu ngoặc kép hoặc dấu nháy ngược:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Lưu ý rằng dấu gạch chéo ngược `\` phục vụ cho việc đọc chính xác chuỗi bằng JavaScript, sau đó biến mất. Chuỗi trong bộ nhớ không có `\`. Bạn có thể thấy rõ điều đó trong `alert` từ các ví dụ ở trên.

Nhưng nếu chúng ta cần hiển thị dấu gạch chéo ngược `\` trong chuỗi thì sao?

Điều đó là có thể, nhưng chúng ta cần nhân đôi nó như `\\`:

```js run
alert( `The backslash: \\` ); // Dấu gạch chéo ngược: \
```

## Chiều dài chuỗi

Thuộc tính `length` có độ dài chuỗi:

```js run
alert( `My\n`.length ); // 3
```

Lưu ý rằng `\n` là một ký tự "đặc biệt", vì vậy độ dài thực sự là `3`.

```warn header="`length` là thuộc tính"
Những người có kiến thức cơ bản về một số ngôn ngữ khác đôi khi gõ nhầm bằng cách gọi `str.length()` thay vì chỉ `str.length`. Điều đó không hiệu quả.

Hãy lưu ý rằng `str.length` là thuộc tính số, không phải hàm. Không cần thêm dấu ngoặc đơn sau nó.
```

## Truy cập ký tự

Để lấy một ký tự ở vị trí `pos`, hãy sử dụng dấu ngoặc vuông `[pos]` hoặc gọi phương thức [str.charAt(pos)](mdn:js/String/charAt). Ký tự đầu tiên bắt đầu từ vị trí số 0:

```js run
let str = `Hello`;

// ký tự đầu tiên
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
```

Dấu ngoặc vuông là một cách hiện đại để lấy một ký tự, trong khi `charAt` chủ yếu tồn tại vì lý do lịch sử.

Sự khác biệt duy nhất giữa chúng là nếu không tìm thấy ký tự nào, `[]` trả về `undefined`, và `charAt` trả về một chuỗi rỗng:

```js run
let str = `Xin chào`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (một chuỗi rỗng)
```

Chúng ta cũng có thể lặp lại các ký tự bằng cách sử dụng `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char trở thành "H", rồi "e", rồi "l", v.v.)
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

```js
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

#### Thủ thuật KHÔNG theo bit

Một trong những thủ thuật cũ được sử dụng ở đây là toán tử [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~`. Nó chuyển đổi số thành số nguyên 32 bit (loại bỏ phần thập phân nếu có) và sau đó đảo ngược tất cả các bit trong biểu diễn nhị phân của nó.

Trong thực tế, điều đó có nghĩa là một điều đơn giản: đối với số nguyên 32 bit `~n` bằng `-(n+1)`.

Ví dụ:

```js run
alert( ~2 ); // -3, giống như -(2+1)
alert( ~1 ); // -2, giống như -(1+1)
alert( ~0 ); // -1, giống như -(0+1)
*!*
alert( ~-1 ); // 0, giống như -(-1+1)
*/!*
```

Như chúng ta có thể thấy, `~n` chỉ bằng 0 nếu `n == -1` (đó là đối với bất kỳ số nguyên có dấu 32 bit nào `n`).

Vì vậy, phép thử `if ( ~str.indexOf("...") )` chỉ đúng nếu kết quả của `indexOf` không phải là `-1`. Nói cách khác, khi có một sự trùng khớp.

Mọi người sử dụng nó để rút ngắn kiểm tra `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Đã tìm thấy nó·!' ); // hoạt động
}
```

Thông thường không nên sử dụng các tính năng ngôn ngữ theo cách không rõ ràng, nhưng thủ thuật cụ thể này được sử dụng rộng rãi trong mã cũ, vì vậy chúng ta nên hiểu nó.

Chỉ cần nhớ: `if (~str.indexOf(...))` đọc là "nếu tìm thấy".

Tuy nhiên, nói một cách chính xác, vì các số lớn bị cắt bớt thành 32 bit bởi toán tử `~`, nên tồn tại các số khác cho `0`, số nhỏ nhất là `~4294967295=0`. Điều đó làm cho kiểm tra như vậy chỉ chính xác nếu một chuỗi không dài.

Hiện tại, chúng ta chỉ có thể thấy thủ thuật này trong mã cũ, vì JavaScript hiện đại cung cấp phương thức `.includes` (xem bên dưới).

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
alert( "Widget".startsWith("Wid") ); // true, "Widget" bắt đầu bằng "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" kết thúc bằng "get"
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
: Trả về một phần của chuỗi *giữa* `start` và `end`.

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

Hãy tóm tắt lại các phương pháp này để tránh nhầm lẫn:

| phương pháp | chọn... | âm bản |
|---|------------|--------|
| `slice(start, end)` | từ `start` đến `end` (không bao gồm `end`) | cho phép số âm |
| `substring(start, end)` | giữa `start` và `end` | giá trị âm có nghĩa là `0` |
| `substr(start, length)` | từ `start` lấy các ký tự `length` | cho phép `start` âm |

```smart header="Chọn cái nào?"
Tất cả chúng có thể làm công việc. Về mặt hình thức, `substr` có một nhược điểm nhỏ: nó không được mô tả trong thông số kỹ thuật JavaScript cốt lõi mà trong Phụ lục B, bao gồm các tính năng chỉ dành cho trình duyệt tồn tại chủ yếu vì lý do lịch sử. Vì vậy, các môi trường không có trình duyệt có thể không hỗ trợ nó. Nhưng trong thực tế, nó hoạt động ở mọi nơi.

Trong số hai biến thể còn lại, `slice` linh hoạt hơn một chút, nó cho phép đối số âm và viết ngắn hơn. Vì vậy, chỉ cần nhớ `slice` của ba phương pháp này là đủ.
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

Để hiểu điều gì xảy ra, hãy xem lại biểu diễn bên trong của chuỗi trong JavaScript.

Tất cả các chuỗi được mã hóa bằng [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Đó là: mỗi ký tự có một mã số tương ứng. Có những phương pháp đặc biệt cho phép lấy ký tự cho mã và ngược lại.

`str.codePointAt(pos)`
: Trả về mã cho ký tự tại vị trí `pos`:

    ```js run
    // các chữ cái viết hoa và viết thường có mã khác nhau
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Tạo một ký tự bằng số `code` của nó

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

   Chúng ta cũng có thể thêm các ký tự Unicode theo mã của chúng bằng cách sử dụng `\u` theo sau là mã hex:

    ```js run
    // 90 là 5a trong hệ thập lục phân
    alert( '\u005a' ); // Z
    ```

Bây giờ, hãy xem các ký tự có mã `65..220` (bảng chữ cái Latinh và thêm một chút) bằng cách tạo một chuỗi gồm chúng:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
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

May mắn thay, tất cả các trình duyệt hiện đại (IE10- yêu cầu thư viện bổ sung [Intl.js](https://github.com/andyearnshaw/Intl.js/)) đều hỗ trợ tiêu chuẩn quốc tế hóa [ECMA-402](http://www. ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

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

## Kiến thức nâng cao"
Phần này đi sâu hơn vào bên trong chuỗi. Kiến thức này sẽ hữu ích cho bạn nếu bạn định xử lý biểu tượng cảm xúc, ký tự toán học hoặc chữ tượng hình hiếm hoặc các ký hiệu hiếm khác.

Bạn có thể bỏ qua phần này nếu bạn không có kế hoạch hỗ trợ chúng.
```

### Cặp thay thế

Tất cả các ký tự được sử dụng thường xuyên đều có mã 2 byte. Các chữ cái trong hầu hết các ngôn ngữ châu Âu, số và thậm chí hầu hết các chữ tượng hình đều có biểu diễn 2 byte.

Nhưng 2 byte chỉ cho phép 65536 kết hợp và điều đó là không đủ cho mọi biểu tượng có thể. Vì vậy, các ký hiệu hiếm được mã hóa bằng một cặp ký tự 2 byte được gọi là "cặp thay thế".

Độ dài của các ký hiệu như vậy là `2`:

```js run
alert( '𝒳'.length ); // 2, CHỮ VIẾT HOA TOÁN HỌC X
alert( '😂'.length ); // 2, MẶT VỚI GIỌT NƯỚC MẮT VUI
alert( '𩷶'.length ); // 2, một chữ tượng hình hiếm của Trung Quốc
```

Lưu ý rằng các cặp thay thế không tồn tại vào thời điểm JavaScript được tạo và do đó không được ngôn ngữ xử lý chính xác!

Chúng ta thực sự có một ký hiệu duy nhất trong mỗi chuỗi ở trên, nhưng `độ dài` hiển thị độ dài `2`.

`String.fromCodePoint` và `str.codePointAt` là một vài phương pháp hiếm hoi đối phó với các cặp thay thế đúng. Gần đây chúng đã xuất hiện trong ngôn ngữ. Trước chúng, đã chỉ có [String.fromCharCode](mdn:js/String/fromCharCode) và [str.charCodeAt](mdn:js/String/charCodeAt). Những phương pháp này thực sự giống như `fromCodePoint/codePointAt`, nhưng không hoạt động với các cặp thay thế.

Lấy một biểu tượng có thể khó khăn, bởi vì các cặp thay thế được coi là hai ký tự:

```js run
alert( '𝒳'[0] ); // ký tự lạ...
alert( '𝒳'[1] ); // ...các mảnh của cặp thay thế
```

Lưu ý rằng các phần của cặp thay thế không có ý nghĩa gì nếu không có nhau. Vì vậy, các cảnh báo trong ví dụ trên thực sự hiển thị rác.

Về mặt kỹ thuật, các cặp thay thế cũng có thể được phát hiện bằng mã của chúng: nếu một ký tự có mã trong khoảng `0xd800..0xdbff`, thì đó là phần đầu tiên của cặp thay thế. Ký tự tiếp theo (phần thứ hai) phải có mã trong khoảng `0xdc00..0xdfff`. Các khoảng thời gian này được dành riêng cho các cặp thay thế theo tiêu chuẩn.

Trong trường hợp trên:

```js run
// charCodeAt không nhận biết cặp thay thế, vì vậy nó cung cấp mã cho các bộ phận

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, giữa 0xd800 và 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, giữa 0xdc00 và 0xdfff
```

Bạn sẽ tìm thấy nhiều cách hơn để xử lý các cặp thay thế ở phần sau của chương <info:iterable>. Có thể có những thư viện đặc biệt cho điều đó, nhưng không có gì đủ nổi tiếng để đề xuất ở đây.

### Dấu phụ và chuẩn hóa

Trong nhiều ngôn ngữ, có những ký hiệu bao gồm ký tự cơ sở có dấu ở trên/dưới ký tự đó.

Chẳng hạn, chữ `a` có thể là ký tự cơ sở cho: `àáâäãåā`. Hầu hết các ký tự "tổng hợp" phổ biến đều có mã riêng trong bảng UTF-16. Nhưng không phải tất cả chúng, bởi vì có quá nhiều kết hợp có thể.

Để hỗ trợ các thành phần tùy ý, UTF-16 cho phép chúng tôi sử dụng một số ký tự Unicode: ký tự cơ sở theo sau là một hoặc nhiều ký tự "đánh dấu" "trang trí" cho nó.

Ví dụ: nếu chúng ta có `S` theo sau là ký tự "dấu chấm phía trên" đặc biệt (mã `\u0307`), thì nó được hiển thị là Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Nếu chúng ta cần một dấu bổ sung phía trên chữ cái (hoặc bên dưới nó) -- không vấn đề gì, chỉ cần thêm ký tự dấu cần thiết.

Ví dụ: nếu chúng ta thêm một ký tự "dấu chấm bên dưới" (mã `\u0323`), thì chúng ta sẽ có "S có dấu chấm bên trên và bên dưới": `Ṩ`.

Ví dụ:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Điều này mang lại sự linh hoạt tuyệt vời, nhưng cũng là một vấn đề thú vị: hai ký tự có thể trông giống nhau về mặt trực quan, nhưng được thể hiện bằng các thành phần Unicode khác nhau.

Ví dụ:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + chấm trên + chấm dưới
let s2 = 'S\u0323\u0307'; // Ṩ, S + chấm trên + chấm dưới

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false mặc dù các ký tự trông giống hệt nhau (?!)
```

Để giải quyết vấn đề này, tồn tại thuật toán "Chuẩn hóa Unicode" đưa mỗi chuỗi về dạng "bình thường" duy nhất.

Nó được triển khai bởi [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Thật buồn cười là trong tình huống của chúng ta, `normalize()` thực sự tập hợp một chuỗi gồm 3 ký tự thành một: `\u1e68` (S có hai dấu chấm).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Trong thực tế, điều này không phải lúc nào cũng đúng. Lý do là ký hiệu `Ṩ` là "đủ phổ biến", vì vậy những người tạo UTF-16 đã đưa nó vào bảng chính và đặt mã cho nó.

Nếu bạn muốn tìm hiểu thêm về các biến thể và quy tắc chuẩn hóa -- chúng được mô tả trong phần phụ lục của tiêu chuẩn Unicode: [Biểu mẫu chuẩn hóa Unicode](http://www.unicode.org/reports/tr15/), nhưng đối với hầu hết các trường hợp thực tế mục đích thông tin từ phần này là đủ.

## Tóm tắt

- Có 3 loại trích dẫn. Backticks cho phép một chuỗi mở rộng trên nhiều dòng và nhúng các biểu thức `${…}`.
- Các chuỗi trong JavaScript được mã hóa bằng UTF-16.
- Chúng ta có thể sử dụng các ký tự đặc biệt như `\n` và chèn các chữ cái theo Unicode của chúng bằng cách sử dụng `\u...`.
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
