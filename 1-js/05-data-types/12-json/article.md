# Các phương thức JSON, toJSON

Giả sử chúng ta có một đối tượng phức tạp và chúng ta muốn chuyển đổi nó thành một chuỗi, để gửi nó qua mạng hoặc chỉ xuất nó cho mục đích ghi nhật ký.

Đương nhiên, một chuỗi như vậy phải bao gồm tất cả các thuộc tính quan trọng.

Chúng tôi có thể thực hiện chuyển đổi như thế này:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {tên: "John", tuổi: 30}
```

...Nhưng trong quá trình phát triển, các thuộc tính mới được thêm vào, các thuộc tính cũ được đổi tên và xóa. Việc cập nhật `toString` như vậy mỗi lần có thể trở thành một vấn đề khó khăn. Chúng ta có thể thử lặp qua các thuộc tính trong đó, nhưng nếu đối tượng phức tạp và có các đối tượng lồng nhau trong các thuộc tính thì sao? Chúng ta cũng cần thực hiện chuyển đổi của chúng.

May mắn thay, không cần phải viết mã để xử lý tất cả điều này. Nhiệm vụ đã được giải quyết rồi.

## JSON.stringify

[JSON](http://vi.wikipedia.org/wiki/JSON) (Ký hiệu đối tượng JavaScript) là một định dạng chung để biểu thị các giá trị và đối tượng. Nó được mô tả như trong tiêu chuẩn [RFC 4627](http://tools.ietf.org/html/rfc4627). Ban đầu, nó được tạo cho JavaScript, nhưng nhiều ngôn ngữ khác cũng có thư viện để xử lý nó. Vì vậy, thật dễ dàng để sử dụng JSON để trao đổi dữ liệu khi máy khách sử dụng JavaScript và máy chủ được viết trên Ruby/PHP/Java/Sao cũng được.

JavaScript cung cấp các phương thức:

- `JSON.stringify` để chuyển đổi các đối tượng thành JSON.
- `JSON.parse` để chuyển đổi JSON trở lại thành một đối tượng.

Chẳng hạn, ở đây chúng ta `JSON.stringify` một sinh viên:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // chúng ta đã có một chuỗi!

alert(json);
*!*
/* Đối tượng được mã hóa JSON:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
*/!*
```

Phương thức `JSON.stringify(student)` lấy đối tượng và chuyển đổi nó thành một chuỗi.

Chuỗi `json` kết quả được gọi là đối tượng *được mã hóa JSON* hoặc *nối tiếp* hoặc *xâu chuỗi* hoặc *thống nhất*. Chúng ta đã sẵn sàng để gửi nó qua dây hoặc đưa vào kho lưu trữ dữ liệu đơn giản.


Hãy lưu ý rằng một đối tượng được mã hóa JSON có một số điểm khác biệt quan trọng so với đối tượng theo nghĩa đen:

- Chuỗi sử dụng dấu ngoặc kép. Không có dấu nháy đơn hoặc dấu ngược trong JSON. Vì vậy, `'John'` trở thành `"John"`.
- Tên thuộc tính đối tượng cũng được trích dẫn kép. Đó là bắt buộc. Vì vậy, `tuổi:30` trở thành `"tuổi":30`.

`JSON.stringify` cũng có thể được áp dụng cho nguyên thủy.

JSON hỗ trợ các kiểu dữ liệu sau:

- Đối tượng `{ ... }`
- Mảng `[ ... ]`
- Nguyên thủy:
     - chuỗi,
     - số,
     - giá trị boolean `true/false`,
     - `không`.

Ví dụ:

```js run
// một số trong JSON chỉ là một số
alert( JSON.stringify(1) ) // 1

// một chuỗi trong JSON vẫn là một chuỗi, nhưng có dấu ngoặc kép
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSON là thông số kỹ thuật ngôn ngữ độc lập với dữ liệu, do đó, một số thuộc tính đối tượng dành riêng cho JavaScript bị `JSON.stringify` bỏ qua.

Cụ thể là:

- Thuộc tính hàm (phương thức).
- Các khóa và giá trị tượng trưng.
- Thuộc tính lưu trữ `undefined`.

```js run
let user = {
  sayHi() { // làm ngơ
    alert("Xin chào");
  },
  [Symbol("id")]: 123, // làm ngơ
  something: undefined // làm ngơ
};

alert( JSON.stringify(user) ); // {} (đối tượng trống)
```

Thường thì tốt thôi. Nếu đó không phải là điều chúng ta muốn, thì chúng ta sẽ sớm xem cách tùy chỉnh quy trình.

Điều tuyệt vời là các đối tượng lồng nhau được hỗ trợ và chuyển đổi tự động.

Ví dụ:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* Toàn bộ cấu trúc được xâu chuỗi:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

Hạn chế quan trọng: không được có tham chiếu vòng tròn.

Ví dụ:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup tham chiếu room
room.occupiedBy = meetup; // room tham chiếu meetup

*!*
JSON.stringify(meetup); // Lỗi: Chuyển đổi cấu trúc vòng tròn thành JSON
*/!*
```

Ở đây, quá trình chuyển đổi không thành công do tham chiếu vòng: `room.occupiedBy` tham chiếu `meetup` và `meetup.place` tham chiếu `room`:

![](json-meetup.svg)


## Loại trừ và biến đổi: thay thế

Cú pháp đầy đủ của `JSON.stringify` là:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: Một giá trị để mã hóa.

replacer
: Array thuộc tính để mã hóa hoặc hàm vẽ bản đồ `function(key, value)`.

space
: Lượng không gian sử dụng để định dạng

Hầu hết thời gian, `JSON.stringify` chỉ được sử dụng với đối số đầu tiên. Nhưng nếu chúng ta cần tinh chỉnh quá trình thay thế, chẳng hạn như lọc ra các tham chiếu vòng tròn, thì chúng ta có thể sử dụng đối số thứ hai của `JSON.stringify`.

Nếu chúng ta chuyển một array thuộc tính cho nó, thì chỉ những thuộc tính này sẽ được mã hóa.

Ví dụ:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup tham chiếu room
};

room.occupiedBy = meetup; // room tham chiếu meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

Ở đây có lẽ chúng ta quá khắt khe. Danh sách thuộc tính được áp dụng cho toàn bộ cấu trúc đối tượng. Vì vậy, các đối tượng trong `participants` trống vì `name` không có trong danh sách.

Hãy đưa vào danh sách mọi thuộc tính ngoại trừ `room.occupiedBy` sẽ gây ra tham chiếu vòng:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup tham chiếu room
};

room.occupiedBy = meetup; // room tham chiếu meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Bây giờ mọi thứ ngoại trừ `occupiedBy` đều được đánh số thứ tự. Nhưng danh sách các thuộc tính là khá dài.

May mắn thay, chúng ta có thể sử dụng một hàm thay vì một array làm `replacer`.

Hàm sẽ được gọi cho mọi cặp `(key, value)` và sẽ trả về giá trị "đã thay thế", giá trị này sẽ được sử dụng thay cho giá trị ban đầu. Hoặc `undefined` nếu giá trị sẽ bị bỏ qua.

Trong trường hợp của chúng ta, chúng ta có thể trả lại `value` "nguyên trạng" cho mọi thứ ngoại trừ `occupiedBy`. Để bỏ qua `occupiedBy`, mã bên dưới trả về `undefined`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup tham chiếu room
};

room.occupiedBy = meetup; // room tham chiếu meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* khóa: cặp value đi đến replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```

Hãy lưu ý rằng hàm `replacer` nhận mọi cặp khóa/giá trị bao gồm các đối tượng lồng nhau và các mục array. Nó được áp dụng đệ quy. Giá trị của `this` bên trong `replacer` là đối tượng chứa thuộc tính hiện tại.

Cuộc gọi đầu tiên là đặc biệt. Nó được tạo bằng cách sử dụng một "đối tượng bao bọc" đặc biệt: `{"": meetup}`. Nói cách khác, cặp `(key, value)` đầu tiên có một khóa trống và giá trị là toàn bộ đối tượng mục tiêu. Đó là lý do tại sao dòng đầu tiên là `":[object Object]"` trong ví dụ trên.

Ý tưởng là cung cấp càng nhiều quyền lực cho `replacer` càng tốt: nó có cơ hội phân tích và thay thế/bỏ qua thậm chí toàn bộ đối tượng nếu cần.


## Định dạng: dấu cách

Đối số thứ ba của `JSON.stringify(value, replacer, space)` là số lượng khoảng trắng để sử dụng cho định dạng đẹp.

Trước đây, tất cả các đối tượng được xâu chuỗi đều không có khoảng cách thụt vào và khoảng trắng thừa. Điều đó tốt nếu chúng ta muốn gửi một đối tượng qua mạng. Đối số `space` được sử dụng riêng cho đầu ra đẹp.

Ở đây `space = 2` yêu cầu JavaScript hiển thị các đối tượng lồng nhau trên nhiều dòng, với thụt lề 2 khoảng trắng bên trong một đối tượng:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* thụt lề hai dấu cách:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* đối với JSON.stringify(user, null, 4) kết quả sẽ được thụt vào nhiều hơn:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

Đối số thứ ba cũng có thể là một chuỗi. Trong trường hợp này, chuỗi được sử dụng để thụt đầu dòng thay vì một số khoảng trắng.

Tham số `space` chỉ được sử dụng cho mục đích ghi nhật ký và đầu ra đẹp.

## "toJSON" tùy chỉnh

Giống như `toString` để chuyển đổi chuỗi, một đối tượng có thể cung cấp phương thức `toJSON` để chuyển đổi sang JSON. `JSON.stringify` tự động gọi nó nếu có.

Ví dụ:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Ở đây chúng ta có thể thấy rằng `date` `(1)` đã trở thành một chuỗi. Đó là bởi vì tất cả các ngày đều có phương thức `toJSON` tích hợp trả về loại chuỗi như vậy.

Bây giờ, hãy thêm một `toJSON` tùy chỉnh cho đối tượng của chúng ta `room` `(2)`:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

Như chúng ta có thể thấy, `toJSON` được sử dụng cho cả lệnh gọi trực tiếp `JSON.stringify(room)` và khi `room` được lồng trong một đối tượng được mã hóa khác.


## JSON.parse

Để giải mã một chuỗi JSON, chúng ta cần một phương thức khác có tên [JSON.parse](mdn:js/JSON/parse).

The syntax:
```js
let value = JSON.parse(str, [reviver]);
```

str
: Chuỗi JSON để phân tích cú pháp.

reviver
: Hàm (khóa, giá trị) tùy chọn sẽ được gọi cho từng cặp `(khóa, giá trị)` và có thể chuyển đổi giá trị.

Ví dụ:

```js run
// array xâu chuỗi
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Hoặc cho các đối tượng lồng nhau:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

JSON có thể phức tạp đến mức cần thiết, các đối tượng và array có thể bao gồm các đối tượng và array khác. Nhưng chúng phải tuân theo cùng một định dạng JSON.

Dưới đây là những lỗi điển hình trong JSON viết tay (đôi khi chúng ta phải viết nó cho mục đích gỡ lỗi):

```js
let json = `{
  *!*name*/!*: "John",                     // lỗi: tên thuộc tính không có dấu ngoặc kép
  "surname": *!*'Smith'*/!*,               // lỗi: dấu ngoặc đơn trong giá trị (phải kép)
  *!*'isAdmin'*/!*: false                  // lỗi: dấu nháy đơn trong khóa (phải kép)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // lỗi: không cho phép "new", chỉ các giá trị trống
  "friends": [0,1,2,3]              // ở đây tất cả đều ổn
}`;
```

Ngoài ra, JSON không hỗ trợ nhận xét. Thêm một nhận xét vào JSON làm cho nó không hợp lệ.

Có một định dạng khác có tên [JSON5](http://json5.org/), cho phép các khóa, nhận xét không được trích dẫn, v.v. Nhưng đây là một thư viện độc lập, không có trong thông số kỹ thuật của ngôn ngữ.

JSON thông thường nghiêm ngặt như vậy không phải vì các nhà phát triển của nó lười biếng, mà để cho phép triển khai thuật toán phân tích cú pháp dễ dàng, đáng tin cậy và rất nhanh.

## Sử dụng máy hồi sinh

Hãy tưởng tượng, chúng ta có một đối tượng `meetup` được xâu chuỗi từ máy chủ.

Nó trông như thế này:

```js
// tiêu đề: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...Và bây giờ chúng ta cần *bỏ nối tiếp* nó, để quay trở lại đối tượng JavaScript.

Hãy làm điều đó bằng cách gọi `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Lỗi!
*/!*
```

Rất tiếc! Một lỗi!

Giá trị của `meetup.date` là một chuỗi, không phải đối tượng `Date`. Làm cách nào để `JSON.parse` biết rằng nó sẽ chuyển đổi chuỗi đó thành `Date`?

Hãy chuyển sang `JSON.parse` hàm hồi sinh làm đối số thứ hai, hàm này trả về tất cả các giá trị "nguyên trạng", nhưng `date` sẽ trở thành `Date`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // bây giờ hoạt động!
```

Nhân tiện, nó cũng hoạt động với các đối tượng lồng nhau:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // hoạt động!
*/!*
```



## Tóm tắt

- JSON là một định dạng dữ liệu có tiêu chuẩn và thư viện độc lập riêng cho hầu hết các ngôn ngữ lập trình.
- JSON hỗ trợ các đối tượng đơn giản, array, chuỗi, số, booleans và `null`.
- JavaScript cung cấp các phương thức [JSON.stringify](mdn:js/JSON/stringify) để tuần tự hóa thành JSON và [JSON.parse](mdn:js/JSON/parse) để đọc từ JSON.
- Cả hai phương pháp đều hỗ trợ các hàm biến đổi để đọc/ghi thông minh.
- Nếu một đối tượng có `toJSON`, thì nó được gọi bởi `JSON.stringify`.
