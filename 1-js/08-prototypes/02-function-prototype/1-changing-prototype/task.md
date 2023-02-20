importance: 5

---

# Thay đổi "prototype"

Trong mã dưới đây chúng ta tạo ra `new Rabbit`, sau đó cố gắng thay đổi prototype của nó.

Ban đầu, chúng ta có mã này:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


1. Chúng ta đã thêm một chuỗi nữa (được nhấn mạnh). Giờ thì `alert` sẽ hiển thị gì?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```

2. ...Và nếu mã trở thành như sau (đã thay đổi một dòng) thì `alert` sẽ hiển thị gì?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

3. Câu hỏi tương tự nếu mã như sau (đã thay đổi một dòng)?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```

4. Và phiên bản cuối cùng:

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
