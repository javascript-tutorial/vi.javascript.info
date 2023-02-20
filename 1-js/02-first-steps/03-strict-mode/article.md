# Chế độ hiện đại, "use strict"

Một thời gian dài, JavaScript phát triển mà không gặp vấn đề tương thích. Các tính năng mới được thêm vào mà không cần thay đổi các tính năng cũ.

Điều đó có lợi ích là không bao giờ phá hỏng mã hiện có. Nhưng nhược điểm là bất kỳ sai lầm hoặc một quyết định không hoàn hảo nào tạo ra bởi các tác giả của JavaScript bị mắc kẹt trong ngôn ngữ này mãi mãi.

Việc này tiếp diễn cho đến năm 2009 khi ECMAScript 5 (ES5) xuất hiện. Nó đã thêm nhiều tính năng mới cho JavaScript và sửa lại vài tính năng cũ. Để đảm bảo các mã cũ vẫn chạy, các thay đổi này mặc định bị tắt đi. Nếu bạn không gặp phải vấn đề với những mã cũ bạn có thể kích hoạt những thay đổi này bằng cách sử dụng chỉ dẫn: `"use strict"`.

## "use strict"

Chỉ dẫn này trông như một chuỗi: `"use strict"` hoặc `'use strict'`. Khi nó đặt ở đầu script, toàn bộ script làm việc theo cách "hiện đại".

Ví dụ:

```js
"use strict";

// mã này làm việc theo cách "hiện đại"
...
```

Rất nhanh chúng ta sẽ tìm hiểu các hàm (một cách để nhóm các lệnh), vì vậy hãy lưu ý trước rằng `"use strict"` có thể được đặt ở đầu một hàm. Làm điều đó chỉ bật chế độ nghiêm ngặt trong hàm đó. Nhưng thông thường mọi người sử dụng nó cho toàn bộ script.

````warn header="Phải chắc chắn rằng đặt \"use strict\" ở đầu"
Bạn phải chắc chắn rằng đặt `"use strict"` ở đầu script, nếu không chế độ "strict" không được bật.

Chế độ "strict" không được bật ở đây:

```js no-strict
alert("some code");
// "use strict" bị bỏ qua--nó phải đặt ở đầu

"use strict";

// chế độ strict không được bật
```

Chỉ các chú thích được phép xuất hiện trước `"use strict"`.
````

```warn header="Không có cách hủy `use strict`"
Không có chỉ dẫn nào kiểu như `"no use strict"` để tắt chế độ strict sau khi đã bật.

Một khi đã vào chế độ strict, không còn đường quay lại.
```

## Console của trình duyệt

Khi bạn sử dụng [console của trình duyệt](info:devtools) để chạy mã, xin lưu ý rằng nó mặc định không sử dụng `use strict`.

Thỉnh thoảng, khi `use strict` tạo ra sự khác biệt, bạn sẽ nhận được các kết quả không đúng.

Vì vậy, làm thế nào để thực sự sử dụng `use strict` trong console?

Đầu tiên, bạn có thể thử nhấn phím `key:Shift+Enter` để nhập mã trên nhiều dòng và đặt `use strict` ở đầu, như sau:

```js
'use strict'; <Shift+Enter để xuống dòng>
//  ...mã của bạn
<Enter để chạy>
```

Nó làm việc trong hầu hết trình duyệt, như Firefox và Chrome.

Nếu không, ví dụ trong một trình duyệt cũ, có một cách xấu xí, nhưng đáng tin cậy để đảm bảo `use strict`. Đặt nó bên trong loại bao bọc này:

```js
(function() {
  'use strict';

  // ...mã của bạn đây ...
})()
```

## Chúng ta có nên dùng "use strict"?

Câu hỏi nghe có vẻ hiển nhiên, nhưng không phải vậy.

Người ta có thể khuyên bạn nên bắt đầu các tập lệnh với `"use strict"`... Nhưng bạn biết điều gì thú vị không?

JavaScript hiện đại hỗ trợ "classes" và "modules" - các cấu trúc ngôn ngữ nâng cao (chắc chắn chúng ta sẽ tìm hiểu chúng), mà tự động sử dụng `use strict`. Vì vậy, chúng ta không cần phải thêm chỉ thị `"use strict"`, nếu chúng ta sử dụng chúng.

**Vì vậy, bây giờ `"use strict";` là một vị khách được chào đón ở đầu các tập lệnh của bạn. Sau đó, khi mã của bạn nằm trong các "class" và "module", bạn có thể bỏ qua nó.**

Hiện tại, chúng ta đã biết về `use strict` nói chung.

Trong các chương tiếp theo, khi chúng ta tìm hiểu các tính năng của ngôn ngữ, chúng ta sẽ thấy sự khác biệt giữa các chế độ nghiêm ngặt và cũ. May mắn thay, không có nhiều khác biệt và chúng thực sự làm cho cuộc sống của chúng ta tốt hơn.

Tất cả các ví dụ trong hướng dẫn này giả định chế độ nghiêm ngặt trừ khi (hiếm hoi) được chỉ định khác.
