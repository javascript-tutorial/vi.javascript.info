# Re-resolve một promise?

Đoạn code dưới đây sẽ in ra gì?

```js
let promise = new Promise(function (resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
