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

Tái bút: Trong trường hợp có một phương trình `a == b` thì nó không còn quan trọng việc trả về giá trị gì.