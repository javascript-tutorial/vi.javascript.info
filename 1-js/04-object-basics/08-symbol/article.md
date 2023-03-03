
# Kiểu ký tự

Theo thông số kỹ thuật, các khóa thuộc tính đối tượng có thể thuộc loại chuỗi hoặc loại ký hiệu. Không phải số, không phải booleans, chỉ có chuỗi hoặc ký hiệu, hai loại này.

Cho đến bây giờ chúng ta chỉ sử dụng các chuỗi. Bây giờ hãy xem những lợi ích mà các ký tự có thể mang lại cho chúng ta.

## Ký tự

Một "ký tự" đại diện cho một mã định danh duy nhất.

Giá trị của loại này có thể được tạo bằng cách sử dụng `Symbol()`:

```js
// id is a new symbol
let id = Symbol();
```

Khi tạo, chúng ta có thể cung cấp cho ký tự một mô tả (còn được gọi là tên ký tự), chủ yếu hữu ích cho mục đích gỡ lỗi:

```js
// id là một ký tự với mô tả "id"
let id = Symbol("id");
```

Các ký tự được đảm bảo là duy nhất. Ngay cả khi chúng ta tạo nhiều ký tự có cùng mô tả, chúng vẫn có giá trị khác nhau. Mô tả chỉ là một nhãn không ảnh hưởng gì.

Chẳng hạn, đây là hai ký tự có cùng mô tả -- chúng không bằng nhau:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Nếu bạn đã quen thuộc với Ruby hoặc một ngôn ngữ khác cũng có một số loại "ký tự" -- đừng hiểu lầm. Các ký tự JavaScript là khác nhau.

````warn header="Các ký tự không tự động chuyển đổi thành chuỗi"
Hầu hết các giá trị trong JavaScript đều hỗ trợ chuyển đổi ngầm định thành chuỗi. Chẳng hạn, chúng ta có thể `alert` gần như bất kỳ giá trị nào và nó sẽ hoạt động. Ký tự là đặc biệt. Họ không tự động chuyển đổi.

Chẳng hạn, `alert` này sẽ hiển thị lỗi:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Đó là "bảo vệ ngôn ngữ" chống lại sự lộn xộn, bởi vì các chuỗi và ký tự về cơ bản là khác nhau và không nên vô tình chuyển đổi cái này thành cái khác.

Nếu chúng ta thực sự muốn hiển thị một ký tự, chúng ta cần gọi `.toString()` một cách rõ ràng trên đó, như sau:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), bây giờ nó hoạt động
*/!*
```

Hoặc nhận thuộc tính `symbol.description` để chỉ hiển thị mô tả:
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "Thuộc tính ẩn"

Các ký tự cho phép chúng ta tạo các thuộc tính "ẩn" của một đối tượng, mà không phần mã nào khác có thể vô tình truy cập hoặc ghi đè lên.

Chẳng hạn, nếu chúng ta đang làm việc với các đối tượng `user`, thuộc về mã của bên thứ ba. Chúng ta muốn thêm số nhận dạng cho chúng.

Hãy sử dụng một phím ký tự cho nó:

```js run
let user = { // thuộc một mã khác
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // chúng ta có thể truy cập dữ liệu bằng cách lấy ký tự làm khóa
```

Lợi ích của việc sử dụng `Symbol("id")` trên chuỗi `"id"` là gì?

Vì các đối tượng `user` thuộc về một mã khác và mã đó cũng hoạt động với chúng, nên chúng ta không nên chỉ thêm bất kỳ trường nào vào đó. Điều đó không an toàn. Nhưng một ký tự không thể vô tình được truy cập, mã của bên thứ ba thậm chí có thể sẽ không nhìn thấy nó, vì vậy có thể làm như vậy là ổn.

Ngoài ra, hãy tưởng tượng rằng một tập lệnh khác muốn có mã định danh riêng bên trong `user`, cho các mục đích riêng của nó. Đó có thể là một thư viện JavaScript khác, do đó các tập lệnh hoàn toàn không biết về nhau.

Sau đó, tập lệnh đó có thể tạo `Symbol("id")` của riêng nó, như sau:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Sẽ không có xung đột giữa số nhận dạng của chúng ta và của họ, bởi vì các ký tự luôn khác nhau, ngay cả khi chúng có cùng tên.

...Nhưng nếu chúng ta sử dụng một chuỗi `"id"` thay vì một ký tự cho cùng một mục đích, thì *sẽ* xảy ra xung đột:

```js
let user = { name: "John" };

// Tập lệnh của chúng ta sử dụng thuộc tính "id"
user.id = "Our id value";

// ...Một tập lệnh khác cũng muốn "id" cho mục đích của nó...

user.id = "Their id value"
// Bùm! ghi đè bởi một tập lệnh khác!
```

### Các ký hiệu trong một object literal

Nếu chúng ta muốn sử dụng một ký tự trong một object literal `{...}`, thì chúng ta cần có dấu ngoặc vuông xung quanh ký tự đó.

Như thế này:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // không có "id": 123
*/!*
};
```
Đó là bởi vì chúng ta cần giá trị từ biến `id` làm khóa chứ không phải chuỗi "id".

### Các ký tự bị for..in bỏ qua

Các thuộc tính tượng trưng không tham gia vào vòng lặp `for..in`.

Ví dụ:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // tên, tuổi (không có ký hiệu)
*/!*

// truy cập trực tiếp bằng ký tự hoạt động
alert( "Direct: " + user[id] );
```

`Object.keys(user)` cũng bỏ qua chúng. Đó là một phần của nguyên tắc "ẩn các thuộc tính tượng trưng" chung. Nếu một tập lệnh hoặc thư viện khác lặp lại đối tượng của chúng ta, nó sẽ không truy cập bất ngờ vào thuộc tính tượng trưng.

Ngược lại, [Object.assign](mdn:js/Object/assign) sao chép cả thuộc tính chuỗi và ký tự:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Không có nghịch lý ở đây. Đó là do thiết kế. Ý tưởng là khi chúng ta sao chép một đối tượng hoặc hợp nhất các đối tượng, chúng ta thường muốn sao chép *tất cả* các thuộc tính (bao gồm các ký hiệu như `id`).

## Ký tự chung

Như chúng ta đã thấy, thông thường tất cả các ký tự đều khác nhau, ngay cả khi chúng có cùng tên. Nhưng đôi khi chúng ta muốn các ký tự cùng tên là cùng một thực thể. Chẳng hạn, các phần khác nhau trong ứng dụng của chúng tôi muốn truy cập ký tự `"id"` có nghĩa chính xác là cùng một thuộc tính.

Để đạt được điều đó, tồn tại *cơ quan đăng ký ký tự chung*. Chúng ta có thể tạo các ký tự trong đó và truy cập chúng sau này, đồng thời đảm bảo rằng các lần truy cập lặp lại cùng tên sẽ trả về chính xác cùng một ký tự.

Để đọc (tạo nếu không có) một ký tự từ sổ đăng ký, hãy sử dụng `Symbol.for(key)`.

Cuộc gọi đó sẽ kiểm tra sổ đăng ký chung và nếu có một ký tự được mô tả là `key` thì trả về ký tự đó, nếu không thì tạo một ký tự mới `Symbol(key)` và lưu trữ nó trong sổ đăng ký theo `key` đã cho.

Ví dụ:

```js run
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true
```

Symbols inside the registry are called *global symbols*. If we want an application-wide symbol, accessible everywhere in the code -- that's what they are for.

```smart header="That sounds like Ruby"
In some programming languages, like Ruby, there's a single symbol per name.

In JavaScript, as we can see, that's right for global symbols.
```

### Symbol.keyFor

For global symbols, not only `Symbol.for(key)` returns a symbol by name, but there's a reverse call: `Symbol.keyFor(sym)`, that does the reverse: returns a name by a global symbol.

For instance:

```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.

That said, any symbols have `description` property.

For instance:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
```

## System symbols

There exist many "system" symbols that JavaScript uses internally, and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) table:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...and so on.

For instance, `Symbol.toPrimitive` allows us to describe object to primitive conversion. We'll see its use very soon.

Other symbols will also become familiar when we study the corresponding language features.

## Summary

`Symbol` is a primitive type for unique identifiers.

Symbols are created with `Symbol()` call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with `key` as the name. Multiple calls of `Symbol.for` with the same `key` return exactly the same symbol.

Symbols have two main use cases:

1. "Hidden" object properties.
    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

    So we can "covertly" hide something into objects that we need, but others should not see, using symbolic properties.

2. There are many system symbols used by JavaScript which are accessible as `Symbol.*`. We can use them to alter some built-in behaviors. For instance, later in the tutorial we'll use `Symbol.iterator` for [iterables](info:iterable), `Symbol.toPrimitive` to setup [object-to-primitive conversion](info:object-toprimitive) and so on.

Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. So they are not really hidden. But most libraries, built-in functions and syntax constructs don't use these methods.
