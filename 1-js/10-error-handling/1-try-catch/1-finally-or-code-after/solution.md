Sự khác biệt trở nên rõ ràng khi chúng ta xem xét code bên trong một hàm.

Cách phản ứng sẽ khác nhau nếu có hành vi "nhảy ra" của `try...catch`.

Ví dụ, khi có một `return` bên trong `try...catch`. Mệnh đề  `finally` hoạt động trên *bất kỳ* lối thoát nào khỏi `try...catch`, ngay cả khi thoát qua câu lệnh `return`: ngay sau khi `try...catch` kết thúc thực thi, nhưng trước khi gọi code giành quyền kiểm soát.

```js run
function f() {
  try {
    alert('bắt đâù');
*!*
    return "kết quả";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('dọn dẹp!');
  }
}

f(); // dọn dẹp!
```

...Hoặc khi có một `throw`, như thế này:

```js run
function f() {
  try {
    alert('bắt đầu');
    throw new Error("một lỗi");
  } catch (err) {
    // ...
    if("không thể xử lý lỗi") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('dọn dẹp!')
  }
}

f(); // dọn dẹp!
```

`finally` ở đây đảm bảo việc dọn dẹp. Nếu chúng ta chỉ đặt code ở cuối hàm `f`, thì nó sẽ không chạy trong những tình huống này.
