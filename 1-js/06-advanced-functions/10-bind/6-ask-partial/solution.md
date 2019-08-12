

1. Có thể sử dụng hàm bao hoặc hàm mũi tên cho ngắn gọn:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    Đối tượng`user` được lấy từ bên ngoài và chạy như bình thường.

2. Hoặc tạo một hàm riêng từ `user.login` để sử dụng `user` làm `this`:


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false));
    ```
