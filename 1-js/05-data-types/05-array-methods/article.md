# Phương thức array

Array cung cấp rất nhiều phương thức. Để làm cho mọi thứ dễ dàng hơn, trong chương này chúng được chia thành các nhóm.

## Thêm/xóa item

Chúng ta đã biết các phương thức thêm và xóa các item từ đầu hoặc cuối:

- `arr.push(...items)` -- thêm các item vào cuối,
- `arr.pop()` -- trích xuất một item từ cuối,
- `arr.shift()` -- trích xuất một item từ đầu,
- `arr.unshift(...items)` -- thêm các item vào đầu.

Dưới đây là một số khác.

### splice

Làm cách nào để xóa một phần tử khỏi array?

Các array là các đối tượng, vì vậy chúng ta có thể thử sử dụng `delete`:

```js run
let arr = ["Tôi", "về", "nhà"];

delete arr[1]; // loại bỏ "về"

alert( arr[1] ); // undefined

// bây giờ arr = ["Tôi",,"nhà"];
alert( arr.length ); // 3
```

Phần tử đã bị xóa, nhưng array vẫn còn 3 phần tử, chúng ta có thể thấy rằng `arr.length == 3`.

Điều đó là bình thường, bởi vì `delete obj.key` sẽ xóa một giá trị bằng `key`. Đó là tất cả những gì nó làm. Phạt đối với các đối tượng. Nhưng đối với array, chúng ta thường muốn các phần tử còn lại dịch chuyển và chiếm vị trí được giải phóng. Chúng ta hy vọng sẽ có một array ngắn hơn bây giờ.

Vì vậy, các phương thức đặc biệt nên được sử dụng.

Phương thức [arr.splice](mdn:js/Array/splice) là một con dao quân đội Thụy Sĩ dành cho array. Nó có thể làm mọi thứ: chèn, xóa và thay thế các phần tử.

Cú pháp là:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

Nó sửa đổi `arr` bắt đầu từ chỉ mục `start`: loại bỏ các phần tử `deleteCount` và sau đó chèn `elem1, ..., elemN` vào vị trí của chúng. Trả về array các phần tử đã loại bỏ.

Phương pháp này rất dễ nắm bắt bằng các ví dụ.

Hãy bắt đầu với việc xóa:

```js run
let arr = ["Tôi", "học", "JavaScript"];

*!*
arr.splice(1, 1); // từ chỉ mục 1 loại bỏ 1 phần tử
*/!*

alert( arr ); // ["Tôi","JavaScript"]
```

Dễ, phải không? Bắt đầu từ chỉ mục `1` nó đã loại bỏ phần tử `1`.

Trong ví dụ tiếp theo, chúng ta loại bỏ 3 phần tử và thay thế chúng bằng hai phần tử còn lại:

```js run
let arr = [*!*"Tôi", "đang học", "JavaScript",*/!* "ngay", "bây giờ"];

// xóa 3 phần tử đầu tiên và thay thế chúng bằng phần tử khác
arr.splice(0, 3, "Hãy", "nhảy");

alert( arr ) // now [*!*"Hãy", "nhảy"*/!*, "ngay", "bây giờ"]
```

Ở đây chúng ta có thể thấy rằng `splice` trả về array các phần tử đã loại bỏ:

```js run
let arr = [*!*"Tôi", "đang học",*/!* "JavaScript", "ngay", "bây giờ"];

// loại bỏ 2 phần tử đầu tiên
let removed = arr.splice(0, 2);

alert( removed ); // "Tôi","học" <-- array của các phần tử bị loại bỏ
```

Phương thức `splice` cũng có thể chèn các phần tử mà không cần xóa. Để làm được điều đó, chúng ta cần đặt `deleteCount` thành `0`:

```js run
let arr = ["Tôi", "học", "JavaScript"];

// từ chỉ mục 2
// xóa 0
// sau đó chèn "ngôn ngữ" và "phức tạp"
arr.splice(2, 0, "ngôn ngữ", "phức tạp");

alert( arr ); // Tôi,học,ngôn ngữ,phức tạp,JavaScript
```

````smart header="Cho phép chỉ mục âm"
Ở đây và trong các phương thức array khác, chỉ mục âm được cho phép. Chúng chỉ định vị trí từ cuối array, như ở đây:

```js run
let arr = [1, 2, 5];

// từ chỉ mục -1 (một bước từ cuối)
// xóa 0 phần tử,
// sau đó chèn 3 và 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

Phương thức [arr.slice](mdn:js/Array/slice) đơn giản hơn nhiều so với `arr.splice` có giao diện tương tự.

Cú pháp là:

```js
arr.slice([start], [end])
```

Nó trả về một array mới và sao chép vào nó tất cả các mục từ chỉ mục `start` đến `end` (không bao gồm `end`). Cả `start` và `end` đều có thể âm, trong trường hợp đó, vị trí từ cuối array được giả định.

Nó tương tự như một phương thức chuỗi `str.slice`, nhưng thay vì các chuỗi con, nó tạo ra các array con.

Ví dụ:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (sao chép từ 1 đến 3)

alert( arr.slice(-2) ); // s,t (sao chép từ -2 đến hết)
```

Chúng ta cũng có thể gọi nó mà không cần đối số: `arr.slice()` tạo một bản sao của `arr`. Điều đó thường được sử dụng để lấy một bản sao cho các phép biến đổi tiếp theo không ảnh hưởng đến array ban đầu.

### concat

Phương thức [arr.concat](mdn:js/Array/concat) tạo một array mới bao gồm các giá trị từ các array khác và các mục bổ sung.

Cú pháp là:

```js
arr.concat(arg1, arg2...)
```

Nó chấp nhận bất kỳ số lượng đối số nào -- aray hoặc giá trị.

Kết quả là một array mới chứa các mục từ `arr`, sau đó là `arg1`, `arg2`, v.v.

Nếu một đối số `argN` là một array, thì tất cả các phần tử của nó sẽ được sao chép. Nếu không, chính đối số sẽ được sao chép.

Ví dụ:

```js run
let arr = [1, 2];

// tạo một array từ: arr và [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// tạo một array từ: arr và [3,4] và [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// tạo một array từ: arr và [3,4], sau đó thêm các giá trị 5 và 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Thông thường, nó chỉ sao chép các phần tử từ array. Các đối tượng khác, ngay cả khi chúng có dạng array, được thêm vào như một tổng thể:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "thứ gì",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

...Nhưng nếu một đối tượng dạng array có thuộc tính `Symbol.isConcatSpreadable` đặc biệt, thì nó được `concat` coi là một array: thay vào đó, các phần tử của nó được thêm vào:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "thứ gì",
  1: "đó",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,thứ gì,đó
```

## Lặp đi lặp lại: forEach

Phương thức [arr.forEach](mdn:js/Array/forEach) cho phép chạy một hàm cho mọi phần tử của array.

Cú pháp:
```js
arr.forEach(function(item, index, array) {
  // ... làm một cái gì đó với item
});
```

Chẳng hạn, thứ này cho thấy từng phần tử của aray:

```js run
// cho mỗi cuộc gọi alert phần tử
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Và đoạn mã này chi tiết hơn về vị trí của chúng trong array mục tiêu:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} đang ở chỉ mục ${index} trong ${array}`);
});
```

Kết quả của hàm (nếu nó trả về bất kỳ) bị loại bỏ và bỏ qua.


## Tìm kiếm trong array

Bây giờ hãy xem các phương thức tìm kiếm trong một array.

### indexOf/lastIndexOf và includes

Các phương thức [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) và [arr.includes](mdn:js/Array/includes) có cùng cú pháp và về cơ bản giống như các đối tác chuỗi của chúng, nhưng hoạt động trên các item thay vì các ký tự:

- `arr.indexOf(item, from)` -- tìm kiếm `item` bắt đầu từ chỉ mục `from` và trả về chỉ mục nơi nó được tìm thấy, nếu không thì `-1`.
- `arr.lastIndexOf(item, from)` -- tương tự, nhưng tìm kiếm từ phải sang trái.
- `arr.includes(item, from)` -- tìm kiếm `item` bắt đầu từ chỉ mục `from`, trả về `true` nếu tìm thấy.

Ví dụ:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Lưu ý rằng các phương thức sử dụng phép so sánh `===`. Vì vậy, nếu chúng ta tìm kiếm `false`, nó sẽ tìm thấy chính xác `false` chứ không phải số 0.

Nếu chúng ta muốn kiểm tra bao hàm và không muốn biết chỉ mục chính xác, thì `arr.includes` sẽ được ưu tiên hơn.

Ngoài ra, một điểm khác biệt rất nhỏ của `includes` là nó xử lý chính xác `NaN`, không giống như `indexOf/lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (phải là 0, nhưng đẳng thức === không hoạt động đối với NaN)
alert( arr.includes(NaN) );// true (chính xác)
```

### find and findIndex

Hãy tưởng tượng chúng ta có một array các đối tượng. Làm thế nào để chúng ta tìm thấy một đối tượng với điều kiện cụ thể?

Ở đây, phương thức [arr.find(fn)](mdn:js/Array/find) rất hữu ích.

Cú pháp là:
```js
let result = arr.find(function(item, index, array) {
  // nếu true được trả về, item được trả lại và quá trình lặp lại bị dừng
  // đối với tập lệnh sai trả về undefined
});
```

Hàm được gọi lần lượt cho các phần tử của array:

- `item` là phần tử.
- `index` là chỉ mục của nó.
- `array` là chính array đó.

Nếu nó trả về `true`, quá trình tìm kiếm được dừng, `item` được trả về. Nếu không tìm thấy gì, `undefined` được trả về.

Ví dụ: chúng ta có một array user, mỗi người có các `id` và `name`. Hãy tìm cái có `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

Trong thực tế, các array đối tượng là một điều phổ biến, vì vậy phương thức `find` rất hữu ích.

Lưu ý rằng trong ví dụ này, chúng ta cung cấp cho `tìm` hàm `item => item.id == 1` với một đối số. Đó là điển hình, các đối số khác của hàm này hiếm khi được sử dụng.

Phương thức [arr.findIndex](mdn:js/Array/findIndex) về cơ bản giống nhau, nhưng nó trả về chỉ mục nơi phần tử được tìm thấy thay vì chính phần tử đó và `-1` được trả về khi không tìm thấy gì.

### filter

Phương thức `find` tìm kiếm một phần tử duy nhất (đầu tiên) làm cho hàm trả về `true`.

Nếu có nhiều, chúng ta có thể sử dụng [arr.filter(fn)](mdn:js/Array/filter).

Cú pháp tương tự như `find`, nhưng `filter` trả về một array gồm tất cả các phần tử phù hợp:

```js
let results = arr.filter(function(item, index, array) {
  // nếu true, item được đẩy đến kết quả và quá trình lặp lại tiếp tục
  // trả về array rỗng nếu không tìm thấy gì
});
```

Ví dụ:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// trả về array của hai người dùng đầu tiên
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Biến đổi một array

Hãy chuyển sang các phương thức biến đổi và sắp xếp lại một array.

### map

Phương thức [arr.map](mdn:js/Array/map) là một trong những phương thức hữu ích nhất và thường được sử dụng.

Nó gọi hàm cho từng phần tử của array và trả về array kết quả.

Cú pháp là:

```js
let result = arr.map(function(item, index, array) {
  // trả về giá trị mới thay vì item
});
```

Chẳng hạn, ở đây chúng ta chuyển đổi từng phần tử thành độ dài của nó:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

Lệnh gọi [arr.sort()](mdn:js/Array/sort) sắp xếp array *tại chỗ*, thay đổi thứ tự phần tử của nó.

Nó cũng trả về array đã sắp xếp, nhưng giá trị được trả về thường bị bỏ qua vì bản thân `arr` đã được sửa đổi.

Ví dụ:

```js run
let arr = [ 1, 2, 15 ];

// phương thức sắp xếp lại nội dung của arr
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Bạn có nhận thấy bất cứ điều gì lạ trong kết quả không?

Thứ tự trở thành `1, 15, 2`. Nó không đúng. Nhưng tại sao?

**Các mục được sắp xếp theo chuỗi theo mặc định.**

Theo nghĩa đen, tất cả các phần tử được chuyển đổi thành chuỗi để so sánh. Đối với chuỗi, thứ tự từ điển được áp dụng và thực sự là `"2" > "15"`.

Để sử dụng thứ tự sắp xếp của riêng mình, chúng ta cần cung cấp một hàm làm đối số của `arr.sort()`.

Hàm sẽ so sánh hai giá trị tùy ý và trả về:
```js
function compare(a, b) {
  if (a > b) return 1;  // nếu giá trị đầu tiên lớn hơn giá trị thứ hai
  if (a == b) return 0; // nếu các giá trị bằng nhau
  if (a < b) return -1; // nếu giá trị đầu tiên nhỏ hơn giá trị thứ hai
}
```

Chẳng hạn, để sắp xếp dưới dạng số:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Bây giờ nó hoạt động như dự tính.

Hãy bước sang một bên và suy nghĩ những gì đang xảy ra. `array` có thể là array của bất kỳ thứ gì, phải không? Nó có thể chứa số hoặc chuỗi hoặc đối tượng hoặc bất cứ thứ gì. Chúng ta có một tập hợp *một số item*. Để sắp xếp nó, chúng ta cần một *hàm sắp xếp thứ tự* biết cách so sánh các phần tử của nó. Mặc định là thứ tự chuỗi.

Phương thức `arr.sort(fn)` triển khai thuật toán sắp xếp chung. Chúng ta không cần quan tâm nó hoạt động bên trong như thế nào ([quicksort](https://vi.wikipedia.org/wiki/Sắp_xếp_nhanh) được tối ưu hóa) hay [Timsort](https://en.wikipedia.org/wiki/Timsort) ) hầu hết thời gian). Nó sẽ duyệt array, so sánh các phần tử của nó bằng cách sử dụng hàm được cung cấp và sắp xếp lại chúng, tất cả những gì chúng ta cần là cung cấp `fn` để so sánh.

Nhân tiện, nếu chúng ta muốn biết phần tử nào được so sánh -- không có gì ngăn cản việc alert chúng:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

Thuật toán có thể so sánh một phần tử với nhiều phần tử khác trong quy trình, nhưng nó cố gắng thực hiện càng ít phép so sánh càng tốt.

````smart header="Hàm so sánh có thể trả về bất kỳ số nào"
Trên thực tế, một hàm so sánh chỉ được yêu cầu trả về một số dương để nói "lớn hơn" và một số âm để nói "ít hơn".

Điều đó cho phép viết các hàm ngắn hơn:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Arrow function để tốt nhất"
Bạn có nhớ [arrow function](info:arrow-functions-basics) không? Chúng ta có thể sử dụng chúng ở đây để sắp xếp gọn gàng hơn:

```js
arr.sort( (a, b) => a - b );
```

Cái này hoạt động chính xác giống như phiên bản dài hơn ở trên.
````

````smart header="Sử dụng `localeCompare` cho các chuỗi"
Nhớ thuật toán so sánh [các chuỗi](info:string#true-comparisons) không? Nó so sánh các chữ cái theo mã của chúng theo mặc định.

Đối với nhiều bảng chữ cái, tốt hơn nên sử dụng phương pháp `str.localeCompare` để sắp xếp chính xác các chữ cái, chẳng hạn như `Ö`.

Ví dụ: hãy sắp xếp một vài quốc gia bằng tiếng Đức:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (sai)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (chính xác!)
```
````

### reverse

Phương thức [arr.reverse](mdn:js/Array/reverse) đảo ngược thứ tự các phần tử trong `arr`.

Ví dụ:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

Nó cũng trả về array `arr` sau khi đảo ngược.

### split and join

Đây là tình huống từ cuộc sống thực. Chúng ta đang viết một ứng dụng nhắn tin và người đó nhập danh sách người nhận được phân tách bằng dấu phẩy: `John, Pete, Mary`. Nhưng đối với chúng ta, một dãy tên sẽ thoải mái hơn nhiều so với một chuỗi. Làm thế nào để có được nó?

Phương thức [str.split(delim)](mdn:js/String/split) thực hiện chính xác điều đó. Nó chia chuỗi thành một array bằng dấu phân cách đã cho `delim`.

Trong ví dụ bên dưới, chúng ta chia tách bằng dấu phẩy theo sau là dấu cách:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `Một tin nhắn đến ${name}.` ); // Một tin nhắn tới Bilbo (và những cái tên khác)
}
```

Phương thức `split` có đối số số thứ hai tùy chọn -- giới hạn về độ dài array. Nếu nó được cung cấp, thì các phần tử bổ sung sẽ bị bỏ qua. Tuy nhiên trong thực tế, nó hiếm khi được sử dụng:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Chia thành các chữ cái"
Lệnh gọi `split(s)` với một `s` trống sẽ chia chuỗi thành một mảng các chữ cái:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

Lệnh gọi [arr.join(glue)](mdn:js/Array/join) thực hiện ngược lại với `split`. Nó tạo ra một chuỗi các mục `arr` được nối bằng `glue` giữa chúng.

Ví dụ:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // dán array vào một chuỗi bằng cách sử dụng ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Khi chúng ta cần lặp lại một array -- chúng ta có thể sử dụng `forEach`, `for` hoặc `for..of`.

Khi chúng ta cần lặp lại và trả về dữ liệu cho từng phần tử -- chúng ta có thể sử dụng `map`.

Các phương thức [arr.reduce](mdn:js/Array/reduce) và [arr.reduceRight](mdn:js/Array/reduceRight) cũng thuộc loại đó, nhưng phức tạp hơn một chút. Chúng được sử dụng để tính toán một giá trị duy nhất dựa trên array.

Cú pháp là:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

Hàm này lần lượt được áp dụng cho tất cả các phần tử array và "tiếp tục" kết quả của nó cho lần gọi tiếp theo.

Các đối số:

- `accumulator` -- là kết quả của lệnh gọi hàm trước đó, bằng `initial` trong lần đầu tiên (nếu `initial` được cung cấp).
- `item` -- là mục array hiện tại.
- `index` -- là vị trí của nó.
- `array` -- là array.

Khi hàm được áp dụng, kết quả của lệnh gọi hàm trước được chuyển sang hàm tiếp theo dưới dạng đối số đầu tiên.

Vì vậy, đối số đầu tiên về cơ bản là bộ tích lũy lưu trữ kết quả tổng hợp của tất cả các lần thực hiện trước đó. Và cuối cùng, nó trở thành kết quả của `reduce`.

Có vẻ phức tạp?

Cách dễ nhất để nắm bắt điều đó là bằng ví dụ.

Ở đây chúng ta nhận được tổng của một array trong một dòng:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

Hàm được truyền cho `reduce` chỉ sử dụng 2 đối số, như vậy thường là đủ.

Hãy xem chi tiết những gì đang xảy ra.

1. Ở lần chạy đầu tiên, `sum` là giá trị `ban đầu` (đối số cuối cùng của `reduce`), bằng `0` và `current` là phần tử array đầu tiên, bằng `1`. Vì vậy, kết quả hàm là `1`.
2. Ở lần chạy thứ hai, `sum = 1`, chúng ta thêm phần tử array thứ hai (`2`) vào nó và trả về.
3. Ở lần chạy thứ 3, `sum = 3` và chúng ta thêm một phần tử nữa vào nó, v.v...

Luồng tính toán:

![](reduce.svg)

Hoặc ở dạng bảng, trong đó mỗi hàng đại diện cho một lệnh gọi hàm trên phần tử array tiếp theo:

| |`sum`|`current`|kết quả|
|---|-----|---------|-----|
|cuộc gọi đầu tiên|`0`|`1`|`1`|
|cuộc gọi thứ hai|`1`|`2`|`3`|
|cuộc gọi thứ ba|`3`|`3`|`6`|
|cuộc gọi thứ tư|`6`|`4`|`10`|
|cuộc gọi thứ năm|`10`|`5`|`15`|

Ở đây chúng ta có thể thấy rõ kết quả của cuộc gọi trước đó trở thành đối số đầu tiên của cuộc gọi tiếp theo như thế nào.

Chúng ta cũng có thể bỏ qua giá trị ban đầu:

```js run
let arr = [1, 2, 3, 4, 5];

// đã xóa giá trị ban đầu khỏi giảm (không có 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

Kết quả là như nhau. Đó là bởi vì nếu không có giá trị ban đầu, thì `reduce` sẽ lấy phần tử đầu tiên của array làm giá trị ban đầu và bắt đầu lặp lại từ phần tử thứ 2.

Bảng tính giống như trên, trừ hàng đầu tiên.

Nhưng việc sử dụng như vậy đòi hỏi phải hết sức cẩn thận. Nếu array trống, thì lệnh gọi `reduce` không có giá trị ban đầu sẽ báo lỗi.

Đây là một ví dụ:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value
// nếu giá trị ban đầu tồn tại, giảm sẽ trả lại nó cho array trống.
arr.reduce((sum, current) => sum + current);
```

Vì vậy, nên luôn chỉ định giá trị ban đầu.

Phương thức [arr.reduceRight](mdn:js/Array/reduceRight) cũng làm như vậy, nhưng đi từ phải sang trái.


## Array.isArray

Các array không tạo thành một loại ngôn ngữ riêng biệt. Chúng dựa trên các đối tượng.

Vì vậy, `typeof` không giúp phân biệt một đối tượng đơn giản với một arrray:

```js run
alert(typeof {}); // đối tượng
alert(typeof []); // như nhau
```

...Nhưng array được sử dụng thường xuyên đến mức có một phương thức đặc biệt cho việc đó: [Array.isArray(value)](mdn:js/Array/isArray). Nó trả về `true` nếu `value` là một mảng và `false` nếu không.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Hầu hết các phương thức đều hỗ trợ "thisArg"

Hầu như tất cả các phương thức array gọi các hàm -- như `find`, `filter`, `map`, với một ngoại lệ đáng chú ý là `sort`, đều chấp nhận một tham số bổ sung tùy chọn `thisArg`.

Tham số đó không được giải thích trong các phần trên, vì nó hiếm khi được sử dụng. Nhưng để hoàn thiện, chúng ta phải che đậy nó.

Đây là cú pháp đầy đủ của các phương thức này:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg là đối số cuối cùng tùy chọn
```

Giá trị của tham số `thisArg` trở thành `this` cho `func`.

Ví dụ: ở đây chúng ta sử dụng một phương thức của đối tượng `army` làm bộ lọc và `thisArg` chuyển ngữ cảnh:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// tìm người dùng, cho những người army.canJoin trả về true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

Nếu trong ví dụ trên, chúng ta sử dụng `users.filter(army.canJoin)`, thì `army.canJoin` sẽ được gọi như một hàm độc lập, với `this=undefined`, do đó dẫn đến lỗi ngay lập tức.

Lệnh gọi `users.filter(army.canJoin, army)` có thể được thay thế bằng `users.filter(user => army.canJoin(user))`, thao tác này cũng thực hiện tương tự. Cái sau được sử dụng thường xuyên hơn, vì nó dễ hiểu hơn đối với hầu hết mọi người.

## Tóm tắt

Một bảng hỗ trợ của các phương thức array:

- Để thêm/bớt phần tử:
   - `push(...items)` -- thêm các mục vào cuối,
   - `pop()` -- trích xuất một mục từ cuối,
   - `shift()` -- trích xuất một mục từ đầu,
   - `unshift(...items)` -- thêm các mục vào đầu.
   - `splice(pos, deleteCount, ...items)` -- tại chỉ mục `pos` xóa các phần tử `deleteCount` và chèn `items`.
   - `slice(start, end)` -- tạo một array mới, sao chép các phần tử từ chỉ mục `start` cho đến `end` (không bao gồm) vào đó.
   - `concat(...items)` -- trả về một array mới: sao chép tất cả các phần tử của array hiện tại và thêm `items` vào array đó. Nếu bất kỳ `item` nào là một array, thì các phần tử của array đó sẽ được lấy.

- Tìm kiếm giữa các phần tử:
   - `indexOf/lastIndexOf(item, pos)` -- tìm kiếm `item` bắt đầu từ vị trí `pos`, trả lại chỉ mục hoặc `-1` nếu không tìm thấy.
   - `gồm(giá trị)` -- trả về `true` nếu array có `giá trị`, ngược lại là `false`.
   - `find/filter(func)` -- lọc các phần tử thông qua hàm, trả về giá trị đầu tiên/tất cả khiến hàm trả về `true`.
   - `findIndex` giống như `find`, nhưng trả về chỉ mục thay vì giá trị.

- Để lặp qua các phần tử:
   - `forEach(func)` -- gọi `func` cho mọi phần tử, không trả về bất kỳ thứ gì.

- Để biến đổi mảng:
   - `map(func)` -- tạo một array mới từ kết quả gọi `func` cho mọi phần tử.
   - `sort(func)` -- sắp xếp array tại chỗ, sau đó trả về array.
   - `reverse()` -- đảo ngược array tại chỗ, sau đó trả về nó.
   - `split/join` -- chuyển đổi một chuỗi thành array và ngược lại.
   - `reduce/reduceRight(func, initial)` -- tính toán một giá trị duy nhất trên array bằng cách gọi `func` cho từng phần tử và chuyển kết quả trung gian giữa các lần gọi.

- Ngoài ra:
   - `Array.isArray(arr)` kiểm tra `arr` có phải là một array hay không.

Hãy lưu ý rằng các phương thức `sort`, `reverse` và `splice` tự sửa đổi array.

Những phương thức này là những phương thức được sử dụng nhiều nhất, chúng bao gồm 99% các trường hợp sử dụng. Nhưng có một số khác:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) kiểm tra array.

   Hàm `fn` được gọi trên mỗi phần tử của array tương tự như `map`. Nếu bất kỳ/tất cả kết quả là `true`, trả về `true`, nếu không thì `false`.

  Các phương thức này hoạt động giống như các toán tử `||` và `&&`: nếu `fn` trả về một giá trị đúng, `arr.some()` ngay lập tức trả về `true` và ngừng lặp lại trên các mục còn lại; nếu `fn` trả về một giá trị giả, thì `arr.every()` sẽ ngay lập tức trả về `false` và cũng ngừng lặp lại trên các mục còn lại.

   Chúng ta có thể sử dụng `every` để so sánh các array:
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- lấp đầy array bằng cách lặp lại `value` từ chỉ mục `start` đến `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- sao chép các phần tử của nó từ vị trí `start` cho đến vị trí `end` vào *chính nó*, tại vị trí `target` (ghi đè hiện có).

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) tạo một array phẳng mới từ một array nhiều chiều.

Để biết danh sách đầy đủ, hãy xem [array](mdn:js/Array).

Ngay từ cái nhìn đầu tiên, có vẻ như có rất nhiều phương thức, khá khó nhớ. Nhưng thực ra điều đó dễ dàng hơn nhiều.

Xem qua bảng hỗ trợ chỉ để biết về chúng. Sau đó giải quyết các nhiệm vụ của chương này để thực hành, để bạn có kinh nghiệm với các phương thức array.

Sau đó, bất cứ khi nào bạn cần làm gì đó với một array, và bạn không biết làm thế nào -- hãy đến đây, xem bảng hỗ trợ và tìm phương thức phù hợp. Ví dụ sẽ giúp bạn viết nó một cách chính xác. Bạn sẽ sớm tự động ghi nhớ các phương thức mà không cần nỗ lực cụ thể từ phía bạn.
