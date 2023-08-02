# Lên lịch: setTimeout và setInterval

Chúng ta có thể quyết định thực hiện một hàm không phải ngay bây giờ mà vào một thời điểm nhất định sau đó. Đó gọi là "lên lịch cuộc gọi".

Có hai phương pháp cho nó:

- `setTimeout` cho phép chúng ta chạy một hàm một lần sau khoảng thời gian.
- `setInterval` cho phép chúng ta chạy lặp đi lặp lại một hàm, bắt đầu sau khoảng thời gian, sau đó lặp lại liên tục ở khoảng thời gian đó.

Các phương pháp này không phải là một phần của thông số kỹ thuật JavaScript. Nhưng hầu hết các môi trường đều có bộ lên lịch nội bộ và cung cấp các phương thức này. Đặc biệt, chúng được hỗ trợ trên tất cả các trình duyệt và Node.js.

## setTimeout

Cú pháp:

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

Tham số:

`func|code`
: Hàm hoặc một chuỗi mã để thực thi.
Thông thường, đó là một hàm. Vì lý do lịch sử, một chuỗi mã có thể được chuyển, nhưng điều đó không được khuyến khích.

`delay`
: Độ trễ trước khi chạy, tính bằng mili giây (1000 ms = 1 giây), theo mặc định là 0.

`arg1`, `arg2`...
: Đối số cho hàm (không được hỗ trợ trong IE9-)

Chẳng hạn, mã này gọi `sayHi()` sau một giây:

```js run
function sayHi() {
  alert('Hello');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

Với đối số:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "Xin chào", "John"); // Xin chào, John
*/!*
```

Nếu đối số đầu tiên là một chuỗi, thì JavaScript sẽ tạo một hàm từ nó.

Vì vậy, cái này cũng sẽ hoạt động:

```js run no-beautify
setTimeout("alert('Xin chào')", 1000);
```

Nhưng việc sử dụng các chuỗi không được khuyến nghị, hãy sử dụng các arrow function thay vì chúng, như sau:

```js run no-beautify
setTimeout(() => alert('Xin chào'), 1000);
```

````smart header="Vượt qua một hàm, nhưng không chạy nó"
Các nhà phát triển mới làm quen đôi khi mắc lỗi khi thêm dấu ngoặc `()` sau hàm:

```js
// sai!
setTimeout(sayHi(), 1000);
```
Điều đó không hoạt động, bởi vì `setTimeout` mong đợi một tham chiếu đến một hàm. Và ở đây `sayHi()` chạy hàm này và *kết quả thực thi của nó* được chuyển đến `setTimeout`. Trong trường hợp của chúng ta, kết quả của `sayHi()` là `undefined` (hàm không trả về gì cả), vì vậy không có gì được lên lịch.
````

### Hủy với ClearTimeout

Một cuộc gọi đến `setTimeout` trả về một "số nhận dạng hẹn giờ" `timerId` mà chúng ta có thể sử dụng để hủy thực thi.

Cú pháp hủy:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

Trong mã bên dưới, chúng ta lên lịch cho hàm và sau đó hủy bỏ hàm đó (đã thay đổi ý định). Kết quả là, không có gì xảy ra:

```js run no-beautify
let timerId = setTimeout(() => alert("không bao giờ xảy ra"), 1000);
alert(timerId); // mã định danh hẹn giờ

clearTimeout(timerId);
alert(timerId); // cùng một mã định danh (không trở thành null sau khi hủy)
```

Như chúng ta có thể thấy từ đầu ra `alert`, trong trình duyệt, mã định danh hẹn giờ là một số. Trong các môi trường khác, đây có thể là một cái gì đó khác. Chẳng hạn, Node.js trả về một đối tượng hẹn giờ với các phương thức bổ sung.

Một lần nữa, không có thông số kỹ thuật chung cho các phương pháp này, vì vậy điều đó không sao cả.

Đối với trình duyệt, bộ đếm giờ được mô tả trong phần [bộ đếm giờ](https://www.w3.org/TR/html5/webappapis.html#timers) của chuẩn HTML5.

## setInterval

Phương thức `setInterval` có cùng cú pháp với `setTimeout`:

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

Tất cả các đối số có cùng một ý nghĩa. Nhưng không giống như `setTimeout`, hàm này không chỉ chạy một lần mà thường xuyên sau một khoảng thời gian nhất định.

Để dừng các cuộc gọi tiếp theo, chúng ta nên gọi `clearInterval(timerId)`.

Ví dụ sau sẽ hiển thị thông báo cứ sau 2 giây. Sau 5 giây, đầu ra bị dừng:

```js run
// lặp lại với khoảng thời gian 2 giây
let timerId = setInterval(() => alert('tick'), 2000);

// sau 5 giây dừng lại
setTimeout(() => { clearInterval(timerId); alert('dừng lại'); }, 5000);
```

```smart header="Thời gian tiếp tục trong khi `alert` được hiển thị"
Trong hầu hết các trình duyệt, kể cả Chrome và Firefox, bộ đếm thời gian bên trong tiếp tục "tích tắc" trong khi hiển thị `alert/confirm/prompt`.

Vì vậy, nếu bạn chạy mã ở trên và không đóng cửa sổ `alert` trong một thời gian, thì `cảnh báo` tiếp theo sẽ được hiển thị ngay lập tức khi bạn thực hiện. Khoảng thời gian thực tế giữa các cảnh báo sẽ ngắn hơn 2 giây.
```

## setTimeout lồng nhau

Có hai cách để chạy một cái gì đó thường xuyên.

Một là `setInterval`. Cái còn lại là `setTimeout` lồng nhau, như thế này:

```js
/** thay vì:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

`setTimeout` ở trên lên lịch cuộc gọi tiếp theo ngay khi kết thúc cuộc gọi hiện tại `(*)`.

`setTimeout` lồng nhau là một phương thức linh hoạt hơn `setInterval`. Bằng cách này, cuộc gọi tiếp theo có thể được lên lịch khác nhau, tùy thuộc vào kết quả của cuộc gọi hiện tại.

Ví dụ chúng ta cần viết một dịch vụ cứ 5 giây lại gửi một yêu cầu đến server yêu cầu dữ liệu, nhưng trong trường hợp server bị quá tải thì nên tăng khoảng thời gian lên 10, 20, 40 giây...

Đây là mã giả:
```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...gửi yêu cầu...

  if (yêu cầu không thành công do quá tải máy chủ) {
    // tăng khoảng thời gian cho lần chạy tiếp theo
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```


Và nếu các hàm mà chúng ta đang lập lịch sử dụng nhiều CPU, thì chúng ta có thể đo thời gian thực hiện và lập kế hoạch cho cuộc gọi tiếp theo sớm hay muộn.

**`setTimeout` lồng nhau cho phép đặt độ trễ giữa các lần thực thi chính xác hơn `setInterval`.**

Hãy so sánh hai đoạn mã. Cái đầu tiên sử dụng `setInterval`:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

Cái thứ hai sử dụng `setTimeout` lồng nhau:

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

Đối với `setInterval`, bộ lên lịch nội bộ sẽ chạy `func(i++)` cứ sau 100 mili giây:

![](setinterval-interval.svg)

Bạn có để ý không?

**Độ trễ thực sự giữa các lệnh gọi `func` cho `setInterval` nhỏ hơn trong mã!**

Điều đó là bình thường, bởi vì thời gian thực thi của `func` "tiêu tốn" một phần của khoảng thời gian.

Có thể quá trình thực thi của `func` kéo dài hơn chúng ta mong đợi và mất hơn 100 mili giây.

Trong trường hợp này, engine đợi `func` hoàn thành, sau đó kiểm tra bộ lên lịch và nếu hết thời gian, hãy chạy lại *ngay lập tức*.

Trong trường hợp cạnh, nếu hàm luôn thực thi lâu hơn `delay` ms, thì các cuộc gọi sẽ diễn ra mà không có khoảng dừng nào cả.

Và đây là hình ảnh cho `setTimeout` lồng nhau:

![](settimeout-interval.svg)

**`setTimeout` lồng nhau đảm bảo độ trễ cố định (ở đây là 100 mili giây).**

Đó là bởi vì một cuộc gọi mới được lên kế hoạch vào cuối cuộc gọi trước đó.

````smart header="Thu gom rác và gọi lại setInterval/setTimeout"
Khi một chức năng được chuyển vào `setInterval/setTimeout`, một tham chiếu nội bộ được tạo cho nó và được lưu trong bộ lên lịch. Nó ngăn hàm bị thu gom rác, ngay cả khi không có tham chiếu nào khác đến nó.

```js
// hàm vẫn còn trong bộ nhớ cho đến khi bộ lên lịch gọi nó
setTimeout(function() {...}, 100);
```

Đối với `setInterval`, hàm này sẽ nằm trong bộ nhớ cho đến khi `clearInterval` được gọi.

Có một tác dụng phụ. Một hàm tham chiếu đến lexical environment bên ngoài, vì vậy, trong khi nó hoạt động, các biến bên ngoài cũng hoạt động. Chúng có thể chiếm nhiều bộ nhớ hơn chính hàm đó. Vì vậy, khi chúng ta không cần đến hàm đã lên lịch nữa, tốt hơn hết là hủy bỏ nó, ngay cả khi nó rất nhỏ.
````

## setTimeout không độ trễ

Có một trường hợp sử dụng đặc biệt: `setTimeout(func, 0)` hay chỉ `setTimeout(func)`.

Điều này lên lịch thực hiện `func` càng sớm càng tốt. Nhưng bộ lên lịch sẽ gọi nó chỉ sau khi tập lệnh hiện đang thực thi hoàn tất.

Vì vậy, hàm được lên lịch để chạy "ngay sau" tập lệnh hiện tại.

Chẳng hạn, kết quả này xuất ra "Xin chào", sau đó ngay lập tức là "Thế giới":

```js run
setTimeout(() => alert("Thế giới"));

alert("Xin chào");
```

Dòng đầu tiên "đặt cuộc gọi vào lịch sau 0ms". Nhưng bộ lên lịch sẽ chỉ "kiểm tra lịch" sau khi tập lệnh hiện tại hoàn tất, vì vậy `"Xin chào"` sẽ ở vị trí đầu tiên và `"Thế giới"` -- sau tập lệnh đó.

Ngoài ra còn có các trường hợp sử dụng thời gian chờ không chậm trễ liên quan đến trình duyệt nâng cao mà chúng ta sẽ thảo luận trong chương <info:event-loop>.

````smart header="Độ trễ bằng không trên thực tế không phải bằng không (trong trình duyệt)"
Trong trình duyệt, có giới hạn về tần suất chạy các bộ đếm giờ lồng nhau. [Chuẩn HTML5](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) nói: "sau năm bộ đếm giờ lồng nhau, khoảng thời gian buộc phải ít nhất là 4 mili giây.".

Hãy chứng minh ý nghĩa của nó với ví dụ dưới đây. Cuộc gọi `setTimeout` trong đó sẽ tự lên lịch lại mà không có độ trễ bằng không. Mỗi cuộc gọi ghi nhớ thời gian thực từ cuộc gọi trước đó trong array `times`. Sự chậm trễ thực sự trông như thế nào? Hãy xem nào:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // ghi nhớ độ trễ từ cuộc gọi trước

  if (start + 100 < Date.now()) alert(times); // hiển thị độ trễ sau 100ms
  else setTimeout(run); // lên lại lịch khác
});

// một ví dụ về đầu ra:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

Bộ hẹn giờ đầu tiên chạy ngay lập tức (giống như được viết trong thông số kỹ thuật), và sau đó chúng ta thấy `9, 15, 20, 24...`. Độ trễ bắt buộc hơn 4 ms giữa các lần gọi bắt đầu phát huy tác dụng.

Điều tương tự cũng xảy ra nếu chúng ta sử dụng `setInterval` thay vì `setTimeout`: `setInterval(f)` chạy `f` vài lần với độ trễ bằng 0 và sau đó với độ trễ hơn 4 ms.

Hạn chế đó có từ trước và nhiều tập lễnh dựa vào đó mà tồn tại vì những lý do lịch sử.

Đối với JavaScript phía máy chủ, giới hạn đó không tồn tại và tồn tại các cách khác để lên lịch cho một công việc không đồng bộ ngay lập tức, chẳng hạn như [setImmediate](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args) cho Node.js. Vì vậy, ghi chú này là dành riêng cho trình duyệt.
````

## Tóm tắt

- Các phương thức `setTimeout(func, delay, ...args)` và `setInterval(func, delay, ...args)` cho phép chúng ta chạy `func` một lần/thường xuyên sau `delay` mili giây.
- Để hủy thực thi, chúng ta nên gọi `clearTimeout/clearInterval` với giá trị được trả về bởi `setTimeout/setInterval`.
- Các lệnh gọi `setTimeout` lồng nhau là một giải pháp thay thế linh hoạt hơn cho `setInterval`, cho phép chúng ta đặt thời gian *giữa* các lần thực thi chính xác hơn.
- Lên lịch không độ trễ với `setTimeout(func, 0)` (giống như `setTimeout(func)`) được sử dụng để lên lịch cuộc gọi "càng sớm càng tốt, nhưng sau khi tập lệnh hiện tại hoàn tất".
- Trình duyệt giới hạn độ trễ tối thiểu cho năm lệnh gọi lồng nhau trở lên của `setTimeout` hoặc cho `setInterval` (sau lệnh gọi thứ 5) là 4 mili giây. Đó là vì lý do lịch sử.

Hãy lưu ý rằng tất cả các phương pháp lên lịch không *đảm bảo* độ trễ chính xác.

Ví dụ: bộ đếm giờ trong trình duyệt có thể chậm lại vì nhiều lý do:
- CPU bị quá tải.
- Tab trình duyệt đang ở chế độ nền.
- Laptop đang hết pin.

Tất cả những điều đó có thể làm tăng độ phân giải bộ đếm giờ tối thiểu (độ trễ tối thiểu) lên 300 mili giây hoặc thậm chí 1000 mili giây tùy thuộc vào cài đặt hiệu suất ở cấp hệ điều hành và trình duyệt.
