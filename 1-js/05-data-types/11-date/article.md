# Ngày và giờ

Hãy làm quen với một đối tượng được tích hợp mới: [Date](mdn:js/Date). Nó lưu trữ ngày, giờ và cung cấp các phương thức để quản lý ngày/giờ.

Chẳng hạn, chúng ta có thể sử dụng nó để lưu trữ, tạo/sửa đổi thời gian, để đo thời gian hoặc chỉ để in ra ngày hiện tại.

## Tạo

Để tạo một đối tượng `Date` mới, hãy gọi `new Date()` với một trong các đối số sau:

`new Date()`
: Không có đối số -- tạo đối tượng `Date` cho ngày và giờ hiện tại:

    ```js run
    let now = new Date();
    alert( now ); // hiển thị ngày/giờ hiện tại
    ```

`new Date(milliseconds)`
: Tạo đối tượng `Date` với thời gian bằng số mili giây (1/1000 giây) được chuyển sau ngày 1 tháng 1 năm 1970 UTC+0.

    ```js run
    // 0 nghĩa là 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // bây giờ thêm 24 giờ, nhận được 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Một số nguyên đại diện cho số mili giây đã trôi qua kể từ đầu năm 1970 được gọi là *dấu thời gian*.

    Đó là một đại diện số nhẹ của một ngày. Chúng ta luôn có thể tạo ngày từ dấu thời gian bằng cách sử dụng `new Date(timestamp)` và chuyển đổi đối tượng `Date` hiện có thành dấu thời gian bằng cách sử dụng phương thức `date.getTime()` (xem bên dưới).

    Ngày trước 01.01.1970 có dấu thời gian âm, ví dụ:
    ```js run
    // 31 tháng 12 năm 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Nếu có một đối số duy nhất và đó là một chuỗi thì nó sẽ được phân tích cú pháp tự động. Thuật toán giống như cách sử dụng `Date.parse`, chúng ta sẽ đề cập đến nó sau.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Thời gian không được đặt, do đó, nó được coi là nửa đêm theo giờ GMT và
    // được điều chỉnh theo múi giờ mà mã được chạy
    // Vì vậy, kết quả có thể là
    // Thứ Năm, ngày 26 tháng 1 năm 2017 11:00:00 GMT+1100 (Giờ ban ngày miền Đông nước Úc)
    // hoặc
    // Thứ tư ngày 25 tháng 1 năm 2017 16:00:00 GMT-0800 (Giờ chuẩn Thái Bình Dương)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Tạo ngày với các thành phần đã cho theo múi giờ địa phương. Chỉ có hai đối số đầu tiên là bắt buộc.

    - `year` phải có 4 chữ số: `2013` được, `98` thì không.
    - Số lượng `month` bắt đầu bằng `0` (tháng 1), cho đến `11` (tháng 12).
    - Tham số `date` thực sự là ngày trong tháng, nếu không có thì `1` được giả định.
    - Nếu `hours/minute/seconds/ms` không có, chúng được coi là bằng `0`.

    Ví dụ:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // Ngày 1 tháng 1 năm 2011, 00:00:00
    new Date(2011, 0, 1); // giống nhau, giờ vv là 0 theo mặc định
    ```

    Độ chính xác tối đa là 1 ms (1/1000 giây):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Truy cập thành phần ngày

Có các phương thức để truy cập năm, tháng, v.v. từ đối tượng `Date`:

[getFullYear()](mdn:js/Date/getFullYear)
: Lấy năm (4 chữ số)

[getMonth()](mdn:js/Date/getMonth)
: Lấy tháng, **từ 0 đến 11**.

[getDate()](mdn:js/Date/getDate)
: Lấy ngày trong tháng, từ 1 đến 31, tên của phương thức trông hơi lạ.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Lấy các thành phần thời gian tương ứng.

```warn header="Không phải `getYear()`, mà là `getFullYear()`"
Nhiều JavaScript engine triển khai một phương thức không chuẩn `getYear()`. Phương pháp này không được chấp nhận. Đôi khi nó trả về năm có 2 chữ số. Xin vui lòng không bao giờ sử dụng nó. Có `getFullYear()` cho năm.
```

Ngoài ra, chúng ta có thể nhận được một ngày trong tuần:

[getDay()](mdn:js/Date/getDay)
: Lấy ngày trong tuần, từ `0` (Chủ Nhật) đến `6` (Thứ Bảy). Ngày đầu tiên luôn là Chủ nhật, ở một số quốc gia thì không như vậy nhưng không thể thay đổi.

**Tất cả các phương pháp trên trả về các thành phần liên quan đến múi giờ địa phương.**

Ngoài ra còn có các đối tác UTC của chúng, trả về ngày, tháng, năm, v.v. cho múi giờ UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js /Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Chỉ cần chèn `"UTC"` ngay sau `"get"`.

Nếu múi giờ địa phương của bạn bị thay đổi so với UTC, thì mã bên dưới sẽ hiển thị các giờ khác nhau:

```js run
// ngày hiện tại
let date = new Date();

// giờ trong múi giờ hiện tại của bạn
alert( date.getHours() );

// giờ theo múi giờ UTC+0 (giờ Luân Đôn không tiết kiệm ánh sáng ban ngày)
alert( date.getUTCHours() );
```

Bên cạnh các phương thức đã cho, có hai phương thức đặc biệt không có biến thể UTC:

[getTime()](mdn:js/Date/getTime)
: Trả về dấu thời gian cho ngày -- một số mili giây được truyền từ ngày 1 tháng 1 năm 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Trả về sự khác biệt giữa UTC và múi giờ địa phương, tính bằng phút:

    ```js run
    // nếu bạn đang ở múi giờ UTC-1, kết quả là 60
    // nếu bạn đang ở múi giờ UTC+3, kết quả là -180
    alert( new Date().getTimezoneOffset() );

    ```

## Đặt thành phần ngày

Các phương pháp sau đây cho phép thiết lập các thành phần ngày/giờ:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (đặt toàn bộ ngày theo mili giây kể từ 01.01.1970 UTC)

Mỗi một trong số chúng ngoại trừ `setTime()` đều có một biến thể UTC, ví dụ: `setUTCHours()`.

Như chúng ta có thể thấy, một số phương thức có thể thiết lập nhiều thành phần cùng một lúc, ví dụ `setHours`. Các thành phần không được đề cập không được sửa đổi.

Ví dụ:

```js run
let today = new Date();

today.setHours(0);
alert(today); // vẫn là hôm nay, nhưng giờ được đổi thành 0

today.setHours(0, 0, 0, 0);
alert(today); // vẫn là hôm nay, bây giờ 00:00:00 đúng.
```

## Tự động sửa lỗi

*Tự động sửa lỗi* là một tính năng rất tiện dụng của các đối tượng `Date`. Chúng ta có thể đặt các giá trị nằm ngoài phạm vi và nó sẽ tự động điều chỉnh.

Ví dụ:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 tháng 1 năm 2013 ?!?
alert(date); // ...là ngày 1 tháng 2 năm 2013!
```

Các thành phần ngày nằm ngoài phạm vi được phân phối tự động.

Giả sử chúng ta cần tăng ngày "28 Feb 2016" thêm 2 ngày. Nó có thể là "2 tháng 3" hoặc "1 tháng 3" trong trường hợp năm nhuận. Chúng ta không cần phải suy nghĩ về nó. Chỉ cần thêm 2 ngày. Đối tượng `Date` sẽ làm phần còn lại:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Tháng 3 năm 2016
```

Tính năng đó thường được sử dụng để lấy ngày sau một khoảng thời gian nhất định. Chẳng hạn, hãy lấy ngày cho "70 giây sau bây giờ":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // hiển thị ngày chính xác
```

Chúng ta cũng có thể đặt giá trị bằng 0 hoặc thậm chí âm. Ví dụ:

```js run
let date = new Date(2016, 0, 2); // 2 tháng 1 năm 2016

date.setDate(1); // đặt ngày 1 của tháng
alert( date );

date.setDate(0); // ngày tối thiểu là 1, vì vậy ngày cuối cùng của tháng trước được giả định
alert( date ); // 31 tháng 12 năm 2015
```

## Ngày thành số, ngày khác

Khi một đối tượng `Date` được chuyển đổi thành số, nó sẽ trở thành dấu thời gian giống như `date.getTime()`:

```js run
let date = new Date();
alert(+date); // số mili giây, giống như date.getTime()
```

Tác dụng phụ quan trọng: ngày có thể được trừ đi, kết quả là sự khác biệt của chúng tính bằng ms.

Điều đó có thể được sử dụng để đo thời gian:

```js run
let start = new Date(); // bắt đầu đo thời gian

// thực hiện công việc
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // kết thúc thời gian đo

alert( `The loop took ${end - start} ms` );
```

## Date.now()

Nếu chúng ta chỉ muốn đo thời gian, chúng ta không cần đối tượng `Date`.

Có một phương thức đặc biệt `Date.now()` trả về dấu thời gian hiện tại.

Về mặt ngữ nghĩa, nó tương đương với `new Date().getTime()`, nhưng nó không tạo đối tượng `Date` trung gian. Vì vậy, nó nhanh hơn và không gây áp lực cho việc thu gom rác.

Nó được sử dụng chủ yếu để thuận tiện hoặc khi hiệu suất quan trọng, chẳng hạn như trong các trò chơi bằng JavaScript hoặc các ứng dụng chuyên dụng khác.

Vì vậy, điều này có lẽ là tốt hơn:

```js run
*!*
let start = Date.now(); // mili giây tính từ ngày 1 tháng 1 năm 1970
*/!*

// thực hiện công việc
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // xong
*/!*

alert( `The loop took ${end - start} ms` ); // trừ số, không phải ngày
```

## Chấm điểm

Nếu chúng ta muốn có một điểm chuẩn đáng tin cậy của hàm ngốn CPU, chúng ta nên cẩn thận.

Chẳng hạn, hãy đo lường hai hàm tính toán sự khác biệt giữa hai ngày: hàm nào nhanh hơn?

Các phép đo hiệu suất như vậy thường được gọi là "chấm điểm".

```js
// chúng ta có date1 và date2, hàm nào trả về chênh lệch đơn vị ms nhanh hơn?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// hoặc
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Hai cái này thực hiện chính xác cùng một việc, nhưng một trong số chúng sử dụng `date.getTime()` rõ ràng để lấy ngày tính bằng ms và cái còn lại dựa vào phép biến đổi ngày thành số. Kết quả của chúng luôn giống nhau.

Vậy, cái nào nhanh hơn?

Ý tưởng đầu tiên có thể là chạy chúng nhiều lần liên tiếp và đo chênh lệch thời gian. Đối với trường hợp của chúng ta, các hàm rất đơn giản, vì vậy chúng ta phải thực hiện ít nhất 100000 lần.

Hãy đo:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Ồ! Sử dụng `getTime()` nhanh hơn rất nhiều! Đó là bởi vì không có chuyển đổi loại, các engine sẽ tối ưu hóa dễ dàng hơn nhiều.

Được rồi, chúng ta có một cái gì đó. Nhưng đó vẫn chưa phải là một điểm chuẩn tốt.

Hãy tưởng tượng rằng tại thời điểm chạy `bench(diffSubtract)` CPU đang làm một việc gì đó song song và nó đang lấy tài nguyên. Và vào thời điểm chạy `bench(diffGetTime)` thì công việc đó đã hoàn thành.

Một kịch bản khá thực tế cho một hệ điều hành đa tiến trình hiện đại.

Do đó, điểm chuẩn đầu tiên sẽ có ít tài nguyên CPU hơn điểm chuẩn thứ hai. Điều đó có thể dẫn đến kết quả sai.

**Để đo điểm chuẩn đáng tin cậy hơn, toàn bộ màn chấm điểm phải được chạy lại nhiều lần.**

Ví dụ, như thế này:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// chạy màn chấm điểm (diffSubtract) và màn chấm điểm (diffGetTime) mỗi lần 10 lần xen kẽ
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Các JavaScript engine hiện đại chỉ bắt đầu áp dụng tối ưu hóa nâng cao cho "mã nóng" thực thi nhiều lần (không cần tối ưu hóa những thứ hiếm khi được thực thi). Vì vậy, trong ví dụ trên, lần thực thi đầu tiên không được tối ưu hóa tốt. Chúng ta có thể muốn thêm một lần khởi động:

```js
// được thêm vào để "làm nóng" trước vòng lặp chính
bench(diffSubtract);
bench(diffGetTime);

// bây giờ chấm điểm
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Hãy cẩn thận khi thực hiện chấm điểm rất nhỏ"
Các JavaScript engine hiện đại thực hiện nhiều tối ưu hóa. Họ có thể điều chỉnh kết quả của "các bài kiểm tra nhân tạo" so với "việc sử dụng thông thường", đặc biệt là khi chúng ta đánh giá một thứ gì đó rất nhỏ, chẳng hạn như cách thức hoạt động của một toán tử hoặc một hàm tích hợp sẵn. Vì vậy, nếu bạn thực sự muốn hiểu hiệu suất, thì hãy nghiên cứu cách thức hoạt động của công cụ JavaScript. Và sau đó, bạn có thể sẽ không cần chấm điểm rất nhỏ nữa.

Bạn có thể tìm thấy những bài viết tuyệt vời về V8 tại <http://mrale.ph>.
```

## Date.parse từ một chuỗi

Phương thức [Date.parse(str)](mdn:js/Date/parse) có thể đọc ngày từ một chuỗi.

Định dạng chuỗi nên là: `YYYY-MM-DDTHH:mm:ss.sssZ`, trong đó:

- `YYYY-MM-DD` -- là ngày: năm-tháng-ngày.
- Ký tự `"T"` được sử dụng làm dấu phân cách.
- `HH:mm:ss.sss` -- là thời gian: giờ, phút, giây và mili giây.
- Phần `'Z'` tùy chọn biểu thị múi giờ ở định dạng `+-hh:mm`. Một chữ cái `Z` có nghĩa là UTC+0.

Cũng có thể có các biến thể ngắn hơn, chẳng hạn như `YYYY-MM-DD` hoặc `YYYY-MM` hoặc thậm chí `YYYY`.

Lệnh gọi `Date.parse(str)` phân tích cú pháp chuỗi ở định dạng đã cho và trả về dấu thời gian (số mili giây từ ngày 1 tháng 1 năm 1970 UTC+0). Nếu định dạng không hợp lệ, trả về `NaN`.

Ví dụ:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (dấu thời gian)
```

Chúng ta có thể tạo ngay một đối tượng `new Date` từ dấu thời gian:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Tóm tắt

- Ngày và giờ trong JavaScript được biểu thị bằng đối tượng [Date](mdn:js/Date). Chúng ta không thể tạo "chỉ ngày" hoặc "chỉ thời gian": Các đối tượng `Date` luôn mang cả hai.
- Các tháng được tính từ 0 (đúng, tháng 1 là tháng 0).
- Các ngày trong tuần trong `getDay()` cũng được tính từ 0 (đó là Chủ Nhật).
- `Ngày` tự động sửa khi các thành phần nằm ngoài phạm vi được đặt. Tốt cho việc cộng/trừ ngày/tháng/giờ.
- Ngày có thể được trừ đi, đưa ra sự khác biệt của chúng tính bằng mili giây. Đó là vì `Ngày` trở thành dấu thời gian khi được chuyển đổi thành số.
- Sử dụng `Date.now()` để lấy nhanh dấu thời gian hiện tại.

Lưu ý rằng không giống như nhiều hệ thống khác, dấu thời gian trong JavaScript tính bằng mili giây chứ không phải giây.

Đôi khi chúng ta cần các phép đo thời gian chính xác hơn. Bản thân JavaScript không có cách đo thời gian tính bằng micro giây (1 phần triệu giây), nhưng hầu hết các môi trường đều cung cấp tính năng này. Chẳng hạn, trình duyệt có [performance.now()](mdn:api/Performance/now) cung cấp số mili giây kể từ khi bắt đầu tải trang với độ chính xác micro giây (3 chữ số sau dấu chấm):

```js run
alert(`Bắt đầu tải ${performance.now()}ms trước`);
// Cái gì đó như: "Bắt đầu tải 34731.26000000001ms trước"
// .26 là micro giây (260 micro giây)
// hơn 3 chữ số sau dấu thập phân là lỗi chính xác, chỉ 3 chữ số đầu tiên là đúng
```

Node.js có mô-đun `microtime` và các cách khác. Về mặt kỹ thuật, hầu hết mọi thiết bị và môi trường đều cho phép đạt được độ chính xác cao hơn, chỉ là không ở `Date`.
