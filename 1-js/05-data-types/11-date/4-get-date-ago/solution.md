Ý tưởng rất đơn giản: trừ số ngày đã cho từ `date`:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...Nhưng chức năng không nên thay đổi `date`. Đó là một điều quan trọng, bởi vì mã bên ngoài cung cấp cho chúng ta ngày không mong đợi nó thay đổi.

Để thực hiện nó, hãy sao chép ngày, như thế này:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Thg 1 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Thg 12 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Thg 1 2014)
```
