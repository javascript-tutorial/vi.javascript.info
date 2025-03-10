Hàm tạo `new Date` sử dụng múi giờ địa phương. Vì vậy, điều quan trọng duy nhất cần nhớ là tháng bắt đầu từ con số không.

Vậy tháng 2 có số 1.

Đây là một ví dụ với các số là thành phần ngày:

```js run
//new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
Chúng ta cũng có thể tạo một ngày từ một chuỗi, như thế này:

```js run
//new Date(datastring)
let d2 = new Date("February 20, 2012 03:12:00");
alert( d2 );
```
