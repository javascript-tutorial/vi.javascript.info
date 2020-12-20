# Sự kế thừa class

Kế thừa class là một cách để một lớp mở rộng một lớp khác.

## Từ khóa "extends"

Giả sử chúng ta có class `Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} chạy với tốc độ ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} đứng yên.`);
  }
}

let animal = new Animal("My animal");
```

Đây là cách chúng ta có thể biểu diễn đối tượng `animal` và class `Animal` bằng biểu đồ:

![](rabbit-animal-independent-animal.svg)

...Và chúng ta muốn tạo một `class Rabbit` khác.

Vì thỏ là động vật, class `Rabbit` nên dựa trên class `Animal`, có quyền truy cập đến các phương thức của động vật, để cho thỏ có thể làm những gì mà động vật nói chung có thể làm.

Cú pháp để mở rộng một class khác là: `class Child extends Parent`.

Hãy tạo `class Rabbit` mà kế thừa từ `Animal`:

```js
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

Đối tượng của class `Rabbit` có quyền truy cập đến cả các phương thức của `Rabbit` như `rabbit.hide()`, và cả các phương thức của `Animal` như `rabbit.run()`.

Ở bên trong, từ khóa `extends` hoạt động bằng cách sử dụng cơ chế nguyên mẫu quen thuộc. Nó đặt `Rabbit.prototype.[[Prototype]]` thành `Animal.prototype`. Vì thế, nếu một phương thức không được tìm thấy trong `Rabbit.prototype`, JavaScript sẽ lấy nó từ `Animal.prototype`.

![](animal-rabbit-extends.svg)

Ví dụ, để tìm phương thức `rabbit.run`, engine kiểm tra (từ dưới lên như trong hình trên):

1. Đối tượng `rabbit` (không có `run`).
2. Nguyên mẫu của nó, là `Rabbit.prototype` (có `hide`, nhưng không có `run`).
3. Nguyên mẫu của nó, là `Animal.prototype` (do `extends`), cuối cùng có phương thức `run`.

Như chúng ta có thể nhớ lại từ chương <info:native-prototypes>, bản thân JavaScript sử dụng kế thừa nguyên mẫu cho các đối tượng có sẵn. Ví dụ, `Date.prototype.[[Prototype]]` là `Object.prototype`. Đó là lý do tại sao các đối tượng ngày tháng có quyền truy cập vào các phương thức của đối tượng chung.

````smart header="Bất kỳ biểu thức nào cũng được phép nằm sau `extends`"
Cú pháp class cho phép chỉ định không chỉ một class, mà còn bất kỳ biểu thức nào đằng sau `extends`.

Ví dụ, một lời gọi hàm mà sinh ra một class cha:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

*!*
class User extends f("Xin chào") {}
*/!*

new User().sayHi(); // Xin chào
```

Ở đây `class User` kế thừa từ kết quả của `f("Hello")`.

Điều đó có thể hữu ích cho các khuôn mẫu lập trình nâng cao khi chúng ta sử dụng các hàm để tạo các class phụ thuộc vào nhiều điều kiện và có thể kế thừa từ chúng.
````

## Ghi đè một phương thức

Bây giờ, hãy tiếp tục và ghi đè một phương thức. Theo mặc định, tất cả các phương thức không được chỉ định trong `class Rabbit` được lấy trực tiếp "nguyên trạng" từ `class Animal`.

Nhưng nếu chúng ta chỉ định phương thức của riêng mình trong `Rabbit`, chẳng hạn như `stop()`, thì nó sẽ được sử dụng để thay thế:

```js
class Rabbit extends Animal {
  stop() {
    // ...bây giờ phương thức này sẽ được dùng cho rabbit.stop()
    // thay vì stop() từ class Animal
  }
}
```

Thông thường, chúng ta không muốn thay thế hoàn toàn một phương thức cha mà thay vào đó là xây dựng thêm trên phương thức đó để điều chỉnh hoặc mở rộng chức năng của nó. Chúng ta thực hiện việc gì đó trong phương thức của mình, nhưng gọi phương thức cha trước, sau, hoặc trong quá trình đó.

Các class cung cấp từ khóa `"super"` cho điều đó.

- `super.method(...)` gọi phương thức `method` của class cha.
- `super(...)` gọi constructor của class cha (chỉ trong constructor của class con).

Ví dụ, làm cho rabbit tự động ẩn nấp sau khi đã dừng:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} chạy với tốc độ ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} đứng yên.`);
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
rabbit.stop(); // Thỏ trắng đứng yên. Thỏ trắng ẩn nấp!
```

Giờ `Rabbit` có phương thức `stop` mà gọi `super.stop()` của cha trong quá trình xử lý.

````smart header="Các hàm mũi tên không có `super`"
Như đã nói trong chương <info:arrow-functions>, các hàm mũi tên không có `super`.

Nếu truy cập, nó sẽ được lấy từ hàm bao ngoài. Ví dụ:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // gọi phương thức stop của cha sau 1 giây
  }
}
```

`super` trong hàm mũi tên cũng giống như trong hàm `stop()`, vì vậy nó hoạt động như dự định. Nếu chúng ta chỉ định một hàm "thông thường" ở đây, sẽ có lỗi:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````

## Ghi đè constructor

Với các hàm tạo, nó đòi hỏi phải tinh tế một chút.

Đến giờ, `Rabbit` chưa có `constructor` riêng.

Theo [(bản đặc tả)](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), nếu một class mở rộng một class khác và không có `constructor` riêng, thì `constructor` rỗng sau đây được sinh ra:

```js
class Rabbit extends Animal {
  // được sinh ra cho các class con không có constructor
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

Chúng ta có thể thấy, nó cơ bản là gọi `constructor` cha và truyền mọi đối số cho `constructor` cha. Điều đó xảy ra nếu chúng ta không viết `constructor` của riêng mình.

Bây giờ hãy thêm một `constructor` tùy chỉnh cho `Rabbit`. Ngoài `name` ra, nó sẽ có `earLength`:

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
// Không hoạt động!
let rabbit = new Rabbit("Thỏ trắng", 10); // Lỗi: this chưa được định nghĩa.
*/!*
```

Úi chà! Chúng ta có một lỗi. Bây giờ chúng ta không thể tạo đối tượng rabbit. Điều gì đã sai nhỉ?

Câu trả lời ngắn gọn là:

- **`constructor` của class con bắt buộc phải gọi `super(...)`, và làm điều đó trước khi sử dụng `this`.**

...Nhưng tại sao? Chuyện gì đang xảy ra ở đây? Quả thực, yêu cầu này có vẻ kỳ lạ.

Tất nhiên, có một lời giải thích. Hãy đi vào chi tiết, vì thế bạn sẽ thực sự hiểu những gì đang xảy ra.

Trong JavaScript, có sự phân biệt giữa hàm constructor của class kế thừa (còn gọi là "derived constructor") và các hàm khác. Một derived constructor có một thuộc tính nội bộ đặc biệt `[[ConstructorKind]]:"derived"`. Đó là một nhãn nội bộ đặc biệt.

Nhãn đó ảnh hưởng đến hành vi của nó với `new`.

- Khi một hàm thông thường được thực thi với `new`, nó sẽ tạo một đối tượng rỗng và gán nó cho `this`.
- Nhưng khi một derived constructor thực thi, nó không làm thế. Nó mong đợi constructor cha thực hiện công việc này.

Vì vậy, một derived constructor phải gọi `super` để thực thi constructor cha (cơ sở) của nó, nếu không đối tượng cho `this` sẽ không được tạo. Và chúng ta sẽ gặp lỗi.

Để constructor `Rabbit` hoạt động, nó cần phải gọi `super()` trước khi sử dụng `this`, như ở đây:

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
// giờ thì ổn
let rabbit = new Rabbit("Thỏ trắng", 10);
alert(rabbit.name); // Thỏ trắng
alert(rabbit.earLength); // 10
*/!*
```

### Ghi đề các trường của class: một lưu ý tinh tế

```warn header="Lưu ý nâng cao"
Lưu ý này giả định rằng bạn có kinh nghiệm nhất định với các class, có thể trong các ngôn ngữ lập trình khác.

Nó cung cấp cái nhìn sâu sắc hơn về ngôn ngữ và cũng giải thích hành vi mà có thể là nguồn gốc của các lỗi (nhưng không thường xuyên).

Nếu bạn thấy nó khó hiểu, cứ đọc tiếp, rồi quay lại tìm hiểu nó vào một thời điểm nào đó sau này.
```

Chúng ta có thể ghi đè không chỉ các phương thức mà còn cả các trường của class.

Dù vậy, có một hành vi tinh tế khi chúng ta truy cập một trường bị ghi đè trong constructor cha, khá khác biệt với hầu hết các ngôn ngữ lập trình khác.

Hãy xét ví dụ này:

```js run
class Animal {
  name = 'động vật';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'thỏ';
}

new Animal(); // động vật
*!*
new Rabbit(); // động vật
*/!*
```

Ở đây class `Rabbit` mở rộng class `Animal` và ghi đè trường `name` với giá trị của riêng nó.

Không có constructor của riêng `Rabbit`, cho nên constructor của `Animal` được gọi.

Điều thú vị là trong cả hai trường hợp: `new Animal()` và `new Rabbit()`, `alert` ở dòng đánh dấu `(*)` đều hiển thị `động vật`.

**Nói cách khác, constructor cha luôn sử dụng giá trị trường của chính nó, chứ không phải giá trị trường ghi đè.**

Có gì kỳ lạ về nó?

Nếu vẫn chưa rõ, hãy so sánh với các phương thức.

Đây là đoạn mã tương tự, nhưng thay vì trường `this.name` chúng ta gọi phương thức `this.showName()`:

```js run
class Animal {
  showName() {  // thay vì this.name = 'động vật'
    alert('động vật');
  }

  constructor() {
    this.showName(); // thay vì alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('thỏ');
  }
}

new Animal(); // động vật
*!*
new Rabbit(); // thỏ
*/!*
```

Xin lưu ý: bây giờ đầu ra là khác nhau.

Và đó là những gì chúng ta vốn mong đợi. Khi constructor cha được gọi trong class con, nó sử dụng phương thức ghi đè.

...Nhưng với các trường của class thì không phải như vậy. Như đã nói, constructor cha luôn sử dụng trường cha.

Tại sao lại có sự khác biệt này?

Lí do là ở thứ tự khởi tạo trường. Trường của class được khởi tạo:

- Trước constructor đối với class cơ sở (mà không mở rộng bất kỳ class nào nữa),
- Ngay sau `super()` đối với class con.

Trong tình huống của chúng ta, `Rabbit` là class con. Nó không có `constructor()`. Như đã nói trước đây, điều đó giống như thể có một constructor rỗng với duy nhất `super(...args)`.

Vì vậy, `new Rabbit()` gọi `super()`, do đó thực thi constructor cha và chỉ sau đó các trường của nó mới được khởi tạo (theo quy tắc cho các class con). Tại thời điểm thực thi constructor cha, chưa có trường nào của `Rabbit`, đó là lý do tại sao các trường của `Animal` được sử dụng.

Sự khác biệt tinh vi giữa các trường và các phương thức này là đặc trưng cho JavaSript.

May mắn thay, loại hành vi này chỉ tự lộ ra nếu một trường ghi đè được sử dụng trong constructor cha. Sau đó có thể khó để hiểu được những gì đang diễn ra, vậy nên chúng ta mới đang giải thích nó ở đây.

Nếu nó trở thành một vấn đề, người ta có thể khắc phục nó bằng cách sử dụng các phương thức hoặc getter/setter thay vì các trường.

## Super: bản chất, [[HomeObject]]

```warn header="Thông tin nâng cao"
Nếu bạn lần đầu tiên đọc hướng dẫn này - phần này có thể bỏ qua.

Nó là về các cơ chế bên trong đằng sau sự kế thừa và `super`.
```

Hãy tìm hiểu sâu hơn một chút về `super`. Chúng ta sẽ thấy một số điều thú vị trong quá trình đó.

Đầu tiên phải nói rằng, từ tất cả những gì chúng ta đã học được cho đến giờ, không thể nào `super` lại hoạt động được!

Quả thực vậy, chúng ta hãy tự hỏi mình, về mặt kỹ thuật nó phải hoạt động như thế nào? Khi một phương thức của đối tượng thực thi, nó nhận đối tượng hiện tại làm `this`. Nếu chúng ta gọi `super.method()` thì engine cần lấy `method` từ nguyên mẫu của đối tượng hiện tại. Nhưng bằng cách nào?

Nhiệm vụ này có vẻ đơn giản nhưng không phải vậy. JavaScript engine biết đối tượng `this` hiện tại, vậy nên nó có thể lấy phương thức cha `method` bằng `this.__proto__.method`. Thật không may, một giải pháp ngây thơ như vậy sẽ không có kết quả.

Hãy cùng chứng tỏ vấn đề này. Không dùng các class mà chỉ sử dụng các đối tượng đơn thuần cho đơn giản.

Bạn có thể bỏ qua phần này và chuyển đến mục con `[[HomeObject]]` ở dưới nếu bạn không muốn biết chi tiết. Điều đó không có hại gì cả. Hoặc hãy đọc tiếp nếu bạn quan tâm đến việc hiểu sâu các thứ.

Trong ví dụ bên dưới, `rabbit.__proto__ = animal`. Bây giờ hãy thử: trong `rabbit.eat()` chúng ta sẽ gọi `animal.eat()`, sử dụng `this.__proto__`:

```js run
let animal = {
  name: "Động vật",
  eat() {
    alert(`${this.name} ăn.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Thỏ",
  eat() {
*!*
    // đó có lẽ là cách super.eat() hoạt động
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Thỏ ăn.
```

Tại dòng `(*)` chúng ta lấy `eat` từ nguyên mẫu (`animal`) và gọi nó trong ngữ cảnh của đối tượng hiện thời. Xin lưu ý rằng `.call(this)` ở đây là quan trọng, bởi vì một lời gọi đơn giản `this.__proto__.eat()` sẽ thực thi phương thức `eat` cha trong ngữ cảnh của nguyên mẫu chứ không phải của đối tượng hiện thời.

Và trong đoạn mã trên nó thực sự hoạt động như dự định: chúng ta có `alert` chính xác.

Bây giờ chúng ta hãy thêm một đối tượng nữa vào chuỗi. Chúng ta sẽ thấy mọi thứ vỡ ra như thế nào:

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
    // ...gọi phương thức cha (animal)
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ......gọi phương thức cha (rabbit)
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Lỗi: Đã vượt quá kích thước ngăn xếp lời gọi tối đa
*/!*
```

Đoạn mã không còn hoạt động nữa! Chúng ta có thể thấy lỗi khi cố gắng gọi `longEar.eat()`.

Có thể không rõ ràng như vậy, nhưng nếu chúng ta lần theo lời gọi `longEar.eat()`, thì chúng ta có thể thấy tại sao. Trong cả hai dòng `(*)` và `(**)`, giá trị của `this` là đối tượng hiện tại (`longEar`). Đó là điều cần thiết: tất cả các phương thức của đối tượng đều lấy đối tượng hiện tại làm `this`, chứ không phải một nguyên mẫu hay thứ gì đó.

Vì vậy trong cả hai dòng `(*)` và `(**)`, giá trị của `this .__ proto__` hoàn toàn giống nhau: `rabbit`. Cả hai đều gọi `rabbit.eat` trong vòng lặp vô tận mà không cần đi lên trên chuỗi nguyên mẫu.

Đây là hình ảnh chuyện gì đã xảy ra:

![](this-super-loop.svg)

1. Trong `longEar.eat()`, dòng `(**)` gọi `rabbit.eat` và cho nó `this=longEar`.

    ```js
    // bên trong longEar.eat() chúng ta có this = longEar
    this.__proto__.eat.call(this) // (**)
    // trở thành
    longEar.__proto__.eat.call(this)
    // cũng chính là
    rabbit.eat.call(this);
    ```

2. Sau đó trong dòng `(*)` của `rabbit.eat`, chúng ta muốn chuyển lời gọi lên cao hơn nữa trong chuỗi nguyên mẫu, nhưng `this=longEar`, nên `this.__proto__.eat` lại là `rabbit.eat`!

    ```js
    // bên trong rabbit.eat() chúng ta vẫn có this = longEar
    this.__proto__.eat.call(this) // (*)
    // trở thành
    longEar.__proto__.eat.call(this)
    // hoặc (một lần nữa)
    rabbit.eat.call(this);
    ```

3. ...Vì vậy, `rabbit.eat` tự gọi nó trong vòng lặp vô tận, bởi vì nó không thể đi lên nữa.

Vấn đề không thể được giải quyết bằng cách chỉ sử dụng `this`.

### `[[HomeObject]]`

Để cung cấp giải pháp, JavaScript bổ sung thêm một thuộc tính đặc biệt cho các hàm: `[[HomeObject]]`.

Khi một hàm được chỉ định làm phương thức của class hoặc phương thức của một đối tượng, thuộc tính `[[HomeObject]]` của nó tham chiếu tới class/đối tượng này.

Sau đó `super` sử dụng `[[HomeObject]]` để tìm ra nguyên mẫu cha và các phương thức của nó.

Hãy xem cách nó hoạt động, trước tiên với các đối tượng đơn giản:

```js run
let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} ăn.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// Làm việc đúng
longEar.eat();  // Long Ear ăn.
*/!*
```

Nó hoạt động như dự định, do cơ chế `[[HomeObject]]`. Một phương thức, chẳng hạn như `longEar.eat`, biết `[[HomeObject]]` của nó và lấy phương thức cha từ nguyên mẫu của nó. Không cần sử dụng `this` chút nào.

### Các phương thức không "tự do"

Như chúng ta đã biết, nói chung trong JavaScript, các hàm là "tự do", không ràng buộc vào các đối tượng. Nên chúng có thể được sao chép cho nhiều đối tượng và gọi với một `this` khác.

Sự tồn tại của `[[HomeObject]]` vi phạm nguyên tắc đó, bởi các phương thức luôn nhớ các đối tượng của chúng. `[[HomeObject]]` không thể thay đổi, nên ràng buộc này là mãi mãi.

Chỗ duy nhất trong ngôn ngữ sử dụng `[[HomeObject]]` -- là `super`. Vì vậy, nếu một phương thức không sử dụng `super`, thì chúng ta vẫn có thể coi nó là tự do và sao chép giữa các đối tượng. Nhưng với `super` mọi thứ có thể sai.

Đây là ví dụ về một kết quả `super` sai sau khi sao chép:

```js run
let animal = {
  sayHi() {
    alert("Tôi là một con vật");
  }
};

// rabbit inherits from animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("Tôi là một cái cây");
  }
};

// tree inherits from plant
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // Tôi là một con vật (?!?)
*/!*
```

Lời gọi `tree.sayHi()` hiển thị "Tôi là một con vật". Rõ ràng là sai.

Lý do thật đơn giản:

- Trong dòng `(*)`, phương thức `tree.sayHi` đã được sao chép từ `rabbit`. Có lẽ chúng ta chỉ muốn tránh trùng lặp mã?
- `[[HomeObject]]` của nó là `rabbit`, vì nó được tạo trong `rabbit`. Không có cách nào để thay đổi `[[HomeObject]]`.
- Đoạn mã của `tree.sayHi()` có `super.sayHi()` bên trong. Nó đi lên từ `rabbit` và lấy phương thức từ `animal`.

Đây là biểu đồ của những gì xảy ra:

![](super-homeobject-wrong.svg)

### Phương thức, không phải thuộc tính hàm

`[[HomeObject]]` được định nghĩa cho các phương thức cả trong class lẫn trong đối tượng đơn giản. Nhưng với đối tượng, các phương thức  phải được khai báo chính xác là `method()`, chứ không phải là `"method: function()"`.

Sự khác biệt này có thể không cần thiết đối với chúng ta, nhưng nó quan trọng với JavaScript.

Để so sánh, ví dụ dưới đây sử dụng cú pháp không-phải-phương-thức. Thuộc tính `[[HomeObject]]` không được thiết lập và sự kế thừa không hoạt động:

```js run
let animal = {
  eat: function() { // cố ý viết như thế này thay vì eat() {...
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

1. Để kế thừa một class: `class Child extends Parent`:
    - Có nghĩa rằng `Child.prototype.__proto__` sẽ là `Parent.prototype`, cho nên các phương thức được kế thừa.
2. Khi ghi đè constructor:
    - Chúng ta phải gọi constructor cha `super()` trong constructor của `Child` trước khi sử dụng `this`.
3. Khi ghi đè phương thức khác:
    - Chúng ta có thể sử dụng `super.method()` trong phương thức của `Child` để gọi phương thức của `Parent`.
4. Bản chất:
    - Phương thức nhớ class/đối tượng của nó trong thuộc tính nội bộ `[[HomeObject]]`. Đó là cách `super` tìm ra các phương thức cha.
    - Vì thế không an toàn khi sao chép phương thức có `super` từ đối tượng này sang đối tượng khác.

Ngoài ra:

- Các hàm mũi tên không có `this` hoặc `super` của riêng chúng, vì vậy chúng hoàn toàn phù hợp với ngữ cảnh xung quanh.
