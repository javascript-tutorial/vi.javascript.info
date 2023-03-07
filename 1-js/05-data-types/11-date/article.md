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

That can be used for time measurements:

```js run
let start = new Date(); // start measuring time

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // end measuring time

alert( `The loop took ${end - start} ms` );
```

## Date.now()

If we only want to measure time, we don't need the `Date` object.

There's a special method `Date.now()` that returns the current timestamp.

It is semantically equivalent to `new Date().getTime()`, but it doesn't create an intermediate `Date` object. So it's faster and doesn't put pressure on garbage collection.

It is used mostly for convenience or when performance matters, like in games in JavaScript or other specialized applications.

So this is probably better:

```js run
*!*
let start = Date.now(); // milliseconds count from 1 Jan 1970
*/!*

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
```

## Benchmarking

If we want a reliable benchmark of CPU-hungry function, we should be careful.

For instance, let's measure two functions that calculate the difference between two dates: which one is faster?

Such performance measurements are often called "benchmarks".

```js
// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

These two do exactly the same thing, but one of them uses an explicit `date.getTime()` to get the date in ms, and the other one relies on a date-to-number transform. Their result is always the same.

So, which one is faster?

The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it at least 100000 times.

Let's measure:

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

Wow! Using `getTime()` is so much faster! That's because there's no type conversion, it is much easier for engines to optimize.

Okay, we have something. But that's not a good benchmark yet.

Imagine that at the time of running `bench(diffSubtract)` CPU was doing something in parallel, and it was taking resources. And by the time of running `bench(diffGetTime)` that work has finished.

A pretty real scenario for a modern multi-process OS.

As a result, the first benchmark will have less CPU resources than the second. That may lead to wrong results.

**For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.**

For example, like this:

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
// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Modern JavaScript engines start applying advanced optimizations only to "hot code" that executes many times (no need to optimize rarely executed things). So, in the example above, first executions are not well-optimized. We may want to add a heat-up run:

```js
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Be careful doing microbenchmarking"
Modern JavaScript engines perform many optimizations. They may tweak results of "artificial tests" compared to "normal usage", especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won't need microbenchmarks at all.

The great pack of articles about V8 can be found at <http://mrale.ph>.
```

## Date.parse from a string

The method [Date.parse(str)](mdn:js/Date/parse) can read a date from a string.

The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:

- `YYYY-MM-DD` -- is the date: year-month-day.
- The character `"T"` is used as the delimiter.
- `HH:mm:ss.sss` -- is the time: hours, minutes, seconds and milliseconds.
- The optional `'Z'` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` would mean UTC+0.

Shorter variants are also possible, like `YYYY-MM-DD` or `YYYY-MM` or even `YYYY`.

The call to `Date.parse(str)` parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns `NaN`.

For instance:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

We can instantly create a `new Date` object from the timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Summary

- Date and time in JavaScript are represented with the [Date](mdn:js/Date) object. We can't create "only date" or "only time": `Date` objects always carry both.
- Months are counted from zero (yes, January is a zero month).
- Days of week in `getDay()` are also counted from zero (that's Sunday).
- `Date` auto-corrects itself when out-of-range components are set. Good for adding/subtracting days/months/hours.
- Dates can be subtracted, giving their difference in milliseconds. That's because a `Date` becomes the timestamp when converted to a number.
- Use `Date.now()` to get the current timestamp fast.

Note that unlike many other systems, timestamps in JavaScript are in milliseconds, not in seconds.

Sometimes we need more precise time measurements. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has [performance.now()](mdn:api/Performance/now) that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, only the first 3 are correct
```

Node.js has `microtime` module and other ways. Technically, almost any device and environment allows to get more precision, it's just not in `Date`.
