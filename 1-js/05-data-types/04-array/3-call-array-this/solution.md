Lệnh gọi `arr[2]()` về mặt cú pháp là `obj[method]()` cũ tốt, ở vai trò `obj` chúng ta có `arr` và ở vai trò `method` chúng ta có `2` .

Vì vậy, chúng ta có một lệnh gọi hàm `arr[2]` như một phương thức đối tượng. Đương nhiên, nó nhận được `this` tham chiếu đến đối tượng `arr` và xuất ra array:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
```

Array có 3 giá trị: ban đầu nó có hai giá trị, cộng với hàm.
