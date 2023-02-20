# Cú pháp cơ bản của class

```quote author="Wikipedia"
Trong lập trình hướng đối tượng, một *class* là một khuôn mẫu mã chương trình có thể mở rộng (extensible program-code-template) dùng để tạo các đối tượng, cung cấp các giá trị ban đầu cho trạng thái của đối tượng (các biến thành viên) và các cài đặt cho hành vi của đối tượng (hàm thành viên hay phương thức).
```

Trong thực tế, chúng ta thường phải tạo ra nhiều đối tượng cùng kiểu, như các người dùng, các mặt hàng hoặc bất kì thứ gì khác.

Như chúng ta đã biết ở chương <info:constructor-new>, `new function` có thể giúp thực hiện việc đó.

Nhưng trong JavaScript hiện đại, có một cấu trúc cao cấp hơn gọi là "class", nó giới thiệu các tính năng mới tuyệt vời có lợi cho lập trình hướng đối tượng.

## Cú pháp "class"

Cú pháp cơ bản là:
```js
class MyClass {
  // các phương thức của class
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Sau đó sử dụng `new MyClass()` để tạo một đối tượng mới với tất cả các phương thức kể trên.

Phương thức `constructor()` tự động được gọi bởi `new`, nên chúng ta có thể khởi tạo đối tượng ở đó.

Ví dụ:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Cách dùng:
let user = new User("John");
user.sayHi();
```

Khi `new User("John")` được gọi:

1. Một đối tượng mới được tạo ra.
2. Phương thức `constructor` chạy với đối số đã cho và gán nó cho `this.name`.

...Sau đó chúng ta có thể gọi các phương thức của đối tượng, chẳng hạn như `user.sayHi`.

```warn header="Không có dấu phảy ngăn cách các phương thức của class"
Một lỗi phổ biến với những nhà phát triển chưa có kinh nghiệm là đặt dấu phảy giữa các phương thức của class, điều này sẽ gây ra một lỗi cú pháp.

Chúng ta không được nhầm lẫn cách viết "class" ở đây với các đối tượng trực tiếp. Bên trong class không yêu cầu dấu phảy.
```

## Class là gì?

Vậy thì `class` đúng ra là gì? Đó không phải là một thứ hoàn toàn mới ở cấp độ ngôn ngữ, như người ta vẫn nghĩ.

Hãy cùng tiết lộ bất kỳ "phép màu" nào và xem class thực ra là gì. Điều đó sẽ giúp chúng ta hiểu nhiều khía cạnh phức tạp.

Trong JavaScript, một class hầu như là một hàm.

Đây, hãy xem:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// bằng chứng: User là một hàm
*!*
alert(typeof User); // function
*/!*
```

Những cái mà cấu trúc `class User {...}` thực sự làm là:

1. Tạo một hàm có tên là `User`, hàm này sẽ trở thành kết quả của khai báo class. Mã hàm được lấy từ phương thức `constructor` (giả sử là rỗng nếu chúng ta không viết phương thức như vậy).
2. Lưu các phương thức của class, chẳng hạn như `sayHi`, trong `User.prototype`.

Sau khi đối tượng `new User` được tạo, khi chúng ta gọi một phương thức của nó, phương thức đó được lấy từ nguyên mẫu, giống như mô tả trong chương <info:function-prototype>. Vì vậy đối tượng có quyền truy cập đến các phương thức của class.

Chúng ta có thể minh họa kết quả của khai báo `class User` như sau:

![](class-user.svg)

Đây là mã để xem xét nó:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class là một hàm
alert(typeof User); // function

// ...hoặc chính xác hơn, là phương thức constructor
alert(User === User.prototype.constructor); // true

// Các phương thức nằm trong User.prototype, ví dụ:
alert(User.prototype.sayHi); // mã của phương thức sayHi

// có đúng hai phương thức nằm trong nguyên mẫu
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Không chỉ là một cú pháp đặc biệt

Đôi khi người ta nói rằng `class` là một cú pháp đặc biệt "syntactic sugar" (cú pháp được thiết kế để làm cho mọi thứ dễ đọc hơn, nhưng không giới thiệu bất kỳ điều gì mới), bởi vì chúng ta thực sự có thể khai báo tương tự mà không cần từ khóa `class` gì hết:

```js run
// viết lại class User trong các hàm thuần túy

// 1. Tạo hàm constructor
function User(name) {
  this.name = name;
}
// một nguyên mẫu hàm có sẵn thuộc tính "constructor" theo mặc định,
// vì vậy chúng ta không cần tạo nó

// 2. Thêm phương thức vào nguyên mẫu
User.prototype.sayHi = function() {
  alert(this.name);
};

// Cách sử dụng:
let user = new User("Hùng");
user.sayHi();
```

Kết quả của định nghĩa này là giống nhau. Vì vậy, thực sự có những lý do tại sao `class` có thể được coi là một cú pháp đặc biệt để định nghĩa một phương thức constructor cùng với các phương thức nguyên mẫu của nó.

Dù vậy, vẫn có những khác biệt quan trọng.

1. Đầu tiên, một hàm tạo bởi `class` được gắn nhãn bởi một thuộc tính nội bộ đặc biệt `[[FunctionKind]]:"classConstructor"`. Vì vậy, nó không hoàn toàn giống với việc tạo theo cách thủ công.

    Ngôn ngữ JavaScript kiểm tra thuộc tính đó ở nhiều nơi. Ví dụ: không giống như một hàm thông thường, nó phải được gọi bằng `new`:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Lỗi: User không thể gọi mà không có 'new'
    ```

    Hơn nữa, biểu diễn dạng chuỗi của một class constructor trong hầu hết các JavaScript engine đều bắt đầu với "class..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```

    Có những khác biệt nữa, chúng ta sẽ sớm nhìn thấy chúng.

2. Các phương thức của class là không thể liệt kê.
    Một định nghĩa class sẽ thiết lập cờ `enumerable` là `false` cho mọi phương thức trong `"prototype"`.

    Điều này là tốt, bởi vì nếu chúng ta dùng `for..in` trên một đối tượng, chúng ta thường không muốn các phương thức class của nó.

3. Các class luôn sử dụng `use strict`.
    Tất cả mã bên trong cấu trúc class tự động ở trong chế độ strict.

Ngoài ra, cú pháp `class` còn mang đến nhiều tính năng khác mà chúng ta sẽ nghiên cứu sau.

## Biểu thức class

Cũng giống như các hàm, các class có thể được định nghĩa bên trong một biểu thức khác, được truyền xung quanh, được trả về, được gán v.v.

Đây là ví dụ về một biểu thức class:

```js
let User = class {
  sayHi() {
    alert("Xin chào");
  }
};
```

Tương tự như Biểu thức hàm có tên (Named Function Expressions), các biểu thức class cũng có thể có tên (Named Class Expression).

Nếu một biểu thức class có tên, tên này chỉ có thể thấy được bên trong class:

```js run
// "Biểu thức class có tên"
// (trong đặc tả không có thuật ngữ như thế, nhưng nó tương tự như Named Function Expressions)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // tên MyClass chỉ thấy được từ bên trong class
  }
};

new User().sayHi(); // hoạt động tốt, hiển thị định nghĩa của MyClass

alert(MyClass); // lỗi, tên MyClass không thấy được từ bên ngoài class
```

Chúng ta thậm chí có thể tạo động các class "theo yêu cầu", như thế này:

```js run
function makeClass(phrase) {
  // khai báo một class và trả nó về
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// Tạo một class mới
let User = makeClass("Xin chào");

new User().sayHi(); // Xin chào
```

## Các getter/setter

Cũng giống như các đối tượng trực tiếp (literal object), các class có thể bao gồm các getter/setter, các thuộc tính được tính toán v.v.

Đây là một ví dụ cho thuộc tính `user.name` mà được cài đặt bằng cách sử dụng `get/set`:

```js run
class User {

  constructor(name) {
    // gọi setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Tên quá ngắn.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Tên quá ngắn.
```

Về mặt kỹ thuật, khai báo class như vậy hoạt động bằng cách tạo các getter và setter trong `User.prototype`.

## Các tên được tính toán [...]

Đây là một ví dụ với một tên phương thức được tính toán bằng cách sử dụng cặp ngoặc vuông `[...]`:

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

Các tính năng như thế rất dễ nhớ, vì chúng giống với các đối tượng trực tiếp.

## Các trường của class

```warn header="Các trình duyệt cũ có thể phải cần polyfill"
Các trường của class là một bổ sung gần đây cho ngôn ngữ.
```

Trước đó các class của chúng ta chỉ có các phương thức.

"Các trường của class" là một cú pháp cho phép thêm bất kỳ thuộc tính nào.

Ví dụ, hãy thêm thuộc tính `name` vào `class User`:

```js run
class User {
*!*
  name = "John";
*/!*

  sayHi() {
    alert(`Xin chào, ${this.name}!`);
  }
}

new User().sayHi(); // Xin chào, John!
```

Vì vậy, chúng ta chỉ cần viết "<property name> = <value>" trong khai báo, và thế là xong.

Sự khác biệt quan trọng của các trường của class là chúng được thiết lập trên các đối tượng riêng lẻ, chứ không phải `User.prototype`:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

Chúng ta cũng có thể gán các giá trị bằng cách sử dụng các biểu thức phức tạp hơn và các lệnh gọi hàm:

```js run
class User {
*!*
  name = prompt("Vui lòng nhập tên?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```

### Tạo các phương thức ràng buộc với các trường của class

Như đã trình bày trong chương <info:bind> các hàm trong JavaScript có `this` động. Nó phụ thuộc vào ngữ cảnh của lời gọi.

Vì vậy, nếu một phương thức của đối tượng được truyền xung quanh và được gọi trong một ngữ cảnh khác, `this` sẽ không còn là một tham chiếu đến đối tượng của nó nữa.

Ví dụ, mã này sẽ hiển thị `undefined`:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("xin chào");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

Sự cố này được gọi là "mất `this`".

Có hai cách tiếp cận để sửa nó, như đã thảo luận trong chương <info:bind>:

1. Truyền một hàm-bao, chẳng hạn như `setTimeout(() => button.click(), 1000)`.
2. Ràng buộc phương thức với đối tượng, ví dụ trong hàm tạo.

Các trường của class cung cấp một cú pháp khác, khá thanh lịch:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("xin chào");

setTimeout(button.click, 1000); // xin chào
```

Trường `click = () => {...}` được tạo trên cơ sở từng đối tượng, có một hàm riêng biệt cho mỗi đối tượng `Button`, với `this` bên trong nó tham chiếu đến đối tượng đó. Chúng ta có thể truyền `button.click` đi bất kỳ đâu, và giá trị của `this` sẽ luôn đúng đắn.

Điều đó đặc biệt có ích trong môi trường trình duyệt, cho các event listener.

## Tóm tắt

Cú pháp class cơ bản trông như sau:

```js
class MyClass {
  prop = value; // thuộc tính (trường)

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // phương thức

  get something(...) {} // phương thức getter
  set something(...) {} // phương thức setter

  [Symbol.iterator]() {} // phương thức với tên được tính toán (ở đây là symbol)
  // ...
}
```

`MyClass` về mặt kỹ thuật là một hàm (mà chúng ta cung cấp dưới dạng `constructor`), trong khi các phương thức, getter và setter được ghi vào `MyClass.prototype`.

Trong các chương sau, chúng ta sẽ học thêm về class, gồm sự kế thừa và các tính năng khác.
