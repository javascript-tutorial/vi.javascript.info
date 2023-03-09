# Tham số còn lại và cú pháp lan ra

Nhiều hàm dựng sẵn trong JavaScript hỗ trợ số lượng đối số tùy ý.

Ví dụ:

- `Math.max(arg1, arg2, ..., argN)` -- trả về giá trị lớn nhất của các đối số.
- `Object.assign(dest, src1, ..., srcN)` -- sao chép các thuộc tính từ `src1..N` vào `dest`.
- ...v.v.

Trong chương này chúng ta sẽ học cách làm điều tương tự. Và cách truyền array cho các hàm như tham số.

## Thông số còn lại `...`

Một hàm có thể được gọi với bất kỳ số lượng đối số nào, bất kể nó được định nghĩa như thế nào.

Như ở đây:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

Sẽ không có lỗi vì "thừa" đối số. Nhưng tất nhiên trong kết quả chỉ có hai cái đầu tiên sẽ được tính.

Phần còn lại của các tham số có thể được bao gồm trong định nghĩa hàm bằng cách sử dụng ba dấu chấm `...` theo sau là tên của array sẽ chứa chúng. Các dấu chấm có nghĩa đen là "tập hợp các tham số còn lại thành một mảng".

Chẳng hạn, để tập hợp tất cả các đối số vào array `args`:

```js run
function sumAll(...args) { // args là tên của array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Chúng ta có thể chọn lấy các tham số đầu tiên làm biến và chỉ thu thập phần còn lại.

Ở đây, hai đối số đầu tiên đi vào các biến và phần còn lại đi vào array `titles`:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // phần còn lại đi vào mảng tiêu đề
  // tức là titles = ["Lãnh đạo", "Đế chế"]
  alert( titles[0] ); // Lãnh đạo
  alert( titles[1] ); // Đế chế
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Lãnh đạo", "Đế chế");
```

````warn header="Các tham số còn lại phải ở cuối"
Các tham số còn lại tập hợp tất cả các đối số còn lại, vì vậy những điều sau đây không có ý nghĩa và gây ra lỗi:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // lỗi
}
```

`...rest` phải luôn ở cuối cùng.
````

## Biến "đối số"

Ngoài ra còn có một đối tượng dạng array đặc biệt có tên `arguments` chứa tất cả các đối số theo chỉ mục của chúng.

Ví dụ:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // nó có thể lặp lại
  // for(let arg of arguments) alert(arg);
}

// cho thấy: 2, Julius, Caesar
showName("Julius", "Caesar");

// hiển thị: 1, Ilya, undefined (không có đối số thứ hai)
showName("Ilya");
```

Trước đây, các tham số còn lại không tồn tại trong ngôn ngữ và sử dụng `arguments` là cách duy nhất để lấy tất cả các đối số của hàm. Và nó vẫn hoạt động, chúng ta có thể tìm thấy nó trong mã cũ.

Nhưng nhược điểm là mặc dù `arguments` vừa có dạng array vừa có thể lặp lại, nhưng nó không phải là array. Nó không hỗ trợ các phương thức array, vì vậy chúng ta không thể gọi `arguments.map(...)` chẳng hạn.

Ngoài ra, nó luôn chứa tất cả các đối số. Chúng ta không thể chụp chúng một phần, giống như chúng ta đã làm với các tham số còn lại.

Vì vậy, khi chúng ta cần các tính năng này, thì các tham số còn lại được ưu tiên.

````smart header="Arrow functions không có `\"arguments\"`"
Nếu chúng ta truy cập đối tượng `đối số` từ một arrow function, thì nó sẽ lấy chúng từ hàm "bình thường" bên ngoài.

Đây là 1 ví dụ:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Như chúng ta đã nhớ, arrow function không có `this` của riêng chúng. Bây giờ chúng ta biết rằng chúng cũng không có đối tượng `arguments` đặc biệt.
````


## Cú pháp lan rộng [#spread-syntax]

Chúng ta vừa xem cách lấy một array từ danh sách các tham số.

Nhưng đôi khi chúng ta cần làm ngược lại.

Chẳng hạn, có một hàm tích hợp [Math.max](mdn:js/Math/max) trả về số lớn nhất từ một danh sách:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Bây giờ, giả sử chúng ta có một array `[3, 5, 1]`. Làm thế nào để chúng ta gọi `Math.max` với nó?

Chuyển nó "nguyên trạng" sẽ không hoạt động, bởi vì `Math.max` mong đợi một danh sách các đối số, không phải một array đơn lẻ:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Và chắc chắn chúng ta không thể liệt kê thủ công các mục trong mã `Math.max(arr[0], arr[1], arr[2])`, bởi vì chúng ta có thể không chắc có bao nhiêu mục. Khi tập lệnh của chúng ta thực thi, có thể có rất nhiều hoặc không có gì. Và điều đó sẽ trở nên xấu xí.

*Cú pháp lan rộng* tới để giải cứu! Nó trông tương tự như các tham số còn lại, cũng sử dụng `...`, nhưng hoàn toàn ngược lại.

Khi `...arr` được sử dụng trong lệnh gọi hàm, nó sẽ "mở rộng" một đối tượng có thể lặp lại `arr` vào danh sách các đối số.

Đối với `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (lan rộng biến array thành một danh sách các đối số)
```

Chúng ta cũng có thể vượt qua nhiều iterable theo cách này:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

Chúng ta thậm chí có thể kết hợp cú pháp lan rộng với các giá trị bình thường:


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Ngoài ra, cú pháp lan rộng có thể được sử dụng để hợp nhất các array:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, sau đó arr, sau đó 2, sau đó arr2)
```

Trong các ví dụ trên, chúng ta đã sử dụng một array để minh họa cú pháp lan rộng, nhưng bất kỳ iterable nào cũng được.

Chẳng hạn, ở đây chúng ta sử dụng cú pháp lan rộng để biến chuỗi thành array ký tự:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

Cú pháp lan rộng bên trong sử dụng các trình lặp để thu thập các phần tử, giống như cách thực hiện của `for..of`.

Vì vậy, đối với một chuỗi, `for..of` trả về các ký tự và `...str` trở thành `"H","e","l","l","o"`. Danh sách các ký tự được chuyển đến bộ khởi tạo array `[...str]`.

Đối với tác vụ cụ thể này, chúng ta cũng có thể sử dụng `Array.from`, bởi vì nó chuyển đổi một iterable (như một chuỗi) thành một array:

```js run
let str = "Hello";

// Array.from chuyển đổi một iterable thành một array
alert( Array.from(str) ); // H,e,l,l,o
```

Kết quả giống như `[...str]`.

Nhưng có một sự khác biệt nhỏ giữa `Array.from(obj)` và `[...obj]`:

- `Array.from` hoạt động trên cả dạng array và iterable.
- Cú pháp trải rộng chỉ hoạt động với các iterable.

Vì vậy, đối với nhiệm vụ biến một thứ gì đó thành một array, `Array.from` có xu hướng phổ biến hơn.


## Sao chép một mảng/đối tượng

Bạn có nhớ khi chúng ta nói về `Object.assign()` [trong quá khứ](info:object-copy#cloning-and-merging-object-assign) không?

Có thể làm điều tương tự với cú pháp lan rộng.

```js run
let arr = [1, 2, 3];

*!*
let arrCopy = [...arr]; // trải array thành một danh sách các tham số
                        // sau đó đặt kết quả vào một array mới
*/!*

// các array có cùng nội dung không?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// các array có bằng nhau không?
alert(arr === arrCopy); // false (không cùng tham chiếu)

// sửa đổi array ban đầu của chúng ta không sửa đổi bản sao:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Lưu ý rằng có thể làm điều tương tự để tạo một bản sao của đối tượng:

```js run
let obj = { a: 1, b: 2, c: 3 };

*!*
let objCopy = { ...obj }; // trải đối tượng vào một danh sách các tham số
                          // sau đó trả về kết quả trong một đối tượng mới
*/!*

// các đối tượng có cùng nội dung không?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// các đối tượng có bằng nhau không?
alert(obj === objCopy); // false (không cùng tham chiếu)

// sửa đổi đối tượng ban đầu của chúng ta không sửa đổi bản sao:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

Cách sao chép một đối tượng này ngắn hơn nhiều so với `let objCopy = Object.assign({}, obj)` hoặc cho một array `let arrCopy = Object.assign([], arr)` vì vậy chúng ta thích sử dụng nó bất cứ khi nào chúng ta có thể.


## Tóm tắt

Khi chúng ta thấy `"..."` trong mã, đó là tham số còn lại hoặc cú pháp lan rộng.

Có một cách dễ dàng để phân biệt giữa chúng:

- Khi `...` ở cuối các tham số hàm, nó là "tham số còn lại" và tập hợp phần còn lại của danh sách các đối số vào một array.
- Khi `...` xuất hiện trong một lệnh gọi hàm hoặc tương tự, nó được gọi là "cú pháp lan rộng" và mở rộng một array thành một danh sách.

Sử dụng các mẫu:

- Các tham số còn lại được sử dụng để tạo các hàm chấp nhận bất kỳ số lượng đối số nào.
- Cú pháp lan rộng được sử dụng để truyền một array cho các hàm thường yêu cầu một danh sách nhiều đối số.

Chúng cùng nhau giúp di chuyển giữa một danh sách và một array các tham số một cách dễ dàng.

Tất cả các đối số của một lệnh gọi hàm cũng có sẵn trong `arguments`: đối tượng dạng mảng có thể lặp lại.
