

```js run
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  alert("Xin chào!");
}

f.defer(1000); // hiện "Xin chào!" sau 1 giây
```
