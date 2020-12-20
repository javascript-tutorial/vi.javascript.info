# F.prototype

Nhớ rằng, các đối tượng mới có thể được tạo bằng hàm tạo (constructor), chẳng hạn như `new F()`.

Nếu `F.prototype` là một đối tượng, thì toán tử `new` dùng nó để đặt cho `[[Prototype]]` của đối tượng mới tạo ra.

```smart
JavaScript đã có kế thừa nguyên mẫu ngay từ đầu. Đây là một trong những tính năng cốt lõi của ngôn ngữ.

Nhưng thời xưa, không có quyền truy cập trực tiếp vào nó. Điều duy nhất hoạt động đáng tin cậy là thuộc tính `"prototype"` của hàm khởi tạo, được mô tả trong chương này. Vì vậy, có rất nhiều tập lệnh vẫn sử dụng nó.
```

Xin lưu ý rằng `F.prototype` ở đây nghĩa là một thuộc tính thông thường có tên là `"prototype"` của `F`. Nghe có vẻ giống với thuật ngữ "prototype", nhưng ở đây chúng ta thực sự muốn nói đến một thuộc tính thông thường với tên này.

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

Đặt `Rabbit.prototype = animal` nghĩa là như sau: "Khi một `new Rabbit` được tạo, hãy gán `[[Prototype]]` của nó thành `animal`".

Đây là hình ảnh của kết quả:

![](proto-constructor-animal-rabbit.svg)

Ở hình trên, `"prototype"` là một mũi tên nằm ngang, mang nghĩa là một thuộc tính thông thường, và `[[Prototype]]` là mũi tên thẳng đứng, mang nghĩa là `rabbit` kế thừa từ `animal`.

```smart header="`F.prototype` chỉ được dùng khi gọi `new F`"
Thuộc tính `F.prototype` chỉ được dùng khi `new F` được gọi, nó đặt `[[Prototype]]` của đối tượng mới tạo ra.

Nếu sau khi tạo đối tượng, thuộc tính `F.prototype` bị thay đổi (`F.prototype = <một đối tượng khác>`), thì các đối tượng mới được tạo bởi `new F` sẽ có một đối tượng khác làm `[[Prototype]]`, nhưng các đối tượng hiện có vẫn giữ đối tượng `[[Prototype]]` cũ.
```

## F.prototype mặc định, thuộc tính "constructor"

Mọi hàm đều có thuộc tính `"prototype"` ngay cả khi chúng ta không cung cấp nó.

`"prototype"` mặc định (của một hàm) là một đối tượng với một thuộc tính duy nhất `constructor` trỏ ngược lại hàm.

Như thế này:

```js
function Rabbit() {}

/* prototype mặc định
Rabbit.prototype = { constructor: Rabbit };
*/
```

![](function-prototype-constructor.svg)

Chúng ta có thể kiểm tra nó:

```js run
function Rabbit() {}
// theo mặc định:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

Dĩ nhiên, nếu chúng ta không làm gì, thuộc tính `constructor` sẽ có sẵn cho mọi đối tượng rabbit thông qua `[[Prototype]]`:

```js run
function Rabbit() {}
// theo mặc định:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // kế thừa từ {constructor: Rabbit}

alert(rabbit.constructor == Rabbit); // true (lấy từ nguyên mẫu)
```

![](rabbit-prototype-constructor.svg)

Chúng ta có thể sử dụng thuộc tính `constructor` để tạo một đối tượng mới bằng cách sử dụng cùng một constructor của đối tượng hiện có:

Giống như ở đây:

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

Cách này rất tiện nếu chúng ta có một đối tượng, nhưng không biết constructor nào đã tạo ra nó (ví dụ đối tượng đến từ một thư viện ngoài), và chúng ta muốn tạo một đối tượng khác cùng loại.

Nhưng có lẽ điều quan trọng nhất về `"constructor"` là ...

**...JavaScript không đảm bảo giá trị `"constructor"` luôn đúng.**

Đúng vậy, nó tồn tại trong `"prototype"` mặc định của mọi hàm, nhưng đó là tất cả những gì JavaScript làm. Chuyện gì xảy ra sau đó hoàn toàn do chúng ta quyết định.

Cụ thể, nếu chúng ta thay thế toàn bộ `prototype` mặc định, thì sẽ không có `constructor` trong nó nữa.

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

Cho nên, để giữ lại `"constructor"` đúng, chúng ta có thể chọn thêm/xóa các thuộc tính khỏi `prototype` mặc định thay vì ghi đè toàn bộ nó.

```js
function Rabbit() {}

// Không ghi đè toàn bộ Rabbit.prototype
// chỉ bổ sung cho nó
Rabbit.prototype.jumps = true
// Rabbit.prototype.constructor được bảo vệ
```

Hoặc theo phương án khác, tạo lại thuộc tính `constructor` một cách thủ công:

```js
Rabbit.prototype = {
  jumps: true,
*!*
  constructor: Rabbit
*/!*
};

// bây giờ constructor vẫn đúng, vì chúng ta đã thêm nó
```

## Tóm tắt

Trong chương này chúng ta đã mô tả ngắn gọn cách  đặt `[[Prototype]]` cho các đối tượng tạo ra bằng hàm tạo. Sau này chúng ta sẽ thấy nhiều mẫu hình lập trình nâng cao hơn dựa vào nó.

Mọi thứ khá đơn giản, chỉ có một vài lưu ý để mọi thứ rõ ràng hơn:

- Thuộc tính `F.prototype` (đừng nhầm lẫn nó với `[[Prototype]]`) thiết lập `[[Prototype]]` của đối tượng mới khi `new F()` được gọi.
- Giá trị của `F.prototype` cần phải là một đối tượng hoặc `null`: các giá trị khác đều không hoạt động.
- Thuộc tính `"prototype"` chỉ có tác dụng đặc biệt khi thiết lập nó cho một hàm tạo và gọi hàm này bằng `new`.

Với các đối tượng thông thường `prototype` không có gì đặc biệt:

```js
let user = {
  name: "John",
  prototype: "Bla-bla" // không có gì đặc biệt
};
```

Mặc định tất cả các hàm có `F.prototype = { constructor: F }`, vì vậy chúng ta có thể lấy được hàm tạo của một đối tượng bằng cách truy cập thuộc tính `constructor` của nó.
