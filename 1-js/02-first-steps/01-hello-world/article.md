# Chào thế giới!

Phần này của hướng dẫn bàn về cốt lõi của JavaScript, về bản thân ngôn ngữ.

Nhưng để chạy được JavaScript chúng ta cần một môi trường (enviroment), và bởi các hướng dẫn này được đưa lên webiste, môi trường trình duyệt (browser) là sự lựa chọn tốt hơn cả. Chúng ta phải sử dụng một số lệnh chỉ có trên môi trường trình duyệt (như `alert`) nhưng chúng không nhiều. Nếu bạn có kế hoạch học JavaScript để làm việc trên môi trường khác (như Node.js) bạn cũng sẽ không mất quá nhiều thời gian để học chúng. Ở [phần sau](/ui) của hướng dẫn này chúng ta sẽ tập trung vào cách sử dụng JavaScript trên trình duyệt.

Đầu tiên, chúng ta học cách làm sao để đưa một script (một đoạn mã JavaScript) vào một trang web. Trong môi trường máy chủ (như Node.js), bạn có thể đặt script này trong tệp `my.js` và chạy chỉ bằng một câu lệnh `"node my.js"`.

## Thẻ "script"

Các chương trình JavaScript có thể được chèn vào hầu như bất kỳ đâu trong một tài liệu HTML bằng cách sử dụng thẻ `<script>`.

Ví dụ:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Đoạn trước script...</p>

*!*
  <script>
    alert( 'Chào thế giới!' );
  </script>
*/!*

  <p>...Đoạn sau script.</p>

</body>

</html>
```

```online
Bạn có thể chạy ví dụ trên bằng cách click vào nút "Play" ở góc trên bên phải.
```

Đoạn mã JavaScript bên trong thẻ `<script>` sẽ tự động chạy khi trình duyệt xử lý thẻ này.

## Cách đánh dấu hiện đại

Thẻ `<script>` có vài thuộc tính ngày nay hiếm khi được sử dụng nhưng vẫn có thể gặp đâu đó trong các chương trình cũ:

Thuộc tính `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: Chuẩn HTML4 cũ yêu cầu mỗi script phải có một `type`. Thường thì đó là `type="text/javascript"`. Hiện nay nó không còn cần thiết nữa. Ngoài ra, chuẩn HTML hiện đại đã thay đổi hoàn toàn ý nghĩa của thuộc tính này. Bây giờ, nó có thể được sử dụng cho các mô-đun JavaScript. Nhưng đó là một chủ đề nâng cao, chúng ta sẽ nói về các mô-đun trong một phần khác của hướng dẫn.

Thuộc tính `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Thuộc tính này cho biết script được viết bằng ngôn ngữ nào. Ngày nay JavaScript trở thành ngôn ngữ script mặc định, thuộc tính này không còn cần thiết nữa.

Các chú thích trước và sau script.
: Trong các sách và hướng dẫn rất cũ, bạn có thể gặp chú thích HTML bên trong thẻ `<script>` như thế này:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Thủ thuật này không được sử dụng trong JavaScript hiện đại. Những chú thích này ẩn mã JavaScript khỏi các trình duyệt cũ không biết cách xử lý thẻ `<script>`. Vì các trình duyệt được phát hành trong 15 năm qua không gặp vấn đề này, nên loại chú thích này có thể giúp bạn xác định mã thực sự cũ.

## Các script ngoài

Nếu có nhiều mã JavaScript, ta có thể đặt chúng trong một tệp riêng.

Script đặt trong tệp này gọi là script ngoài và có thể đưa vào tài liệu HTML bằng thuộc tính `src`:

```html
<script src="/path/to/script.js"></script>
```

Ở đây, `/path/to/script.js` là đường dẫn tuyệt đối tới tệp chứa script tính từ thư mục gốc của site. Bạn cũng có thể cung cấp đường dẫn tương đối so với trang web hiện tại. Ví dụ, `src="script.js"` chỉ đến tệp `"script.js"` trong thư mục hiện tại.

Chúng ta có thể cho một URL đầy đủ. Ví dụ:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

Để thêm nhiều script, sử dụng nhiều thẻ:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Như một quy tắc, chỉ những script đơn giản nhất mới nên đặt trực tiếp trong tài liệu HTML. Những script phức tạp nên đặt trong các tệp riêng.

Ưu điểm khi đặt script trong tệp riêng là trình duyệt sẽ tải chúng về và lưu lại trong [cache (bộ nhớ đệm)](https://vi.wikipedia.org/wiki/Cache_(tin_h%E1%BB%8Dc)) của nó.

Sau đó nếu có một trang khác cũng dùng script này, trình duyệt lấy nó từ bộ nhớ đệm mà không cần tải lại.

Điều này giúp giảm thiểu băng thông và tăng tốc độ tải trang.
```

````warn header="Nếu `src` được dùng, nội dung của thẻ bị bỏ qua."
Một thẻ `<script>` không thể vừa có thuộc tính `src` vừa có script bên trong.

Sẽ không làm việc:

```html
<script *!*src*/!*="file.js">
  alert(1); // script bị bỏ qua vì thuộc tính src được dùng
</script>
```

Bạn buộc phải chọn hoặc sử dụng script ngoài `<script src="…">` hoặc thẻ `<script>` với script đặt trong.

Ví dụ trên có thể chia thành hai thẻ `<script>` để làm việc:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Tóm tắt

- Chúng ta có thể sử dụng thẻ `<script>` để thêm mã JavaScript vào trang web.
- Thuộc tính `type` và `language` không cần sử dụng.
- Một script đặt trong tệp ngoài được chèn vào trang web bằng `<script src="path/to/script.js"></script>`.

Còn nhiều điều để học về các script trong trình duyệt và cách nó tương tác với trang web. Nhưng hãy nhớ rằng trong phần này ta chỉ học về JavaScript, bạn không nên mất thời gian tìm hiểu cụ thể cách nó chạy trên trình duyệt. Chúng ta chỉ sử dụng trình duyệt như một cách để chạy JavaScript bởi nó rất thuận tiện cho việc học trực tuyến.
