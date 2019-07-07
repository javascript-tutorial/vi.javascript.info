importance: 5

---

# Thêm phương thức "f.defer(ms)" tới các hàm

Thêm vào nguyên mẫu của các hàm phương thức `defer(ms)`, chạy hàm sau `ms` mi-li-giây.

Đảm bảo đoạn mã sau làm việc:

```js
function f() {
  alert("Xin chào!");
}

f.defer(1000); // hiện "Xin chào!" sau 1 giây
```
