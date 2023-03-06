
function filterRange(arr, a, b) {
  // thêm dấu ngoặc xung quanh biểu thức để dễ đọc hơn
  return arr.filter(item => (a <= item && item <= b));
}
