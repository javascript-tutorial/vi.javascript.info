
function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // loại bỏ nếu ở bên ngoài khoảng thời gian
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}
