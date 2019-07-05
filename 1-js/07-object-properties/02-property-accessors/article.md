
# Các thuộc tính getter và setter

Có hai loại thuộc tính.

Đầu tiên là *thuộc tính dữ liệu* (data properties). Chúng ta đã biết và làm việc với chúng. Tất cả các thuộc tính chúng ta đã sử dụng cho đến giờ đều là các thuộc tính dữ liệu.

Loại thứ hai sẽ được học trong bài này gọi là các *thuộc tính truy cập* (accessor properties). Về cơ bản chúng là các hàm có tác dụng lấy và cài đặt một giá trị - (tức là các phương thức), nhưng cách sử dụng giống một thuộc tính bình thường.

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

```js run
let user = {
  name: "Hùng",
  surname: "Phùng"
};
```

Giờ ta muốn thêm thuộc tính `fullName` có giá trị là `"Phùng Hùng"`. Tất nhiên, chúng ta không sao chép thủ công các thông tin hiện có làm giá trị của `fullName`. Chúng ta có thể thực hiện việc này bằng một getter:

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

Từ bên ngoài, các thuộc tính truy cập trông như thuộc tính dữ liệu. Nó cũng là ý tưởng cho sự xuất hiện của các thuộc tính truy cập. Chúng ta không gọi `user.fullName` như gọi phương thức, mà gọi giống như *đọc* một thuộc tính bình thường: getter sẽ tự động chạy "phía sau hậu trường".

Đến giờ, `fullName` mới chỉ có getter. Nếu chúng ta muốn thay đổi giá trị của nó bằng cách gán `user.fullName=` thì sẽ có lỗi:

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

Kết quả là chúng ta có một thuộc tính "ảo" `fullName`. Ta có thể đọc và ghi nó, nhưng thực tế nó không tồn tại trong đối tượng.

```smart header="Các thuộc tính truy cập chỉ có thể truy cập nhờ getter và setter"
Khi một thuộc tính đã được định nghĩa với `get prop()` hoặc `set prop()`, nó trở thành một thuộc tính truy cập, không phải là thuộc tính dữ liệu nữa.

- Chúng ta chỉ có thể đọc thuộc tính truy cập `object.prop` nếu có getter cho nó.
- Chúng ta chỉ có thể ghi thuộc tính truy cập `object.prop=...` nếu có setter cho nó.

Và trong cả hai trường hợp, ta không thể xóa một thuộc tính truy cập.
```


## Descriptor của thuộc tính truy cập

Các descriptor của thuộc trính truy cập khác với descriptor của thuộc tính dữ liệu mà ta đã học.

Nó không có `value` và `writable`, mà thay bằng hai hàm `get` và `set`.

Cụ thể descriptor của thuộc tính truy cập có:

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

Vui lòng chú ý một lần nữa, một thuộc tính chỉ có thể là thuộc tính truy cập hoặc thuộc tính dữ liệu, không thể là cả hai cùng lúc.

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

Getters/setters có thể dùng như một thuộc tính "bao" lấy thuộc tính thực thực, để kiểm soát giá trị được đưa vào.

Ví dụ, nếu chúng ta muốn chặn một tên quá ngắn cho `user`, chúng ta có thể tạo một thuộc tính truy cập `name` lưu trong thuộc tính thực `_name` và thêm bước kiểm tra vào trong setter:

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

Vễ mặt kỹ thuật, mã bên ngoài vẫn có thể truy cập và thay đổi trực tiếp thuộc tính `user._name`. Nhưng có một thỏa thuận được chấp nhận rộng rãi rằng các thuộc tính có tên bắt đầu bằng `"_"` được coi là thuộc tính riêng của đối tượng và không nên truy cập hay thay đổi trực tiếp từ bên ngoài.


## Cung cấp sự tương thích

Các getter và setter cho phép ta thay thế một thuộc tính dữ liệu thông thường bằng phiên bản khác sử dụng thuộc tính truy cập với khả năng kiểm soát tốt hơn.

Giả sử chúng ta tạo đối tượng người dùng có hai thuộc tính `name` và `age`:

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

Chúng ta có thể tìm và sửa lại, nhưng nó tốn rất nhiều thời gian và rất khó nếu mã được viết bởi những người khác. Hơn nữa sự có mặt của thuộc tính `age` trong đối tượng người dùng vẫn hợp lý và ta chỉ muốn thay đổi ở một số chỗ mà thôi.

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
