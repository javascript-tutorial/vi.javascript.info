# F.prototype

Nhớ rằng, các đối tượng có thể tạo bằng hàm tạo (constructor), chẳng hạn như `new F()`.

<<<<<<< HEAD
Nếu `F.prototype` là một đối tượng, thì toán tử `new` dùng nó để đặt cho `[[Prototype]]` của đối tượng mới được tạo ra.
=======
If `F.prototype` is an object, then the `new` operator uses it to set `[[Prototype]]` for the new object.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```smart
Từ thuở ban đầu JavaScript đã có thừa kế nguyên mẫu. Đây là một trong những tính năng cốt lõi của ngôn ngữ này.

Nhưng ngày xưa, không có cách nào để truy cập trực tiếp đến nó. Cách duy nhất có thể dùng để làm việc với thừa kế là sử dụng thuộc tính `"prototype"` của hàm tạo. Vậy nên ngày nay còn nhiều script vẫn sử dụng nó.
```

Chú ý rằng `F.prototype` chỉ là một thuộc tính thông thường có tên `"prototype"` của `F`. Dù tên nó giống thuật ngữ "prototype", nhưng nó không phải là một thuộc tính đặc biệt.

Đây là ví dụ:

```js run
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = animal;
*/!*

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

Cài đặt `Rabbit.prototype = animal` có nghĩa là: "Khi một đối tượng tạo bằng`new Rabbit`, đặt thuộc tính `[[Prototype]]` của nó thành `animal`".

Đây là hình ảnh của kết quả:

![](proto-constructor-animal-rabbit.svg)

Ở hình trên, `"prototype"` là một mũi tên nằm ngang, mang nghĩa là một thuộc tính thông thường, và `[[Prototype]]` là mũi tên thẳng đứng, mang nghĩa `rabbit` thừa kế từ `animal`.

<<<<<<< HEAD
```smart header="`F.prototype` chỉ được dùng khi gọi `new F()`"
Thuộc tính `F.prototype` được gán cho `[[Prototype]]` một lần duy nhất khi gọi `new F()`. Sau đó không còn liên hệ giữa `F.prototype` và đối tượng mới này.
=======
```smart header="`F.prototype` only used at `new F` time"
`F.prototype` property is only used when `new F` is called, it assigns `[[Prototype]]` of the new object.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Chẳng hạn, sau khi tạo đối tượng, `F.prototype` bị thay đổi (`F.prototype = <một đối tượng khác>`), thì `[[Prototype]]` của đối tượng không bị thay đổi theo. Sự thay đổi của `F.prototype` chỉ ảnh hưởng tới các đối tượng được tạo ra sau này bằng `new F()`.
```

## F.prototype mặc định, thuộc tính "constructor"

Mọi hàm đều có sẵn thuộc tính `"prototype"` ngay cả khi ta không tạo.

Giá trị mặc định của `"prototype"` là một đối tượng chỉ có một thuộc tính duy nhất `constructor` trỏ ngược lại tới hàm.

Ví dụ minh họa:

```js
function Rabbit() {}

/* prototype mặc định (default "prototype")
Rabbit.prototype = { constructor: Rabbit };
*/
```

![](function-prototype-constructor.svg)

Chúng ta có thể kiểm tra điều này:

```js run
function Rabbit() {}
// theo mặc định:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

Một cách tự nhiên, nếu ta không làm gì, thuộc tính `constructor` sẽ có sẵn với mọi đối tượng được tạo từ hàm tạo qua `[[Prototype]]`:

```js run
function Rabbit() {}
// theo mặc định:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // thừa kế từ {constructor: Rabbit}

alert(rabbit.constructor == Rabbit); // true (lấy từ nguyên mẫu)
```

![](rabbit-prototype-constructor.svg)

Chúng ta có thể sử dụng thuộc tính `constructor` để tạo đối tượng mới từ constructor của một đối tượng đã có:

Chẳng hạn:

```js run
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("Thỏ trắng");

*!*
let rabbit2 = new rabbit.constructor("Thỏ đen");
*/!*
```

Cách này rất tiện nếu chúng ta có một đối tượng, không biết constructor nào đã tạo ra nó (ví dụ đối tượng từ một thư viện ngoài), và muốn tạo một đối tượng khác cùng loại.

Nhưng nên cẩn thận vì...

**...JavaScript không thể đảm bảo giá trị `"constructor"` luôn đúng.**

Vâng, thuộc tính `constructor` tồn tại trong `"prototype"` mặc định của mọi hàm, nhưng đó là tất cả những gì JavaScript làm. Chuyện gì xảy ra sau đó hoàn toàn do chúng ta quyết định.

Cụ thể, nếu ta thay thế `prototype` mặc định bằng một đối tượng khác không có `constructor`, đối tượng tạo ra không còn biết constructor tạo ra nó nữa.

Ví dụ:

```js run
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
*!*
alert(rabbit.constructor === Rabbit); // false
*/!*
```

Cho nên, để giữ lại `"constructor"`, chúng ta phải thêm/xóa các thuộc tính khỏi `prototype` mặc định thay vì ghi đè toàn bộ.

```js
function Rabbit() {}

// Không ghi đè toàn bộ Rabbit.prototype
// chỉ bổ sung vào đó
Rabbit.prototype.jumps = true
// Rabbit.prototype.constructor vẫn được giữ
```

Hoặc tạo lại thuộc tính `constructor`:

```js
Rabbit.prototype = {
  jumps: true,
*!*
  constructor: Rabbit
*/!*
};

// giờ constructor vẫn đúng, vì chúng ta đã thêm nó
```


## Tóm tắt

Trong bài này chúng ta đã mô tả ngắn gọn cách cài đặt `[[Prototype]]` cho các đối tượng tạo ra bằng hàm tạo. Sau này bạn sẽ thấy nhiều mô hình lập trình dựa vào nó.

<<<<<<< HEAD
Mọi thứ khá đơn giản, chỉ có vài lưu ý sau:

<<<<<<< HEAD
- Thuộc tính `F.prototype` không phải là `[[Prototype]]`. Giá trị của `F.prototype` được gán cho `[[Prototype]]` khi gọi `new F()`, sau đó chúng hoàn toàn độc lập nhau.
- Giá trị của `F.prototype` có thể là đối tượng hoặc null: mọi giá trị kiểu cơ sở đều không hoạt động.
- Thuộc tính `"prototype"` chỉ có tác dụng khi cài đặt nó cho một hàm tạo và gọi hàm này bằng `new`.
=======
- The `F.prototype` property (don't mess with `[[Prototype]]`) sets `[[Prototype]]` of new objects when `new F()` is called.
=======
Everything is quite simple, just a few notes to make things clear:

- The `F.prototype` property (don't mistake it for `[[Prototype]]`) sets `[[Prototype]]` of new objects when `new F()` is called.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
- The value of `F.prototype` should be either an object or `null`: other values won't work.
-  The `"prototype"` property only has such a special effect when set on a constructor function, and invoked with `new`.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Nếu cài đặt `prototype` cho một đối tượng thông thường, nó không còn gì đặc biệt:
```js
let user = {
  name: "Hùng",
  prototype: "Bla-bla" // không có gì đặc biệt
};
```

Mặc định tất cả các hàm có `F.prototype = { constructor: F }`, giúp ta có thể lấy được hàm tạo của một đối tượng bằng cách truy cập thuộc tính `constructor` của nó.
