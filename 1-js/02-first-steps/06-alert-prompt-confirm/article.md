# Tương tác: alert, prompt, confirm

Vì chúng ta sẽ sử dụng trình duyệt làm môi trường demo, hãy xem qua một vài hàm dùng để tương tác với người dùng: `alert`, `prompt` và `confirm`.

## alert

Cái này chúng ta đã thấy rồi. Nó hiển thị một thông báo và đợi người dùng nhấn "OK".

Ví dụ:

```js run
alert("Hello");
```

Một cửa sổ nhỏ với thông báo được gọi là *cửa sổ modal*. Từ "modal" có nghĩa là người dùng không thể tương tác với phần còn lại của trang, nhấn các nút khác, vâng vâng, đến khi họ phải làm việc với cái cửa sổ đó. Trong trường hợp này là -- đến lúc họ nhấn nút "OK".

## prompt

Hàm `prompt` nhận vào hai đối số:

```js no-beautify
result = prompt(title, [default]);
```

Nó hiển thị một cửa sổ modal với một thông báo, một ô nhập liệu cho người dùng, và các nút OK/Cancel.

`title`
: Đoạn text để hiển thị cho người dùng.

`default`
: Tham số thứ hai không bắt buộc, là giá trị khởi tạo cho ô nhập liệu.

```smart header="Dấu ngoặc vuông trong cú pháp `[...]`"
Dấu ngoặc vuông bao quanh `default` trong cú pháp trên biểu thị nó là tham số tùy chọn, không bắt buộc.
```

Người dùng có thể gõ gì đó vào ô nhập liệu và nhấn OK. Sau đó chúng ta lấy đoạn text trong `result`. Hoặc họ có thể hủy nhập bằng cách nhấn Cancel hoặc nhấn phím `key:Esc`, và chúng ta có giá trị `null` cho `result`.

Việc gọi `prompt` trả về đoạn text từ ô nhập liệu hoặc `null` nếu ô nhập liệu bị hủy.

Ví dụ:

```js run
let age = prompt('Bạn bao nhiêu tuổi rồi?', 100);

alert(`Bạn được ${age} tuổi!`); // Bạn được 100 tuổi!
```

````warn header="Trong IE: luôn cung cấp một `default`"
Đối số thứ hai không bắt buộc, nhưng nếu chúng ta không cung cấp nó, Internet Explorer sẽ chèn `"undefined"` vào trong prompt.

Chạy code này trên Internet Explorer sẽ thấy:

```js run
let test = prompt("Test");
```

Vì vậy, để prompts hoạt động tốt trên IE, chúng tôi khuyên bạn nên cung cấp đối số thứ hai:

```js run
let test = prompt("Test", ''); // <-- cho IE
```
````

## confirm

Cú pháp:

```js
result = confirm(question);
```

Hàm `confirm` hiển thị một cửa sổ modal với một `question` và hai nút: OK và Cancel.

Kết quả là `true` nếu OK được chọn và `false` nếu ngược lại.

Ví dụ:

```js run
let isBoss = confirm("Bạn có phải ông chủ không?");

alert( isBoss ); // true nếu OK được chọn
```

## Tóm tắt

Chúng ta đã tìm hiểu qua 3 hàm dành riêng cho trình duyệt để tương tác với người dùng:

`alert`
: hiển thị một thông báo.

`prompt`
: hiển thị một thông báo yêu cầu người dùng nhập vào đoạn text. Nó trả về đoạn text hoặc, nếu nút Cancel hoặc `key:Esc` được bấm, `null`.

`confirm`
: hiển thị một thông báo và đợi người dùng nhấn "OK" hoặc "Cancel". Nó trả về `true` cho OK và `false` cho Cancel/`key:Esc`.

Tất cả các hàm này đều là modal: chúng dừng thực thi script và ngăn người dùng tương tác với phần còn lại của trang đến khi cửa sổ được tắt đi.

Có hai hạn chế tồn tại ở các hàm trên:

1. Vị trí chính xác của cửa sổ modal được xác định bởi trình duyệt. Thông thường, nó sẽ ở giữa màn hình.
2. Hình dạng của cửa sổ cũng dựa trên trình duyệt. Chúng ta không thể thay đổi nó.

Đó là cái giá phải trả cho sự đơn giản. Có nhiều cách khác để hiển thị phần cửa sổ đẹp và dễ dàng tương tác với người dùng hơn, nhưng nếu dùng "chuông hay còi" đều không quan trọng, thì dùng những hàm trên là được rồi.
