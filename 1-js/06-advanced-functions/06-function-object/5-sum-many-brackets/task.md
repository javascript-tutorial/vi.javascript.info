importance: 2

---

# Tổng với số lượng dấu ngoặc tùy ý

Viết hàm `sum` sẽ hoạt động như thế này:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

Tái bút:
Gợi ý: Bạn có thể cần thiết lập đối tượng tùy chỉnh thành chuyển đổi nguyên thủy cho hàm của mình.
