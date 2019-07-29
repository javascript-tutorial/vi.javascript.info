# Thừa kế nguyên mẫu

Khi lập trình, chúng ta thường muốn lấy một thứ gì đó rồi mở rộng nó.

Ví dụ, chúng ta có đối tượng `user` với nhiều thuộc tính và phương thức, từ `user` ta muốn tạo ra hai đối tượng `admin` và `guest` với một chút thay đổi. Chúng ta muốn tái sử dụng những thứ đã có sẵn trong `user`, không muốn phải sao chép/viết lại các phương thức này trong `admin` và `guest`.

Tính năng *Thừa kế nguyên mẫu* (Prototypal inheritance) của JavaScript giúp thực hiện điều này.

## [[Prototype]]

Trong JavaScript, mọi đối tượng có một thuộc tính ẩn đặc biệt là `[[Prototype]]` , nó hoặc mang giá trị `null` hoặc tham chiếu tới một đối tượng khác. Đối tượng này được gọi là "nguyên mẫu" (prototype):

![prototype](object-prototype-empty.svg)

Khi đọc một thuộc tính không tồn tại của `object`, JavaScript tự động lấy thuộc tính này từ nguyên mẫu. Trong lập trình người ta gọi nó là "thừa kế từ nguyên mẫu": một đối tượng được thừa hưởng các thuộc tính/phương thức từ nguyên mẫu của nó. Nhiều tính năng hay ho của ngôn ngữ và nhiều kỹ thuật lập trình dựa trên khái niệm này.

Thuộc tính `[[Prototype]]` là thuộc tính có sẵn bên trong đối tượng và nó bị ẩn đi, nhưng vẫn có cách để ta chạm được nó:

Một trong những cách đó là sử dụng `__proto__`, đây là mịnh họa:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal;
*/!*
```

```smart header="`__proto__` là getter/setter của `[[Prototype]]`"
Chú ý là `__proto__` *không phải là* `[[Prototype]]` mà là getter/setter cho `[[Prototype]]`.

Nó tồn tại vì lý do lịch sử, trong JavaScript hiện đại `__proto__` được thay thế bằng hai hàm `Object.getPrototypeOf/Object.setPrototypeOf`, cho phép lấy và cài đặt nguyên mẫu. Chúng sẽ ta tìm hiểu lý do thay thế cũng như cách sử dụng hai hàm này sau.

Theo đặc tả, `__proto__` chỉ được hỗ trợ trong trình duyệt, nhưng thực tế các môi trường khác cũng hỗ trợ nó. Do `__proto__` trông rõ ràng, đơn giản, nên ở bài này chúng ta sử dụng nó trong các ví dụ.
```

Nếu ta truy cập một thuộc tính không tồn tại trong `rabbit`, JavaScript tự động lấy từ `animal`.

Ví dụ:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// có thể đọc được cả hai thuộc tính trong rabbit
*!*
alert( rabbit.eats ); // true, lấy từ nguyên mẫu (**)
*/!*
alert( rabbit.jumps ); // true
```

Dòng `(*)` cài đặt `animal` cho `rabbit.__proto__`, tức làm `[[Prototype]]` của `rabbit`.

Sau đó, khi `alert` cố đọc `rabbit.eats` `(**)`, vì thuộc tính này không có trong `rabbit`, nên JavaScript đi theo `[[Prototype]]` tìm đến `animal` và lấy `eats` từ đây (tìm theo dấu mũi tên):

![](proto-animal-rabbit.svg)

Ta nói "`animal` là nguyên mẫu của `rabbit`" hoặc "`rabbit` được thừa hưởng nguyên mẫu từ `animal`".

Vậy nên nếu `animal` có nhiều thuộc tính và phương thức, chúng tự động có trong `rabbit`. Các thuộc tính này gọi là các thuộc tính "được thừa kế".

Nếu chúng ta có một phương thức trong `animal`, thì nó có thể gọi từ `rabbit`:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Động vật biết đi");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk lấy từ nguyên mẫu
*!*
rabbit.walk(); // Động vật biết đi
*/!*
```

Phương thức tự động lấy từ nguyên mẫu theo sơ đồ sau:

![](proto-animal-rabbit-walk.svg)

Chuỗi nguyên mẫu có thể dài hơn:


```js run
let animal = {
  eats: true,
  walk() {
    alert("Động vật biết đi");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// walk lấy từ chuỗi nguyên mẫu
longEar.walk(); // Động vật biết đi
alert(longEar.jumps); // true (lấy từ rabbit)
```

![](proto-animal-rabbit-chain.svg)

Thực tế có hai giới hạn:

1. Không được thừa kế vòng, nếu không JavaScript sẽ báo lỗi.
2. Giá trị `__proto__` chỉ có thể là đối tượng hoặc `null`, các giá trị cơ sở bị bỏ qua.

Mỗi đối tượng chỉ có một thuộc tính `[[Prototype]]` và thuộc tính này chỉ tham chiếu tới một đối tượng. Cho nên một đối tượng chỉ có một nguyên mẫu.

## Hành động ghi dữ liệu không sử dụng "nguyên mẫu"

Nguyên mẫu chỉ được dùng khi đọc thuộc tính hoặc chạy phương thức mà chúng không tồn tại.

Việc ghi/xóa thuộc tính chỉ sử dụng đối tượng, không sử dụng nguyên mẫu của nó.

Trong ví dụ dưới đây, ta ghi vào `rabbit.walk` một hàm, kết quả hàm này được lưu trong `rabbit`, nguyên mẫu `animal` không được sử dụng và do đó không thay đổi:

```js run
let animal = {
  eats: true,
  walk() {
    /* phương thức này không được sử dụng bởi rabbit */  
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

Từ giờ, `rabbit.walk()` được tìm thấy và gọi ngay trong `rabbit`, không sử dụng `walk` của `animal`:

![](proto-animal-rabbit-walk-2.svg)

Nhưng nó chỉ đúng với thuộc tính dữ liệu, không đúng với thuộc tính truy cập. Về bản chất việc đọc/ghi thuộc tính truy cập dẫn đến việc gọi hàm getter/setter, nên chúng được gọi từ nguyên mẫu.

Ví dụ:

```js run
let user = {
  name: "Hùng",
  surname: "Phùng",

  set fullName(value) {
    [this.surname, this.name] = value.split(" ");
  },

  get fullName() {
    return `${this.surname} ${this.name}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // Phùng Hùng (*)

// chạy setter của user
admin.fullName = "Nguyễn Trang"; // (**)
```

Tại dòng `(*)` `admin.fullName` được đọc, do có getter trong `user` nên getter này được gọi. Tại dòng `(**)` thuộc tính `admin.fullName` được ghi, do có setter trong `user` nên setter này được gọi.

## Giá trị của "this"

Một câu hỏi thú vị xuất hiện trong ví dụ trên: Giá trị của `this` trong `set fullName(value)` là gì và thuộc tính `this.name` và `this.surname` được ghi vào `user` hay `admin`?

Câu trả lời rất đơn giản: `this` không bị ảnh hưởng bởi nguyên mẫu.

**Không quan trọng phương thức được lấy từ đâu: từ đối tượng hay từ nguyên mẫu. Khi phương thức được gọi giá trị `this` luôn là đối tượng trước dấu chấm.**

Cho nên, khi gọi setter bằng `admin.fullName=` thì `this` là `admin` không phải là `user`.

Điều này vô cùng quan trọng, vì chúng ta có thể có một đối tượng lớn với rất nhiều phương thức được dùng làm nguyên mẫu. Sau đó các đối tượng được thừa kế có chạy những phương thức này và chỉ làm thay đổi trạng thái của nó, không làm thay đổi trạng thái của đối tượng lớn kia.

Ví dụ, ở đây `animal` được xem như nơi "lưu trữ các phương thức" còn `rabbit` sử dụng chúng.

Lời gọi `rabbit.sleep()` cài đặt `this.isSleeping` trong đối tượng `rabbit`:

```js run
// animal chứa nhiều phương thức
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// sửa rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (không có thuộc tính này trong nguyên mẫu)
```

Hình ảnh của kết quả trên:

![](proto-animal-rabbit-walk-3.svg)

Nếu ta có các đối tượng khác như `bird`, `snake` ... thừa kế từ `animal`, chúng cũng có thể truy cập các phương thức của `animal`. Nhưng `this` thì luôn là `bird`, `snake`... không phải `animal`. Cho nên khi ta ghi dữ liệu vào `this`, nó lưu trong các đối tượng này, không lưu vào nguyên mẫu.

Ta có kết luận chung: các phương thức được chia sẻ, nhưng trạng thái đối tượng thì không.

## Vòng lặp for..in

Vòng lặp `for..in` liệt kê cả các thuộc tính "được thừa kế".

Ví dụ:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// Object.keys không liệt kê các key được thừa kế
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// vòng lặp for..in liệt kê cả key được thừa kế
for(let prop in rabbit) alert(prop); // jumps, rồi eats
*/!*
```

Nếu không muốn liệt kê các thuộc tính được thừa kế, có thể sử dụng phương thức có sẵn [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): nó trả về `true` nếu `key` là thuộc tính riêng (không được thừa kế) của `obj`.

Nên ta có thể loại bỏ các thuộc tính được thừa kế (hoặc làm gì đó với chúng):

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Thuộc tính riêng: ${prop}`); // Thuộc tính riêng: jumps
  } else {
    alert(`Thuộc tính được thừa kế: ${prop}`); // Thuộc tính được thừa kế: eats
  }
}
```

Ở đây ta có chuỗi thừa kế sau: `rabbit` thừa kế từ `animal`, `animal` thừa kế từ `Object.prototype` (mọi đối tượng tạo bằng literal `{...}` mặc định nhận `Object.prototype` làm nguyên mẫu), `Object.prototype` không có nguyên mẫu nên `[[Prototype]]` của nó là `null`:

![](rabbit-animal-object.svg)

Nhờ chuỗi thừa kế này mà ta có thể gọi `rabbit.hasOwnProperty`. Bản thân `rabbit` không có `hasOwnProperty`, JavaScript tìm ngược lên chuỗi thừa kế và thấy trong `Object.prototype`. Nói cách khác `rabbit.hasOwnProperty` là phương thức được thừa kế từ `Object.prototype`.

...Nhưng tại sao `hasOwnProperty` lại không xuất hiện trong vòng lặp `for..in`, như `eats` và `jumps`, vì nó cũng là một thuộc tính được thừa kế mà?

Câu trả lời hóa ra rất đơn giản: nó là thuộc tính không liệt kê. Trong JavaScipt mọi thuộc tính của `Object.prototype`, đều có cờ `enumerable:false`. Đó là lý do tại sao `hasOwnProperty` không xuất hiện trong `for..in`.

```smart header="Mọi phương thức duyệt đều bỏ qua các thuộc tính được thừa kế"
Không giống như vòng lặp `for..in` mọi phương thức lấy các cặp key/value của một đối tượng, như `Object.keys`, `Object.values`... đều bỏ qua thuộc tính được thừa kế.

Chúng chỉ hoạt động trên bản thân đối tượng mà không đoái hoài gì đến nguyên mẫu.
```

## Tóm tắt

- Trong JavaScript, tất cả các đối tượng có một thuộc tính ẩn là `[[Prototype]]` hoặc tham chiếu tới một đối tượng khác hoặc `null`.
- Chúng ta có thể sử dụng `obj.__proto__` để truy cập `[[Prototype]]` (là getter/setter, có vài cách khác sẽ đề cập sau).
- Đối tượng được tham chiếu bởi `[[Prototype]]` gọi là "nguyên mẫu" (prototype).
- Nếu ta muốn đọc một thuộc tính hay gọi một phương thức của `obj`, mà chúng không tồn tại, thì JavaScript sẽ cố tìm chúng trong nguyên mẫu.
- Hành động ghi/xóa một thuộc tính dữ liệu không sử dụng nguyên mẫu.
- Nếu chúng ta gọi `obj.method()`, và `method` lấy từ nguyên mẫu, `this` vẫn là `obj`. Cho nên phương thức luôn làm việc với đối tượng hiện tại, kể cá đó là phương thức được thừa kế.
- Vòng lặp `for..in` duyệt qua cả thuộc tính riêng lẫn thuộc tính được thừa kế của đối tượng. Mọi phương thức khác lấy các cặp key/value của đối tượng chỉ làm việc trên đối tượng hiện tại và lấy ra được thuộc tính riêng của đối tượng mà thôi.
