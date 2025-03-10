Để có được số mili giây cho đến ngày mai, chúng ta có thể từ "ngày mai 00:00:00" trừ đi ngày hiện tại.

Đầu tiên, chúng ta tạo "ngày mai" đó, rồi thực hiện:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // ngày mai
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // chênh lệch mili giây
  return Math.round(diff / 1000); // chuyển đổi thành giây
}
```

Giải pháp thay thế:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Hãy lưu ý rằng nhiều quốc gia có Giờ tiết kiệm ánh sáng ban ngày (DST), vì vậy có thể có những ngày có 23 hoặc 25 giờ. Chúng ta có thể muốn xử lý những ngày như vậy một cách riêng biệt.
