# Các thuộc tính getter và setter

Có hai loại thuộc tính của đối tượng.

Loại đầu tiên là các *thuộc tính dữ liệu*. Chúng ta đã biết cách làm việc với chúng. Tất cả các thuộc tính mà chúng ta đang sử dụng cho đến bây giờ đều là thuộc tính dữ liệu.

Loại thuộc tính thứ hai là một cái mới. Đó là các *thuộc tính truy cập*. Về cơ bản, chúng là các hàm thực thi khi lấy và đặt giá trị, nhưng trông giống như các thuộc tính thông thường đối với mã bên ngoài.

## Các getter và setter

Các thuộc tính truy cập được biểu diễn bằng hai phương thức gọi là "getter" và "setter". Trong một object literal chúng được nhận biết bởi hai từ khóa `get` và `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, phương thức này thực thi khi truy cập obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, phương thức này thực thi khi gán obj.propName = value
  }
};
```

Phương thức getter chạy khi truy cập `obj.propName`, setter chạy khi gán một giá trị cho nó.

Ví dụ, ta có đối tượng `user` với thuộc tính `name` và `surname`:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

Bây giờ chúng ta muốn thêm một thuộc tính `fullName`, mà giá trị là `"John Smith"`. Tất nhiên, chúng ta không muốn sao chép-dán thông tin hiện có, vì vậy chúng ta có thể cài đặt nó như một thuộc tính truy cập:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

Nhìn từ bên ngoài, một thuộc tính truy cập trông giống như một thuộc tính thông thường. Đó là ý tưởng của các thuộc tính truy cập. Chúng ta không *gọi* `user.fullName` như một hàm, chúng ta *đọc* nó một cách bình thường: getter chạy đằng sau hậu trường.

Hiện tại, `fullName` chỉ có một getter. Nếu chúng ta cố gắng gán `user.fullName=`, sẽ xảy ra lỗi:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Lỗi (thuộc tính chỉ có getter)
*/!*
```

Hãy sửa nó bằng cách thêm một setter cho `user.fullName`:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// đặt fullName được thực thi với giá trị đã cho.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

Kết quả là chúng ta có thuộc tính "ảo" `fullName`. Nó có thể đọc và ghi được.

## Các descriptor của thuộc tính truy cập

Các descriptor của thuộc tính truy cập khác với các descriptor của thuộc tính dữ liệu.

Đối với các thuộc tính truy cập, không có `value` hoặc `writable`, mà thay vào đó là các hàm `get` và `set`.

Đó là, một descriptor của trình truy cập có thể có:

- **`get`** -- một hàm không có đối số, hoạt động khi một thuộc tính được đọc,
- **`set`** -- một hàm có một đối số, được gọi khi thuộc tính được đặt,
- **`enumerable`** -- giống như đối với thuộc tính dữ liệu,
- **`configurable`** -- giống như đối với thuộc tính dữ liệu.

Ví dụ, để tạo thuộc tính truy cập `fullName` bằng `defineProperty`, chúng ta có thể truyền một descriptor có hai phương thức `get` và `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

Xin lưu ý rằng một thuộc tính có thể là một thuộc tính truy cập (có các phương thức `get/set`) hoặc một thuộc tính dữ liệu (có một `value`), chứ không phải cả hai.

Nếu chúng ta cố đưa cả `get` và `value` vào trong một descriptor, sẽ gây ra lỗi:

```js run
*!*
// Lỗi: descriptor của thuộc tính không hợp lệ
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Getter/setter thông minh hơn

Các getter/setter có thể dùng như các thuộc tính "bao" lấy các giá trị của thuộc tính thực, để kiểm soát nhiều hơn các thao tác trên các giá trị đó.

Ví dụ: nếu chúng ta muốn cấm các tên quá ngắn cho `user`, chúng ta có thể có một setter là `name` và giữ giá trị trong một thuộc tính riêng biệt là `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Tên quá ngắn, cần ít nhất 4 ký tự");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Tên quá ngắn...
```

Vì vậy, tên được lưu trữ trong thuộc tính `_name` và việc truy cập được thực hiện thông qua getter và setter.

Vễ mặt kỹ thuật, mã bên ngoài vẫn có thể truy cập trực tiếp tên bằng thuộc tính `user._name`. Nhưng có một quy ước được chấp nhận rộng rãi là các thuộc tính có tên bắt đầu bằng `"_"` được coi là thuộc tính riêng của đối tượng và không nên truy cập hay thay đổi trực tiếp từ bên ngoài.

## Dùng cho tương thích

Một trong những công dụng tuyệt vời của thuộc tính truy cập là chúng cho phép kiểm soát thuộc tính dữ liệu "thông thường" bất kỳ lúc nào bằng cách thay thế nó bằng getter và setter và điều chỉnh hành vi của nó.

Hãy tưởng tượng chúng ta bắt đầu cài đặt các đối tượng user bằng cách sử dụng thuộc tính dữ liệu `name` và `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...Nhưng sớm hay muộn, mọi thứ có thể thay đổi. Thay vì `age`, chúng ta có thể quyết định lưu trữ `birthday`, vì nó chính xác và thuận tiện hơn:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Giờ chúng ta phải làm gì với những mã cũ vẫn còn sử dụng thuộc tính `age`?

Chúng ta có thể tìm tất cả những chỗ đó và sửa lại, nhưng nó tốn thời gian và rất khó thực hiện nếu mã được dùng bởi nhiều người khác. Hơn nữa `user` có `age` thì cũng hợp lý, phải không?

Hãy giữ lại nó.

Thêm getter cho `age` sẽ giải quyết được vấn đề này:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age có thể tính được từ ngày hiện tại và birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday có sẵn
alert( john.age );      // ...cả age cũng vậy
```

Bây giờ mã cũ cũng hoạt động và chúng ta có một thuộc tính bổ sung tuyệt vời.
