Độ dài tối đa phải là `maxlength`, vì vậy chúng ta cần cắt nó ngắn hơn một chút để tạo khoảng trống cho dấu chấm lửng.

Lưu ý rằng thực tế có một ký tự Unicode duy nhất cho dấu chấm lửng. Đó không phải là ba chấm.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
