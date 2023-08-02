importance: 5

---

# Gọi trong ngữ cảnh array

Kết quả là gì? Tại sao?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```
