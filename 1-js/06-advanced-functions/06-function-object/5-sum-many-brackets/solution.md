
1. Để toàn bộ hoạt động *dù sao đi nữa*, kết quả của `sum` phải là hàm.
2. Hàm đó phải giữ trong bộ nhớ giá trị hiện tại giữa các cuộc gọi.
3. Theo nhiệm vụ, hàm phải trở thành số khi được sử dụng trong `==`. Các hàm là các đối tượng, vì vậy việc chuyển đổi diễn ra như được mô tả trong chương <info:object-toprimitive> và chúng ta có thể cung cấp phương thức trả về số của riêng mình.

Bây giờ là mã:

```js demo run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Hãy lưu ý rằng chức năng `sum` thực sự chỉ hoạt động một lần. Nó trả về hàm `f`.

Sau đó, trong mỗi lệnh gọi tiếp theo, `f` thêm tham số của nó vào tổng `currentSum` và trả về chính nó.

**Không có đệ quy trong dòng cuối cùng của `f`.**

Đây là những gì đệ quy trông giống:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- cuộc gọi đệ quy
}
```

Và trong trường hợp của chúng ta, chúng ta chỉ trả về hàm mà không gọi nó:

```js
function f(b) {
  currentSum += b;
  return f; // <-- không tự gọi, tự trả về
}
```

`f` này sẽ được sử dụng trong lần gọi tiếp theo, một lần nữa sẽ tự trả về chính nó, nhiều lần nếu cần. Sau đó, khi được sử dụng làm số hoặc chuỗi -- `toString` trả về `currentSum`. Chúng ta cũng có thể sử dụng `Symbol.toPrimitive` hoặc `valueOf` tại đây để chuyển đổi.
