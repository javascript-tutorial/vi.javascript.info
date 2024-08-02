
# Map và Set

Cho đến bây giờ, chúng ta đã học về các cấu trúc dữ liệu phức tạp sau:

- Các đối tượng được sử dụng để lưu trữ các bộ sưu tập có khóa.
- Array được dùng để lưu trữ các tập hợp có thứ tự.

Nhưng điều đó là không đủ cho cuộc sống thực. Đó là lý do tại sao `Map` và `Set` cũng tồn tại.

## Map

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) là tập hợp các mục dữ liệu có khóa, giống như một `Đối tượng`. Nhưng điểm khác biệt chính là `Map` cho phép các loại khóa bất kỳ.

Các phương thức và thuộc tính là:

- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- tạo map.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- lưu trữ value theo key.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- trả về value theo key, `undefined` nếu `key` không tồn tại trong map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- trả về `true` nếu `key` tồn tại, `false` nếu không.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- xóa phần tử (cặp khóa/giá trị) theo khóa.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- xóa mọi thứ khỏi map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- trả về số lượng phần tử hiện tại.

Ví dụ:

```js run
let map = new Map();

map.set('1', 'str1');   // một khóa chuỗi
map.set(1, 'num1');     // một khóa số
map.set(true, 'bool1'); // một khóa boolean

// nhớ Đối tượng thông thường không? nó sẽ chuyển đổi các khóa thành chuỗi
// Map giữ nguyên kiểu, vì vậy hai cái này khác nhau:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Như chúng ta có thể thấy, không giống như các đối tượng, các khóa không được chuyển thành chuỗi. Bất kỳ loại khóa nào đều có thể tồn tại.

```smart header="`map[key]` không phải là cách đúng đắn để sử dụng `Map`"
Mặc dù `map[key]` cũng hoạt động, ví dụ: chúng ta có thể đặt `map[key] = 2`, điều này đang coi `map` là một đối tượng JavaScript đơn giản, do đó, nó bao hàm tất cả các giới hạn tương ứng (chỉ các khóa chuỗi/ký hiệu, v.v.).

Vì vậy, chúng ta nên sử dụng các phương thức `map`: `set`, `get`, v.v.
```

**Map cũng có thể sử dụng các đối tượng làm khóa.**

Ví dụ:

```js run
let john = { name: "John" };

// đối với mọi người dùng, hãy lưu trữ số lượt truy cập của họ
let visitsCountMap = new Map();

// john là khóa cho map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Sử dụng các đối tượng làm khóa là một trong những tính năng `Map` đáng chú ý và quan trọng nhất. Điều tương tự không được tính cho `Đối tượng`. Chuỗi làm khóa trong `Đối tượng` thì được, nhưng chúng ta không thể sử dụng `Đối tượng` khác làm khóa trong `Đối tượng`.

Hãy thử:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // cố gắng sử dụng một đối tượng

visitsCountObj[ben] = 234; // cố gắng sử dụng đối tượng ben làm khóa
visitsCountObj[john] = 123; // cố gắng sử dụng đối tượng john làm khóa, đối tượng ben sẽ được thay thế

*!*
// Đó là những gì đã được viết!
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```

Vì `visitsCountObj` là một đối tượng nên nó chuyển đổi tất cả các khóa `Object`, chẳng hạn như `john` và `ben` ở trên, thành cùng một chuỗi `"[object Object]"`. Chắc chắn không phải những gì chúng ta muốn.

```smart header="Cách `Map` so sánh các khóa"
Để kiểm tra tính tương đương của các khóa, `Map` sử dụng thuật toán [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Nó gần giống với đẳng thức nghiêm ngặt `===`, nhưng điểm khác biệt là `NaN` được coi là bằng `NaN`. Vì vậy, `NaN` cũng có thể được sử dụng làm khóa.

Thuật toán này không thể thay đổi hoặc tùy chỉnh.
```

````smart header="Xâu chuỗi"
Mỗi lệnh gọi `map.set` đều trả về chính map, vì vậy chúng ta có thể "xâu chuỗi" các lệnh gọi:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


## Lặp lại qua Map

Để lặp qua `map`, có 3 phương thức:

- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- trả về một iterable cho các khóa,
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- trả về một iterable cho các giá trị,
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- trả về một iterable cho các mục nhập `[key, value]`, nó được sử dụng theo mặc định trong `for..of`.

Ví dụ:

```js run
let recipeMap = new Map([
  ['dưa leo', 500],
  ['cà chua', 350],
  ['hành',    50]
]);

// lặp lại các khóa (rau)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // dưa leo,cà chua,hành
}

// lặp lại các giá trị (số lượng)
for (let amount of recipeMap.values()) {
  alert(amount); // 500,350,50
}

// lặp lại các mục [key, value]
for (let entry of recipeMap) { // giống như của RecipeMap.entries()
  alert(entry); // dưa leo,500 (v.v)
}
```

```smart header="Thứ tự chèn được sử dụng"
Việc lặp đi lặp lại theo thứ tự như các giá trị đã được chèn vào. `Map` duy trì thứ tự này, không giống như `Đối tượng` thông thường.
```

Bên cạnh đó, `Map` có phương thức `forEach` tích hợp, tương tự như `Array`:

```js
// chạy hàm cho từng cặp (key, value)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // dưa leo: 500 v.v
});
```

## Object.entries: Map từ Đối tượng

Khi một `Map` được tạo, chúng ta có thể truyền một array (hoặc một iterable) với các cặp khóa/giá trị để khởi tạo, như sau:

```js run
// array của các cặp [key, value]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Nếu chúng ta có một đối tượng đơn giản và chúng ta muốn tạo một `Map` từ nó, thì chúng ta có thể sử dụng phương thức tích hợp [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) trả về một array của các cặp khóa/giá trị cho một đối tượng chính xác ở định dạng đó.

Vì vậy, chúng ta có thể tạo map từ một đối tượng như thế này:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Ở đây, `Object.entries` trả về array các cặp khóa/giá trị: `[ ["name","John"], ["age", 30] ]`. Đó là những gì `Map` cần.


## Object.fromEntries: Đối tượng từ Map

Chúng ta vừa xem cách tạo `Map` từ một đối tượng đơn giản với `Object.entries(obj)`.

Có một phương thức `Object.fromEntries` thực hiện ngược lại: được cung cấp một array gồm các cặp `[key, value]`, nó tạo ra một đối tượng từ chúng:

```js run
let prices = Object.fromEntries([
  ['chuối', 1],
  ['cam', 2],
  ['thịt', 4]
]);

// bây giờ prices = {chuối: 1, cam: 2, thịt: 4}

alert(prices.orange); // 2
```

Chúng ta có thể sử dụng `Object.fromEntries` để lấy một đối tượng đơn giản từ `Map`.

Ví dụ. chúng ta lưu trữ dữ liệu trong `Map`, nhưng chúng ta cần chuyển dữ liệu đó tới mã của bên thứ 3 mong đợi một đối tượng đơn giản.

Bắt đầu nhé:

```js run
let map = new Map();
map.set('chuối', 1);
map.set('cam', 2);
map.set('thịt', 4);

*!*
let obj = Object.fromEntries(map.entries()); // tạo một đối tượng đơn giản (*)
*/!*

// xong!
// obj = { chuối: 1, cam: 2, thịt: 4 }

alert(obj.orange); // 2
```

Lệnh gọi `map.entries()` trả về một iterable của cặp khóa/giá trị, chính xác ở định dạng phù hợp cho `Object.fromEntries`.

Chúng ta cũng có thể làm cho dòng `(*)` ngắn hơn:
```js
let obj = Object.fromEntries(map); // omit .entries()
```

Điều đó cũng tương tự, bởi vì `Object.fromEntries` mong đợi một đối tượng iterable làm đối số. Không nhất thiết phải là một array. Và phép lặp tiêu chuẩn cho `map` trả về các cặp khóa/giá trị giống như `map.entries()`. Vì vậy, chúng ta nhận được một đối tượng đơn giản có cùng khóa/giá trị với `map`.

## Set

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) là một bộ sưu tập loại đặc biệt - "bộ giá trị" (không có khóa), trong đó mỗi giá trị chỉ có thể xuất hiện một lần.

Các phương pháp chính của nó là:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- tạo tập hợp và nếu một đối tượng `iterable` được cung cấp (thường là một array), sao chép các giá trị từ đối tượng đó vào tập hợp.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- thêm một giá trị, trả về chính tập hợp đó.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- xóa giá trị, trả về `true` nếu `value` tồn tại tại thời điểm gọi, nếu không thì `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- trả về `true` nếu giá trị tồn tại trong tập hợp, nếu không thì `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- xóa mọi thứ khỏi tập hợp.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- là số lượng phần tử.

Đặc điểm chính là các lệnh gọi lặp lại `set.add(value)` với cùng một giá trị không làm được gì cả. Đó là lý do tại sao mỗi giá trị chỉ xuất hiện trong `Set` một lần.

Ví dụ: chúng ta có khách đến thăm và chúng ta muốn ghi nhớ tất cả mọi người. Nhưng các lượt truy cập lặp lại không nên dẫn đến trùng lặp. Một khách truy cập chỉ được "đếm" một lần.

`Set` chỉ là thứ phù hợp cho việc đó:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// lượt truy cập, một số người dùng đến nhiều lần
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set chỉ giữ các giá trị duy nhất
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (sau đó Pete và Mary)
}
```

Lựa chọn thay thế cho `Set` có thể là một array người dùng và mã để kiểm tra các trùng lặp trên mỗi lần chèn bằng cách sử dụng [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Nhưng hiệu năng sẽ tệ hơn nhiều, bởi vì phương thức này duyệt qua toàn bộ array để kiểm tra mọi phần tử. `Set` được tối ưu hóa bên trong tốt hơn nhiều để kiểm tra tính duy nhất.

## Lặp lại qua Set

Chúng ta có thể lặp qua một set bằng `for..of` hoặc sử dụng `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// tương tự với forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Lưu ý điều buồn cười này. Hàm gọi lại được truyền trong `forEach` có 3 đối số: `value`, sau đó là *giá trị giống nhau* `valueAgain`, sau đó là đối tượng đích. Thật vậy, cùng một giá trị xuất hiện trong các đối số hai lần.

Đó là để tương thích với `Map` trong đó cuộc gọi lại được thông qua `forEach` có ba đối số. Trông hơi lạ, chắc chắn. Nhưng điều này có thể giúp thay thế `Map` bằng `Set` trong một số trường hợp một cách dễ dàng và ngược lại.

Các phương thức tương tự mà `Map` dành cho các iterator cũng được hỗ trợ:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- trả về một đối tượng có thể lặp lại cho các giá trị,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- giống như `set.keys()`, để tương thích với `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- trả về một đối tượng có thể lặp lại cho các mục nhập `[giá trị, giá trị]`, tồn tại để tương thích với `Map`.

## Tóm tắt

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- là tập hợp các giá trị được khóa.

Các phương thức và thuộc tính:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- tạo map, với `iterable` (ví dụ: array) tùy chọn của các cặp `[key,value]` để khởi tạo.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- lưu trữ value theo key, trả về chính map.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- trả về giá trị theo khóa, `undefined` nếu `key` không tồn tại trong map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- trả về `true` nếu `key` tồn tại, `false` nếu không.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- xóa phần tử theo key, trả về `true` nếu `key` tồn tại tại thời điểm gọi, nếu không thì `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- xóa mọi thứ khỏi map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- trả về số phần tử hiện tại.

Sự khác biệt so với `Đối tượng` thông thường:

- Bất kỳ khóa, đối tượng nào cũng có thể là key.
- Các phương thức tiện lợi bổ sung, thuộc tính `size`.

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- là tập hợp các giá trị duy nhất.

Các phương thức và thuộc tính:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- tạo set, với `iterable` tùy chọn (ví dụ: array) các giá trị để khởi tạo.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- thêm một value (không làm gì nếu `value` tồn tại), trả về chính set đó.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- xóa value, trả về `true` nếu `value` tồn tại tại thời điểm gọi, nếu không thì `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- trả về `true` nếu value tồn tại trong set, nếu không thì `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- xóa mọi thứ khỏi set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- là số lượng phần tử.

Việc lặp lại `Map` và `Set` luôn theo thứ tự chèn, vì vậy chúng ta không thể nói rằng các bộ sưu tập này không có thứ tự, nhưng chúng ta không thể sắp xếp lại các phần tử hoặc lấy trực tiếp một phần tử theo số của nó.
