Chúng ta có thể sử dụng `slice()` để tạo một bản sao và chạy sắp xếp trên đó:

```js run
function copySorted(arr) {
  return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

*!*
let sorted = copySorted(arr);
*/!*

alert( sorted );
alert( arr );
```

