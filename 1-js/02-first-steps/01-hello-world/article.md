# Chào thế giới!

<<<<<<< HEAD
Trong phần này chúng ta học về JavaScript thuần. Nhờ những kiến thức này bạn có thể học Node.js (JavaScript chạy phía máy chủ) cũng như các nền tảng khác có sử dụng JavaScript.
=======
This part of the tutorial is about core JavaScript, the language itself.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Nhưng để chạy được JavaScript chúng ta cần một môi trường (enviroment), và bởi các hướng dẫn này được đưa lên webiste, môi trường trình duyệt (browser) là sự lựa chọn tốt hơn cả. Chúng ta phải sử dụng một số lệnh chỉ có trên môi trường trình duyệt (như `alert`) nhưng chúng không nhiều. Nếu bạn có kế hoạch học JavaScript để làm việc trên môi trường khác (như Node.js) bạn cũng sẽ không mất quá nhiều thời gian để học chúng. Ở [phần sau](/ui) của hướng dẫn này chúng ta sẽ tập trung vào cách sử dụng JavaScript trên trình duyệt.

Đầu tiên, chúng ta học cách làm sao để đưa một script (một đoạn mã JavaScript) vào một trang web. Trong môi trường máy chủ (như Node.js), bạn có thể đặt script này trong tệp `my.js` và chạy chỉ bằng một câu lệnh `"node my.js"`.


## Thẻ "script"

<<<<<<< HEAD
Có thể chèn các script vào một trang web (tài liệu HTML) bằng cách sử dụng thẻ `<script>`.
=======
JavaScript programs can be inserted almost anywhere into an HTML document using the `<script>` tag.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

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


## Cách viết cũ của thẻ "script"

Thẻ `<script>` có vài thuộc tính ngày nay hiếm khi được sử dụng nhưng vẫn có thể gặp đâu đó trong các chương trình cũ:

<<<<<<< HEAD
Thuộc tính `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: Chuẩn HTML4 cũ yêu cầu mỗi script phải có một `type`. Thường là `type="text/javascript"`. Nhưng hiện nay nó không còn cần thiết nữa. Chuẩn HTML5 hiện đại vẫn sử dụng thuộc tính `type` nhưng với mục đích hoàn toàn khác. Bây giờ `type` được dùng cho các JavaScript module. Nhưng nó là một chủ đề nâng cao sẽ được nói đến trong một phần khác của loạt bài hướng dẫn này.
=======
The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
<<<<<<< HEAD
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic; we'll talk about modules in another part of the tutorial.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
=======
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic, we'll talk about modules in another part of the tutorial.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

Thuộc tính `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Thuộc tính này cho biết script được viết bằng ngôn ngữ nào. Ngày nay JavaScript trở thành ngôn ngữ script mặc định, thuộc tính này không còn cần thiết nữa.

Các chú thích trước và sau script.
: Trong các sách và hướng dẫn rất cũ, bạn có thể gặp chú thích HTML bên trong thẻ `<script>` như thế này:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

<<<<<<< HEAD
    Mẹo này không được sử dụng trong JavaScript hiện đại. Mục đích của chú thích là ẩn đi mã JavaScript trong các trình duyệt cũ không hỗ trợ thẻ `<script>`. Các trình duyệt phát hành trong 15 năm gần đây không gặp phải vấn đề này, kiểu đặt chú thích như thế này chỉ gặp trong nhưng đoạn mã rất cũ.
=======
    This trick isn't used in modern JavaScript. These comments hide JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93


## Các script ngoài

Nếu số lượng mã JavaScript rất nhiều, ta có thể đặt chúng trong một tệp riêng.

Script đặt trong tệp này gọi là script ngoài và có thể đưa vào tài liệu HTML bằng thuộc tính `src`:

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
Ở đây, `/path/to/script.js` là đường dẫn tuyệt đối tới tệp chứa script (tính từ thư mục gốc của website).

Bạn cũng có thể cung cấp đường dẫn tương đối so với trang web hiện tại. Ví dụ, `src="script.js"` chỉ đến tệp `"script.js"` trong thư mục hiện tại.
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Một địa chỉ URL cũng được cho phép, ví dụ:

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
