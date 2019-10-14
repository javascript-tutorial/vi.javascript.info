
# Cú pháp tạo class

```quote author="Wikipedia"
Trong lập trình hướng đối tượng, một *class* là một mã chương trình mở rộng (extensible program-code-template) dùng tạo các đối tượng, khởi tạo các giá trị ban đầu cho trạng thái (các biến thành viên) và thực thi các hành động (hàm thành viên hay phương thức) của đối tượng.
```

Trong thực tế, chúng ta thường phải tạo ra hàng loạt các đối tượng cùng kiểu, như các người dùng, các mặt hàng trong một cửa hàng trực tuyến...

Như đã biết ở bài <info:constructor-new>, có thể dùng `new Function` đê thực hiện việc này.

Nhưng trong JavaScript hiện đại, có thêm một cách tạo các đối tượng khác đó là "class", nó là một cấu trúc cú pháp nâng cao mới được giới thiệu đi cùng với nhiều tính năng tuyệt vời khác, rất hữu ích cho lập trình hướng đối tượng.

## Cú pháp tạo "class"

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

<<<<<<< HEAD
Sau đó gọi `new MyClass()` để tạo đối tượng mới có đầy đủ các phương thức trên.
=======
Then use `new MyClass()` to create a new object with all the listed methods.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Phương thức `constructor()` tự động được gọi bởi `new`, nên nó là nơi được dùng để khởi tạo giá trị các thuộc tính cho đối tượng.

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

// Sử dụng:
let user = new User("Hùng");
user.sayHi();
```

Khi gọi `new User("Hùng")`:
1. Một đối tượng mới được tạo.
2. Hàm `constructor` chạy với đối số `"Hùng"` và gán cho `this.name`.

<<<<<<< HEAD
...Sau đó chúng ta có thể gọi các phương thức từ đối tượng trên, chẳng hạn như `user.sayHi`.
=======
...Then we can call object methods, such as `user.sayHi()`.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a


```warn header="Không có dấu phảy ngăn cách các phương thức"
Có một lỗi phổ biến mà những người mới làm quen với JavaScript hay mắc phải là đặt dấu phảy giữa các phương thức của class, điều này dẫn tới lỗi cú pháp.

Chúng ta không được nhầm lẫn cách viết "class" và cách việt literal đối tượng. Trong class không cần dấu phảy.
```

## Class thực sự là gì?

Vậy thì chính xác `class` là gì? Thường thì người ta nghĩ rằng nó là một cái gì hoàn toàn mới của JavaScript, nhưng thực ra không phải.

Cùng lột trần để thấy thực sự nó là gì. Điều này giúp ta hiểu được nhiều khía cạnh phức tạp.

Trong JavaScript, class thực ra là một hàm.

Đoạn mã sau cho thấy điều này:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// bằng chứng cho việc User là một hàm
*!*
alert(typeof User); // function
*/!*
```

<<<<<<< HEAD
Cấu trúc `class User {...}` thực ra là một khai báo hàm và làm những công việc sau:
1. Tạo hàm có tên `User`.
    - Thân hàm lấy từ phương thức `constructor` (nếu không viết `constructor` thì thân hàm trống).
3. Lưu tất cả các phương thức, chẳng hạn như `sayHi`, trong `User.prototype`.

Sau đó khi gọi các phương thức của đối tượng mới, các phương thức này được lấy từ nguyên mẫu, giống như được mô tả trong bài <info:function-prototype>. Vậy nên đối tượng tạo ra từ `new User` có thể truy cập các phương thức của class.
=======
What `class User {...}` construct really does is:

1. Creates a function named `User`, that becomes the result of the class declaration. The function code is taken from the `constructor` method (assumed empty if we don't write such method).
2. Stores class methods, such as `sayHi`, in `User.prototype`.

<<<<<<< HEAD
Afterwards, for `new User` objects, when we call a method, it's taken from the prototype, just as described in the chapter <info:function-prototype>. So the object has access to class methods.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3
=======
After `new User` object is created, when we call its method, it's taken from the prototype, just as described in the chapter <info:function-prototype>. So the object has access to class methods.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Chúng ta có thể mô tả khai báo `class User` bằng hình sau:

![](class-user.svg)

Đây là đoạn mã giúp ta quan sát điều này:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class là một hàm
alert(typeof User); // function

// ...hoặc chính xác hơn, là phương thức constructor
alert(User === User.prototype.constructor); // true

// Các phương thức của class nằm trong User.prototype, ví dụ:
alert(User.prototype.sayHi); // alert(this.name);

// có 2 phương thức trong User.prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Class không chỉ là một "syntax sugar"

<<<<<<< HEAD
Đôi khi người ta nói rằng `class` là một "syntax sugar" (cú pháp ngắn gọn được thiết kế để thay thế cho một đoạn mã phức tạp thực hiện công việc tương tự) của JavaScript, bởi chúng ta có thể khai báo một hàm constructor, thêm phương thức vào `prototype` của nó mà không cần sử dụng `class`:
=======
Sometimes people say that `class` is a "syntax sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same without `class` keyword at all:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

```js run
// viết lại class mà mà không dùng cấu trúc "class"

// 1. Tạo hàm constructor
function User(name) {
  this.name = name;
}
// mọi hàm đều có `prototype` có sẵn thuộc tính constructor
// nên không cần phải thêm constructor vào User.prototype

// 2. Thêm phương thức vào User.prototype
User.prototype.sayHi = function() {
  alert(this.name);
};

// Sử dụng:
let user = new User("Hùng");
user.sayHi();
```

Kết quả hoàn toàn giống như khi sử dụng "class". Đó là lý do tại sao `class` có thể xem như một syntax sugar để định nghĩa một constructor cùng với các phương thức trong prototype của nó.

<<<<<<< HEAD
Mặc dù vậy, vẫn có những khác biệt quan trọng.
=======
Still, there are important differences.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

1. Trước tiên, hàm tạo bởi `class` có thêm một thuộc tính đặc biệt `[[FunctionKind]]:"classConstructor"`. Các hàm tạo ra bằng cách thông thường không có thuộc tính này.

<<<<<<< HEAD
<<<<<<< HEAD
    Không như hàm thông thường, một "class constructor" (hàm tạo bởi `class`) bắt buộc phải gọi với `new`:
=======
    Unlike a regular function, a class constructor must be called with `new`:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3
=======
    And unlike a regular function, a class constructor must be called with `new`:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Lỗi: "Class constructor" User không thể gọi mà không có 'new'
    ```

    Cũng như vậy, biểu diễn chuỗi của một class constructor trong hầu hết các JavaScript engine đều bắt đầu với "class..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```

2. Các phương thức của class đều không thể liệt kê.
    Định nghĩa một class sẽ cài đặt cờ `enumerable` là `false` cho mọi phương thức trong `"prototype"`.

    Điều này tốt, bởi vì nếu chúng ta `for..in` một đối tượng, chúng ta thường không cần đến các phương thức class của nó.

3. Các class luôn mặc định sử dụng `use strict`.
    Tất cả mã bên trong cấu trúc class tự động sử dụng `use strict`.

<<<<<<< HEAD

Ngoài các tính năng cơ bản, cú pháp `class` còn mang đến nhiều tính năng khác mà chúng ta sẽ học trong các bài sau.
=======
Besides, `class` syntax brings many other features that we'll explore later.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

## Biểu thức class

Giống như hàm, class cũng có thể được khai báo bằng một biểu thức gọi là biểu thức class.

Đây là ví dụ về một biểu thức class:

```js
let User = class {
  sayHi() {
    alert("Xin chào");
  }
};
```

<<<<<<< HEAD
Tương tự như Biểu thức hàm có tên (NFE), chúng ta cũng có "Biểu thức class có tên" (Named Class Expression).
=======
Similar to Named Function Expressions, class expressions may have a name.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Nếu một biểu thức class có tên, tên này chỉ có thể thấy được trong class:

```js run
// "Biểu thức class có tên"
// (trong đặc tả không có thuật ngữ này, nhưng nó tương tự NFE)
let User = class *!*MyClass*/!* {
  sayHi() {
<<<<<<< HEAD
    alert(MyClass); // MyClass chỉ thấy được trong class
=======
    alert(MyClass); // MyClass name is visible only inside the class
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
  }
};

new User().sayHi(); // làm việc, hiện thị định nghĩa của MyClass

<<<<<<< HEAD
alert(MyClass); // lỗi, MyClass không sử dụng được ngoài class
=======
alert(MyClass); // error, MyClass name isn't visible outside of the class
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
```


Chúng ta có thể tạo một class từ một hàm, ví dụ:

```js run
function makeClass(phrase) {
  // trả về class
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// Tạo một class mới
let User = makeClass("Xin chào");

new User().sayHi(); // Xin chào
```


## Getter/setter, và các thuộc tính đặc biệt khác

<<<<<<< HEAD
Giống literal đối tượng, các class có thể có getter/setter, các generator, các thuộc tính "computed"...
=======
Just like literal objects, classes may include getters/setters, computed properties etc.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

Đây là ví dụ tạo thuộc tính truy cập `user.name` sử dụng `get/set`:

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

let user = new User("Hùng");
alert(user.name); // Hùng

user = new User(""); // Tên quá ngắn.
```

Khai báo class tạo các getter và setter trong `User.prototype` như sau:

```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

<<<<<<< HEAD
Đây là ví dụ với các thuộc tính computed:
=======
Here's an example with a computed property in brackets `[...]`:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
class User {
<<<<<<< HEAD
  [f()]() {
    alert("Xin chào");
=======

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
  }

}

new User().sayHi();
```

<<<<<<< HEAD
Với phương thức generator, đặt `*` đằng trước. Nhưng chúng ta sẽ học về generator ở một bài học sau.

## Các thuộc tính của class
=======
## Class properties
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```warn header="Trên các trình duyệt cũ chúng ta cần polyfill"
Các thuộc tính của class gần đây mới được thêm vào JavaScript, nên một số trình duyệt cũ có thể chưa hỗ trợ.
```

Trong các ví dụ trên, `User` chỉ có các phương thức. Giờ thêm các thuộc tính:

```js run
class User {
<<<<<<< HEAD
  name = "Vô danh";
=======
*!*
  name = "Anonymous";
*/!*
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

  sayHi() {
    alert(`Xin chào, ${this.name}!`);
  }
}

new User().sayHi();
```

<<<<<<< HEAD
<<<<<<< HEAD
Khác với phương thức các thuộc tính không đặt trong `User.prototype`. Thay vì thế, nó tạo bởi `new`, đặt trong mỗi đối tượng được tạo. Vậy nên, mỗi đối tượng sở hữu các thuộc tính riêng, nhưng dùng chung phương thức từ nguyên mẫu.

=======
The property `name` is not placed into `User.prototype`. Instead, it is created by `new` before calling constructor, it's the property of the object itself.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
=======
The property `name` is not placed into `User.prototype`. Instead, it is created by `new` before calling the constructor, it's a property of the object itself.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

## Tóm tắt

Cú pháp cơ bản để tạo class trông như sau:

```js
class MyClass {
<<<<<<< HEAD
  prop = value; // thuộc tính (trường)
=======
  prop = value; // property
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // phương thức

  get something(...) {} // phương thức getter
  set something(...) {} // phương thức setter

<<<<<<< HEAD
  [Symbol.iterator]() {} // phương thức computed, phương thức symbol
=======
  [Symbol.iterator]() {} // method with computed name (symbol here)
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
  // ...
}
```

`MyClass` thực ra là một hàm (được lấy từ `constructor`), trong khi đó các phương thức, getter và setter được ghi vào `MyClass.prototype`.

Trong bài sau, chúng ta sẽ học thêm về class, gồm thừa kế và các tính năng khác.
