importance: 4

---

# Ngày nào trong tháng cách đây nhiều ngày?

Tạo một hàm `getDateAgo(date, days)` để trả về ngày trong tháng `days` trước từ `date`.

Ví dụ: nếu hôm nay là ngày 20, thì `getDateAgo(new Date(), 1)` sẽ là ngày 19 và `getDateAgo(new Date(), 2)` sẽ là ngày 18.

Nên hoạt động đáng tin cậy trong `day=365` trở lên:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Thg 1 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Thg 12 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Thg 1 2014)
```

Tái bút: Hàm này nên được sửa đổi `date` đã cho.
