# Các cờ và bộ mô tả của thuộc tính

Như chúng ta đã biết, đối tượng có thể lưu các thuộc tính.

Cho đến nay, một thuộc tính là một cặp "khóa-giá trị" đơn giản đối với chúng ta. Nhưng một thuộc tính của đối tượng thực sự là một thứ linh hoạt và mạnh mẽ hơn.

Trong bài này, chúng ta sẽ học về các cấu hình bổ sung cho thuộc tính, và trong bài tiếp theo là cách để biến chúng thành các hàm getter và setter.

## Các "cờ" của thuộc tính

Các thuộc tính của đối tượng, ngoài giá trị **`value`** còn có ba đặc tính đặc biệt khác (còn gọi là "cờ" hay "flag"):

- **`writable`** -- nếu là `true`, giá trị có thể được thay đổi, nếu không thì nó ở chế độ chỉ đọc.
- **`enumerable`** -- nếu là `true`, thì được liệt kê trong các vòng lặp, nếu không thì không được liệt kê.
- **`configurable`** -- nếu là `true`, thuộc tính có thể bị xóa và các cờ này có thể được sửa đổi, nếu không thì không.

Chúng ta chưa từng thấy các cờ này, bởi thông thường chúng không hiện ra. Khi chúng ta tạo một thuộc tính theo cách thông thường, tất cả các cờ đều là `true`. Nhưng chúng ta cũng có thể thay đổi chúng bất cứ lúc nào.

Trước tiên, cùng xem cách để lấy các cờ trên:

Phương thức [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) cho phép lấy *toàn bộ* thông tin của một thuộc tính.

Cú pháp là:

```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: Đối tượng để lấy thông tin.

`propertyName`
: Tên thuộc tính.

Giá trị trả về là một đối tượng gọi là "property desciptor" (bộ mô tả thuộc tính): nó chứa giá trị và tất cả các cờ của thuộc tính.

Ví dụ:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Để thay đổi các cờ, chúng ta có thể sử dụng [Object.defineProperty](mdn:js/Object/defineProperty).

Cú pháp là:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: Đối tượng và thuộc tính cần áp dụng descriptor.

`descriptor`
: Đối tượng descriptor dùng để áp dụng.

Nếu thuộc tính đã tồn tại, `defineProperty` cập nhật lại các cờ của nó. Nếu không, nó tạo thuộc tính với giá trị và cờ được cung cấp bởi `descriptor`; trong tình huống đó, nếu một cờ không được cung cấp, nó được giả định có giá trị là `false`.

Ví dụ, thuộc tính `name` được tạo với tất cả các cờ là sai:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

So sánh nó với `user.name` "được tạo bình thường" ở trên: bây giờ tất cả các cờ đều là sai. Nếu đó không phải là những gì chúng ta muốn thì tốt hơn chúng ta nên đặt chúng thành `true` trong `descriptor`.

Bây giờ, cùng xem các cờ có tác dụng gì qua ví dụ.

## Không thể ghi

Hãy làm cho `user.name` không thể ghi (không thể gán lại) bằng cách thay đổi cờ `writable`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // Lỗi: Không thể gán cho thuộc tính chỉ đọc 'name'
*/!*
```

Giờ đây, không ai có thể thay đổi tên user của chúng ta, trừ khi họ áp dụng `defineProperty` của chính họ để ghi đè lên của chúng ta.

```smart header="Lỗi chỉ xuất hiện trong chế độ nghiêm ngặt"
Trong chế độ không nghiêm ngặt, không có lỗi nào xảy ra khi ghi vào các thuộc tính không thể ghi và tương tự. Nhưng thao tác vẫn không thành công. Các hành động vi phạm cờ đơn giản là ngấm ngầm bị bỏ qua trong chế độ không nghiêm ngặt.
```

Đây là ví dụ tương tự, nhưng thuộc tính được tạo từ đầu:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // đối với các thuộc tính mới, chúng ta cần liệt kê rõ ràng những gì là true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## Không thể liệt kê

Bây giờ, hãy thêm một `toString` tùy chỉnh vào `user`.

Thông thường, `toString` có sẵn cho các đối tượng là không thể liệt kê được, nó không hiển thị trong `for..in`. Nhưng nếu chúng ta thêm một `toString` của riêng mình, thì theo mặc định, nó sẽ hiển thị trong `for..in`, như thế này:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// Mặc định, cả hai thuộc tính của chúng ta đều được liệt kê
for (let key in user) alert(key); // name, toString
```

Nếu không thích, chúng ta có thể đặt `enumerable:false`. Sau đó, nó sẽ không xuất hiện trong vòng lặp `for..in`, giống như những thuộc tính có sẵn:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Giờ toString của chúng ta biến mất
*/!*
for (let key in user) alert(key); // name
```

Các thuộc tính không liệt kê cũng bị loại khỏi `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Không thể cấu hình

Cờ không thể cấu hình (`configurable:false`) đôi khi được đặt trước cho các đối tượng và thuộc tính có sẵn.

Một thuộc tính không thể cấu hình sẽ không thể bị xóa.

Ví dụ, `Math.PI` không thể ghi, không thể liệt kê và không thể cấu hình:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```

Cho nên lập trình viên không thể thay đổi giá trị `Math.PI` hoặc ghi đè nó:

```js run
Math.PI = 3; // Lỗi

// xóa Math.PI cũng không có kết quả
```

Làm cho một thuộc tính không thể cấu hình là con đường một chiều. Chúng ta không thể thay đổi nó trở lại với `defineProperty`.

Nói một cách chính xác, khả năng không thể cấu hình áp đặt một số hạn chế đối với `defineProperty`:

1. Không thể thay đổi cờ `configurable`.
2. Không thể thay đổi cờ `enumerable`.
3. Không thể thay đổi `writable: false` thành `true` (the other way round works).
4. Không thể thay đổi `get/set` cho một thuộc tính truy cập (nhưng có thể gán chúng nếu vắng mặt).

**Ý tưởng của "configurable: false" là để ngăn chặn các thay đổi của các cờ thuộc tính và việc xóa nó, trong khi cho phép thay đổi giá trị của nó.**

Ở đây `user.name` là không thể cấu hình, nhưng chúng ta vẫn có thể thay đổi nó (vì nó có thể ghi):

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // hoạt động tốt
delete user.name; // Lỗi
```

Và ở đây, chúng ta đặt `user.name` thành hằng số "bị niêm phong mãi mãi":

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// không thể thay đổi user.name và các cờ của nó
// tất cả đều không có kết quả:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

## Object.defineProperties

Phương thức [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) cho phép định nghĩa hàng loạt thuộc tính cùng lúc.

Cú pháp là:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Ví dụ:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

Vì vậy, chúng ta có thể thiết lập nhiều thuộc tính cùng lúc.

## Object.getOwnPropertyDescriptors

Để lấy tất cả các property descriptor cùng lúc, chúng ta có thể sử dụng phương thức [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).

Cùng với `Object.defineProperties`, nó có thể được sử dụng như một cách "nhận biết cờ" để nhân bản một đối tượng:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Thường khi nhân bản một đối tượng, chúng ta sử dụng lệnh gán để sao chép các thuộc tính như thế này:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...Nhưng nó không sao chép được cờ. Vậy nên nếu chúng ta muốn một bản sao "tốt hơn" thì nên dùng `Object.defineProperties`.

Một khác biệt nữa là `for..in` bỏ qua các thuộc tính symbol, nhưng `Object.getOwnPropertyDescriptors` trả về *tất cả* descriptor của mọi thuộc tính kể cả symbol.

## Niêm phong toàn đối tượng

Sử dụng property descriptors chỉ giúp chúng ta niêm phong từng thuộc tính.

Có một số phương thức giúp chúng ta thực hiện trên toàn đối tượng:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Cấm thêm các thuộc tính mới cho đối tượng.

[Object.seal(obj)](mdn:js/Object/seal)
: Cấm thêm/xóa các thuộc tính. Đặt `configurable: false` cho mọi thuộc tính hiện có.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Cấm thêm/xóa/sửa các thuộc tính. Đặt `configurable: false, writable: false` cho mọi thuộc tính hiện có.

Và cũng có các phương thức kiểm tra cho chúng:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Trả về `false` nếu việc thêm thuộc tính bị cấm, nếu không trả về `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Trả về `true` nếu việc thêm/xóa thuộc tính bị cấm, và mọi thuộc tính hiện có đều có cờ `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Trả về `true` nếu việc thêm/xóa/sửa thuộc tính bị cấm, và tất cả các thuộc tính hiện có đều có cờ `configurable: false, writable: false`.

Các phương thức này hiếm khi được sử dụng trong thực tế.
