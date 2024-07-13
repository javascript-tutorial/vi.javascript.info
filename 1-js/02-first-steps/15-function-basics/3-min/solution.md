Một phương án sử dụng `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

Giải pháp với toán tử `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

"Tái bút: Trong trường hợp so sánh bằng nhau `a == b` thì không quan trọng giá trị trả về là gì."