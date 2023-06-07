
# Polyfill và bộ dịch mã

Ngôn ngữ JavaScript phát triển đều đặn. Các đề xuất mới cho ngôn ngữ xuất hiện thường xuyên, chúng được phân tích và, nếu được coi là xứng đáng, sẽ được thêm vào danh sách tại <https://tc39.github.io/ecma262/> và sau đó chuyển sang [thông số kỹ thuật](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).

Các nhóm đằng sau JavaScript engine có ý tưởng riêng của họ về những gì cần triển khai trước tiên. Họ có thể quyết định thực hiện các đề xuất trong bản nháp và hoãn lại những thứ đã có trong thông số kỹ thuật, bởi vì chúng kém thú vị hơn hoặc khó thực hiện hơn.

Vì vậy, việc một engine chỉ thực hiện một phần của tiêu chuẩn là điều khá phổ biến.

Một trang tốt để xem trạng thái hỗ trợ hiện tại cho các tính năng ngôn ngữ là <https://kangax.github.io/compat-table/es6/> (nó khá lớn, chúng ta còn nhiều điều phải nghiên cứu).

Là lập trình viên, chúng ta muốn sử dụng các tính năng mới nhất. Càng nhiều thứ tốt - càng tốt!

Mặt khác, làm cách nào để mã hiện đại của chúng ta hoạt động trên các công cụ cũ hơn chưa hiểu các tính năng gần đây?

Có hai công cụ cho việc đó:

1. Bộ dịch mã.
2. Polyfill.

Ở đây, trong chương này, mục đích của chúng ta là nắm được ý chính về cách chúng hoạt động và vị trí của chúng trong quá trình phát triển web.

## Bộ dịch mã

[Bộ dịch mã](https://en.wikipedia.org/wiki/Source-to-source_compiler) là một phần mềm đặc biệt có thể phân tích cú pháp ("đọc và hiểu") mã hiện đại và viết lại mã đó bằng các cấu trúc cú pháp cũ hơn, để kết quả sẽ giống nhau.

Ví dụ. JavaScript trước năm 2020 không có "toán tử kết hợp vô giá trị" `??`. Vì vậy, nếu khách truy cập sử dụng trình duyệt lỗi thời, họ có thể không hiểu mã như `height = height ?? 100`.

Trình dịch mã sẽ phân tích mã của chúng ta và viết lại `height ?? 100` thành `(height !== undefined && height !== null) ? height : 100`.

```js
// trước khi chạy bộ dịch mã
height = height ?? 100;

// sau khi chạy bộ dịch mã
height = (height !== undefined && height !== null) ? height : 100;
```

Bây giờ mã được viết lại phù hợp với các JavaScript engine cũ hơn.

Thông thường, nhà phát triển chạy bộ dịch mã trên máy tính của chính họ, sau đó triển khai mã đã dịch tới máy chủ.

Nhắc đến tên, [Babel](https://babeljs.io) là một trong những bộ dịch mã nổi bật nhất hiện có.

Các hệ thống xây dựng dự án hiện đại, chẳng hạn như [webpack](http://webpack.github.io/), cung cấp phương tiện để chạy bộ dịch mã tự động trên mỗi thay đổi mã, vì vậy rất dễ tích hợp vào quá trình phát triển.

## Polyfill

Các tính năng ngôn ngữ mới có thể bao gồm không chỉ cấu trúc cú pháp và toán tử, mà còn cả các hàm tích hợp sẵn.

Ví dụ: `Math.trunc(n)` là hàm "cắt bỏ" phần thập phân của một số, ví dụ: `Math.trunc(1.23) = 1`.

Trong một số JavaScript engine (rất lỗi thời), không có `Math.trunc`, vì vậy mã như vậy sẽ bị lỗi.

Vì chúng ta đang nói về các hàm mới, không phải thay đổi cú pháp, nên không cần phải dịch mã bất kỳ thứ gì ở đây. Chúng ta chỉ cần khai báo hàm còn thiếu.

Tập lệnh cập nhật/thêm hàm mới được gọi là "polyfill". Nó "lấp đầy" khoảng trống và bổ sung các triển khai còn thiếu.

Đối với trường hợp cụ thể này, polyfill cho `Math.trunc` là một tập lệnh triển khai nó, như sau:

```js
if (!Math.trunc) { // nếu không có hàm như vậy
  // thực hiện nó
  Math.trunc = function(number) {
    // Math.ceil và Math.floor tồn tại ngay cả trong các JavaScript engine cổ đại
    // chúng được đề cập sau trong hướng dẫn
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript là một ngôn ngữ rất năng động, các tập lệnh có thể thêm/sửa đổi bất kỳ hàm nào, kể cả những hàm được tích hợp sẵn.

Hai thư viện polyfill thú vị là:
- [Core js](https://github.com/zloirock/core-js) hỗ trợ nhiều, chỉ cho phép đưa vào những tính năng cần thiết.
- Dịch vụ [polyfill.io](https://polyfill.io) cung cấp tập lệnh có polyfill, tùy thuộc vào tính năng và trình duyệt của người dùng.


## Tóm tắt

Trong chương này, chúng tôi muốn khuyến khích bạn nghiên cứu các tính năng ngôn ngữ hiện đại và thậm chí là "tiên tiến", ngay cả khi chúng chưa được các JavaScript engine hỗ trợ tốt.

Chỉ cần đừng quên sử dụng bộ dịch mã (nếu sử dụng cú pháp hoặc toán tử hiện đại) và polyfill (để thêm các hàm có thể bị thiếu). Và chúng sẽ đảm bảo rằng mã hoạt động.

Ví dụ: sau này khi bạn đã quen với JavaScript, bạn có thể thiết lập hệ thống xây dựng mã dựa trên [webpack](http://webpack.github.io/) với [babel-loader](https://github.com/babel/babel-loader).

Các tài nguyên tốt hiển thị trạng thái hỗ trợ hiện tại cho các tính năng khác nhau:
- <https://kangax.github.io/compat-table/es6/> - dành cho JavaScript thuần túy.
- <https://caniuse.com/> - cho các hàm liên quan đến trình duyệt.

Tái bút: Google Chrome thường là phiên bản cập nhật nhất với các tính năng ngôn ngữ, hãy dùng thử nếu bản giới thiệu hướng dẫn không thành công. Tuy nhiên, hầu hết các bản giới thiệu hướng dẫn đều hoạt động với bất kỳ trình duyệt hiện đại nào.

