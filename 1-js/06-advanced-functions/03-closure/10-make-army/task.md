importance: 5

---

# Đội quân hàm

Đoạn mã sau tạo ra một array của `shooters`.

Mọi chức năng đều xuất ra số của nó. Nhưng có gì đó không ổn ...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // tạo một hàm shooter,
      alert( i ); // điều đó nên hiển thị số của nó
    };
    shooters.push(shooter); // và thêm nó vào array
    i++;
  }

  // ....và trả lại array shooter
  return shooters;
}

let army = makeArmy();

*!*
// tất cả các shooter hiển thị 10 thay vì số của chúng 0, 1, 2, 3...
army[0](); // 10 từ shooter số 0
army[1](); // 10 từ shooter số 1
army[2](); // 10 ... vân vân.
*/!*
```

Tại sao tất cả các shooter hiển thị cùng một giá trị?

Sửa mã để chúng hoạt động như dự định.

