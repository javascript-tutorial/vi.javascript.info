
function formatDate(date) {
  let diff = new Date() - date; // sự khác biệt tính bằng mili giây

  if (diff < 1000) { // chưa đầy 1 giây
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // chuyển đổi chênh lệch thành giây

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // chuyển đổi chênh lệch thành phút
  if (min < 60) {
    return min + ' min. ago';
  }

  // định dạng ngày
  // thêm các số 0 đứng đầu vào ngày/tháng/giờ/phút có một chữ số
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // lấy 2 chữ số cuối của mỗi thành phần

  // nối các thành phần vào ngày
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
