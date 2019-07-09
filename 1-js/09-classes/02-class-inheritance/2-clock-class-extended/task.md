importance: 5

---

# Tạo lớp thừa kế từ Clock

Chúng ta có class `Clock` trong file `clock.js`. Lúc này, nó in ra thời gian sau mỗi giây.


[js src="source.view/clock.js"]

Tạo class `ExtendedClock` thừa kế từ `Clock` thêm tham số `precision` -- là số `ms` giữa hai lần in thời gian. Mặc định là `1000` (1 giây).

- Mã của bạn nên đặt trong file `extended-clock.js`
- Đừng sửa file `clock.js`. Chỉ thừa kế nó.
