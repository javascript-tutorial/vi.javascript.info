
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


## Property value shorthand

In real code we often use existing variables as values for property names.

For instance:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

In the example above, properties have the same names as variables. The use-case of making a property from a variable is so common, that there's a special *property value shorthand* to make it shorter.

Instead of `name:name` we can just write `name`, like this:

```js
function makeUser(name, age) {
*!*
  return {
    name, // same as name: name
    age   // same as age: age
    // ...
  };
*/!*
}
```

We can use both normal properties and shorthands in the same object:

```js
let user = {
  name,  // same as name:name
  age: 30
};
```

## Existence check

A notable objects feature is that it's possible to access any property. There will be no error if the property doesn't exist! Accessing a non-existing property just returns `undefined`. It provides a very common way to test whether the property exists -- to get it and compare vs undefined:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"
```

There also exists a special operator `"in"` to check for the existence of a property.

The syntax is:
```js
"key" in object
```

For instance:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
```

Please note that on the left side of `in` there must be a *property name*. That's usually a quoted string.

If we omit quotes, that would mean a variable containing the actual name will be tested. For instance:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, takes the name from key and checks for such property
```

````smart header="Using \"in\" for properties that store `undefined`"
Usually, the strict comparison `"=== undefined"` check the property existance just fine. But there's a special case when it fails, but `"in"` works correctly.

It's when an object property exists, but stores `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // it's undefined, so - no such property?

alert( "test" in obj ); // true, the property does exist!
```


In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` is usually not assigned. We mostly use `null` for "unknown" or "empty" values. So the `in` operator is an exotic guest in the code.
````

## The "for..in" loop

To walk over all keys of an object, there exists a special form of the loop: `for..in`. This is a completely different thing from the `for(;;)` construct that we studied before.

The syntax:

```js
for (key in object) {
  // executes the body for each key among object properties
}
```

For instance, let's output all properties of `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}
```

Note that all "for" constructs allow us to declare the looping variable inside the loop, like `let key` here.

Also, we could use another variable name here instead of `key`. For instance, `"for (let prop in obj)"` is also widely used.


### Ordered like an object

Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?

The short answer is: "ordered in a special fashion": integer properties are sorted, others appear in creation order. The details follow.

As an example, let's consider an object with the phone codes:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

The object may be used to suggest a list of options to the user. If we're making a site mainly for German audience then we probably want `49` to be the first.

But if we run the code, we see a totally different picture:

- USA (1) goes first
- then Switzerland (41) and so on.

The phone codes go in the ascending sorted order, because they are integers. So we see `1, 41, 44, 49`.

````smart header="Integer properties? What's that?"
The "integer property" term here means a string that can be converted to-and-from an integer without a change.

So, "49" is an integer property name, because when it's transformed to an integer number and back, it's still the same. But "+49" and "1.2" are not:

```js run
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
```
````

...On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

*!*
// non-integer properties are listed in the creation order
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

So, to fix the issue with the phone codes, we can "cheat" by making the codes non-integer. Adding a plus `"+"` sign before each code is enough.

Like this:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Now it works as intended.

## Copying by reference

One of the fundamental differences of objects vs primitives is that they are stored and copied "by reference".

Primitive values: strings, numbers, booleans -- are assigned/copied "as a whole value".

For instance:

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

For instance:

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

For instance:

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

The `const` would give an error if we try to set `user` to something else, for instance:

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
