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

alert( title ); // Lãnh đạo
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
// Map lặp lại dưới dạng các cặp [key, value], rất thuận tiện cho việc phá hủy
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // tên: John, sau đó tuổi: 30
}
```
````

````smart header="Mẹo hoán đổi biến"
Có một mẹo nổi tiếng để hoán đổi giá trị của hai biến bằng cách sử dụng phép gán hủy:

```js run
let guest = "Jane";
let admin = "Pete";

// Hãy hoán đổi các giá trị: khiến guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (hoán đổi thành công!)
```

Ở đây, chúng ta tạo một array tạm thời gồm hai biến và ngay lập tức hủy cấu trúc của nó theo thứ tự hoán đổi.

Chúng ta có thể hoán đổi nhiều hơn hai biến theo cách này.
````

### Phần còn lại '...'

Thông thường, nếu array dài hơn danh sách ở bên trái, các mục "phụ" sẽ bị bỏ qua.

Ví dụ: ở đây chỉ có hai mục được lấy và phần còn lại chỉ bị bỏ qua:

```js run
let [name1, name2] = ["Julius", "Caesar", "Lãnh đạo", "của Cộng hòa La Mã"];

alert(name1); // Julius
alert(name2); // Caesar
// Các mục khác không được chỉ định ở bất cứ đâu
```

Nếu chúng ta cũng muốn thu thập tất cả những gì sau đây -- chúng ta có thể thêm một tham số khác nhận được "phần còn lại" bằng cách sử dụng ba dấu chấm `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Lãnh đạo", "của Cộng hòa La Mã"*/!*];

*!*
// phần còn lại là array các mục, bắt đầu từ mục thứ 3
alert(rest[0]); // Lãnh đạo
alert(rest[1]); // của Cộng hòa La Mã
alert(rest.length); // 2
*/!*
```

Giá trị của `rest` là array của các phần tử array còn lại.

Chúng ta có thể sử dụng bất kỳ tên biến nào khác thay cho `rest`, chỉ cần đảm bảo rằng nó có ba dấu chấm trước nó và đứng cuối cùng trong phép gán phá hủy.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Lãnh đạo", "của Cộng hòa La Mã"];
// bây giờ titles = ["Lãnh đạo", "của Cộng hòa La Mã"]
```

### Giá trị mặc định

Nếu array ngắn hơn danh sách các biến ở bên trái, sẽ không có lỗi. Các giá trị vắng mặt được coi là không xác định:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Nếu chúng ta muốn một giá trị "mặc định" thay thế giá trị bị thiếu, chúng ta có thể cung cấp giá trị đó bằng cách sử dụng `=`:

```js run
*!*
// giá trị mặc định
let [name = "Khách", surname = "Ẩn danh"] = ["Julius"];
*/!*

alert(name);    // Julius (từ array)
alert(surname); // Ẩn danh (mặc định được sử dụng)
```

Các giá trị mặc định có thể là các biểu thức phức tạp hơn hoặc thậm chí là các lệnh gọi hàm. Chúng chỉ được đánh giá nếu giá trị không được cung cấp.

Chẳng hạn, ở đây chúng ta sử dụng hàm `prompt` cho hai giá trị mặc định:

```js run
// chỉ chạy prompt cho surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (từ array)
alert(surname); // bất cứ thứ gì prompt nhận được
```

Hãy lưu ý: `prompt` sẽ chỉ chạy đối với giá trị bị thiếu (`surname`).

## Phá hủy đối tượng

Phép gán phá hủy cũng hoạt động với các đối tượng.

Cú pháp cơ bản là:

```js
let {var1, var2} = {var1:…, var2:…}
```

Chúng ta nên có một đối tượng hiện có ở phía bên phải mà chúng ta muốn chia thành các biến. Phía bên trái chứa một "mẫu" giống như đối tượng cho các thuộc tính tương ứng. Trong trường hợp đơn giản nhất, đó là danh sách các tên biến trong `{...}`.

Ví dụ:

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

Các thuộc tính `options.title`, `options.width` và `options.height` được gán cho các biến tương ứng.

Thứ tự không thành vấn đề. Cái này cũng hoạt động:

```js
// đã thay đổi thứ tự trong let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Mẫu ở phía bên trái có thể phức tạp hơn và chỉ định vẽ bản đồ giữa các thuộc tính và biến.

Ví dụ: nếu chúng ta muốn gán một thuộc tính cho một biến có tên khác, đặt `options.width` vào biến có tên `w`, thì chúng ta có thể đặt tên biến bằng cách sử dụng dấu hai chấm:

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

Dấu hai chấm hiển thị "cái gì : đi đâu". Trong ví dụ trên, thuộc tính `width` chuyển sang `w`, thuộc tính `height` chuyển sang `h` và `title` được gán cho cùng một tên.

Đối với các thuộc tính có khả năng bị thiếu, chúng ta có thể đặt giá trị mặc định bằng cách sử dụng `"="`, như sau:

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

Giống như với mảng hoặc tham số hàm, giá trị mặc định có thể là bất kỳ biểu thức nào hoặc thậm chí là lệnh gọi hàm. Chúng sẽ được đánh giá nếu giá trị không được cung cấp.

Trong mã bên dưới, `prompt` yêu cầu `width` nhưng không yêu cầu `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (bất kể kết quả của prompt là gì)
```

Chúng ta cũng có thể kết hợp cả dấu hai chấm và dấu bằng:

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

Nếu chúng ta có một đối tượng phức tạp với nhiều thuộc tính, chúng ta chỉ có thể trích xuất những gì chúng ta cần:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// chỉ trích xuất tiêu đề dưới dạng biến
let { title } = options;

alert(title); // Menu
```

### Mẫu còn lại "..."

Điều gì xảy ra nếu đối tượng có nhiều thuộc tính hơn chúng ta có các biến? Chúng ta có thể lấy một số và sau đó chỉ định "phần còn lại" ở đâu đó không?

Chúng ta có thể sử dụng mẫu còn lại, giống như chúng ta đã làm với array. Nó không được hỗ trợ bởi một số trình duyệt cũ hơn (IE, sử dụng Babel để điền vào nó), nhưng hoạt động trong các trình duyệt hiện đại.

Nó trông giống như thế này:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = thuộc tính có tên title
// rest = đối tượng với phần còn lại của các thuộc tính
let {title, ...rest} = options;
*/!*

// bây giờ title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Gotcha nếu không có `let`"
Trong các ví dụ trên, các biến đã được khai báo ngay trong phép gán: `let {…} = {…}`. Tất nhiên, chúng ta cũng có thể sử dụng các biến hiện có mà không cần `let`. Nhưng có một nhược điểm.

Cái này sẽ không hoạt động:
```js run
let title, width, height;

// lỗi ở dòng này
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

Vấn đề là JavaScript xử lý `{...}` trong luồng mã chính (không phải bên trong biểu thức khác) dưới dạng một khối mã. Các khối mã như vậy có thể được sử dụng để nhóm các câu lệnh, như sau:

```js run
{
  // một khối mã
  let message = "Hello";
  // ...
  alert( message );
}
```

Vì vậy, ở đây JavaScript giả định rằng chúng ta có một khối mã, đó là lý do tại sao có lỗi. Thay vào đó, chúng ta muốn phá hủy.

Để hiển thị JavaScript rằng nó không phải là một khối mã, chúng ta có thể bao biểu thức trong dấu ngoặc đơn `(...)`:

```js run
let title, width, height;

// bây giờ thì ổn
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Phá hủy lồng nhau

Nếu một đối tượng hoặc một array chứa các đối tượng và array lồng nhau khác, chúng ta có thể sử dụng các mẫu bên trái phức tạp hơn để trích xuất các phần sâu hơn.

Trong mã bên dưới `options` có một đối tượng khác trong thuộc tính `size` và một array trong thuộc tính `items`. Mẫu ở phía bên trái của phép gán có cùng cấu trúc để trích xuất các giá trị từ chúng:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true   
};

// phân công phá hủy được chia thành nhiều dòng cho rõ ràng
let {
  size: { // đặt cỡ ở đây
    width,
    height
  },
  items: [item1, item2], // chỉ định các mục ở đây
  title = "Menu" // không có trong đối tượng (giá trị mặc định được sử dụng)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

Tất cả các thuộc tính của đối tượng `options` ngoại trừ `extra` không có ở phần bên trái, được gán cho các biến tương ứng: 453

![](destructuring-complex.svg)

Cuối cùng, chúng ta có `width`, `height`, `item1`, `item2` và `title` từ giá trị mặc định.

Lưu ý rằng không có biến nào cho `size` và `items`, vì chúng ta lấy nội dung của chúng thay thế.

## Thông số hàm thông minh

Đôi khi một hàm có nhiều tham số, hầu hết trong số đó là tùy chọn. Điều đó đặc biệt đúng đối với giao diện người dùng. Hãy tưởng tượng một chức năng tạo ra một menu. Nó có thể có chiều rộng, chiều cao, tiêu đề, danh sách các mục, v.v.

Đây là một cách tồi để viết hàm như vậy:

```js
function showMenu(title = "Không có tiêu đề", width = 200, height = 100, items = []) {
  // ...
}
```

Trong cuộc sống thực, vấn đề là làm thế nào để nhớ thứ tự của các đối số. Thông thường, các IDE cố gắng giúp chúng ta, đặc biệt nếu mã được viết thành tài liệu tốt, nhưng vẫn... Một vấn đề khác là làm thế nào để gọi một hàm khi hầu hết các tham số đều ổn theo mặc định.

Như thế này ư?

```js
// undefined where nơi giá trị mặc định là ổn
showMenu("Menu của tôi", undefined, undefined, ["Item1", "Item2"])
```

Điều đó thật xấu xí. Và trở nên không thể đọc được khi chúng ta xử lý nhiều tham số hơn.

Phá hủy đến để giải cứu!

Chúng ta có thể truyền các tham số dưới dạng một đối tượng và hàm ngay lập tức hủy chúng thành các biến:

```js run
// chúng ta chuyển đối tượng cho hàm
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...và nó ngay lập tức mở rộng nó thành các biến
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – lấy từ options,
  // width, height – mặc định được sử dụng
  alert( `${title} ${width} ${height}` ); // Menu của tôi 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Chúng ta cũng có thể sử dụng cách phá hủy phức tạp hơn với các đối tượng lồng nhau và vẽ bản đồ dấu hai chấm:

```js run
let options = {
  title: "Menu của tôi",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Không có tiêu đề",
  width: w = 100,  // chiều rộng đi đến w
  height: h = 200, // chiều cao đi đến h
  items: [item1, item2] // item phần tử đầu tiên chuyển đến item1, thứ hai đến item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // Menu của tôi 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

Cú pháp đầy đủ giống như đối với phép gán phá hủy:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

Sau đó, đối với một đối tượng có tham số, sẽ có một biến `varName` cho thuộc tính `incomingProperty`, với `defaultValue` theo mặc định.

Hãy lưu ý rằng việc phá hủy như vậy giả định rằng `showMenu()` có đối số. Nếu chúng ta muốn tất cả các giá trị theo mặc định, thì chúng ta nên chỉ định một đối tượng trống:

```js
showMenu({}); // ok, tất cả các giá trị là mặc định

showMenu(); // điều này sẽ gây ra lỗi
```

Chúng ta có thể khắc phục điều này bằng cách đặt `{}` làm giá trị mặc định cho toàn bộ đối tượng của tham số:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

Trong đoạn mã trên, toàn bộ đối tượng đối số là `{}` theo mặc định, vì vậy luôn có thứ gì đó để phá hủy.

## Tóm tắt

- Phép gán hủy cấu trúc cho phép lập tức vẽ bản đồ một đối tượng hoặc array lên nhiều biến.
- Cú pháp đối tượng đầy đủ:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    Điều này có nghĩa là thuộc tính `prop` nên đi vào biến `varName` và, nếu không có thuộc tính nào như vậy tồn tại, thì nên sử dụng giá trị `default`.

    Các thuộc tính đối tượng không có vẽ bản đồ được sao chép vào đối tượng `rest`.

- Cú pháp array đầy đủ:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

   Mục đầu tiên chuyển đến `item1`; phần thứ hai đi vào `item2`, tất cả phần còn lại tạo thành array `rest`.

- Có thể trích xuất dữ liệu từ các array/đối tượng lồng nhau, vì bên trái phải có cấu trúc giống như bên phải.
