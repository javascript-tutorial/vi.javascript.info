
# Unicode, Bên trong chuỗi

```warn header="Kiến thức nâng cao"
Phần này đi sâu hơn vào bên trong chuỗi. Kiến thức này sẽ hữu ích cho bạn nếu bạn định xử lý biểu tượng cảm xúc, ký tự toán học hoặc chữ tượng hình hiếm hoặc các ký hiệu hiếm khác.
```

Như chúng ta đã biết, chuỗi JavaScript dựa trên [Unicode](https://en.wikipedia.org/wiki/Unicode): mỗi ký tự được đại diện bởi một chuỗi byte 1-4 byte.

JavaScript cho phép chúng ta chèn một ký tự vào một chuỗi bằng cách chỉ định mã Unicode thập lục phân của nó bằng một trong ba ký hiệu sau:

- `\xXX`

    `XX` phải là hai chữ số thập lục phân có giá trị từ `00` đến `FF` thì `\xXX` là ký tự có mã Unicode là `XX`.

    Vì ký hiệu `\xXX` chỉ hỗ trợ hai chữ số thập lục phân, nên ký hiệu này chỉ có thể được sử dụng cho 256 ký tự Unicode đầu tiên.

    256 ký tự đầu tiên này bao gồm bảng chữ cái La-tinh, phần lớn kí tự cú pháp đơn giản, và một số ký tự khác. Ví dụ, `"\x7A"` giống như `"z"` (Unicode `U+007A`).

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, ký hiệu bản quyền
    ```

- `\uXXXX`
    `XXXX` phải có chính xác 4 chữ số hex với giá trị giữa `0000` và `FFFF`, sau đó `\uXXXX` là ký tự có mã Unicode là `XXXX`.

    Các ký tự với giá trị Unicode lớn hơn `U+FFFF` cũng có thể được biểu diễn với ký hiệu này, nhưng trong trường hợp này, chúng ta sẽ cần phải sử dụng cái gọi là cặp thay thế (chúng ta sẽ nói về cặp thay thế sau trong chương này).

    ```js run
    alert( "\u00A9" ); // ©, giống như \xA9, sử dụng ký hiệu hex 4 chữ số
    alert( "\u044F" ); // я, chữ cái trong bảng chữ cái Cyrillic
    alert( "\u2191" ); // ↑, biểu tượng mũi tên lên
    ```

- `\u{X…XXXXXX}`

    `X…XXXXXX` phải là giá trị thập lục phân từ 1 đến 6 byte trong khoảng từ `0` đến `10FFFF` (điểm mã cao nhất do Unicode xác định). Ký hiệu này cho phép chúng ta dễ dàng biểu diễn tất cả các ký tự Unicode hiện có.

    ```js run
    alert( "\u{20331}" ); // 佫, một ký tự tiếng Trung hiếm (mã Unicode dài)
    alert( "\u{1F60D}" ); // 😍, một biểu tượng mặt cười (một mã Unicode dài khác)
    ```

## Cặp thay thế

Tất cả các ký tự được sử dụng thường xuyên đều có mã 2 byte (4 chữ số hex). Các chữ cái trong hầu hết các ngôn ngữ châu Âu, số và bộ ký tự CJK thống nhất cơ bản (CJK - từ hệ thống chữ viết của Trung Quốc, Nhật Bản và Hàn Quốc), có biểu diễn 2 byte.

Ban đầu, JavaScript dựa trên mã hóa UTF-16 chỉ cho phép 2 byte cho mỗi ký tự. Nhưng 2 byte chỉ cho phép 65536 kết hợp và điều đó là không đủ cho mọi ký hiệu Unicode có thể có.

Vì vậy, các ký hiệu hiếm yêu cầu nhiều hơn 2 byte được mã hóa bằng một cặp ký tự 2 byte được gọi là "cặp thay thế".

Như một tác dụng phụ, độ dài của các ký hiệu như vậy là `2`:

```js run
alert( '𝒳'.length ); // 2, CHỮ X IN HOA TRONG TOÁN HỌC
alert( '😂'.length ); // 2, KHUÔN MẶT VỚI NHỮNG GIỌT NƯỚC MẮT HẠNH PHÚC
alert( '𩷶'.length ); // 2, một Ký tự Trung Quốc hiếm
```

Đó là bởi vì các cặp thay thế không tồn tại vào thời điểm JavaScript được tạo ra và do đó không được ngôn ngữ xử lý chính xác!

Chúng ta thực sự có một ký hiệu duy nhất trong mỗi chuỗi ở trên, nhưng thuộc tính `length` hiển thị độ dài là `2`.

Lấy một ký hiệu cũng có thể khó khăn, bởi vì hầu hết các tính năng ngôn ngữ coi các cặp thay thế là hai ký tự.

Ví dụ, ở đây chúng ta có thể thấy hai ký tự lẻ trong đầu ra:

```js run
alert( '𝒳'[0] ); // hiện những ký tự lạ...
alert( '𝒳'[1] ); // ...các mảnh của cặp thay thế
```

Các mảnh của một cặp thay thế không có ý nghĩa gì nếu không có nhau. Vì vậy, các cảnh báo trong ví dụ trên thực sự hiển thị rác.

Về mặt kỹ thuật, các cặp thay thế cũng có thể được phát hiện bằng mã của chúng: nếu một ký tự có mã trong khoảng `0xd800..0xdbff`, thì đó là phần đầu tiên của cặp thay thế. Ký tự tiếp theo (phần thứ hai) phải có mã trong khoảng `0xdc00..0xdfff`. Các khoảng thời gian này được dành riêng cho các cặp thay thế theo tiêu chuẩn.

Vì vậy, các phương thức [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) và [str.codePointAt](https://developer. mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) đã được thêm vào JavaScript để xử lý các cặp thay thế.

Về cơ bản, chúng giống như [String.fromCharCode](mdn:js/String/fromCharCode) và [str.charCodeAt](mdn:js/String/charCodeAt), nhưng chúng xử lý chính xác các cặp thay thế.

Ta có thể thấy sự khác biệt ở đây:

```js run
// charCodeAt không nhận biết cặp thay thế, vì vậy nó cung cấp mã cho phần đầu tiên của 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt nhận biết cặp thay thế
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, đọc cả hai phần của cặp thay thế
```

Điều đó nói rằng, nếu chúng ta lấy từ vị trí 1 (và điều đó khá sai ở đây), thì cả hai đều chỉ trả về phần thứ 2 của cặp:

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// nửa sau của cặp vô nghĩa
```

Bạn sẽ tìm thấy nhiều cách hơn để xử lý các cặp thay thế ở phần sau của chương <info:iterable>. Có lẽ cũng có những thư viện đặc biệt cho điều đó, nhưng không có gì đủ nổi tiếng để đề xuất ở đây.

````warn header="Điều rút ra: tách chuỗi tại một điểm tùy ý là nguy hiểm"
Chúng ta không thể tách một chuỗi ở một vị trí tùy ý, ví dụ: lấy `str.slice(0, 4)` và mong đợi nó là một chuỗi hợp lệ, ví dụ:

```js run
alert( 'chào 😂'.slice(0, 4) ); //  chào [?]
```

Ở đây chúng ta có thể thấy một ký tự rác (nửa đầu của cặp thay thế nụ cười) trong đầu ra.

Chỉ cần lưu ý về nó nếu bạn có ý định làm việc với các cặp thay thế một cách đáng tin cậy. Có thể không phải là một vấn đề lớn, nhưng ít nhất bạn nên hiểu những gì xảy ra.
````

## Dấu phụ và chuẩn hóa

Trong nhiều ngôn ngữ, có những ký hiệu bao gồm ký tự cơ sở có dấu ở trên/dưới ký tự đó.

Chẳng hạn, ký tự `a` có thể là ký tự cơ bản cho các ký tự này: `àáâäãåā`.

Hầu hết các ký tự "tổng hợp" phổ biến đều có mã riêng trong bảng Unicode. Nhưng không phải tất cả chúng, bởi vì có quá nhiều sự kết hợp có thể xảy ra.

Để hỗ trợ các thành phần tùy ý, tiêu chuẩn Unicode cho phép chúng ta sử dụng một số ký tự Unicode: ký tự cơ sở theo sau là một hoặc nhiều ký tự "đánh dấu" "trang trí" cho nó.

Chẳng hạn, nếu chúng ta có `S` theo sau là ký tự "dấu chấm phía trên" đặc biệt (mã `\u0307`), nó sẽ được hiển thị là Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Nếu chúng ta cần một dấu bổ sung phía trên chữ cái (hoặc bên dưới nó) -- không vấn đề gì, chỉ cần thêm ký tự dấu cần thiết.

Ví dụ, nếu chúng ta thêm một ký tự "dấu chấm bên dưới" (mã `\u0323`), thì chúng ta sẽ có "S có dấu chấm bên trên và bên dưới": `Ṩ`.

Ví dụ:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Điều này mang lại sự linh hoạt tuyệt vời, nhưng cũng là một vấn đề thú vị: hai ký tự có thể trông giống nhau về mặt trực quan, nhưng được thể hiện bằng các thành phần Unicode khác nhau.

Ví dụ:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + chấm trên + chấm dưới
let s2 = 'S\u0323\u0307'; // Ṩ, S + chấm dưới + chấm trên

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false mặc dù các ký tự trông giống hệt nhau (?!)
```

Để giải quyết vấn đề này, tồn tại thuật toán "Chuẩn hóa Unicode" đưa mỗi chuỗi về dạng "bình thường" duy nhất.

Nó được thực hiện bởi [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Thật buồn cười là trong tình huống của chúng ta, `normalize()` thực sự tập hợp một chuỗi gồm 3 ký tự thành một: `\u1e68` (S có hai dấu chấm).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Trong thực tế, điều này không phải lúc nào cũng đúng. Lý do là ký hiệu `Ṩ` là "đủ phổ biến" nên những người tạo Unicode đã đưa nó vào bảng chính và đặt mã cho nó.

Nếu bạn muốn tìm hiểu thêm về các biến thể và quy tắc chuẩn hóa -- chúng được mô tả trong phần phụ lục của tiêu chuẩn Unicode: [Biểu mẫu chuẩn hóa Unicode](https://www.unicode.org/reports/tr15/), nhưng với hầu hết mục đích thực tế, thông tin từ phần này là đủ rồi.
