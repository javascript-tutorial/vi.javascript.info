
Bạn có thể lưu ý những điều sau:

```js no-beautify
<<<<<<< HEAD
function pow(x,n)  // <- không có khoảng cách giữa các đối số
{  // <- dấu ngoặc đơn trên một dòng riêng biệt
  let result=1;   // <- không có dấu cách trước hoặc sau dấu =
  for(let i=0;i<n;i++) {result*=x;}   // <- không có dấu cách
  // nội dung của { ... } nên ở một dòng mới
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- có thể trên lý thuyết,
// nhưng tốt hơn là viết thành 2 dòng, cũng như không có dấu cách và thiếu ;
if (n<=0)  // <- không có khoảng trắng bên trong (n <= 0) và phải có thêm dòng phía trên nó
{ // <- dấu ngoặc trên một dòng riêng biệt
  // bên dưới - các dòng dài có thể được chia thành nhiều dòng để dễ đọc hơn
  alert(`Luỹ thừa ${n} không được hỗ trợ, vui lòng nhập một số nguyên lớn hơn 0`);
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
>>>>>>> 20208769e528337949e946f526534d61d38bac47
}
else // <- có thể viết nó trên một dòng như "} else {"
{
  alert(pow(x,n))  // không có dấu cách và thiếu ;
}
```

Biến thể cố định:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
  alert(`Luỹ thừa ${n} không được hỗ trợ,
  vui lòng nhập một số nguyên lớn hơn 0`);
} else {
  alert( pow(x, n) );
}
```
