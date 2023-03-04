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
alert( 'Tôi*!*\*/!*là con hải mã!' ); // *!*Tôi*/!*là con hải mã!
```

Như bạn có thể thấy, chúng ta phải thêm vào trước trích dẫn bên trong bằng dấu gạch chéo ngược `\'`, vì nếu không nó sẽ cho biết kết thúc chuỗi.

Tất nhiên, chỉ những trích dẫn giống với những trích dẫn kèm theo mới cần được thoát. Vì vậy, như một giải pháp tao nhã hơn, thay vào đó, chúng ta có thể chuyển sang dấu ngoặc kép hoặc dấu nháy ngược:

```js run
alert( `Tôi là con hải mã!` ); // Tôi là con hải mã!
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
for (let char of "Xin chào") {
  alert(char); // X,i,n, ,c,h,à,o (char trở thành "X", rồi "i", rồi "n", v.v.)
}
```

## Chuỗi là bất biến

Không thể thay đổi chuỗi trong JavaScript. Không thể thay đổi một nhân vật.

Hãy thử để chứng minh rằng nó không hoạt động:

```js run
let str = 'Chào';

str[0] = 'h'; // lỗi
alert( str[0] ); // không hoạt động
```

Cách giải quyết thông thường là tạo một chuỗi hoàn toàn mới và gán nó cho `str` thay vì chuỗi cũ.

Ví dụ:

```js run
let str = 'Chào';

str = 'h' + str[1]; // thay thế chuỗi

alert( str ); // chào
```

Trong các phần sau chúng ta sẽ thấy nhiều ví dụ hơn về điều này.

## Thay đổi kiểu chữ

Các phương thức [toLowerCase()](mdn:js/String/toLowerCase) và [toUpperCase()](mdn:js/String/toUpperCase) thay đổi kiểu chữ:

```js run
alert( 'Giao diện'.toUpperCase() ); // GIAO DIỆN
alert( 'Giao diện'.toLowerCase() ); // giao diện
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
let str = 'Tiện ích với id';

alert( str.indexOf('Tiện ích') ); // 0, bởi vì 'Tiện ích' được tìm thấy ngay từ đầu
alert( str.indexOf('tiện ích') ); // -1, không tìm thấy, tìm kiếm phân biệt chữ hoa chữ thường

alert( str.indexOf("id") ); // 1, "id" được tìm thấy ở vị trí 1 (Tiện ích với id)
```

Tham số thứ hai tùy chọn cho phép chúng ta bắt đầu tìm kiếm từ một vị trí nhất định.

Chẳng hạn, lần xuất hiện đầu tiên của `"id"` là ở vị trí `1`. Để tìm kiếm lần xuất hiện tiếp theo, hãy bắt đầu tìm kiếm từ vị trí `2`:

```js run
let str = 'Tiện ích với id';

alert( str.indexOf('id', 2) ) // 12
```

Nếu chúng tôi quan tâm đến tất cả các lần xuất hiện, chúng tôi có thể chạy `indexOf` trong một vòng lặp. Mỗi cuộc gọi mới được thực hiện với vị trí sau sự trùng hợp trước đó:

```js run
let str = 'Tinh ranh như một con cáo, mạnh mẽ như một con bò';

let target = 'như'; // hãy tìm kiếm nó

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // tiếp tục tìm kiếm từ vị trí tiếp theo
}
```

Thuật toán tương tự có thể được trình bày ngắn hơn:

```js run
let str = "Tinh ranh như một con cáo, mạnh mẽ như một con bò";
let target = "như";

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
let str = "Tiện ích với id";

if (str.indexOf("Tiện ích")) {
    alert("Chúng ta đã tìm thấy nó"); // không hoạt động!
}
```

`alert` trong ví dụ trên không hiển thị vì `str.indexOf("Widget")` trả về `0` (có nghĩa là nó tìm thấy kết quả khớp ở vị trí bắt đầu). Đúng, nhưng `if` coi `0` là `false`.

Vì vậy, chúng ta thực sự nên kiểm tra `-1`, như sau:

```js run
let str = "Tiện ích với id";

*!*
if (str.indexOf("Tiện ích") != -1) {
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

Vì vậy, phép thử `if ( ~str.indexOf("...") )` chỉ đúng nếu kết quả của `indexOf` không phải là `-1`. Nói cách khác, khi có một sự trùng hợp.

Mọi người sử dụng nó để rút ngắn kiểm tra `indexOf`:

```js run
let str = "Tiện ích";

if (~str.indexOf("Tiện ích")) {
  alert( 'Đã tìm thấy nó·!' ); // hoạt động
}
```

It is usually not recommended to use language features in a non-obvious way, but this particular trick is widely used in old code, so we should understand it.

Just remember: `if (~str.indexOf(...))` reads as "if found".

To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check correct only if a string is not that long.

Right now we can see this trick only in the old code, as modern JavaScript provides `.includes` method (see below).

### includes, startsWith, endsWith

The more modern method [str.includes(substr, pos)](mdn:js/String/includes) returns `true/false` depending on whether `str` contains `substr` within.

It's the right choice if we need to test for the match, but don't need its position:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

The optional second argument of `str.includes` is the position to start searching from:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
```

The methods [str.startsWith](mdn:js/String/startsWith) and [str.endsWith](mdn:js/String/endsWith) do exactly what they say:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
```

## Getting a substring

There are 3 methods in JavaScript to get a substring: `substring`, `substr` and `slice`.

`str.slice(start [, end])`
: Returns the part of the string from `start` to (but not including) `end`.

    For instance:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
    ```

    If there is no second argument, then `slice` goes till the end of the string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
    ```

    Negative values for `start/end` are also possible. They mean the position is counted from the string end:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Returns the part of the string *between* `start` and `end`.

    This is almost the same as `slice`, but it allows `start` to be greater than `end`.

    For instance:

    ```js run
    let str = "st*!*ring*/!*ify";

    // these are same for substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...but not for slice:
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)

    ```

    Negative arguments are (unlike slice) not supported, they are treated as `0`.

`str.substr(start [, length])`
: Returns the part of the string from `start`, with the given `length`.

    In contrast with the previous methods, this one allows us to specify the `length` instead of the ending position:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
    ```

    The first argument may be negative, to count from the end:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
    ```

Let's recap these methods to avoid any confusion:

| method | selects... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` | negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |

```smart header="Which one to choose?"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write. So, it's enough to remember solely `slice` of these three methods.
```

## Comparing strings

As we know from the chapter <info:comparison>, strings are compared character-by-character in alphabetical order.

Although, there are some oddities.

1. A lowercase letter is always greater than the uppercase:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letters with diacritical marks are "out of order":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    This may lead to strange results if we sort these country names. Usually people would expect `Zealand` to come after `Österreich` in the list.

To understand what happens, let's review the internal representation of strings in JavaScript.

All strings are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back.

`str.codePointAt(pos)`
: Returns the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Creates a character by its numeric `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    We can also add Unicode characters by their codes using `\u` followed by the hex code:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Now let's see the characters with codes `65..220` (the latin alphabet and a little bit extra) by making a string of them:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

See? Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.

Now it becomes obvious why `a > Z`.

The characters are compared by their numeric code. The greater code means that the character is greater. The code for `a` (97) is greater than the code for `Z` (90).

- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, it's code is greater than anything from `a` to `z`.

### Correct comparisons [#correct-comparisons]

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.

So, the browser needs to know the language to compare.

Luckily, all modern browsers (IE10- requires the additional library [Intl.js](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

It provides a special method to compare strings in different languages, following their rules.

The call [str.localeCompare(str2)](mdn:js/String/localeCompare) returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

- Returns a negative number if `str` is less than `str2`.
- Returns a positive number if `str` is greater than `str2`.
- Returns `0` if they are equivalent.

For instance:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.

## Internals, Unicode

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.

You can skip the section if you don't plan to support them.
```

### Surrogate pairs

All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.

But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol. So rare symbols are encoded with a pair of 2-byte characters called "a surrogate pair".

The length of such symbols is `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
```

Note that surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` shows a length of `2`.

`String.fromCodePoint` and `str.codePointAt` are few rare methods that deal with surrogate pairs right. They recently appeared in the language. Before them, there were only [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt). These methods are actually the same as `fromCodePoint/codePointAt`, but don't work with surrogate pairs.

Getting a symbol can be tricky, because surrogate pairs are treated as two characters:

```js run
alert( '𝒳'[0] ); // strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Note that pieces of the surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

In the case above:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

### Diacritical marks and normalization

In many languages there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for: `àáâäãåā`. Most common "composite" character have their own code in the UTF-16 table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, UTF-16 allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

For instance:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.

## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their Unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings:

- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.
