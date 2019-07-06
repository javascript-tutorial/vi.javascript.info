
1. Thêm `__proto__` như sau:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. Trong các JavaScript engine hiện đại, hiệu năng rất tốt, không có khác biệt nào giữa việc lấy thuộc tính từ đối tượng hay từ nguyên mẫu. Chúng nhớ nơi thuộc tính được tìm thấy để tái sử dụng trong những lần sau.

    Ví dụ, với `pockets.glasses` engine nhớ nơi nó tìm thấy `glasses` (trong `head`), và trong lần sau sẽ tìm ngay trong đó. Nó cũng đủ thông minh để cập nhật lại nếu có gì đó thay đổi, để việc tối ưu hóa vẫn an toàn.
