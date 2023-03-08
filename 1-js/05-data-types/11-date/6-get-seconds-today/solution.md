Để có được số giây, chúng ta có thể tạo một ngày bằng cách sử dụng ngày và giờ hiện tại 00:00:00, sau đó trừ nó từ "bây giờ".

Sự khác biệt là số mili giây từ đầu ngày, mà chúng ta nên chia cho 1000 để có giây:

```js run
function getSecondsToday() {
  let now = new Date();

  // tạo một đối tượng sử dụng ngày/tháng/năm hiện tại
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // chênh lệch ms
  return Math.round(diff / 1000); // làm cho giây
}

alert( getSecondsToday() );
```

Một giải pháp thay thế sẽ là lấy giờ/phút/giây và chuyển đổi chúng thành giây:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
```
