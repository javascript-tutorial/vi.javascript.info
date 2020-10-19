
# Các thuộc tính getter và setter

<<<<<<< HEAD
Có hai loại thuộc tính.

Đầu tiên là *thuộc tính dữ liệu* (data properties). Chúng ta đã biết và làm việc với chúng. Tất cả các thuộc tính chúng ta đã sử dụng cho đến giờ đều là các thuộc tính dữ liệu.

Loại thứ hai sẽ được học trong bài này gọi là các *thuộc tính truy cập* (accessor properties). Về cơ bản chúng là các hàm có tác dụng lấy và cài đặt một giá trị - (tức là các phương thức), nhưng cách sử dụng giống một thuộc tính bình thường.
=======
There are two kinds of object properties.

The first kind is *data properties*. We already know how to work with them. All properties that we've been using until now were data properties.

The second type of properties is something new. It's *accessor properties*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

## Getter và Setter

Các thuộc tính truy cập được biểu diễn bằng hai phương thức gọi là "getter" và "setter". Trong literal đối tượng chúng được nhận biết bởi hai từ khóa `get` và `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, phương thức này chạy khi truy cập "obj.propName"
  },

  *!*set propName(value)*/!* {
    // setter, phương thức này chạy khi gán "obj.propName = value"
  }
};
```

Phương thức getter chạy khi truy cập `obj.propName`, setter chạy khi gán một giá trị cho nó.

Ví dụ, ta có đối tượng `user` với thuộc tính `name` và `surname`:

```js
let user = {
  name: "Hùng",
  surname: "Phùng"
};
```

<<<<<<< HEAD
Giờ ta muốn thêm thuộc tính `fullName` có giá trị là `"Phùng Hùng"`. Tất nhiên, chúng ta không sao chép thủ công các thông tin hiện có làm giá trị của `fullName`. Chúng ta có thể thực hiện việc này bằng một getter:
=======
Now we want to add a `fullName` property, that should be `"John Smith"`. Of course, we don't want to copy-paste existing information, so we can implement it as an accessor:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
let user = {
  name: "Hùng",
  surname: "Phùng",

*!*
  get fullName() {
    return `${this.surname} ${this.name}`;
  }
*/!*
};

*!*
alert(user.fullName); // Phùng Hùng
*/!*
```

<<<<<<< HEAD
Từ bên ngoài, các thuộc tính truy cập trông như thuộc tính dữ liệu. Nó cũng là ý tưởng cho sự xuất hiện của các thuộc tính truy cập. Chúng ta không gọi `user.fullName` như gọi phương thức, mà gọi giống như *đọc* một thuộc tính bình thường: getter sẽ tự động chạy "phía sau hậu trường".
=======
From the outside, an accessor property looks like a regular one. That's the idea of accessor properties. We don't *call* `user.fullName` as a function, we *read* it normally: the getter runs behind the scenes.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

<<<<<<< HEAD
Đến giờ, `fullName` mới chỉ có getter. Nếu chúng ta muốn thay đổi giá trị của nó bằng cách gán `user.fullName=` thì sẽ có lỗi:
=======
As of now, `fullName` has only a getter. If we attempt to assign `user.fullName=`, there will be an error:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (property has only a getter)
*/!*
```
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Để có thể gán giá trị cho một thuộc tính truy cập, cần tạo setter cho nó. Cùng thêm một setter cho `user.fullName`:

```js run
let user = {
  name: "Hùng",
  surname: "Phùng",

  get fullName() {
    return `${this.surname} ${this.name}`;
  },

*!*
  set fullName(value) {
    [this.surname, this.name] = value.split(" ");
  }
*/!*
};

// Khi gán setter được chạy, đối số value lấy từ vế phải của =
user.fullName = "Phùng Ngọc";

alert(user.name); // Ngọc
alert(user.surname); // Phùng
```

<<<<<<< HEAD
Kết quả là chúng ta có một thuộc tính "ảo" `fullName`. Ta có thể đọc và ghi nó, nhưng thực tế nó không tồn tại trong đối tượng.

<<<<<<< HEAD
```smart header="Các thuộc tính truy cập chỉ có thể truy cập nhờ getter và setter"
Khi một thuộc tính đã được định nghĩa với `get prop()` hoặc `set prop()`, nó trở thành một thuộc tính truy cập, không phải là thuộc tính dữ liệu nữa.

- Chúng ta chỉ có thể đọc thuộc tính truy cập `object.prop` nếu có getter cho nó.
- Chúng ta chỉ có thể ghi thuộc tính truy cập `object.prop=...` nếu có setter cho nó.

Và trong cả hai trường hợp, ta không thể xóa một thuộc tính truy cập.
=======
```smart header="No support for `delete`"
An attempt to `delete` on accessor property causes an error.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
```

=======
As the result, we have a "virtual" property `fullName`. It is readable and writable.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

## Descriptor của thuộc tính truy cập

<<<<<<< HEAD
Các descriptor của thuộc trính truy cập khác với descriptor của thuộc tính dữ liệu mà ta đã học.

Nó không có `value` và `writable`, mà thay bằng hai hàm `get` và `set`.
=======
Descriptors for accessor properties are different from those for data properties.

For accessor properties, there is no `value` or `writable`, but instead there are `get` and `set` functions.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

<<<<<<< HEAD
Cụ thể descriptor của thuộc tính truy cập có:
=======
That is, an accessor descriptor may have:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

- **`get`** -- hàm không có tham số, chạy khi đọc thuộc tính,
- **`set`** -- hàm có một tham số, chạy khi ghi thuộc tính,
- **`enumerable`** -- giống thuộc tính dữ liệu,
- **`configurable`** -- giống thuộc tính dữ liệu.

Ví dụ, để tạo thuộc tính truy cập `fullName` bằng `defineProperty`, chúng ta có thể truyền một descriptor có hai phương thức `get` và `set`:

```js run
let user = {
  name: "Hùng",
  surname: "Phùng"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.surname} ${this.name}`;
  },

  set(value) {
    [this.surname, this.name] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // Phùng Hùng

for(let key in user) alert(key); // name, surname
```

<<<<<<< HEAD
<<<<<<< HEAD
Vui lòng chú ý một lần nữa, một thuộc tính chỉ có thể là thuộc tính truy cập hoặc thuộc tính dữ liệu, không thể là cả hai cùng lúc.
=======
Please note once again that a property can be either an accessor (has `get/set` methods) or a data property (has a `value`), not both.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
=======
Please note that a property can be either an accessor (has `get/set` methods) or a data property (has a `value`), not both.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Nếu đưa cả `get` và `value` trong một descriptor, sẽ gây ra lỗi:

```js run
*!*
// Lỗi: Thuộc tính descriptor không hợp lệ
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Getter/setter thông minh hơn

<<<<<<< HEAD
Getters/setters có thể dùng như một thuộc tính "bao" lấy thuộc tính thực thực, để kiểm soát giá trị được đưa vào.

Ví dụ, nếu chúng ta muốn chặn một tên quá ngắn cho `user`, chúng ta có thể tạo một thuộc tính truy cập `name` lưu trong thuộc tính thực `_name` và thêm bước kiểm tra vào trong setter:
=======
Getters/setters can be used as wrappers over "real" property values to gain more control over operations with them.

For instance, if we want to forbid too short names for `user`, we can have a setter `name` and keep the value in a separate property `_name`:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Tên quá ngắn, cần nhiều hơn 4 ký tự");
      return;
    }
    this._name = value;
  }
};

user.name = "Hùng";
alert(user.name); // Hùng

user.name = ""; // Tên quá ngắn, cần nhiều hơn 4 ký tự
```

<<<<<<< HEAD
Vễ mặt kỹ thuật, mã bên ngoài vẫn có thể truy cập và thay đổi trực tiếp thuộc tính `user._name`. Nhưng có một thỏa thuận được chấp nhận rộng rãi rằng các thuộc tính có tên bắt đầu bằng `"_"` được coi là thuộc tính riêng của đối tượng và không nên truy cập hay thay đổi trực tiếp từ bên ngoài.
=======
So, the name is stored in `_name` property, and the access is done via getter and setter.

Technically, external code is able to access the name directly by using `user._name`. But there is a widely known convention that properties starting with an underscore `"_"` are internal and should not be touched from outside the object.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a


## Cung cấp sự tương thích

<<<<<<< HEAD
Các getter và setter cho phép ta thay thế một thuộc tính dữ liệu thông thường bằng phiên bản khác sử dụng thuộc tính truy cập với khả năng kiểm soát tốt hơn.

<<<<<<< HEAD
Giả sử chúng ta tạo đối tượng người dùng có hai thuộc tính `name` và `age`:
=======
One of the great uses of accessors -- they allow to take control over a "regular" data property at any moment by replacing it with getter and setter and tweak its behavior.

Imagine, we started implementing user objects using data properties `name` and `age`:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
=======
One of the great uses of accessors is that they allow to take control over a "regular" data property at any moment by replacing it with a getter and a setter and tweak its behavior.

Imagine we started implementing user objects using data properties `name` and `age`:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let hung = new User("Hùng", 33);

alert( hung.age ); // 33
```

...Nhưng ngay sau đó, thay vì `age` ta quyết định sử dụng `birthday`, bởi nó chính xác và thuận tiện hơn:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let hung = new User("Hùng", new Date(1986, 8, 3));
```

Giờ ta phải làm gì với những mã cũ vẫn còn sử dụng thuộc tính `age`?

<<<<<<< HEAD
Chúng ta có thể tìm và sửa lại, nhưng nó tốn rất nhiều thời gian và rất khó nếu mã được viết bởi những người khác. Hơn nữa sự có mặt của thuộc tính `age` trong đối tượng người dùng vẫn hợp lý và ta chỉ muốn thay đổi ở một số chỗ mà thôi.
=======
We can try to find all such places and fix them, but that takes time and can be hard to do if that code is used by many other people. And besides, `age` is a nice thing to have in `user`, right?

Let's keep it.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Thêm thuộc tính truy cập cho `age` sẽ giải quyết được vấn đề này:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age có thể tính được từ birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let hung = new User("Hùng", new Date(1986, 8, 3));

alert( john.birthday ); // birthday vẫn truy cập được
alert( john.age );      // ...và age cũng vậy
```

Và giờ các đoạn mã cũ sử dụng `age` vẫn làm việc tốt.
