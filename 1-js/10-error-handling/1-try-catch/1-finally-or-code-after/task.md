mức độ quan trọng: 5

---

# Finally hay chỉ dùng code?

So sánh hai đoạn code dươí đây.

1. Đoạn code đầu tiên sử dụng `finally` để thực thi code sau khi `try...catch`:

    ```js
    try {
      công việc
    } catch (err) {
      xử lý lỗi
    } finally {
    *!*
      dọn dẹp không gian làm việc
    */!*
    }
    ```
2. Đoạn code thứ hai đặt code dọn dẹp ngay sau `try...catch`:

    ```js
    try {
      công việc
    } catch (err) {
      xử lý lỗi
    }

    *!*
    dọn dẹp không gian làm việc
    */!*
    ```

Chúng tôi chắc chắn cần phải dọn dẹp sau khi làm việc, bất kể có lỗi trong quá trình làm việc hay không.

Có lợi thế nào khi sử dụng `finally` ở đây không hay cả hai đoạn code là tương đương nhau? Nếu có một lợi thế nào đó ở đây, xin vui lòng cho một ví dụ nếu cần thiết.
