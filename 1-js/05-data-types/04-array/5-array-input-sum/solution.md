Hãy lưu ý chi tiết tinh tế nhưng quan trọng của giải pháp. Chúng ta không chuyển đổi `giá trị` thành số ngay sau `dấu nhắc`, bởi vì sau `giá trị = +giá trị`, chúng ta sẽ không thể phân biệt một chuỗi trống (dấu dừng) với số không (số hợp lệ). Thay vào đó, chúng ta làm điều đó sau.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Xin vui lòng nhập một số?", 0);

    // chúng ta có nên hủy không?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```
