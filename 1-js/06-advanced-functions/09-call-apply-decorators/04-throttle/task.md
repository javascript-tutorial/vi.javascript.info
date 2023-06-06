importance: 5

---

# Decorator điều tiết

Tạo một decorator "điều tiết" `throttle(f, ms)` -- trả về một wrapper.

Khi được gọi nhiều lần, nó sẽ chuyển lệnh gọi tới `f` tối đa một lần trong mỗi mili giây `ms`.

Sự khác biệt với debounce là nó là decorator hoàn toàn khác:
- `debounce` chạy hàm một lần sau khoảng thời gian "hồi". Tốt để xử lý kết quả cuối cùng.
- `throttle` chạy nó không thường xuyên hơn thời gian `ms` đã cho. Tốt cho các cập nhật thường xuyên mà không nên không thường xuyên.

Nói cách khác, `throttle` giống như một thư ký chấp nhận các cuộc gọi điện thoại, nhưng làm phiền sếp (gọi thực tế là `f`) không quá một lần mỗi `ms` mili giây.

Hãy kiểm tra ứng dụng thực tế để hiểu rõ hơn về yêu cầu đó và xem nó đến từ đâu.

**Chẳng hạn, chúng ta muốn theo dõi chuyển động của chuột.**

Trong trình duyệt, chúng ta có thể thiết lập một hàm để chạy ở mọi chuyển động của chuột và nhận vị trí con trỏ khi nó di chuyển. Trong quá trình sử dụng chuột hoạt động, hàm này thường chạy rất thường xuyên, có thể khoảng 100 lần mỗi giây (cứ sau 10 ms).
**Chúng ta muốn cập nhật một số thông tin trên trang web khi con trỏ di chuyển.**

...Nhưng cập nhật hàm `update()` quá nặng để thực hiện trên mọi chuyển động vi mô. Cũng không có ý nghĩa gì khi cập nhật thường xuyên hơn một lần trong 100 ms.

Vì vậy, chúng ta sẽ đưa nó vào decorator: sử dụng `throttle(update, 100)` làm hàm chạy trên mỗi lần di chuyển chuột thay vì `update()` ban đầu. Decorator sẽ được gọi thường xuyên, nhưng chuyển tiếp lệnh gọi tới `update()` tối đa một lần trong 100 ms.

Cách trực quan, nó sẽ trông như thế này

1. Đối với chuyển động chuột đầu tiên, biến thể được trang trí ngay lập tức chuyển lệnh gọi tới `update`. Điều đó quan trọng, người dùng sẽ thấy phản ứng của chúng ta đối với động thái của họ ngay lập tức.
2. Sau đó, khi chuột di chuyển, cho đến `100ms` thì không có gì xảy ra. Biến thể được trang trí bỏ qua các cuộc gọi.
3. Vào cuối `100ms` -- một `update` nữa xảy ra với tọa độ cuối cùng.
4. Sau đó, cuối cùng, con chuột dừng lại ở đâu đó. Biến thể được trang trí đợi cho đến khi hết hạn `100ms` rồi chạy `update` với tọa độ cuối cùng. Vì vậy, khá quan trọng, tọa độ chuột cuối cùng được xử lý.

Một ví dụ mã:

```js
function f(a) {
  console.log(a);
}

// f1000 chuyển cuộc gọi tới f tối đa một lần trong 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // hiện 1
f1000(2); // (điều tiết, 1000ms chưa hết)
f1000(3); // (điều tiết, 1000ms chưa hết)

// khi hết thời gian 1000 ms ...
// ...outputs 3, intermediate value 2 was ignored
```

P.S. Arguments and the context `this` passed to `f1000` should be passed to the original `f`.
