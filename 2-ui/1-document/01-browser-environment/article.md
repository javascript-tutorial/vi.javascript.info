# Môi trường trình duyệt, các thông số kỹ thuật

Ngôn ngữ JavaScript được tạo ra với mục đích ban đầu là dành cho những trình duyệt web. Kể từ đó nó đã tiến hoá và trở thành một ngôn ngữ có nhiều công dụng và nền tảng.

Một nền tảng có thể là trình duyệt, máy chủ web hoặc một *máy chủ* khác, hoặc là cả một máy pha cà phê *thông minh*, nếu nó có thể chạy bằng JavaScript. Mỗi một nền tảng cung cấp chức năng mang tính riêng biệt. Việc đặc tả của JavaScript gọi đó là *môi trường máy chủ*.

Môi trường máy chủ cung cấp các đối tượng và các hàm riêng bổ sung cho lõi của ngôn ngữ. Trình duyệt web cung cấp phương tiện để kiểm soát các trang web. Node.js cung cấp các tính năng từ phía máy chủ, v.v.

Đây là cái nhìn toàn cảnh về những gì chúng ta có khi JavaScript chạy trong trình duyệt web:

![](windowObjects.svg)

Có một đối tượng "gốc" được gọi là `cửa sổ`. Nó có hai vai trò:

1. Đầu tiên, nó là một đối tượng chung cho mã JavaScript, như được mô tả trong chương <info:global-object>.
2. Thứ hai, nó đại diện cho "cửa sổ trình duyệt" và cung cấp các phương thức để kiểm soát nó.

Ví dụ, ở đây chúng ta sử dụng nó như một đối tượng toàn cục:

```js run
function sayHi() {
  alert("Xin chào");
}

// các hàm toàn cục là các phương thức của đối tượng toàn cục:
window.sayHi();
```

Còn ở đây thì chúng ta sử dụng nó làm cửa sổ trình duyệt, để xem chiều cao của cửa sổ:

```js run
alert(window.innerHeight); // chiều cao bên trong của cửa sổ
```

Có nhiều phương thức và thuộc tính dành riêng cho cửa sổ hơn, chúng ta sẽ đề cập đến chúng sau.

## DOM (Document Object Model)

Mô hình đối tượng tài liệu hoặc viết tắt là DOM, thể hiện tất cả nội dung trang dưới dạng các đối tượng có thể được sửa đổi.

Đối tượng `document` là "điểm vào" chính của trang. Chúng ta có thể thay đổi hoặc tạo bất cứ thứ gì trên trang bằng cách sử dụng nó.

Ví dụ:
```js run
// thay đổi màu nền thành màu đỏ
document.body.style.background = "red";

// change it back after 1 second
setTimeout(() => document.body.style.background = "", 1000);
```

Ở đây chúng ta đã sử dụng `document.body.style`, nhưng còn nhiều hơn thế nữa. Các thuộc tính và phương thức được mô tả trong thông số kỹ thuật: [Tiêu chuẩn cơ bản của DOM](https://dom.spec.whatwg.org).

```smart header="DOM không chỉ dành cho trình duyệt"
Việc đặc tả DOM giải thích cấu trúc của tài liệu và cung cấp các đối tượng để thao tác với nó. Có những công cụ không có trình duyệt cũng sử dụng DOM.

Ví dụ: các tập lệnh phía máy chủ tải xuống các trang HTML và xử lý chúng cũng có thể sử dụng DOM. Tuy nhiên, chúng có thể chỉ hỗ trợ một phần thông số kỹ thuật.
```

```smart header="CSSOM cho việc thiết kế"
Ngoài ra còn có một thông số kỹ thuật riêng, [Mô hình đối tượng CSS (CSSOM)](https://www.w3.org/TR/cssom-1/) dành cho các quy tắc và biểu định kiểu CSS, giải thích cách chúng được thể hiện dưới dạng đối tượng và cách đọc và viết chúng.

CSSOM được sử dụng cùng với DOM khi chúng tôi sửa đổi quy tắc kiểu cho tài liệu. Tuy nhiên, trên thực tế, CSSOM hiếm khi được yêu cầu vì chúng ta hiếm khi cần sửa đổi các quy tắc CSS từ JavaScript (thông thường chúng ta chỉ thêm/xóa các lớp CSS chứ không sửa đổi các quy tắc CSS của chúng), nhưng điều đó cũng có thể thực hiện được.
```

## BOM (Browser Object Model)

Mô hình đối tượng trình duyệt (BOM) đại diện cho các đối tượng bổ sung được cung cấp bởi trình duyệt (môi trường máy chủ) để làm việc với mọi thứ ngoại trừ tài liệu.

Ví dụ:

- Đối tượng [navigator](mdn:api/Window/navigator) cung cấp thông tin cơ bản về trình duyệt và hệ điều hành. Có nhiều thuộc tính, nhưng hai thuộc tính được biết đến rộng rãi nhất là: `navigator.userAgent` -- về trình duyệt hiện tại và `navigator.platform` -- về nền tảng (có thể giúp phân biệt giữa Windows/Linux/Mac, v.v.).
- Đối tượng [location](mdn:api/Window/location) cho phép chúng ta đọc URL hiện tại và có thể chuyển hướng trình duyệt sang một URL mới.

Đây là cách chúng ta có thể sử dụng đối tượng `location`:

```js run
alert(location.href); // hiển thị URL hiện tại
if (confirm("Truy cập vào Wikipedia?")) {
  location.href = "https://wikipedia.org"; // chuyển hướng trình duyệt đến một URL khác
}
```

Các chức năng `cảnh báo/xác nhận/nhắc nhở` cũng là một phần của BOM: chúng không liên quan trực tiếp đến tài liệu nhưng thể hiện các phương thức giao tiếp thuần túy của trình duyệt với người dùng.

```smart header="Những đặc tả"
BOM là một phần của [đặc tả HTML] chung(https://html.spec.whatwg.org).

Có, bạn nghe nói rằng ngay. Thông số HTML tại <https://html.spec.whatwg.org> không chỉ nói về "ngôn ngữ HTML" (thẻ, thuộc tính) mà còn bao gồm một loạt đối tượng, phương thức và tiện ích mở rộng DOM dành riêng cho trình duyệt. Đó là "HTML theo nghĩa rộng". Ngoài ra, một số bộ phận còn có thông số kỹ thuật bổ sung được liệt kê tại <https://spec.whatwg.org>.
```

## Tóm tắt

Nói về tiêu chuẩn, chúng ta có:

Đặc tả DOM
: Mô tả cấu trúc tài liệu, các thao tác và sự kiện, xem <https://dom.spec.whatwg.org>.

Đặc tả CSSOM
: Mô tả các bảng định kiểu và quy tắc kiểu, các thao tác với chúng và ràng buộc của chúng với tài liệu, xem <https://www.w3.org/TR/cssom-1/>.

Đặc tả HTML
: Mô tả ngôn ngữ HTML (ví dụ: thẻ) và cả BOM (mô hình đối tượng trình duyệt) -- các chức năng trình duyệt khác nhau: `setTimeout`, `alert`, `location`, v.v., xem <https://html.spec.whatwg .org>. Nó lấy đặc tả DOM và mở rộng nó với nhiều thuộc tính và phương thức bổ sung.

Ngoài ra, một số lớp được mô tả riêng tại <https://spec.whatwg.org/>.

Vui lòng lưu ý các liên kết này, vì có quá nhiều thứ cần học nên không thể trình bày và ghi nhớ hết mọi thứ.

Khi bạn muốn đọc về một thuộc tính hoặc một phương thức, hướng dẫn sử dụng Mozilla tại <https://developer.mozilla.org/en-US/search> cũng là một tài nguyên hay, nhưng thông số kỹ thuật tương ứng có thể tốt hơn: nó phức tạp hơn và dài hơn để đọc, nhưng sẽ làm cho kiến ​​thức cơ bản của bạn trở nên rõ ràng và đầy đủ.

Để tìm thứ gì đó, thường rất thuận tiện khi sử dụng tìm kiếm trên internet "WHATWG [thuật ngữ]" hoặc "MDN [thuật ngữ]", ví dụ: <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Bây giờ chúng ta sẽ bắt đầu tìm hiểu DOM vì tài liệu này đóng vai trò trung tâm trong giao diện người dùng.