
# Kiểu ký hiệu

Theo thông số kỹ thuật, các khóa thuộc tính đối tượng có thể thuộc loại chuỗi hoặc loại ký hiệu. Không phải số, không phải booleans, chỉ có chuỗi hoặc ký hiệu, hai loại này.

Cho đến bây giờ chúng ta chỉ sử dụng các chuỗi. Bây giờ hãy xem những lợi ích mà các ký hiệu có thể mang lại cho chúng ta.

## Ký hiệu

Một "ký hiệu" đại diện cho một mã định danh duy nhất.

Giá trị của loại này có thể được tạo bằng cách sử dụng `Symbol()`:

```js
// id là một ký hiệu mới
let id = Symbol();
```

Khi tạo, chúng ta có thể cung cấp cho ký hiệu một mô tả (còn được gọi là tên ký hiệu), chủ yếu hữu ích cho mục đích gỡ lỗi:

```js
// id là một ký hiệu với mô tả "id"
let id = Symbol("id");
```

Các ký hiệu được đảm bảo là duy nhất. Ngay cả khi chúng ta tạo nhiều ký hiệu có cùng mô tả, chúng vẫn có giá trị khác nhau. Mô tả chỉ là một nhãn không ảnh hưởng gì.

Chẳng hạn, đây là hai ký hiệu có cùng mô tả -- chúng không bằng nhau:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Nếu bạn đã quen thuộc với Ruby hoặc một ngôn ngữ khác cũng có một số loại "ký hiệu" -- đừng hiểu lầm. Các ký hiệu JavaScript là khác nhau.

````warn header="Các ký hiệu không tự động chuyển đổi thành chuỗi"
Hầu hết các giá trị trong JavaScript đều hỗ trợ chuyển đổi ngầm định thành chuỗi. Chẳng hạn, chúng ta có thể `alert` gần như bất kỳ giá trị nào và nó sẽ hoạt động. Ký hiệu là đặc biệt. Họ không tự động chuyển đổi.

Chẳng hạn, `alert` này sẽ hiển thị lỗi:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Không thể chuyển đổi giá trị Ký hiệu thành chuỗi
*/!*
```

Đó là "bảo vệ ngôn ngữ" chống lại sự lộn xộn, bởi vì các chuỗi và ký tự về cơ bản là khác nhau và không nên vô tình chuyển đổi cái này thành cái khác.

Nếu chúng ta thực sự muốn hiển thị một ký hiệu, chúng ta cần gọi `.toString()` một cách rõ ràng trên đó, như sau:
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

Các ký hiệu cho phép chúng ta tạo các thuộc tính "ẩn" của một đối tượng, mà không phần mã nào khác có thể vô tình truy cập hoặc ghi đè lên.

Chẳng hạn, nếu chúng ta đang làm việc với các đối tượng `user`, thuộc về mã của bên thứ ba. Chúng ta muốn thêm số nhận dạng cho chúng.

Hãy sử dụng một phím ký hiệu cho nó:

```js run
let user = { // thuộc một mã khác
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // chúng ta có thể truy cập dữ liệu bằng cách lấy ký hiệu làm khóa
```

Lợi ích của việc sử dụng `Symbol("id")` trên chuỗi `"id"` là gì?

Vì các đối tượng `user` thuộc về một mã khác và mã đó cũng hoạt động với chúng, nên chúng ta không nên chỉ thêm bất kỳ trường nào vào đó. Điều đó không an toàn. Nhưng một ký hiệu không thể vô tình được truy cập, mã của bên thứ ba thậm chí có thể sẽ không nhìn thấy nó, vì vậy có thể làm như vậy là ổn.

Ngoài ra, hãy tưởng tượng rằng một tập lệnh khác muốn có mã định danh riêng bên trong `user`, cho các mục đích riêng của nó. Đó có thể là một thư viện JavaScript khác, do đó các tập lệnh hoàn toàn không biết về nhau.

Sau đó, tập lệnh đó có thể tạo `Symbol("id")` của riêng nó, như sau:

```js
// ...
let id = Symbol("id");

user[id] = "Giá trị id của họ";
```

Sẽ không có xung đột giữa số nhận dạng của chúng ta và của họ, bởi vì các ký hiệu luôn khác nhau, ngay cả khi chúng có cùng tên.

...Nhưng nếu chúng ta sử dụng một chuỗi `"id"` thay vì một ký hiệu cho cùng một mục đích, thì *sẽ* xảy ra xung đột:

```js
let user = { name: "John" };

// Tập lệnh của chúng ta sử dụng thuộc tính "id"
user.id = "Our id value";

// ...Một tập lệnh khác cũng muốn "id" cho mục đích của nó...

user.id = "Giá trị id của họ"
// Bùm! ghi đè bởi một tập lệnh khác!
```

### Các ký hiệu trong một object literal

Nếu chúng ta muốn sử dụng một ký hiệu trong một object literal `{...}`, thì chúng ta cần có dấu ngoặc vuông xung quanh ký hiệu đó.

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

### Các ký hiệu bị for..in bỏ qua

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

// truy cập trực tiếp bằng ký hiệu hoạt động
alert( "Direct: " + user[id] );
```

`Object.keys(user)` cũng bỏ qua chúng. Đó là một phần của nguyên tắc "ẩn các thuộc tính tượng trưng" chung. Nếu một tập lệnh hoặc thư viện khác lặp lại đối tượng của chúng ta, nó sẽ không truy cập bất ngờ vào thuộc tính tượng trưng.

Ngược lại, [Object.assign](mdn:js/Object/assign) sao chép cả thuộc tính chuỗi và ký hiệu:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Không có nghịch lý ở đây. Đó là do thiết kế. Ý tưởng là khi chúng ta sao chép một đối tượng hoặc hợp nhất các đối tượng, chúng ta thường muốn sao chép *tất cả* các thuộc tính (bao gồm các ký hiệu như `id`).

## Ký hiệu chung

Như chúng ta đã thấy, thông thường tất cả các ký hiệu đều khác nhau, ngay cả khi chúng có cùng tên. Nhưng đôi khi chúng ta muốn các ký hiệu cùng tên là cùng một thực thể. Chẳng hạn, các phần khác nhau trong ứng dụng của chúng ta muốn truy cập ký hiệu `"id"` có nghĩa chính xác là cùng một thuộc tính.

Để đạt được điều đó, tồn tại *cơ quan đăng ký ký hiệu chung*. Chúng ta có thể tạo các ký hiệu trong đó và truy cập chúng sau này, đồng thời đảm bảo rằng các lần truy cập lặp lại cùng tên sẽ trả về chính xác cùng một ký hiệu.

Để đọc (tạo nếu không có) một ký hiệu từ sổ đăng ký, hãy sử dụng `Symbol.for(key)`.

Cuộc gọi đó sẽ kiểm tra sổ đăng ký chung và nếu có một ký hiệu được mô tả là `key` thì trả về ký hiệu đó, nếu không thì tạo một ký hiệu mới `Symbol(key)` và lưu trữ nó trong sổ đăng ký theo `key` đã cho.

Ví dụ:

```js run
// đọc từ sổ đăng ký chung
let id = Symbol.for("id"); // nếu ký hiệu không tồn tại, nó sẽ được tạo ra

// đọc lại (có thể từ một phần khác của mã)
let idAgain = Symbol.for("id");

// cùng một ký hiệu
alert( id === idAgain ); // true
```

Các ký hiệu bên trong sổ đăng ký được gọi là *ký hiệu chung*. Nếu chúng ta muốn một ký hiệu toàn ứng dụng, có thể truy cập được ở mọi nơi trong mã -- đó là mục đích của chúng.

```smart header="Nghe giống như Ruby"
Trong một số ngôn ngữ lập trình, như Ruby, có một ký hiệu duy nhất cho mỗi tên.

Trong JavaScript, như chúng ta có thể thấy, điều đó phù hợp với các ký hiệu chung.
```

### Symbol.keyFor

Đối với các ký hiệu chung, không chỉ `Symbol.for(key)` trả về một ký hiệu theo tên, mà còn có một cách gọi ngược lại: `Symbol.keyFor(sym)`, có tác dụng ngược lại: trả về một tên theo một ký hiệu chung.

Ví dụ:

```js run
// lấy ký hiệu theo tên
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// lấy tên theo ký hiệu
alert( Symbol.keyFor(sym) ); // tên
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` sử dụng nội bộ sổ đăng ký ký hiệu chung để tra cứu khóa cho ký hiệu. Vì vậy, nó không hoạt động đối với các ký hiệu không chung. Nếu ký hiệu không phải là chung, nó sẽ không thể tìm thấy nó và trả về `undefined`.

Điều đó nói rằng, bất kỳ ký hiệu nào cũng có thuộc tính `mô tả`.

Ví dụ:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // tên, ký hiệu chung
alert( Symbol.keyFor(localSymbol) ); // undefined, không chung

alert( localSymbol.description ); // tên
```

## Ký hiệu hệ thống

Có nhiều ký hiệu "hệ thống" mà JavaScript sử dụng nội bộ và chúng ta có thể sử dụng chúng để tinh chỉnh các khía cạnh khác nhau của đối tượng.

Chúng được liệt kê trong thông số kỹ thuật trong bảng [Ký hiệu nổi tiếng](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...v.v.

Chẳng hạn, `Symbol.toPrimitive` cho phép chúng ta mô tả đối tượng thành chuyển đổi nguyên thủy. Chúng ta sẽ thấy việc sử dụng nó rất sớm.

Các ký hiệu khác cũng sẽ trở nên quen thuộc khi chúng ta nghiên cứu các đặc điểm ngôn ngữ tương ứng.

## Tóm tắt

`Symbol` là một loại nguyên thủy cho các mã định danh duy nhất.

Các ký hiệu được tạo bằng lệnh gọi `Symbol()` với một mô tả (tên) tùy chọn.

Các ký hiệu luôn có các giá trị khác nhau, ngay cả khi chúng có cùng tên. Nếu chúng ta muốn các ký hiệu cùng tên bằng nhau, thì chúng ta nên sử dụng sổ đăng ký chung: `Symbol.for(key)` trả về (tạo nếu cần) một ký hiệu chung có tên `key`. Nhiều lệnh gọi `Symbol.for` với cùng một `key` trả về chính xác cùng một ký hiệu.

Các ký hiệu có hai trường hợp sử dụng chính:

1. Thuộc tính đối tượng "ẩn".
     Nếu chúng ta muốn thêm một thuộc tính vào một đối tượng "thuộc về" một tập lệnh hoặc thư viện khác, chúng ta có thể tạo một ký hiệu và sử dụng nó làm khóa thuộc tính. Thuộc tính tượng trưng không xuất hiện trong `for..in`, vì vậy thuộc tính này sẽ không được xử lý ngẫu nhiên cùng với các thuộc tính khác. Ngoài ra, nó sẽ không được truy cập trực tiếp vì một tập lệnh khác không có ký hiệu của chúng ta. Vì vậy, thuộc tính sẽ được bảo vệ khỏi việc sử dụng ngẫu nhiên hoặc ghi đè lên.

     Vì vậy, chúng ta có thể "ẩn" một thứ gì đó vào những đối tượng mà chúng ta cần, nhưng những người khác không nên nhìn thấy, bằng cách sử dụng các thuộc tính tượng trưng.

2. Có nhiều ký hiệu hệ thống được JavaScript sử dụng có thể truy cập dưới dạng `Symbol.*`. Chúng ta có thể sử dụng chúng để thay đổi một số hành vi tích hợp. Chẳng hạn, ở phần sau của hướng dẫn, chúng ta sẽ sử dụng `Symbol.iterator` cho [iterables](info:iterable), `Symbol.toPrimitive` để thiết lập [chuyển đổi đối tượng thành nguyên thủy](info:object-toprimitive), v.v.

Về mặt kỹ thuật, các ký hiệu không bị ẩn 100%. Có một phương thức tích hợp [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) cho phép chúng ta lấy tất cả các ký hiệu. Ngoài ra, có một phương thức có tên [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) trả về các khóa *tất cả* của một đối tượng bao gồm các khóa tượng trưng. Vì vậy, chúng không thực sự bị ẩn. Nhưng hầu hết các thư viện, hàm dựng sẵn và cấu trúc cú pháp không sử dụng các phương thức này.
