```js run demo
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

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // loại bỏ các số trừ từ 1 đến 4

alert( arr ); // [3, 1]
```
