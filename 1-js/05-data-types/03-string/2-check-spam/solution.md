Để làm cho tìm kiếm không phân biệt chữ hoa chữ thường, hãy chuyển chuỗi thành chữ thường và sau đó tìm kiếm:

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

