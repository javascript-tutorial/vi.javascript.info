

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// kiểm tra
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // hiện 3 sau 1 giây
```
