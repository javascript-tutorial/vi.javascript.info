# Nhiệm vụ phá hủy

Hai cấu trúc dữ liệu được sử dụng nhiều nhất trong JavaScript là `Object` và `Array`.

- Các đối tượng cho phép chúng ta tạo một thực thể duy nhất lưu trữ các mục dữ liệu theo khóa.
- Mảng cho phép chúng ta tập hợp các mục dữ liệu thành một danh sách có thứ tự.

Mặc dù, khi chúng ta chuyển chúng cho một hàm, nó có thể không cần toàn bộ đối tượng/array. Nó có thể cần các mảnh riêng lẻ.

*Phân công hủy cấu trúc* là một cú pháp đặc biệt cho phép chúng ta "giải nén" các array hoặc đối tượng thành một loạt các biến, vì đôi khi điều đó thuận tiện hơn.

Việc hủy cấu trúc cũng hoạt động hiệu quả với các hàm phức tạp có nhiều tham số, giá trị mặc định, v.v. Chúng ta sẽ sớm thấy điều đó.

## Phá hủy array

Đây là một ví dụ về cách một array bị hủy cấu trúc thành các biến:

```js
// chúng ta có một array với tên và họ
let arr = ["John", "Smith"]

*!*
// nhiệm vụ phá hủy
// đặt firstName = arr[0]
// và surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Bây giờ chúng ta có thể làm việc với các biến thay vì các phần tử của array.

Nó trông tuyệt vời khi được kết hợp với `split` hoặc các phương thức trả về array khác:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

Như bạn có thể thấy, cú pháp rất đơn giản. Có một số chi tiết đặc biệt mặc dù. Hãy xem thêm các ví dụ, để hiểu rõ hơn về nó.

````smart header="\"Phá hủy\" does not mean \"phá hoại\"."
Nó được gọi là "phân công phá hủy" bởi vì nó "phá hủy" bằng cách sao chép các mục vào các biến. Nhưng bản thân array không được sửa đổi.

Nó chỉ là một cách ngắn hơn để viết:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Bỏ qua các phần tử bằng dấu phẩy"
Các phần tử không mong muốn của array cũng có thể bị loại bỏ thông qua dấu phẩy thêm:

```js run
*!*
// phần tử thứ hai là không cần thiết
let [firstName, , title] = ["Julius", "Caesar", "Lãnh đạo", "của Cộng hòa La Mã"];
*/!*

alert( title ); // Consul
```

Trong đoạn mã trên, phần tử thứ hai của array bị bỏ qua, phần tử thứ ba được gán cho `title` và phần còn lại của các mục array cũng bị bỏ qua (vì không có biến nào cho chúng).
````

````smart header="Hoạt động với bất kỳ iterable nào ở phía bên phải"

...Trên thực tế, chúng ta có thể sử dụng nó với bất kỳ iterable nào, không chỉ array:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
Nó hoạt động, bởi vì bên trong một nhiệm vụ phá hủy hoạt động bằng cách lặp lại giá trị phù hợp. Đó là loại đường cú pháp để gọi `for..of` trên giá trị ở bên phải của `=` và gán các giá trị.
````


````smart header="Gán cho bất cứ thứ gì ở phía bên trái"
Chúng ta có thể sử dụng bất kỳ "vật chuyển nhượng" nào ở phía bên trái.

Chẳng hạn, một thuộc tính đối tượng:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

````smart header="Vòng lặp với .entries()"
Trong chương trước, chúng ta đã thấy phương thức [Object.entries(obj)](mdn:js/Object/entries).

Chúng ta có thể sử dụng nó với tính năng hủy để lặp lại các khóa và giá trị của một đối tượng:

```js run
let user = {
  name: "John",
  age: 30
};

// lặp lại khóa-và-giá trị
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // tên: John, sau đó tuổi: 30
}
```

Mã tương tự cho `Map` đơn giản hơn vì nó có thể lặp lại:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````

````smart header="Swap variables trick"
There's a well-known trick for swapping values of two variables using a destructuring assignment:

```js run
let guest = "Jane";
let admin = "Pete";

// Let's swap the values: make guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

Here we create a temporary array of two variables and immediately destructure it in swapped order.

We can swap more than two variables this way.
````

### The rest '...'

Usually, if the array is longer than the list at the left, the "extra" items are omitted.

For example, here only two items are taken, and the rest is just ignored:

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Further items aren't assigned anywhere
```

If we'd like also to gather all that follows -- we can add one more parameter that gets "the rest" using three dots `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
// rest is array of items, starting from the 3rd one
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

The value of `rest` is the array of the remaining array elements. 

We can use any other variable name in place of `rest`, just make sure it has three dots before it and goes last in the destructuring assignment.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```

### Default values

If the array is shorter than the list of variables at the left, there'll be no errors. Absent values are considered undefined:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

If we want a "default" value to replace the missing one, we can provide it using `=`:

```js run
*!*
// default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
```

Default values can be more complex expressions or even function calls. They are evaluated only if the value is not provided.

For instance, here we use the `prompt` function for two defaults:

```js run
// runs only prompt for surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
```

Please note: the `prompt` will run only for the missing value (`surname`).

## Object destructuring

The destructuring assignment also works with objects.

The basic syntax is:

```js
let {var1, var2} = {var1:…, var2:…}
```

We should have an existing object at the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.

For instance:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables. 

The order does not matter. This works too:

```js
// changed the order in let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

The pattern on the left side may be more complex and specify the mapping between properties and variables.

If we want to assign a property to a variable with another name, for instance, make `options.width` go into the variable named `w`, then we can set the variable name using a colon:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

The colon shows "what : goes where". In the example above the property `width` goes to `w`, property `height` goes to `h`, and `title` is assigned to the same name.

For potentially missing properties we can set default values using `"="`, like this:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Just like with arrays or function parameters, default values can be any expressions or even function calls. They will be evaluated if the value is not provided.

In the code below `prompt` asks for `width`, but not for `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (whatever the result of prompt is)
```

We also can combine both the colon and equality:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

If we have a complex object with many properties, we can extract only what we need:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// only extract title as a variable
let { title } = options;

alert(title); // Menu
```

### The rest pattern "..."

What if the object has more properties than we have variables? Can we take some and then assign the "rest" somewhere?

We can use the rest pattern, just like we did with arrays. It's not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.

It looks like this:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Gotcha if there's no `let`"
In the examples above variables were declared right in the assignment: `let {…} = {…}`. Of course, we could use existing variables too, without `let`. But there's a catch.

This won't work:
```js run
let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

The problem is that JavaScript treats `{...}` in the main code flow (not inside another expression) as a code block. Such code blocks can be used to group statements, like this:

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert( message );
}
```

So here JavaScript assumes that we have a code block, that's why there's an error. We want destructuring instead.

To show JavaScript that it's not a code block, we can wrap the expression in parentheses `(...)`:

```js run
let title, width, height;

// okay now
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Nested destructuring

If an object or an array contain other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern at the left side of the assignment has the same structure to extract values from them:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true   
};

// destructuring assignment split in multiple lines for clarity
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

All properties of `options` object except `extra` that is absent in the left part, are assigned to corresponding variables:

![](destructuring-complex.svg)

Finally, we have `width`, `height`, `item1`, `item2` and `title` from the default value.

Note that there are no variables for `size` and `items`, as we take their content instead.

## Smart function parameters

There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.

Here's a bad way to write such function:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

In real-life, the problem is how to remember the order of arguments. Usually IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.

Like this?

```js
// undefined where default values are fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

That's ugly. And becomes unreadable when we deal with more parameters.

Destructuring comes to the rescue!

We can pass parameters as an object, and the function immediately destructurizes them into variables:

```js run
// we pass object to function
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...and it immediately expands it to variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – taken from options,
  // width, height – defaults used
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

We can also use more complex destructuring with nested objects and colon mappings:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

The full syntax is the same as for a destructuring assignment:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

Then, for an object of parameters, there will be a variable `varName` for property `incomingProperty`, with `defaultValue` by default.

Please note that such destructuring assumes that `showMenu()` does have an argument. If we want all values by default, then we should specify an empty object:

```js
showMenu({}); // ok, all values are default

showMenu(); // this would give an error
```

We can fix this by making `{}` the default value for the whole object of parameters:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

In the code above, the whole arguments object is `{}` by default, so there's always something to destructurize.

## Summary

- Destructuring assignment allows for instantly mapping an object or array onto many variables.
- The full object syntax:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    This means that property `prop` should go into the variable `varName` and, if no such property exists, then the `default` value should be used.

    Object properties that have no mapping are copied to the `rest` object.

- The full array syntax:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    The first item goes to `item1`; the second goes into `item2`, all the rest makes the array `rest`.

- It's possible to extract data from nested arrays/objects, for that the left side must have the same structure as the right one.
