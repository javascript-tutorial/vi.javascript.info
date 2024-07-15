
```js run demo
function pow(x, n) {
  let result = x;

  for (let i = 1; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
  alert(`Số mũ ${n} không được hỗ trợ, hãy dùng một số nguyên dương`);
} else {
  alert( pow(x, n) );
}
```
