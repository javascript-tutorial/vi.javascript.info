importance: 5

---

# Những biến nào có sẵn?

Hàm `makeWorker` bên dưới tạo một hàm khác và trả về hàm đó. Hàm mới đó có thể được gọi từ một nơi khác.

Nó sẽ có quyền truy cập vào các biến bên ngoài từ nơi tạo của nó, hay nơi gọi, hay cả hai?

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// tạo một hàm
let work = makeWorker();

// gọi nó
work(); // nó sẽ hiển thị những gì?
```

Nó sẽ hiển thị giá trị nào? "Pete" hay "John"?
