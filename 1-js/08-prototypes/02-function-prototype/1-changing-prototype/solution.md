Trả lời:

1. `true`. 

    Việc gán cho `Rabbit.prototype` thiết lập `[[Prototype]]` cho các đối tượng mới, nhưng nó không ảnh hưởng đến các đối tượng hiện có.

2. `false`. 

    Các đối tượng được gán bằng tham chiếu. Đối tượng từ `Rabbit.prototype` không bị sao chép, nó vẫn là một đối tượng duy nhất được tham chiếu bởi cả `Rabbit.prototype` và bởi `[[Prototype]]` của `rabbit`.

    Vì vậy, khi chúng ta thay đổi nội dung của nó thông qua một tham chiếu, nó sẽ thấy được thông qua tham chiếu khác.

3. `true`.

    Tất cả các thao tác `delete` được áp dụng trực tiếp cho đối tượng. Ở đây `delete rabbit.eats` cố gắng xóa thuộc tính `eats` khỏi `rabbit`, nhưng nó không có. Vì vậy, thao tác sẽ không có tác dụng gì.

4. `undefined`.

    Thuộc tính `eats` bị xóa khỏi nguyên mẫu, nên nó không tồn tại nữa.
