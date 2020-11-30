# Chế độ hiện đại, "use strict"

Một thời gian dài, JavaScript phát triển mà không gặp vấn đề tương thích. Các tính năng mới được thêm vào mà không cần thay đổi các tính năng cũ.

Lợi ích của việc này là các mã cũ luôn chạy được. Nhưng nhược điểm là những điểm không tốt không bị loại bỏ.

<<<<<<< HEAD
Việc này tiếp diễn cho đến năm 2009 khi ECMAScript 5 (ES5) xuất hiện. Nó đã thêm nhiều tính năng mới cho JavaScript và sửa lại vài tính năng cũ. Để đảm bảo các mã cũ vẫn chạy, các thay đổi này mặc định bị tắt đi. Nếu bạn không gặp phải vấn đề với những mã cũ bạn có thể kích hoạt những thay đổi này bằng cách sử dụng chỉ dẫn: `"use strict"`.
=======
This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

## "use strict"

Chỉ dẫn này trông như một chuỗi: `"use strict"` hoặc `'use strict'`. Khi nó đặt ở đầu script, toàn bộ script làm việc theo cách "hiện đại".

Ví dụ:

```js
"use strict";

// mã này làm việc theo cách "hiện đại"
...
```

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Chúng ta sẽ học về các hàm (là cách nhóm các lệnh) ở một bài học gần đây.

Chú ý rằng `"use strict"` có thể đặt ở đầu một hàm thay vì đầu của script. Việc làm này chỉ bật chế độ "strict" bên trong hàm mà thôi. Tuy nhiên, thường thì mọi người thích đặt nó ở đầu script hơn.
=======
We will learn functions (a way to group commands) soon. Looking ahead, let's note that `"use strict"` can be put at the start of most kinds of functions instead of the whole script. Doing that enables strict mode in that function only. But usually, people use it for the whole script.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
=======
We will learn functions (a way to group commands) soon. Looking ahead, let's note that `"use strict"` can be put at the beginning of the function body instead of the whole script. Doing that enables strict mode in that function only. But usually, people use it for the whole script.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

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

<<<<<<< HEAD
Một khi đã vào chế độ strict, không còn đường quay lại.
=======
Once we enter strict mode, there's no going back.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5
```

## Console của trình duyệt

<<<<<<< HEAD
Cho tương lai khi bạn sử dụng console của trình duyệt để kiểm tra các tính năng mới của JavaScript, hãy chú ý rằng mặc định `use strict` không được sử dụng.
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Thỉnh thoảng, khi `use strict` tạo ra sự khác biệt, bạn sẽ nhận được các kết quả không đúng.

<<<<<<< HEAD
Bạn có thể thử bấm tổ hợp phím `key:Shift+Enter` để nhập mã trên nhiều dòng và đặt `use strict` ở đầu, như sau:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js
'use strict'; <Shift+Enter để xuống dòng>
//  ...mã của bạn
<Enter để chạy>
```

Nó làm việc trong hầu hết trình duyệt, như Firefox và Chrome.

<<<<<<< HEAD
Nếu không làm việc, cách tin cậy nhất để chắc chắn `use strict` chạy được là viết như sau:
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...mã của bạn...
})()
```

## Luôn dùng "use strict"

Chúng ta chưa nói qua về sự khác biệt giữa sử dụng và không sử dụng `use strict`.

Trong các bài tiếp theo, khi học về các tính năng của ngôn ngữ, chúng ta sẽ được chú ý về sự khác biệt này. May mắn thay sự khác biệt không nhiều và hầu hết chúng là những sự thay đổi tốt.

Hiện tại, chúng ta chỉ cân biết những điểm tổng quát như sau:

1. Chỉ dẫn `"use strict"` chuyển JavaScript engine sang chế độ "hiện đại", thay đổi hoạt động của vài tính năng có sẵn trong ngôn ngữ. Chúng ta sẽ tìm hiểu chi tiết trong những bài học sau.
2. Chế độ strict được bật bằng cách đặt `"use strict"` ở đầu script hoặc hàm. Vài tính năng của ngôn ngữ như "class" và "module" tự động bật chế độ strict khi được sử dụng.
3. Chế độ strict được hỗ trợ bởi hầu hết trình duyệt.
4. Chúng tôi khuyến khích bạn luôn bắt đầu script với `"use strict"`. Tất cả các ví dụ trong loạt bài hướng dẫn này để mặc định sử dụng chế độ strict (trừ vài trường hợp hiếm).
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5
