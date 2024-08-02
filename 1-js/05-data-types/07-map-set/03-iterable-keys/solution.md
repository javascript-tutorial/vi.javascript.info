
Đó là bởi vì `map.keys()` trả về một iterable, nhưng không phải là một array.

Chúng ta có thể chuyển đổi nó thành một array bằng cách sử dụng `Array.from`:


```js run
let map = new Map();

map.set("tên", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("thêm");

alert(keys); // tên, thêm
```
