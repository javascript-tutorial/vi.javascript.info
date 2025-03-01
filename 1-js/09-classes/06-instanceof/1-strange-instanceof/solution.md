Ừ, trông lạ thật đấy.

Nhưng `instanceof` không quan tâm đến hàm, mà quan tâm đến `nguyên mẫu` của nó, rằng nó phù hợp với chuỗi nguyên mẫu.

Và ở đây `a.__proto__ == B.prototype`, vì vậy `instanceof` trả về `true`.

Vì vậy, theo logic của `instanceof`, `prototype` thực sự xác định loại chứ không phải hàm tạo.
