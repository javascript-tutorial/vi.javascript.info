importance: 5

---

# Tính tổng tất cả các số cho đến một số đã cho

Viết hàm `sumTo(n)` để tính tổng các số `1 + 2 + ... + n`.

Ví dụ:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Thực hiện 3 biến thể giải pháp:

1. Sử dụng vòng lặp for.
2. Sử dụng đệ quy, gây ra `sumTo(n) = n + sumTo(n-1)` cho `n > 1`.
3. Sử dụng công thức [cấp số cộng](https://vi.wikipedia.org/wiki/C%E1%BA%A5p_s%E1%BB%91_c%E1%BB%99ng).

Một ví dụ về kết quả:

```js
function sumTo(n) { /*... mã của bạn ... */ }

alert( sumTo(100) ); // 5050
```

Tái bút: Biến thể giải pháp nào là nhanh nhất? Chậm nhất? Tại sao?

Tái bút nữa: Chúng ta có thể sử dụng đệ quy để đếm `sumTo(100000)` không?
