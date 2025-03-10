importance: 4

---

# Định dạng ngày tương đối

Viết một hàm `formatDate(date)` sẽ định dạng `date` như sau:

- Nếu kể từ `date` trôi qua chưa đến 1 giây, thì `"right now"`.
- Ngược lại, nếu kể từ `date` chưa đến 1 phút, thì `"n sec. ago"`.
- Ngược lại, nếu ít hơn một giờ, thì `"m min. ago"`.
- Nếu không, ngày đầy đủ ở định dạng `"DD.MM.YY HH:mm"`. Đó là: `"ngày.tháng.năm giờ:phút"`, tất cả đều ở định dạng 2 chữ số, ví dụ: `31.12.16 10:00`.

Ví dụ:

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// ngày hôm qua như 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
