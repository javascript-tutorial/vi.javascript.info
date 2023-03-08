Hãy tạo một ngày bằng cách sử dụng tháng tiếp theo, nhưng chuyển số 0 thành ngày:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Thông thường, ngày bắt đầu từ 1, nhưng về mặt kỹ thuật, chúng ta có thể chuyển bất kỳ số nào, ngày sẽ tự động điều chỉnh. Vì vậy, khi chúng ta vượt qua 0, thì nó có nghĩa là "một ngày trước ngày đầu tiên của tháng", nói cách khác: "ngày cuối cùng của tháng trước".
