Kết quả là `4`:


```js run
let fruits = ["Táo", "Lê", "Cam"];

let shoppingCart = fruits;

shoppingCart.push("Chuối");

*!*
alert( fruits.length ); // 4
*/!*
```

Đó là bởi vì array là đối tượng. Vì vậy, cả `shoppingCart` và `fruits` đều là các tham chiếu đến cùng một array.
