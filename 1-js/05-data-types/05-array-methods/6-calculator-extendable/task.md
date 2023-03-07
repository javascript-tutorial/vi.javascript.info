importance: 5

---

# Tạo một máy tính có thể mở rộng

Tạo một hàm tạo `Máy tính` để tạo các đối tượng máy tính "có thể mở rộng".

Nhiệm vụ bao gồm hai phần.

1. Đầu tiên, triển khai phương thức `calculate(str)` nhận một chuỗi như `"1 + 2"` ở định dạng "SỐ toán tử SỐ" (phân cách bằng dấu cách) và trả về kết quả. Nên hiểu cộng `+` và trừ `-`.

     Ví dụ sử dụng:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. Sau đó thêm phương thức `addMethod(name, func)` dạy cho máy tính một thao tác mới. Nó sử dụng toán tử `name` và hàm hai đối số `func(a,b)` để thực hiện nó.

     Chẳng hạn, hãy thêm phép nhân `*`, phép chia `/` và lũy thừa `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- Không có dấu ngoặc đơn hoặc biểu thức phức tạp trong nhiệm vụ này.
- Các số và toán tử được phân cách bằng đúng một dấu cách.
- Có thể xử lý lỗi nếu bạn muốn thêm nó.
