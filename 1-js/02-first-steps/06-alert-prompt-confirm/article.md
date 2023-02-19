# Tương tác: cảnh báo, nhắc nhở, xác nhận

Vì chúng ta sẽ sử dụng trình duyệt làm môi trường demo, hãy xem một số chức năng để tương tác với người dùng: `alert`, `prompt` và `confirm`.

## báo động

Cái này chúng ta đã thấy rồi. Nó hiển thị một thông báo và đợi người dùng nhấn "OK".

Ví dụ:

```js chạy
cảnh báo ("Xin chào");
```

Cửa sổ nhỏ chứa thông báo được gọi là *cửa sổ modal*. Từ "modal" có nghĩa là khách truy cập không thể tương tác với phần còn lại của trang, nhấn các nút khác, v.v. cho đến khi họ xử lý xong cửa sổ. Trong trường hợp này -- cho đến khi họ nhấn "OK".

## lời nhắc

Hàm `prompt` chấp nhận hai đối số:

```js không đẹp
kết quả = dấu nhắc (tiêu đề, [mặc định]);
```

Nó hiển thị một cửa sổ phương thức có tin nhắn văn bản, trường nhập liệu cho khách truy cập và các nút OK/Hủy.

`tiêu đề`
: Văn bản để hiển thị khách truy cập.

`mặc định`
: Một tham số thứ hai tùy chọn, giá trị ban đầu cho trường đầu vào.

```smart header="Dấu ngoặc vuông trong cú pháp `[...]`"
Dấu ngoặc vuông xung quanh `default` trong cú pháp ở trên biểu thị rằng tham số là tùy chọn, không bắt buộc.
```

Khách truy cập có thể nhập nội dung nào đó vào trường nhập lời nhắc và nhấn OK. Sau đó, chúng tôi nhận được văn bản đó trong `kết quả`. Hoặc họ có thể hủy đầu vào bằng cách nhấn Hủy hoặc nhấn phím `key:Esc`, sau đó chúng tôi nhận được `null` là `kết quả`.

Lệnh gọi `prompt` trả về văn bản từ trường nhập hoặc `null` nếu đầu vào bị hủy.

Ví dụ:

```js chạy
let age = prompt('Bạn bao nhiêu tuổi?', 100);

alert(`Bạn ${age} tuổi!`); // Bạn đã 100 tuổi!
```

````warn header="Trong IE: luôn cung cấp `default`"
Tham số thứ hai là tùy chọn, nhưng nếu chúng ta không cung cấp tham số này, Internet Explorer sẽ chèn văn bản `"undefined"` vào dấu nhắc.

Chạy mã này trong Internet Explorer để xem:

```js chạy
hãy để kiểm tra = nhắc ("Kiểm tra");
```

Vì vậy, để lời nhắc hiển thị tốt trong IE, chúng tôi khuyên bạn nên luôn cung cấp đối số thứ hai:

```js chạy
hãy để kiểm tra = nhắc ("Kiểm tra", ''); // <-- cho IE
```
````

## xác nhận

Cú pháp:

```js
kết quả = xác nhận (câu hỏi);
```

Chức năng `xác nhận` hiển thị cửa sổ phương thức có `câu hỏi` và hai nút: OK và Hủy.

Kết quả là `true` nếu nhấn OK và `false` nếu không.

Ví dụ:

```js chạy
let isBoss = confirm("Bạn có phải là sếp không?");

cảnh báo (isBoss); // đúng nếu nhấn OK
```

## Bản tóm tắt

Chúng tôi đã đề cập đến 3 chức năng dành riêng cho trình duyệt để tương tác với khách truy cập:

`cảnh báo`
: hiển thị một tin nhắn.

`nhắc nhở`
: hiển thị thông báo yêu cầu người dùng nhập văn bản. Nó trả về văn bản hoặc, nếu nút Hủy hoặc `key:Esc` được bấm, `null`.

`xác nhận`
: hiển thị thông báo và chờ người dùng nhấn "OK" hoặc "Cancel". Nó trả về `true` cho OK và `false` cho Cancel/`key:Esc`.

Tất cả các phương pháp này đều là phương thức: chúng tạm dừng thực thi tập lệnh và không cho phép khách truy cập tương tác với phần còn lại của trang cho đến khi cửa sổ bị loại bỏ.

Có hai hạn chế được chia sẻ bởi tất cả các phương pháp trên:

1. Vị trí chính xác của cửa sổ phương thức được xác định bởi trình duyệt. Thông thường, nó ở trung tâm.
2. Giao diện chính xác của cửa sổ cũng phụ thuộc vào trình duyệt. Chúng tôi không thể sửa đổi nó.

Đó là cái giá cho sự đơn giản. Có nhiều cách khác để hiển thị các cửa sổ đẹp hơn và tương tác phong phú hơn với khách truy cập, nhưng nếu "chuông và còi" không quan trọng lắm, thì các phương pháp này hoạt động tốt.
