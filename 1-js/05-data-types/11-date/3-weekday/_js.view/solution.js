function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // ngày trong tuần 0 (chủ nhật) là 7 ở châu Âu
    day = 7;
  }

  return day;
}
