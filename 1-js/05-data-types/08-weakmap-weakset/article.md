
# WeakMap and WeakSet

Như chúng ta đã biết từ chương <info:garbage-collection>, JavaScript engine giữ một giá trị trong bộ nhớ khi giá trị đó "có thể truy cập được" và có khả năng được sử dụng.

Ví dụ:

```js
let john = { name: "John" };

// đối tượng có thể được truy cập, john là tham chiếu đến nó

// ghi đè tham chiếu
john = null;

*!*
// đối tượng sẽ bị xóa khỏi bộ nhớ
*/!*
```

Thông thường, các thuộc tính của một đối tượng hoặc các phần tử của một array hoặc cấu trúc dữ liệu khác được coi là có thể truy cập và được lưu trong bộ nhớ trong khi cấu trúc dữ liệu đó nằm trong bộ nhớ.

Chẳng hạn, nếu chúng ta đặt một đối tượng vào trong một array, thì trong khi array còn tồn tại, thì đối tượng đó cũng sẽ còn tồn tại, ngay cả khi không có tham chiếu nào khác đến nó.

Như thế này:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // ghi đè tham chiếu

*!*
// đối tượng được tham chiếu trước đó bởi john được lưu trữ bên trong array
// do đó nó sẽ không được thu gom rác
// chúng ta có thể lấy nó như array[0]
*/!*
```

Tương tự như vậy, nếu chúng ta sử dụng một đối tượng làm khóa trong `Map` thông thường, thì trong khi `Map` tồn tại, thì đối tượng đó cũng tồn tại. Nó chiếm bộ nhớ và có thể không được thu gom rác.

Ví dụ:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // ghi đè tham chiếu

*!*
// john được lưu trữ bên trong map,
// chúng ta có thể lấy nó bằng cách sử dụng map.keys()
*/!*
```

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) về cơ bản là khác nhau trong khía cạnh này. Nó không ngăn việc thu gom rác của các đối tượng chính.

Hãy xem ý nghĩa của nó trong các ví dụ.

## WeakMap

Sự khác biệt đầu tiên giữa `Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) và [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) là các khóa phải là đối tượng, không phải giá trị nguyên hàm:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // hoạt động tốt (khóa đối tượng)

*!*
// không thể sử dụng một chuỗi làm khóa
weakMap.set("test", "Whoops"); // Error, bởi vì "test" không phải là một đối tượng
*/!*
```

Bây giờ, nếu chúng ta sử dụng một đối tượng làm khóa trong đó và không có tham chiếu nào khác đến đối tượng đó -- nó sẽ tự động bị xóa khỏi bộ nhớ (và khỏi map).

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // ghi đè tham chiếu

// john bị xóa khỏi bộ nhớ!
```

So sánh nó với ví dụ `Map` thông thường ở trên. Bây giờ nếu `john` chỉ tồn tại dưới dạng khóa của `WeakMap` -- nó sẽ tự động bị xóa khỏi map (và bộ nhớ).

`WeakMap` không hỗ trợ phép lặp và các phương thức `keys()`, `values()`, `entries()`, vì vậy không có cách nào để lấy tất cả các khóa hoặc giá trị từ nó.

`WeakMap` chỉ có các phương thức sau:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

Tại sao lại có hạn chế như vậy? Đó là vì lý do kỹ thuật. Nếu một đối tượng bị mất tất cả các tham chiếu khác (như `john` trong mã ở trên), thì đối tượng đó sẽ được thu gom rác tự động. Nhưng về mặt kỹ thuật, nó không được chỉ định chính xác *khi quá trình thu gom diễn ra*.

JavaScript engine quyết định điều đó. Nó có thể chọn thực hiện dọn dẹp bộ nhớ ngay lập tức hoặc đợi và thực hiện dọn dẹp sau khi có nhiều thao tác xóa hơn. Vì vậy, về mặt kỹ thuật, số phần tử hiện tại của `WeakMap` không được biết. Engine có thể đã dọn nó hoặc chưa, hoặc đã làm một phần. Vì lý do đó, các phương thức truy cập tất cả khóa/giá trị không được hỗ trợ.

Bây giờ, chúng ta cần một cấu trúc dữ liệu như vậy ở đâu?

## Trường hợp sử dụng: dữ liệu bổ sung

Lĩnh vực ứng dụng chính của `WeakMap` là *lưu trữ dữ liệu bổ sung*.

Nếu chúng ta đang làm việc với một đối tượng "thuộc về" một mã khác, thậm chí có thể là thư viện của bên thứ ba và muốn lưu trữ một số dữ liệu được liên kết với nó, dữ liệu đó chỉ tồn tại khi đối tượng còn tồn tại - thì `WeakMap` là chính xác những gì cần thiết.

Chúng ta đặt dữ liệu vào `WeakMap`, sử dụng đối tượng làm khóa và khi đối tượng được thu gom rác, dữ liệu đó cũng sẽ tự động biến mất.

```js
weakMap.set(john, "tài liệu bí mật");
// nếu john chết, tài liệu bí mật sẽ tự động bị hủy
```

Hãy xem một ví dụ.

Chẳng hạn, chúng ta có mã giữ số lượt truy cập cho người dùng. Thông tin được lưu trữ trong map: đối tượng người dùng là khóa và số lượt truy cập là giá trị. Khi người dùng rời đi (đối tượng của nó được thu gom rác), chúng ta không muốn lưu trữ số lượt truy cập của họ nữa.

Đây là một ví dụ về hàm đếm với `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: người dùng => số lượt truy cập

// tăng số lượt truy cập
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Và đây là một phần khác của mã, có thể là một tệp khác sử dụng nó:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // đếm số lượt truy cập của anh ấy

// sau đó john rời khỏi đây
john = null;
```

Bây giờ, đối tượng `john` nên được thu gom rác, nhưng vẫn còn trong bộ nhớ, vì nó là một khóa trong `visitsCountMap`.

Chúng ta cần xóa `visitsCountMap` khi chúng ta xóa người dùng, nếu không nó sẽ phát triển trong bộ nhớ vô thời hạn. Việc làm sạch như vậy có thể trở thành một công việc tẻ nhạt trong các kiến trúc phức tạp.

Thay vào đó, chúng ta có thể tránh nó bằng cách chuyển sang `WeakMap`:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: người dùng => số lượt truy cập

// tăng số lượt truy cập
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Bây giờ chúng ta không phải xóa `visitsCountMap`. Sau khi không thể truy cập đối tượng `john`, bằng mọi cách, ngoại trừ dưới dạng một khóa của `WeakMap`, nó sẽ bị xóa khỏi bộ nhớ, cùng với thông tin theo khóa đó từ `WeakMap`.

## Trường hợp sử dụng: bộ nhớ đệm

Một ví dụ phổ biến khác là bộ nhớ đệm. Chúng ta có thể lưu trữ ("bộ nhớ đệm") kết quả từ một hàm, để các cuộc gọi trong tương lai trên cùng một đối tượng có thể sử dụng lại nó.

Để đạt được điều đó, chúng ta có thể sử dụng `Map` (kịch bản không tối ưu):

```js run
// 📁 cache.js
let cache = new Map();

// tính toán và ghi nhớ kết quả
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* tính toán kết quả cho */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

*!*
// Bây giờ chúng ta sử dụng process() trong một tệp khác:
*/!*

// 📁 main.js
let obj = {/* giả sử chúng ta có một đối tượng */};

let result1 = process(obj); // tính toán

// ...sau đó, từ một nơi khác của mã ...
let result2 = process(obj); // ghi nhớ kết quả lấy từ bộ nhớ đệm

// ...sau này, khi đối tượng không còn cần thiết nữa:
obj = null;

alert(cache.size); // 1 (Ôi! Đối tượng vẫn còn trong bộ đệm, chiếm bộ nhớ!)
```

Đối với nhiều lệnh gọi `process(obj)` với cùng một đối tượng, nó chỉ tính toán kết quả lần đầu tiên và sau đó chỉ lấy kết quả từ `cache`. Nhược điểm là chúng ta cần dọn `cache` khi đối tượng không còn cần thiết nữa.

Nếu chúng ta thay thế `Map` bằng `WeakMap` thì vấn đề này sẽ biến mất. Kết quả được lưu trong bộ nhớ đệm sẽ tự động bị xóa khỏi bộ nhớ sau khi đối tượng được thu gom rác.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// tính toán và ghi nhớ kết quả
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* tính toán kết quả cho */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...sau đó, khi đối tượng không còn cần thiết nữa:
obj = null;

// Không thể lấy cache.size, vì nó là một WeakMap,
// nhưng nó là 0 hoặc sớm là 0
// Khi obj được thu gom rác, dữ liệu được lưu trong bộ nhớ đệm cũng sẽ bị xóa
```

## WeakSet

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) hoạt động tương tự:

- Tương tự như `Set`, nhưng chúng ta chỉ có thể thêm các đối tượng vào `WeakSet` (không phải các đối tượng nguyên hàm).
- Một đối tượng tồn tại trong set trong khi nó có thể truy cập được từ một nơi khác.
- Giống như `Set`, nó hỗ trợ [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) và [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete), nhưng không hỗ trợ `size`, `keys()` và không lặp lại.

Là "yếu", nó cũng đóng vai trò là bộ nhớ bổ sung. Nhưng không phải cho dữ liệu tùy ý, mà là cho các dữ kiện "có/không". Tư cách thành viên trong `WeakSet` có thể có ý nghĩa gì đó về đối tượng.

Chẳng hạn, chúng ta có thể thêm người dùng vào `WeakSet` để theo dõi những người đã truy cập trang web của chúng ta:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John đến thăm chúng ta
visitedSet.add(pete); // Sau đó Pete
visitedSet.add(john); // Lại là John

// visitedSet hiện có 2 người dùng

// kiểm tra xem John có đến thăm không?
alert(visitedSet.has(john)); // true

// kiểm tra xem Mary có đến thăm không?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet sẽ được dọn tự động
```

Hạn chế đáng chú ý nhất của `WeakMap` và `WeakSet` là không có phép lặp và không thể lấy tất cả nội dung hiện tại. Điều đó có vẻ bất tiện, nhưng không ngăn cản `WeakMap/WeakSet` thực hiện công việc chính của chúng -- trở thành nơi lưu trữ dữ liệu "bổ sung" cho các đối tượng được lưu trữ/quản lý ở một nơi khác.

## Tóm tắt

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) là bộ sưu tập giống như `Map` chỉ cho phép các đối tượng làm khóa và loại bỏ chúng cùng với giá trị được liên kết sau khi chúng không thể truy cập được bằng các phương tiện khác.

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) là bộ sưu tập giống như `Set` chỉ lưu trữ các đối tượng và loại bỏ chúng khi chúng không thể truy cập được bằng các cách khác.

Ưu điểm chính của chúng là chúng có tham chiếu yếu đến các đối tượng, vì vậy chúng có thể dễ dàng bị loại bỏ bởi trình thu gom rác.

Điều đó phải trả giá bằng việc không hỗ trợ `clear`, `size`, `keys`, `values`...

`WeakMap` và `WeakSet` được sử dụng làm cấu trúc dữ liệu "phụ" ngoài bộ lưu trữ đối tượng "chính". Sau khi đối tượng bị xóa khỏi bộ lưu trữ chính, nếu đối tượng chỉ được tìm thấy dưới dạng khóa của `WeakMap` hoặc trong `WeakSet`, thì đối tượng đó sẽ tự động được dọn.
