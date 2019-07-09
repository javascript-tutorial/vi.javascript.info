
# Thừa kế một class

Giả sử chúng ta có hai class:

`Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} chạy với tốc độ ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} đã dừng lại.`);
  }
}

let animal = new Animal("My animal");
```

![](rabbit-animal-independent-animal.png)


...Và `Rabbit`:

```js
class Rabbit {
  constructor(name) {
    this.name = name;
  }
  hide() {
    alert(`${this.name} ẩn nấp!`);
  }
}

let rabbit = new Rabbit("My rabbit");
```

![](rabbit-animal-independent-rabbit.png)


Hiện tại chúng hoàn toàn đôc lập với nhau.

Nhưng chúng ta muốn `Rabbit` thừa kế từ `Animal`. Nói cách khác, các đối tượng rabbit thừa kế từ các đối tượng animal, có thể truy cập các phương thức của `Animal` cũng như có thể có riêng các phương thức của nó.

Để thừa kế từ một class, ta đặt `"extends"` sau đó là tên của class đó đằng trước `{..}`.

Ở đây `Rabbit` (class con) thừa kế từ class `Animal` (class cha):

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} chạy với tốc độ ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} đã dừng.`);
  }
}

// Rabbit thừa kế từ Animal
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`${this.name} ẩn nấp!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit chạy với tốc độ 5.
rabbit.hide(); // White Rabbit ẩn nấp!
```

Mã của class `Rabbit` trở nên ngắn hơn, vì mặc định nó sử dụng constructor của `Animal`, và cũng thừa kế được phương thức `run` từ `Animal`.

Sâu bên trong, từ khóa `extends` thêm `[[Prototype]]` cho `Rabbit.prototype` để nó tham chiếu đến `Animal.prototype`:

![](animal-rabbit-extends.png)

Cho nên, nếu một phương thức không tìm thấy trong `Rabbit.prototype`, JavaScript lấy nó từ `Animal.prototype`.

Như đã học ở bài <info:native-prototypes>, JavaScript cũng sử dụng cách này cho các đối tượng có sẵn. Ví dụ `Date.prototype.[[Prototype]]` là `Object.prototype`, nên các đối tượng date cũng có các phương thức chung như mọi đối tượng có.

````smart header="Sau `extends` có thể là một biểu thức trả về một class"
Cú pháp thừa kế class cho phép một biểu thức sau `extends` là biểu thức trả về một class.

Ví dụ, biểu thức là một lời gọi hàm trả về class cha:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}

*!*
class User extends f("Xin chào") {}
*/!*

new User().sayHi(); // Xin chào
```
Ở đây `class User` thừa kế từ class trả về của `f("Hello")`.

Nó hữu ích trong các mô hình lập trình nâng cao khi chúng ta sử dụng các hàm tạo ra các class dựa theo nhiều điều kiện và có thể thừa kế từ chúng.
````

## Ghi đè phương thức

Giờ cùng tìm hiểu về ghi đè phương thức. Đến lúc này, `Rabbit` thừa kế phương thức `stop` từ `Animal`.

Nếu ta cũng thêm phương thức `stop` riêng trong `Rabbit`, nó sẽ được dùng chứ không phải `stop` của class cha. Ta nói phương thức của class con ghi đè phương thức của class cha cùng tên.

```js
class Rabbit extends Animal {
  stop() {
    // ...được dùng cho rabbit.stop()
  }
}
```


...Nhưng thường chúng ta không muốn thay thế toàn bộ phương thức của class cha, mà muốn dựa vào phương thức này rồi tinh chỉnh cũng như bổ sung thêm một số tính năng khác. Chúng ta làm việc này trong phương thức của class con nhưng gọi phương thức của class cha trước hoặc sau khi thực hiện.

Các class cung cấp từ khóa `"super"` để làm việc này.

- `super.method(...)` gọi phương thức `method` của class cha.
- `super(...)` gọi constructor của class cha (trong constructor của class con).

Ví dụ, làm cho rabbit tự động ẩn nấp sau khi đã dừng:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed += speed;
    alert(`${this.name} chạy với tốc độ ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} đã dừng.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} ẩn nấp!`);
  }

*!*
  stop() {
    super.stop(); // gọi phương thức stop của class cha
    this.hide(); // và sau đó gọi hide của class con
  }
*/!*
}

let rabbit = new Rabbit("Thỏ trắng");

rabbit.run(5); // Thỏ trắng chạy với tốc độ 5.
rabbit.stop(); // Thỏ trắng đã dừng. Thỏ trắng ẩn nấp!
```

Giờ `Rabbit` có riêng `stop` và gọi `super.stop()` trong quá trình xử lý.

````smart header="Hàm mũi tên không có `super`"
Như đã nói trong bài <info:arrow-functions>, hàm mũi tên không có `super`.

Nếu truy cập, nó được lấy từ hàm ngoài. Ví dụ:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // gọi phương stop của cha sau 1 giây
  }
}
```

`super` trong hàm mũi tên là `super` trong `stop()`. Nếu dùng hàm thông thường, sẽ có lối:

```js
// Sai super
setTimeout(function() { super.stop() }, 1000);
```
````


## Ghi đè constructor

Với constructor điều kiện khắt khe hơn.

Đến giờ, `Rabbit` chưa có `constructor` riêng.

Theo đặc tả [(specification)](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), nếu một class thừa kế từ một class khác và không có `constructor` riêng, thì JavaScript tự động tạo `constructor` trống cho nó như sau:

```js
class Rabbit extends Animal {
  // tự động tạo constructor trống cho Rabbit như sau
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

Như ta thấy, nó cơ bản sẽ gọi `constructor` cha và truyền mọi đối số cho `constructor` cha. Chuyện này chỉ sảy ra nếu ta không viết `constructor` cho class con.

Giờ ta thêm `constructor` riêng cho `Rabbit`. Nó cài đặt thêm thuộc tính `earLength` cùng với thuộc tính `name`:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// Không làm việc!
let rabbit = new Rabbit("Thỏ trắng", 10); // Lỗi: this chưa được định nghĩa.
*/!*
```

Chúng ta có một lỗi và không thể tạo đối tượng rabbit. Vậy nó sai chỗ nào?

Câu trả lời ngắn gọn như sau: `constructor` của class con bắt buộc phải gọi `constructor` của class cha: `super(...)`, và phải làm việc này mới có thể sử dụng `this`.

...Nhưng tại sao? Chuyện gì xảy ra ở đây? Yêu cầu này có vẻ kỳ lạ.

Tất nhiên, có một lời giải thích. Hãy đi sâu vào chi tiết để bạn có thể hiểu chuyện gì đang diễn ra.

Trong JavaScript, có sự khác biệt giữa hàm `constructor` của một class con và các hàm `constructor` khác. Trong class con, hàm `constructor` được "đánh dấu" nhờ một thuộc tính đặc biệt `[[ConstructorKind]]:"derived"`.

Sự khác biêt là:

- Khi một hàm `constructor` bình thường chạy, nó tạo một đối tượng trống và gán cho `this` và tiếp tục thay đổi đối tượng này thông qua `this`.
- Nhưng khi hàm `constructor` của class con chạy, nó không tạo ra đối tượng nào cả. Thay vào đó nó trông chờ `constructor` của class cha làm việc này cho nó.

Cho nên nếu chúng ta tạo ra `constructor` riêng cho class con, chúng ta buộc phải gọi `super`, bởi nếu không gọi, đối tượng mà `this` tham chiếu đến sẽ không được tạo. Và chúng ta có lỗi như trên.

Để `Rabbit` làm việc, chúng ta cần gọi `super()` trước khi dùng `this`, như sau:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// chạy tốt
let rabbit = new Rabbit("Thỏ trắng", 10);
alert(rabbit.name); // Thỏ trắng
alert(rabbit.earLength); // 10
*/!*
```


## Tìm hiểu sâu về super, [[HomeObject]]

Hãy tìm hiểu sâu hơn về cách làm việc của `super`. Chúng ta sẽ thấy vài điều thú vị.

Trước tiên cần nói rằng, với tất cả những gì ta đã được học, ta không thể hiểu cách làm việc của `super`!

Vâng, bạn hãy tự hỏi làm cách nào để nó có thể làm việc về mặt kỹ thuật? Khi đối tượng chạy các phương thức, các phương thức này lấy đối tượng đó làm `this`. Sau đó nếu chúng ta gọi `super.method()`, nó cần lấy `method` từ nguyên mẫu của đối tượng hiện tại.

Chuyện này tưởng như đơn giản, nhưng không. Bạn có thể nghĩ đơn giản: JavaScript engine biết đối tượng hiện tại như `this`, nên nó lấy phương thức cha `method` như `this.__proto__.method`. Không may, giải pháp này không làm việc.

Cùng làm rõ vấn đề này bằng cách chỉ dùng đối tượng đơn thuần.

Trong ví dụ dưới, `rabbit.__proto__ = animal`, trong `rabbit.eat()` gọi `animal.eat()`, bằng `this.__proto__`:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} ăn.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
    // đây có thể là cách super.eat() hoạt dộng
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit ăn.
```

Tại dòng `(*)` chúng ta lấy `eat` từ nguyên mẫu (`animal`) và truyền đối tượng hiện tại làm `this`. Chú ý phải có `.call(this)` nếu không `this.__proto__.eat()` chạy `eat` với `this` là nguyên mẫu (`this.__proto__`), chứ không phải đối tượng hiện tại.

Và đoạn mã hoạt động như dự định: chúng ta có thông báo `alert` chính xác.

Giờ thêm một hoặc nhiều đối tượng vào chuỗi thừa kế và ghi đè phương thức theo cách tương tự. Chúng ta sẽ thấy vấn đề:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} ăn.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...gọi phương thức cha (animal.eat) với this là rabbit
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...làm giống hệt như rabbit.eat
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Lỗi: Vượt qua số stack tối đa
*/!*
```

Đoạn mã không còn làm việc được nữa! Chúng ta thấy lỗi khi gọi `longEar.eat()`.

Có vẻ không rõ ràng, nhưng nếu lần theo `longEar.eat()`, chúng ta sẽ hiểu tại sao. Trong hai dòng `(*)` và `(**)` giá trị của `this` là đối tượng hiện tại (`longEar`). Điều này rất cơ bản: tất cả phương thức lấy đối tượng trước dấu chấm làm `this`, không phải nguyên mẫu hay bất cứ thứ gì.

Cho nên trong hai dòng `(*)` và `(**)` giá trị của `this.__proto__` đều là: `rabbit`. Nên `rabbit.eat` gọi đi gọi lại chính nó (đệ quy) mãi mãi.

Đây là hình ảnh chuyện gì đã xảy ra:

![](this-super-loop.png)

1. Tron `longEar.eat()`, dòng `(**)` gọi `rabbit.eat` cung cấp `this=longEar`.
    ```js
    // bên trong longEar.eat() ta có this = longEar
    this.__proto__.eat.call(this) // (**)
    // trở thành
    longEar.__proto__.eat.call(this)
    // cũng chính là
    rabbit.eat.call(this);
    ```
2. Sau đó trong dòng `(*)` của `rabbit.eat`, chúng ta muốn chuyển lời gọi cho phương thức của đối tượng cao hơn trong chuỗi nguyên mẫu, nhưng `this=longEar`, nên `this.__proto__.eat` lại là `rabbit.eat`!

    ```js
    // bên trong rabbit.eat() ta vẫn có this = longEar
    this.__proto__.eat.call(this) // (*)
    // trở thành
    longEar.__proto__.eat.call(this)
    // hoặc (một lần nữa)
    rabbit.eat.call(this);
    ```

3. ...Nên `rabbit.eat` gọi chính nó mãi mãi.

Vấn đề không thể được giải quyết nếu chỉ sử dụng `this`.

### `[[HomeObject]]`

Để cung cấp giải pháp, JavaScript bổ sung thêm một thuộc tính đặc biệt cho các hàm: `[[HomeObject]]`.

Khi một hàm đóng vai trò như phương thức của class hoặc phương thức của một đối tượng, thuộc tính `[[HomeObject]]` tham chiếu tới class/đối tượng này.

Sau đó `super` sử dụng `[[HomeObject]]` để tìm nguyên mẫu và lấy các phương thức cần thiết.

Cùng xem cách nó làm việc, qua một ví dụ sử chỉ sử dụng đối tượng:

```js run
let animal = {
  name: "Animal",
  eat() {   // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} ăn.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {   // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {   // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// Làm việc đúng
longEar.eat();  // Long Ear ăn.
*/!*
```

Nó làm việc như chủ định dựa vào `[[HomeObject]]`. Một phương thức, như `longEar.eat`, biết `[[HomeObject]]` của nó và lấy phương thức cha từ nguyên mẫu của `[[HomeObject]]`. Không dùng `this`.

### Các phương thức không "tự do"

Như ta đã biết, các hàm thông thường là "tự do", không bị ràng buộc vào đối tượng nào trong JavaScript. Nên chúng ta có thể sao chép chúng cho nhiều đối tượng và gọi với một `this` khác.

Sự tồn tại của `[[HomeObject]]` vi phạm nguyên tắc này, bởi phương thức luôn nhớ đối tượng chứa nó. `[[HomeObject]]` không thể thay đổi, nên ràng buộc này tồn tại mãi mãi.

May mắn `[[HomeObject]]` chỉ được dùng với `super`. Nên nếu phương thức không dùng `super`, chúng ta vẫn có thể xem nó là "tự do".

Đây là ví dụ một phương thức sử dụng `super` sẽ hoạt động sai khi sao chép cho đối tượng khác:

```js run
let animal = {
  sayHi() {
    alert("Tôi là động vật");
  }
};

let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("Tôi là thực vật");
  }
};

let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // Tôi là động vật (?!?)
*/!*
```

Gọi `tree.sayHi()` sẽ hiển thị "Tôi là động vật". Đây là kết quả sai.

Lý do đơn giản:
- Trong dòng `(*)`, phương thức `tree.sayHi` được sao chép từ `rabbit.sayHi` (thực ra chúng là một).
- Cho nên `[[HomeObject]]` là `rabbit`, vì nó được tạo từ đầu trong `rabbit`. Không có cách nào thay đổi `[[HomeObject]]`.
- Mã của `tree.sayHi()` có `super.sayHi()` bên trong. Nó tìm tới `rabbit` và lấy phương thức từ `animal`.

![](super-homeobject-wrong.png)

### Phương thức, không phải thuộc tính hàm

`[[HomeObject]]` được định nghĩa cho các phương thức trong cả đối tượng lần trong class. Nhưng với các đối tượng, phương thức này buộc phải khai báo theo kiểu phương thức `method()`, không khai báo theo kiểu thuộc tính `"method: function()"`.

Sự khác biệt này có thể không quan trọng với chúng ta, nhưng nó rất quan trọng với JavaScript.

Ở ví dụ sau. phương thức được khai báo theo kiểu thuộc tính. Thuộc tính `[[HomeObject]]` không được cài đặt và `super` không hoạt động:

```js run
let animal = {
  eat: function() { // phải phải dùng cú pháp: eat() {...}
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Lỗi khi gọi super (vì không có [[HomeObject]])
*/!*
```

## Tóm tắt

1. Để thừa kế một class: `class Child extends Parent`:
    - Có nghĩa rằng `Child.prototype.__proto__` sẽ là `Parent.prototype`.
2. Khi ghi đè constructor:
    - Chúng ta phải gọi constructor cha `super()` trong constructor của `Child` trước khi sử dụng `this`.
3. Khi ghi đè phương thức khác:
    - Chúng ta có thể sử dụng `super.method()` trong phương thức của `Child` để gọi phương thức của `Parent`.
4. Sâu bên trong:
    - Phương thức nhớ class/đối tượng chứa nó trong thuộc tính `[[HomeObject]]`. Nó giúp `super` tìm thấy các phương thức cha.
    - Không an toàn khi sao chép các phương thức có `super` từ đối tượng này tới đối tượng khác.

Cũng cần biết:
- Các hàm mũi tên không có `this` và `super`.
