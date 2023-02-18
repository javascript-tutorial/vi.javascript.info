# Bảng điều khiển cho nhà phát triển

Mã dễ bị lỗi. Rất có thể bạn sẽ mắc lỗi... Ồ, tôi đang nói về cái gì vậy? Bạn *chắc chắn* sẽ mắc lỗi, ít nhất nếu bạn là người chứ không phải [người máy](https://vi.wikipedia.org/wiki/Bender_(Futurama)).

Nhưng trong trình duyệt, mặc định người dùng không thấy lỗi. Vì vậy, nếu có gì đó không ổn trong kịch bản, chúng tôi sẽ không thấy những gì bị hỏng và không thể sửa nó.

Để xem lỗi và nhận nhiều thông tin hữu ích khác về tập lệnh, "công cụ cho nhà phát triển" đã được nhúng vào trình duyệt.

Hầu hết các nhà phát triển dựa vào Chrome hoặc Firefox để phát triển vì những trình duyệt đó có các công cụ dành cho nhà phát triển tốt nhất. Các trình duyệt khác cũng cung cấp các công cụ dành cho nhà phát triển, đôi khi có các tính năng đặc biệt, nhưng thường đang "đuổi theo" Chrome hoặc Firefox. Vì vậy, hầu hết các nhà phát triển đều có trình duyệt "yêu thích" và chuyển sang trình duyệt khác nếu sự cố xảy ra với trình duyệt cụ thể.

Các công cụ dành cho nhà phát triển rất mạnh, chúng có nhiều tính năng. Để bắt đầu, chúng ta sẽ tìm hiểu cách mở chúng, xem lỗi và chạy các lệnh JavaScript.

## Google Chrome

Mở trang [bug.html](bug.html).

Có lỗi trong mã JavaScript trên đó. Nó bị ẩn khỏi mắt khách truy cập thông thường, vì vậy, hãy mở các công cụ dành cho nhà phát triển để xem nó.

Nhấn phím `F12` hoặc, nếu bạn đang sử dụng máy Mac, hãy nhấn tổ hợp phím `Cmd+Opt+J`.

Các công cụ dành cho nhà phát triển sẽ mở trên tab Bảng điều khiển theo mặc định.

Nó trông giống như thế này:

![chrome](chrome.png)

Giao diện chính xác của các công cụ dành cho nhà phát triển tùy thuộc vào phiên bản Chrome của bạn. Nó thay đổi theo thời gian nhưng phải giống nhau.

- Ở đây chúng ta có thể thấy thông báo lỗi màu đỏ. Trong trường hợp này, tập lệnh chứa lệnh "lalala" không xác định.
- Ở bên phải, có một liên kết có thể nhấp vào nguồn `bug.html:12` với số dòng nơi xảy ra lỗi.

Bên dưới thông báo lỗi có biểu tượng `>` màu xanh lam. Nó đánh dấu một "dòng lệnh" nơi chúng ta có thể gõ lệnh JavaScript. Nhấn phím `Enter` để chạy chúng.

Bây giờ chúng ta có thể thấy lỗi và thế là đủ để bắt đầu. Chúng ta sẽ quay lại với các công cụ dành cho nhà phát triển sau và đề cập sâu hơn đến việc gỡ lỗi trong chương <info:debugging-chrome>.

```smart header="Nhập nhiều dòng"
Thông thường, khi chúng ta đặt một dòng mã vào bảng điều khiển, rồi nhấn phím `Enter`, nó sẽ thực thi.

Để chèn nhiều dòng, nhấn tổ hợp phím `Shift+Enter`. Bằng cách này, người ta có thể nhập các đoạn mã JavaScript dài.
```

## Firefox, Edge và những thứ khác

Hầu hết các trình duyệt khác sử dụng phím `F12` để mở các công cụ dành cho nhà phát triển.

Giao diện của chúng khá giống nhau. Khi bạn biết cách sử dụng một trong những công cụ này (bạn có thể bắt đầu với Chrome), bạn có thể dễ dàng chuyển sang một công cụ khác.

## Cuộc đi săn

Safari (trình duyệt Mac, không được Windows/Linux hỗ trợ) có một chút đặc biệt ở đây. Trước tiên, chúng ta cần bật "Menu phát triển".

Mở Tùy chọn và chuyển đến ngăn "Nâng cao". Có một hộp kiểm ở dưới cùng:

![safari](safari.png)

Bây giờ bạn có thể sử dụng tổ hợp phím `Cmd+Opt+C` có thể chuyển đổi bảng điều khiển. Ngoài ra, lưu ý rằng mục menu trên cùng mới có tên "Develop" đã xuất hiện. Nó có nhiều lệnh và tùy chọn.

## Tóm tắt

- Các công cụ dành cho nhà phát triển cho phép chúng tôi xem lỗi, chạy lệnh, kiểm tra các biến, v.v.
- Chúng có thể được mở bằng phím `F12` đối với hầu hết các trình duyệt trên Windows. Chrome dành cho Mac cần tổ hợp phím `Cmd+Opt+J`, Safari: `Cmd+Opt+C` (cần bật trước).

Bây giờ chúng ta đã có môi trường sẵn sàng. Trong phần tiếp theo, chúng ta sẽ chuyển sang JavaScript.
