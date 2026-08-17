# Modern JavaScript Tutorial bằng Tiếng Việt

<<<<<<< HEAD
Repository này chứa phiên bản tiếng Việt của Modern JavaScript Tutorial, sẽ được xuất bản tại [https://vi.javascript.info](https://vi.javascript.info). Đây là URL gốc của bản tiếng Anh: [https://javascript.info](https://javascript.info).
=======
This repository hosts the English content of the Modern JavaScript Tutorial, published at [https://javascript.info](https://javascript.info).
>>>>>>> 20208769e528337949e946f526534d61d38bac47

**Bạn có thể đóng góp vào bản dịch này bằng cách:**

- Xem issue [Vietnamese Translate Progress](https://github.com/javascript-tutorial/vi.javascript.info/issues/1).
- Chọn một bài chưa được dịch (chưa được check) mà bạn muốn dịch.
- Thêm bình luận vào issue với nội dung là tiêu đề bài bạn muốn dịch, ví dụ `An Introduction to JavaScript`.
    - Bot của chúng tôi sẽ tự động đánh dấu nó trong issue, để cho người khác biết rằng bạn đang dịch bài này.
    - Bình luận của bạn chỉ nên chứa một tiêu đề duy nhất.
- Fork repository này, dịch và gửi một Pull Request khi hoàn thành.
    - Tiêu đề của Pull Request nên trùng với tiêu đề bài dịch, giúp bot tự động ghi số của bài vào issue.

Vui lòng cho phép các maintainer (nhà bảo trì) xem xét (review) và hợp nhất (merge) các thay đổi của bạn vào bản dịch.

Nếu maintainer không hồi đáp, hoặc bạn cũng muốn trở thành một maintainer, nói cho chúng tôi biết tại [repository chính](https://github.com/javascript-tutorial/en.javascript.info/issues/new).

**Cho người khác biết rằng bạn đang dịch trong bảng thông báo hoặc nói chuyện bằng tiếng Việt. Mời họ cùng tham gia!**

<<<<<<< HEAD
🎉 Cảm ơn!

Tên và phần đóng góp của bạn sẽ xuất hiện trong trang "About the project" khi bản dịch được xuất bản.
=======
Something's wrong? A topic is missing? Explain it to people, add it as PR 👏

**You can edit the text in any editor.** The tutorial uses an enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.
>>>>>>> 20208769e528337949e946f526534d61d38bac47

Tái bút: Danh sách đầy đủ các ngôn ngữ có thể thấy tại <https://javascript.info/translate>.

## Cấu trúc

<<<<<<< HEAD
Mỗi chương, mỗi bài hoặc mỗi bài tập đều được đặt trong một thư mục riêng.

Tên thư mục đặt theo cấu trúc `N-URL`, ở đó `N` là số thứ tự dùng để sắp xếp (các bài được sắp xếp theo thứ tự), và `URL` là URL-slug của nó trên website.
=======
Every chapter, article, or task has its folder.

The folder is named like `N-url`, where `N` is a number for the sorting purposes and `URL` is the URL part with the title of the material.
>>>>>>> 20208769e528337949e946f526534d61d38bac47

Một thư mục có nhiều tệp:

- `index.md` cho một chương,
- `article.md` cho một bài,
- `task.md` cho một bài tập (lời giải cũng phải được cung cấp trong tệp solution.md).

Một tệp bắt đầu bằng `# Tiêu đề`, và sau đó là văn bản viết theo định dạng Markdown, có thể chỉnh sửa bằng một trình soạn thảo đơn giản.

Các tài nguyên bổ sung và các ví dụ cho bài học hoặc bài tập cũng nằm trong cùng thư mục.

## Hướng dẫn dịch

Vui lòng giữ nguyên các đoạn và dấu xuống dòng: đừng thêm các dấu xuống dòng mới cũng như không xóa các dấu xuống dòng hiện tại. Việc này giúp việc hợp nhất các thay đổi từ phiên bản tiếng Anh sang phiên bản tiếng Việt trong tương lai trở nên dễ dàng.

Nếu bạn thấy rằng phiên bản tiếng Anh còn có thể cải thiện - tuyệt, hãy gửi một Pull Request cho nó.

### Các thuật ngữ

- Một số thuật ngữ kỹ thuật không có trong tiếng Việt, ví dụ "Function Declaration" thì để nguyên.
- Với các thuật ngữ khác như `resolved promise`, `slash`, `regexp` ... - cố tìm một bản dịch đã có trong tiếng Việt. Nếu không thì tìm các bản dịch đã có trong hướng dẫn sử dụng như [MDN](https://developer.mozilla.org/en-US/).

### Văn bản trong khối mã

- Dịch các chú thích
- Có thể dịch các thông báo gửi tới người dùng và các chuỗi ví dụ.
- Đừng dịch các biến, class và các định danh.
- Chắc chắn rằng mã vẫn chạy sau khi bạn dịch nó :)

Ví dụ:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ LÀM (dịch chú thích, chuỗi thông báo, chuỗi ví dụ):

```js
// Ví dụ
const text = 'Chào thế giới';
document.querySelector('.hello').innerHTML = text;
```

❌ KHÔNG LÀM (dịch class):

```js
// Ví dụ
const text = 'Chào thế giới';
// ".hello" là một class
// KHÔNG ĐƯỢC DỊCH
document.querySelector('.xinchào').innerHTML = text;
```

### Các liên kết ngoài

Nếu là một liên kết tới Wikipedia, ví dụ `https://en.wikipedia.org/wiki/JavaScript`, và có một phiên bản viết bằng tiếng Việt, hay chuyển sang phiên bản này.

Ví dụ

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> vi):

```md
[JavaScript](https://vi.wikipedia.org/wiki/JavaScript) là một ngôn ngữ lập trình.
```

Nếu là liên kết tới MDN, cố gắng đưa tới phiên bản có dịch một phần sang tiếng Việt.

Nếu liên kết tới nội dung không có tiếng Việt, hãy để nguyên.

### Metadata

Một số tệp, thường là các bài tập, có YAML metadata ở đầu, ngăn cách với phần dưới bằng `---`:

```md
importance: 5

---
...
```

Vui lòng không dịch "importance" (cũng như các metadata khác).

### Các anchor

Một vài tiêu đề có `[#anchor]` ở cuối, ví dụ:

```md
## Spread operator [#spread-operator]
```

Vui lòng không dịch và không xóa `[#...]`, nó được dùng làm các URL anchor.

## Chạy trên máy tính

Bạn có thể chạy phiên bản dịch trên máy chủ để xem nó trông như thế nào.

Hướng dẫn cài đặt và chạy thử có tại <https://github.com/javascript-tutorial/server>.
