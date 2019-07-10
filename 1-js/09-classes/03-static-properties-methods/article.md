
# Các thuộc tính và phương thức tĩnh

Chúng ta có thể thêm các phương thức thẳng vào hàm class, không thêm vào `"prototype"` của hàm. Chúng được gọi là các phương thức tĩnh (static method).

Ví dụ:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

Hoặc có thể gán hàm trực tiếp cho phương thức của `User`:

```js
class User() { }

User.staticMethod = function() {
  alert(this === User);
};
```

Giá trị của `this` bên trong `User.staticMethod()` là constructor của class `User` (vẫn theo quy tắc "đối tượng trước dấu chấm").

Các phương thức tĩnh thường được sử dụng để chạy các hàm thuộc về class, không thuộc về một đối tượng cụ thể nào.

Ví dụ, chúng ta có các đối tượng `Article` và cần một hàm để so sánh chúng. Lựa chọn tự nhiên là dùng phương thức `Article.compare`, như sau:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// sử dụng
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

Ở đây `Article.compare` dùng để so sánh hai đối tượng article, muốn vậy nó phải "ở trên" mọi đối tượng article. Nó không thuộc về bất cứ đối tượng nào, mà thuộc về class đại diện cho các đối tượng.

Một ví dụ khác là phương thức "factory". Tưởng tượng ta cần tạo nhiều phiên bản của article:

1. Bằng cách cung cấp các tham số (`title`, `date`...).
2. Tạo đối tượng trống với `date` hiện tại.
3. ...

Cách đầu tiên có thể thực hiện bằng constructor. Cách thứ hai có thể thực hiện bằng cách tạo một phương thức tĩnh.

Chẳng hạn `Article.createTodays()`:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // nhớ rằng, this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Todays digest
```

Giờ ta có thể tạo đối tượng có tiêu đề "Today's digest" với `date` là ngày hiện tại bằng cách gọi phương thức tính `Article.createTodays()`.

Các phương thức tĩnh cũng được sử dụng trong các class liên quan đến cơ sở dữ liệu để tìm kiếm/lưu trữ/xóa dữ liệu từ cơ sở dữ liệu,chẳng hạn như:

```js
// giả sử Article là class quản lý các article
// phương thức tính dùng xóa article
Article.remove({id: 12345});
```

## Các thuộc tính tĩnh

[recent browser=Chrome]

Cũng có thể tạo các thuộc tính tĩnh, giống như các thuộc tính class thông thường:

```js run
class Article {
  static publisher = "Phùng Hùng";
}

alert( Article.publisher ); // Phùng Hùng
```

Hoặc có thể gán giá trị trực tiếp cho thuộc tính của `Article`:

```js
Article.publisher = "Phùng Hùng";
```

## Sự thừa kế

Các thuộc tính/phương thức tĩnh cũng được thừa kế, chúng ta có thể truy cập `Parent.method` bằng `Child.method`.

Ví dụ, `Animal.compare` trong đoạn mã dưới đây được thừa kế và gọi từ class con `Rabbit.compare`:

```js run
class Animal {

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} chạy với tốc độ ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Thừa kế từ Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} ẩn nấp!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit chạy với tốc độ 5.
```

Giờ chúng ta có thể gọi `Rabbit.compare` và `Animal.compare` sẽ được sử dụng.

Nó làm việc như thế nào? Một lần nữa, lại sử dụng các nguyên mẫu. Có thể bạn đã đoán được, `extends` đặt `[[Prototype]]` của `Rabbit` để nó tham chiếu tới `Animal`.


![](animal-rabbit-static.png)

Nên, hàm `Rabbit` thừa kế từ hàm `Animal`. Và hàm `Animal` đến lượt nó lại có `[[Prototype]]` tham chiếu tới `Function.prototype`, bởi nó không được `extend` từ cái gì.

Chúng ta kiểm tra điều này qua ví dụ:

```js run
class Animal {}
class Rabbit extends Animal {}

// dùng để thừa kế phương thức và thuộc tính tĩnh
alert(Rabbit.__proto__ === Animal); // true

// đi lên một nấc nữa sẽ đến Function.prototype
alert(Animal.__proto__ === Function.prototype); // true

// chuỗi thừa kế thông thường dùng cho thừa kế các phương thức thông thường
alert(Rabbit.prototype.__proto__ === Animal.prototype);
```

Đó là cách `Rabbit` có thể truy cập tới các phương thức tĩnh của `Animal`.

## Tóm tắt

Các phương thức tĩnh được sử dụng để thực hiện các chức năng không liên quan tới từng đối tượng, nó thuộc về bản thân class, như `Article.compare` -- phương thức chung để so sánh hai đối tượng article.

Các thuộc tính tĩnh được sử dụng khi cần lưu trữ dữ liệu ngay trong class, không lưu trong đối tượng cụ thể nào.

Cú pháp là:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

Cũng có thể tạo bằng cách gán:

```js
MyClass.property = ...
MyClass.method = ...
```

Các thuộc tính và phương thức tĩnh cũng được thừa kế.

Về mặt kỹ thuật, khi `class B extends A` nguyên mẫu của `B` chính là `A`: `B.[[Prototype]] = A`. Nên nếu một trường không có trong `B`, thì nó được tìm trong `A`.
