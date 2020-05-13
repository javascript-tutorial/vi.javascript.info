
# Objects

Như chúng ta đã biết từ chương <info:types>, có 6 loại dữ liệu trong JavaScript. Chúng được gọi là "nguyên thủy", bởi vì giá trị của chúng chỉ chứa một thứ duy nhất (đó có thể là một chuỗi hoặc một số hoặc cái gì đó khác).

Ngược lại, các đối tượng được sử dụng để lưu trữ các bộ sưu tập có khóa của các dữ liệu khác nhau và các thực thể phức tạp hơn. Trong JavaScript, các đối tượng thâm nhập vào hầu hết mọi khía cạnh của ngôn ngữ. Vì vậy, chúng ta phải hiểu chúng trước khi đi sâu vào bất cứ nơi nào khác.

Một đối tượng có thể được tạo bằng dấu ngoặc hình `{…}` với một danh sách *thuộc tính* tùy chọn. Một thuộc tính là một cặp "khóa: giá trị", trong đó `khóa` là một chuỗi (còn được gọi là "tên thuộc tính"), và `giá trị` có thể là bất cứ thứ gì.

Chúng ta có thể tưởng tượng một đối tượng như một cái tủ với các tập tin đã ký. Mỗi phần dữ liệu được lưu trữ trong tệp của nó bằng từ khóa. Thật dễ dàng để tìm một tệp theo tên của nó hoặc thêm/xóa một tệp.

![](object.svg)

Một đối tượng rỗng ("tủ rỗng") có thể được tạo bằng một hoặc hai cú pháp:

```js
let user = new Object(); // cú pháp "đối tượng constructor"
let user = {};  // cú pháp "đối tượng theo nghĩa đen"
```

![](object-user-empty.svg)

Thông thường, dấu ngoặc `{...}` được sử dụng. Loại khai báo đó được gọi là *đối tượng theo nghĩa đen*.

## Đối tượng theo nghĩa đen và thuộc tính

Chúng ta có thể ngay lập tức đặt một số thuộc tính vào `{...}` dưới dạng các cặp "khóa: giá trị":

```js
let user = {     // một đối tượng
  name: "John",  // khóa "name" lưu giá trị "John"
  age: 30        // khóa "age" lưu giá trị 30
};
```

Một thuộc tính có một khóa (còn được gọi là "tên" hoặc "định danh") trước dấu hai chấm `":"` và một giá trị ở bên phải của nó.

Trong đối tượng `user`, có hai thuộc tính:

1. Thuộc tính thứ nhất có tên là `"name"` và giá trị là `"John"`.
2. Thuộc tính thứ hai có tên là `"age"` và giá trị là `30`.

The resulting `user` object can be imagined as a cabinet with two signed files labeled "name" and "age".

Kết quả là đối tượng `user` có thể được tưởng tượng như một cái tủ với hai tệp được ký có nhãn "name" và "age".

![user object](object-user.svg)

Chúng ta có thể thêm, xóa và đọc tệp từ chúng mọi lúc.

Các giá trị của thuộc tính có thể truy cập bằng cách sử dụng dấu chấm:

```js
// lấy giá trị của thuộc tính trong đối tượng:
alert( user.name ); // John
alert( user.age ); // 30
```

Giá trị có thể là bất kỳ kiểu dữ liệu nào. Hãy thêm một giá trị boolean:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

Để xóa thuộc tính, ta có thể dùng `delete`:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Chúng ta cũng có thể sử dụng tên thuộc tính có nhiều từ, nhưng sau đó chúng phải được bọc lại:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // tên thuộc tính nhiều từ phải được bọc lại bằng dấu ngoặc kép
};
```

![](object-user-props.svg)


Thuộc tính cuối cùng trong danh sách có thể kết thúc bằng dấu phẩy:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Đó được gọi là dấu phẩy "trailing" hay "hanging". Nó khiến dễ dàng thêm/xóa/di chuyển xung quanh các thuộc tính, bởi vì tất cả các dòng trở nên giống nhau.

## Dấu ngoặc vuông

Với thuộc tính nhiều từ, truy cập bằng dấu chấm không hoạt động:

```js run
// sẽ có lỗi cú pháp
user.likes birds = true
```

Đó là vì dấu chấm yêu cầu khóa phải là một biến định danh hợp lệ. Đó là: không chứa khoảng trắng và các giới hạn khác.

Có một thay thế là "dấu ngoặc vuông" sẽ hoạt động với bất cứ chuỗi nào:

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

Bây giờ mọi thứ đã tốt. Hãy lưu ý rằng chuỗi bên trong ngoặc được bao bọc chính xác (bất kỳ loại bao bọc nào cũng được).

Dấu ngoặc vuông cũng cung cấp một cách để có được tên thuộc tính là kết quả của bất kỳ biểu thức nào -- trái ngược với chuỗi ký tự -- giống như từ một biến như sau:

```js
let key = "likes birds";

// giống như user["likes birds"] = true;
user[key] = true;
```

Ở đây, biến `key` có thể được tính vào thời gian chạy hoặc phụ thuộc vào đầu vào của người dùng. Và sau đó chúng ta sử dụng nó để truy cập vào thuộc tính. Điều đó giúp chúng ta linh hoạt hơn.

Ví dụ:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("Bạn muốn biết điều gì về người dùng?", "name");

// truy cập vào biến
alert( user[key] ); // John (nếu nhập "name")
```

Dấu chấm không thể dùng theo cách như vậy:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Thuộc tính computed

Chúng ta có thể sử dụng dấu ngoặc vuông trong một đối tượng theo nghĩa đen. Đó gọi là *thuộc tính computed*.

Ví dụ:

```js run
let fruit = prompt("Mua loại trái cây nào?", "apple");

let bag = {
*!*
  [fruit]: 5, // tên của thuộc tính được lấy từ biến fruit
*/!*
};

alert( bag.apple ); // 5 nếu fruit="apple"
```

Ý nghĩa của thuộc tính computed rất đơn giản: `[fruit]` có nghĩa là tên thuộc tính nên được lấy từ` fruit`.

Do vậy, nếu người dùng nhập `"apple"`, `bag` sẽ thành `{apple: 5}`.

Về cơ bản, nó hoạt động giống như:
```js run
let fruit = prompt("Mua loại trái cây nào?", "apple");
let bag = {};

// lấy tên thuộc tính từ biến fruit
bag[fruit] = 5;
```

...Nhưng nhìn tốt hơn.

Chúng ta có thể sử dụng các biểu thức phức tạp hơn trong dấu ngoặc vuông:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Dấu ngoặc vuông có mạnh hơn dấu chấm. Chúng chấp nhận bất cứ tên của thuộc tính và biến nào. Nhưng ngoài ra chúng cũng cồng kềnh khi viết.

Vì vậy hầu hết thời gian, khi tên thuộc tính được biết và đơn giản, dấu chấm được sử dụng. Và nếu chúng ta cần một cái gì đó phức tạp hơn, thì chúng ta chuyển sang dấu ngoặc vuông.



````smart header="Reserved words are allowed as property names"
Một biến không thể có tên bằng một trong những từ dành riêng cho ngôn ngữ như "for", "let", "return", vâng vâng.

Nhưng đối với một thuộc tính đối tượng, không có hạn chế đó. Tên nào cũng được:

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

Về cơ bản, bất kỳ tên nào cũng được cho phép, nhưng có một tên đặc biệt: `" __proto __ "` được đối xử đặc biệt vì lý do lịch sử. Chẳng hạn, chúng ta không thể đặt nó vào một giá trị phi đối tượng:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], didn't work as intended
```

Như chúng ta thấy từ code, việc gán cho một biến nguyên thủy `5` bị bỏ qua.

Điều đó có thể trở thành nguyên nhân gây ra lỗi và thậm chí là lỗ hổng nếu ta dự định lưu trữ các cặp khóa-giá trị tùy ý trong một đối tượng và cho phép người dùng truy cập các khóa cụ thể.

Trong trường hợp đó, người dùng có thể chọn `__proto__` làm khóa và logic gán sẽ bị hủy (như được hiển thị ở trên).

Có một cách để làm cho các đối tượng coi `__proto__` như một thuộc tính thông thường, chúng ta sẽ đề cập sau, nhưng trước tiên chúng ta cần biết thêm về các đối tượng.

Ngoài ra còn có một cấu trúc dữ liệu khác [Map](info:map-set), mà chúng ta sẽ tìm hiểu trong chương <info:map-set>, nó hỗ trợ các khóa tùy ý.
````


## Tốc ký giá trị của thuộc tính

Trong code chúng ta thường sử dụng các biến sẵn có làm giá trị cho tên của các thuộc tính.

Ví dụ:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
    // ...các thuộc tính khác
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

Trong ví dụ trên, các thuộc tính có cùng tên với các biến. Trường hợp sử dụng để tạo một thuộc tính từ một biến là rất phổ biến, do đó có một loại *tốc ký giá trị của thuộc tính* làm cho nó ngắn hơn.

Thay vì `name:name` chúng ta có thể viết `name`, như thế này:

```js
function makeUser(name, age) {
*!*
  return {
    name, // giống như name: name
    age   // giống như age: age
    // ...
  };
*/!*
}
```

Chúng ta có thể sử dụng cả thuộc tính bình thường và tốc ký trong cùng một đối tượng:

```js
let user = {
  name,  // giống như name:name
  age: 30
};
```

## Kiểm tra tồn tại

Một tính năng đáng chú ý của đối tượng là có thể truy cập bất kỳ thuộc tính nào. Sẽ không có lỗi nếu thuộc tính không tồn tại! Truy cập một thuộc tính không tồn tại chỉ trả về `undefined`. Nó cung cấp một cách rất phổ biến để kiểm tra xem thuộc tính có tồn tại hay không - lấy nó và so sánh với undefined:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true có nghĩa là "no such property"
```

Ngoài ra còn tồn tại một toán tử đặc biệt `"in"` để kiểm tra sự tồn tại của một thuộc tính.

Cú pháp:
```js
"key" in object
```

Ví dụ:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age tồn tại
alert( "blabla" in user ); // false, user.blabla không tồn tại
```

Hãy lưu ý rằng ở phía bên trái của `in` phải có *tên thuộc tính*. Đó thường là một chuỗi được bao bọc trong dấu ngoặc kép.

Nếu chúng ta bỏ qua dấu ngoặc kép, điều đó có nghĩa là một biến chứa tên thực tế sẽ được kiểm tra. Ví dụ:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, lấy tên từ key và kiểm tra thuộc tính đó
```

````smart header="Using \"in\" for properties that store `undefined`"
Thông thường, sự so sánh chặt `"=== undefined"` kiểm tra sự tồn tại của thuộc tính. Có một trường hợp đặc biệt nó sẽ sai, nhưng với `"in"` thì chạy chính xác.

Đó là khi một thuộc tính trong đối tượng tồn tại, nhưng lưu trữ là `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // thuộc tính không tồn tại, do đó - nó không phải là thuộc tính?

alert( "test" in obj ); // true, thuộc tính tồn tại!
```


Trong đoạn code trên, thuộc tính `obj.test` về mặt kỹ thuật tồn tại. Vì vậy, toán tử `in` hoạt động đúng.

Các tình huống như thế này rất hiếm khi xảy ra, vì `undefined` thường không được chỉ định. Chúng ta chủ yếu sử dụng `null` cho các giá trị "không xác định" hoặc "rỗng". Vì vậy, toán tử `in` là một vị khách kỳ lạ trong code.

## Vòng lặp "for..in"

Để đi qua tất cả các khóa của một đối tượng, ta có một dạng vòng lặp đặc biệt: `for..in`. Đây là một điều hoàn toàn khác với cấu trúc `for (;;)` mà chúng ta đã học trước đây.

Cú pháp:

```js
for (key in object) {
  // thực thi phần thân cho mỗi key của thuộc tính trong đối tượng
}
```

Ví dụ, in ra tất cả các thuộc tính của `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // các khóa
  alert( key );  // name, age, isAdmin
  // giá trị của các khóa
  alert( user[key] ); // John, 30, true
}
```

Lưu ý rằng tất cả các cấu trúc "for" cho phép chúng ta khai báo biến vòng lặp bên trong vòng lặp, như `let key` ở đây.

Ngoài ra, chúng ta có thể sử dụng một tên biến khác ở đây thay vì `key`. Chẳng hạn, `"for (let prop in obj)"` cũng được sử dụng rộng rãi.


### Sắp xếp một đối tượng

Đối tượng có được sắp xếp không? Nói cách khác, nếu chúng ta lặp qua một đối tượng, chúng ta có nhận được tất cả các thuộc tính theo cùng thứ tự chúng đã được thêm không? Chúng ta có thể tin vào điều này không?

Câu trả lời là: "sắp xếp theo kiểu đặc biệt": thuộc tính số nguyên được sắp xếp, những cái khác xuất hiện theo thứ tự tạo. Các chi tiết theo sau.

Ví dụ: hãy xem xét một đối tượng có chứa mã điện thoại:

```js run
let codes = {
  "49": "Đức",
  "41": "Thụy Sĩ",
  "44": "Anh",
  // ..,
  "1": "Mỹ"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

Đối tượng có thể được sử dụng để đề xuất một danh sách các tùy chọn cho người dùng. Nếu chúng ta tạo một trang chủ yếu cho người Đức thì có lẽ chúng ta muốn `49` đứng đầu tiên.

Nhưng nếu chúng ta chạy code, chúng ta sẽ thấy một bức tranh hoàn toàn khác:

- Mỹ (1) đứng đầu
- sau đó Thụy Sỹ (41) và cứ thế.

Các mã điện thoại đi theo thứ tự tăng dần, bởi vì chúng là số nguyên. Vì vậy, chúng ta thấy `1, 41, 44, 49`.

````smart header="Integer properties? What's that?"
Thuật ngữ "thuộc tính số nguyên" ở đây có nghĩa là một chuỗi có thể được chuyển đổi thành và từ một số nguyên mà không thay đổi.

Do đó, "49" là thuộc thuộc tính số nguyên, vì khi nó được chuyển đổi sang số nguyên và ngược lại, nó vẫn giống nhau. Nhưng "+49" và "1.2" thì không:

```js run
// Math.trunc là một hàm dựng sẵn để xóa một phần của số thập phân
alert( String(Math.trunc(Number("49"))) ); // "49", giống nhau, thuộc tính số nguyên
alert( String(Math.trunc(Number("+49"))) ); // "49", không giống "+49" ⇒ không phải thuộc tính số nguyên
alert( String(Math.trunc(Number("1.2"))) ); // "1", không giống "1.2" ⇒ không phải thuộc tính số nguyên
```
````

...Mặt khác, nếu các khóa không phải là số nguyên, thì chúng được liệt kê theo thứ tự tạo, Ví dụ:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // thêm một thuộc tính nữa

*!*
// thuộc tính không nguyên được liệt kê theo thứ tự tạo
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Vì vậy, để khắc phục sự cố với mã điện thoại, chúng ta có thể "gian lận" bằng cách làm cho mã không nguyên. Thêm dấu cộng `"+"` trước mỗi mã là đủ.

Như sau:

```js run
let codes = {
  "+49": "Đức",
  "+41": "Thụy Sỹ",
  "+44": "Anh",
  // ..,
  "+1": "Mỹ"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Bây giờ nó hoạt động như ý muốn.

## Copying by reference

One of the fundamental differences of objects vs primitives is that they are stored and copied "by reference".

Primitive values: strings, numbers, booleans -- are assigned/copied "as a whole value".

Ví dụ:

```js
let message = "Hello!";
let phrase = message;
```

As a result we have two independent variables, each one is storing the string `"Hello!"`.

![](variable-copy-value.svg)

Objects are not like that.

**A variable stores not the object itself, but its "address in memory", in other words "a reference" to it.**

Here's the picture for the object:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

Here, the object is stored somewhere in memory. And the variable `user` has a "reference" to it.

**When an object variable is copied -- the reference is copied, the object is not duplicated.**

If we imagine an object as a cabinet, then a variable is a key to it. Copying a variable duplicates the key, but not the cabinet itself.

Ví dụ:

```js no-beautify
let user = { name: "John" };

let admin = user; // copy the reference
```

Now we have two variables, each one with the reference to the same object:

![](variable-copy-reference.svg)

We can use any variable to access the cabinet and modify its contents:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

The example above demonstrates that there is only one object. As if we had a cabinet with two keys and used one of them (`admin`) to get into it. Then, if we later use the other key (`user`) we would see changes.

### Comparison by reference

The equality `==` and strict equality `===` operators for objects work exactly the same.

**Two objects are equal only if they are the same object.**

For instance, if two variables reference the same object, they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though both are empty:

```js run
let a = {};
let b = {}; // two independent objects

alert( a == b ); // false
```

For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are necessary very rarely and usually are a result of a coding mistake.

### Const object

An object declared as `const` *can* be changed.

Ví dụ:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

It might seem that the line `(*)` would cause an error, but no, there's totally no problem. That's because `const` fixes only value of `user` itself. And here `user` stores the reference to the same object all the time. The line `(*)` goes *inside* the object, it doesn't reassign `user`.

The `const` would give an error if we try to set `user` to something else, Ví dụ:

```js run
const user = {
  name: "John"
};

*!*
// Error (can't reassign user)
*/!*
user = {
  name: "Pete"
};
```

...But what if we want to make constant object properties? So that `user.age = 25` would give an error. That's possible too. We'll cover it in the chapter <info:property-descriptors>.

## Cloning and merging, Object.assign

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. Actually, that's rarely needed. Copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independent clone
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Arguments `dest`, and `src1, ..., srcN` (can be as many as needed) are objects.
- It copies the properties of all objects `src1, ..., srcN` into `dest`. In other words, properties of all arguments starting from the 2nd are copied into the 1st. Then it returns `dest`.

For instance, we can use it to merge several objects into one:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

If the receiving object (`user`) already has the same named property, it will be overwritten:

```js
let user = { name: "John" };

// overwrite name, add isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
```

We also can use `Object.assign` to replace the loop for simple cloning:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

It copies all properties of `user` into the empty object and returns it. Actually, the same as the loop, but shorter.

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use the cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

There's a standard algorithm for deep cloning that handles the case above and more complex cases, called the [Structured cloning algorithm](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data). In order not to reinvent the wheel, we can use a working implementation of it from the JavaScript library [lodash](https://lodash.com), the method is called [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).



## Summary

Objects are associative arrays with several special features.

They store properties (key-value pairs), where:
- Property keys must be strings or symbols (usually strings).
- Values can be of any type.

To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow to take the key from a variable, like `obj[varWithKey]`.

Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object. All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` or  [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

What we've studied in this chapter is called a "plain object", or just `Object`.

There are many other kinds of objects in JavaScript:

- `Array` to store ordered data collections,
- `Date` to store the information about the date and time,
- `Error` to store the information about an error.
- ...And so on.

They have their special features that we'll study later. Sometimes people say something like "Array type" or "Date type", but formally they are not types of their own, but belong to a single "object" data type. And they extend it in various ways.

Objects in JavaScript are very powerful. Here we've just scratched the surface of a topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.
