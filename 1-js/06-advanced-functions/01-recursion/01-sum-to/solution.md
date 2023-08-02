Giải pháp sử dụng vòng lặp:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

Giải pháp sử dụng đệ quy:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

Giải pháp sử dụng công thức: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

Tái bút: Đương nhiên, công thức là giải pháp nhanh nhất. Nó chỉ sử dụng 3 thao tác cho bất kỳ số `n` nào. Có toán giúp đỡ!

Biến thể vòng lặp là biến thể thứ hai về tốc độ. Trong cả biến thể đệ quy và vòng lặp, chúng ta tính tổng các số giống nhau. Nhưng đệ quy liên quan đến các cuộc gọi lồng nhau và quản lý ngăn xếp thực thi. Điều đó cũng cần tài nguyên, vì vậy nó chậm hơn.

Tái bút nữa: Một số engine hỗ trợ tối ưu hóa "cuộc gọi đuôi": nếu một cuộc gọi đệ quy là cuộc gọi cuối cùng trong hàm (như trong `sumTo` ở trên), thì hàm bên ngoài sẽ không cần tiếp tục thực thi, vì vậy engine không cần để ghi nhớ bối cảnh thực hiện của nó. Điều đó loại bỏ gánh nặng cho bộ nhớ, vì vậy việc đếm `sumTo(100000)` trở nên khả thi. Nhưng nếu JavaScript engine không hỗ trợ tối ưu hóa lệnh gọi đuôi (hầu hết chúng không hỗ trợ), sẽ có lỗi: vượt quá kích thước ngăn xếp tối đa, vì thường có giới hạn về tổng kích thước ngăn xếp.
