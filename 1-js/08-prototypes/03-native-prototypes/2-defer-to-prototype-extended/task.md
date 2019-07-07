importance: 4

---

# Thêm hàm trang trí "defer()" cho mọi hàm

Thêm vào nguyên mẫu của các hàm phương thức `defer(ms)`, trả về một hàm bao, làm chậm lời gọi hàm đi `ms` mi-li-giây.

Đây là ví dụ về cách làm việc của nó:

```js
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // hiện 3 sau 1 giây
```

Chú ý rằng các đối số được truyền tới hàm gốc.
