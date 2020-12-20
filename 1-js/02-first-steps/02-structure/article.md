# Cấu trúc mã

Đầu tiên chúng ta sẽ học về các thành phần cơ bản nhất của một chương trình JavaScript là câu lệnh và chú thích.

## Các câu lệnh

Các câu lệnh (statement) là các cấu trúc cú pháp và các lệnh nhằm thực hiện các hành động cụ thể.

Chúng ta đã thấy một câu lệnh là `alert('Chào thế giới!')` nhằm hiển thị thông báo có nội dung "Chào thế giới!".

Thường thì mã gồm nhiều câu lệnh. Các câu lệnh được ngăn cách với nhau bởi một dấu chấm phảy.

Ví dụ, ta chia "Chào thế giới!" thành hai thông báo:

```js run no-beautify
alert('Chào'); alert('thế giới!');
```

Mỗi câu lệnh thường viết trên một dòng để dễ đọc hơn:

```js run no-beautify
alert('Chào');
alert('thế giới!');
```

## Các dấu chấm phảy [#semicolon]

Hầu như có thể bỏ qua dấu chấm phảy nếu mỗi lệnh được viết trên một dòng.

Cách viết sau vẫn hoạt động:

```js run no-beautify
alert('Chào')
alert('thế giới!')
```

Ở đây, JavaScript hiểu "ngầm" mỗi dấu xuống dòng là một dấu chấm phảy. Tính năng này gọi là [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) (tự động chèn dấu chấm phảy).

**Trong hầu hết trường hợp, một dấu xuống dòng ngụ ý một dấu chấm phảy. Nhưng cũng có trường hợp ngoại lệ!**

Trong các trường hợp này dấu xuống dòng không được JavaScript xem là dấu chấm phảy. Ví dụ:

```js run no-beautify
alert(3 +
1
+ 2);
```

Đoạn mã trên xuất ra giá trị `6` vì JavaScript không tự động chèn dấu chấm phảy vào vị trí dấu xuống dòng. Nó cho rằng nếu một dòng kết thúc bằng dấu cộng "+", thì nó là một biểu thức chưa hoàn chỉnh, nên không cần dấu chấm phảy đặt vào đó.Trong tình huống này JavaScript đã làm đúng!

**Nhưng có những tình huống JavaScript làm sai, không đặt dấu chấm phảy vào nơi cần có.**

Các lỗi xảy ra trong trường hợp này khá khó thấy và sửa.

````smart header="Một ví dụ về lỗi"
Nếu bạn tò mò muốn xem một lỗi như vậy, hãy kiểm tra mã này:

```js run
[1, 2].forEach(alert)
```

Lúc này, chưa cần biết về ý nghĩa của các dấu ngoặc vuông `[]` và `forEach`. Chúng ta sẽ học chúng sau. Bây giờ chỉ cần nhớ rằng kết quả của nó là hai thông báo liên tiếp `1` và `2`.

Bây giờ, thêm một `alert` trước mã trên và *không* kết thúc nó bằng dấu chấm phảy:

```js run no-beautify
alert("Sẽ có một lỗi")

[1, 2].forEach(alert)
```

Nếu ta chạy mã trên, chỉ `alert` đầu tiên hiển thị thông báo và sau đó có một lỗi!

Nhưng mọi thứ sẽ ổn nếu chúng ta thêm dấu chấm phảy sau `alert`:
```js run
alert("Mọi thứ đã ổn");

[1, 2].forEach(alert)
```

Giờ ta có thông báo "Mọi thứ đã ổn" sau đó là hai thông báo `1` và `2`.


Lỗi trong trường hợp không có dấu chấm phảy ở trên xuất hiện bởi vì JavaScript không tự động đặt dấu chấm phảy ở phía trước các dấu ngoặc vuông `[]`.

Bởi dấu chấm phảy không tự động được thêm vào, đoạn mã trên được xem như một lệnh duy nhất. JavaScript thấy nó như:

```js run no-beautify
alert("Sẽ có một lỗi")[1, 2].forEach(alert)
```

Cách thấy này hiển nhiên sai vì thực ra đó là hai câu lệnh, đó đó gây ra lỗi. Sai sót này cũng có thể xảy ra trong các tình huống khác.
````

Chúng tôi khuyên bạn nên đặt dấu chấm phảy giữa các câu lệnh ngay cả khi mỗi lệnh viết trên một dòng. Quy tắc này được cộng đồng áp dụng rộng rãi. Cùng nhắc lại một lần nữa -- *có thể* bỏ qua dấu chấm phảy trong hầu hết trường hợp. Nhưng để an toàn -- đặc biệt cho những người mới -- hãy luôn sử dụng chúng.

## Các chú thích [#code-comments]

Theo thời gian, chương trình ngày càng phức tạp. Trong chương trình ta cần bổ sung thêm các "chú thích" để diễn giải hoạt động của mã trong chương trình.

Các chú thích (comment) có thể đặt ở bất cứ đâu trong script. Nó không ảnh hưởng đến việc chạy script bởi JavaScript bỏ qua nó khi chạy.

**Chú thích một dòng bắt đầu bằng hai dấu gạch chéo `//`.**

Toàn bộ phần còn lại của dòng là chú thích. Chú thích một dòng có thể chiếm cả dòng, hoặc theo sau một câu lệnh.

Ví dụ:
```js run
// Chú thích này chiếm cả dòng
alert('Chào');

alert('thế giới!'); // Chú thích này theo sau một câu lệnh
```

**Chú thích nhiều dòng bắt đầu bằng một dấu gạch chéo và một dấu sao <code>/&#42;</code> và kết thúc bằng một dấu sao và một dấu gạch chéo <code>&#42;/</code>.**

Ví dụ:

```js run
/* Một ví dụ về hai thông báo.
Đây là một chú thích nhiều dòng
*/
alert('Chào');
alert('thế giới!');
```

Nội dung của chú thích bị bỏ qua, nên nếu đặt mã JavaScript trong <code>/&#42; ... &#42;/</code> nó sẽ không chạy.

Có thể lợi dụng điều này để tạm thời vô hiệu hóa một phần mã:

```js run
/* "Chú thích hóa" mã để vô hiệu hóa nó
alert('Chào');
*/
alert('World');
```

```smart header="Dùng phím tắt!"
Trong hầu hết các trình soạn thảo mã, có thể chú thích hóa một dòng mã bằng tổ hợp phím `key:Ctrl+/`, nhiều dòng mã bằng tổ hợp phím `key:Ctrl+Shift+/`. Trên máy Mac, dùng `key:Cmd` thay cho `key:Ctrl` và `key:Option` thay cho `key:Shift`.
```

````warn header="Không được phép đặt một chú thích trong một chú thích khác (nested comment)!"
Không thể đặt `/*...*/` trong một `/*...*/` khác.

Mã sau không chạy và dẫn tới một lỗi:

```js run no-beautify
/*
  /* chú thích trong chú thích ?!? */
*/
alert( 'thế giới!' );
```
````

Đừng do dự hãy chú thích ngay cho mã của bạn.

Chú thích tuy làm tăng kích thước mã, nhưng điều đó không thành vấn đê. Có nhiều công cụ thu nhỏ mã trước khi đưa lên máy chủ. Chúng xóa các chú thích và chú thích không xuất hiện trong mã sản phẩm chính thức. Bởi vậy chú thích không gây ra các ảnh hưởng tiêu cực tới chương trình.

Sau này trong chương <info:code-quality> chúng ta sẽ học cách viết chú thích sao cho hiệu quả.
