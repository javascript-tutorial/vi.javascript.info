Phương thức `date.getDay()` trả về số ngày trong tuần, bắt đầu từ chủ nhật.

Hãy tạo một array các ngày trong tuần, để chúng ta có thể lấy tên ngày thích hợp theo số của nó:

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Thg 1 2014
alert( getWeekDay(date) ); // FR
```
