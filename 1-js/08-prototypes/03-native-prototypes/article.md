# Các nguyên mẫu có sẵn

Thuộc tính `"prototype"` được dùng rất nhiều bởi chính JavaScript. Tất cả các constructor có sẵn đều sử dụng nó.

<<<<<<< HEAD
Trước tiên ta tìm hiểu về hàm tạo ra các đối tượng thuần, sau đó là các đối tượng có sẵn phức tạp hơn.
=======
First we'll see at the details, and then how to use it for adding new capabilities to built-in objects.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

## Object.prototype

Giả sử chúng ta có một đối tượng trống:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

Giá trị xuất ra là chuỗi `"[object Object]"` là do phương thức `toString`, còn thực tế `obj` là rỗng và không hề có `toString`. Vậy `toString` lấy ở đâu?

...Thực ra cách viết `obj = {}` hoàn toàn giống `obj = new Object()`, ở đó `Object` là constructor có sẵn, có thuộc tính `prototype` tham chiếu tới một đối tượng khổng lồ chứa rất nhiều phương thức trong đó có `toString`.

Đây là hình ảnh mô tả chuyện gì đã xảy ra:

![](object-prototype.svg)

Khi tạo đối tượng bằng `new Object()` (hoặc bằng `{...}`), `Object.prototype` được gán cho `[[Prototype]]` của đối tượng, đây là quy tắc ta đã học ở bài trước:

![](object-prototype-1.svg)

Cho nên khi gọi `obj.toString()` thì phương thức này được lấy từ `Object.prototype`.

Ta có thể kiểm tra điều này:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

<<<<<<< HEAD
Chú ý rằng `Object.prototype` không có nguyên mẫu, thuộc tính `[[Prototype]]` của nó là `null`:
=======
Please note that there is no more `[[Prototype]]` in the chain above `Object.prototype`:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
alert(Object.prototype.__proto__); // null
```

## Các nguyên mẫu có sẵn khác

Các constructor khác như `Array`, `Date`, `Function` ... cũng có thuộc tính `prototype` nơi giữ các phương thức có sẵn.

<<<<<<< HEAD
Ví dụ, khi tạo tạo mảng `[1, 2, 3]`, JavaScript tự động gọi `new Array()`. Mảng là đối tượng được tạo ra từ `Array`, và do vậy `Array.prototype` trở thành nguyên mẫu của mảng và cung cấp cho mảng nhiều phương thức có sẵn.

Tuy nhiên khác với `Object.prototype` các nguyên mẫu này vẫn có nguyên mẫu. Nguyên mẫu của chúng chính là `Object.prototype`. Do vậy người ta còn nói "mọi thứ đều thừa kế từ `Object.prototype`".
=======
For instance, when we create an array `[1, 2, 3]`, the default `new Array()` constructor is used internally. So `Array.prototype` becomes its prototype and provides methods. That's very memory-efficient.

By specification, all of the built-in prototypes have `Object.prototype` on the top. That's why some people say that "everything inherits from objects".
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Đây là hình ảnh minh họa với 3 nguyên mẫu:

![](native-prototypes-classes.svg)

Cùng kiểm tra lại:

```js run
let arr = [1, 2, 3];

// arr thừa kế từ Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true

// Array.prototype thừa kế từ Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// Object.prototype không thừa kế từ ai cả
alert( arr.__proto__.__proto__.__proto__ ); // null
```

Các phương thức trong các nguyên mẫu có thể "đè" lên nhau, ví dụ, `Array.prototype` có phương thức `toString` giúp liệt kê các phần tử của mảng với dấu phảy ngăn cách:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- là kết quả của Array.prototype.toString
```

Nhưng `Object.prototype` cũng có `toString`. Vậy `arr` lấy `toString` từ `Array.prototype` hay từ `Object.prototype`? Câu trả lời rất đơn giản: nó lấy từ nguyên mẫu gần nó nhất tức `Array.prototype`.


![](native-prototypes-array-tostring.svg)


Trong Developer console của trình duyệt bạn cũng có thể thấy được chuỗi thừa kế bằng lệnh `console.dir`:

![](console_dir_array.png)

Các đối tượng có sẵn khác cũng làm việc tương tự. Ngay cả các hàm -- là đối tượng tạo ra bởi constructor `Function`, thực ra lấy các phương thức của nó(`call`/`apply` và phương thức khác) từ `Function.prototype`. Các hàm cũng có được phương thức `toString` từ đây.

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true
```

## Các giá trị kiểu cơ sở

Đối với các giá trị kiểu cơ sở như chuỗi, số và giá trị lôgic câu chuyện có phức tạp hơn đôi chút.

<<<<<<< HEAD
Như ta đã biết, chúng không phải là các đối tượng. Nhưng nếu ta cố tình truy cập các thuộc tính hay phương thức của chúng, một đối tượng bao được tạo bằng các constructor `String`, `Number`, `Boolean` sẽ thay thế và cung cấp các thuộc tính và phương thức này. Sau khi sử dụng xong đối tượng bảo bị xóa.
=======
As we remember, they are not objects. But if we try to access their properties, temporary wrapper objects are created using built-in constructors `String`, `Number` and `Boolean`. They provide the methods and disappear.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Các thuộc tính và phương thức của đối tượng thực ra cũng được lấy từ các nguyên mẫu sẵn có đó là `String.prototype`, `Number.prototype` và `Boolean.prototype`.

<<<<<<< HEAD
```warn header="Các giá trị `null` and `undefined` không có đối tượng bao"
Các giá trị `null` và `undefined` khác với tất cả các giá trị cơ sở khác. Chúng không có đối tượng bao, nên cũng không có các thuộc tính và phương thức. Và do đó cũng không có nguyên mẫu.
=======
```warn header="Values `null` and `undefined` have no object wrappers"
Special values `null` and `undefined` stand apart. They have no object wrappers, so methods and properties are not available for them. And there are no corresponding prototypes either.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
```

## Thay đổi các nguyên mẫu có sẵn [#native-prototype-change]

Các nguyên mẫu có sẵn có thể thay đổi được. Ví dụ, nếu bạn thêm vào `String.prototype` một phương thức, phương thức này có thể được dùng cho mọi chuỗi:

```js run
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

Trong quá trình phát triển, chúng ta có thể có những ý tưởng về các phương thức mới và muốn thêm nó vào các nguyên mẫu có sẵn. Nhưng đây không phải là cách làm tốt.

```warn
<<<<<<< HEAD
Các nguyên mẫu được dùng ở mọi nơi, nên rất dễ xảy ra xung đột. Nếu hai thư viện cùng thêm phương thức `String.prototype.show`, một trong số chúng sẽ ghi đè lên thư viện kia.
=======
Prototypes are global, so it's easy to get a conflict. If two libraries add a method `String.prototype.show`, then one of them will be overwriting the method of the other.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Vì thế, nói chung sửa đổi nguyên mẫu có sẵn là một ý tưởng tồi.
```

**Trong lập trình hiện đại, chỉ có một trường hợp duy nhất có thể thay đổi nguyên mẫu có sẵn.Đó là polyfilling.**

<<<<<<< HEAD
Polyfilling là tạo một phương thức thay thế cho một phương thức đã có trong đặc tả nhưng chưa được hỗ trợ bởi JavaScript engine hiện tại.

Lúc này ta phải tự viết phương thức sao cho nó hoạt động giống như phương thức trong đặc tả, sau đó thêm nó vào nguyên mẫu như trong đặc tả.
=======
Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification, but is not yet supported by a particular JavaScript engine.

We may then implement it manually and populate the built-in prototype with it.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Ví dụ:

```js run
if (!String.prototype.repeat) { // nếu không có phương thức
  // thêm nó vào nguyên mẫu này

  String.prototype.repeat = function(n) {
    // lặp lại chuỗi n lần

<<<<<<< HEAD
    // thực tế mã phức tạp hơn một chút
    // (toàn bộ thuật toán có trong đặc tả)
    // nhưng một phiên bản polyfill chưa hoàn hảo cũng đủ dùng rồi
=======
    // actually, the code should be a little bit more complex than that
    // (the full algorithm is in the specification)
<<<<<<< HEAD
    // but even an imperfect polyfill is often considered good enough for use
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
=======
    // but even an imperfect polyfill is often considered good enough
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```


## Mượn phương thức từ các nguyên mẫu

Trong bài <info:call-apply-decorators#method-borrowing> chúng ta đã nói về mượn phương thức.

Đó là khi chúng ta lấy phương thức của một đối tượng và dùng cho đối tượng khác.

Một số phương thức của các nguyên mẫu có sẵn cũng có thể mượn được.

<<<<<<< HEAD
Ví dụ, nếu chúng ta tạo một mảng giả, chúng ta muốn lấy vài phương thức của mảng thật cho nó.
=======
For instance, if we're making an array-like object, we may want to copy some `Array` methods to it.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Ví dụ:

```js run
let obj = {
  0: "Chào",
  1: "thế giới!",
  length: 2,
};

*!*
obj.join = Array.prototype.join;
*/!*

alert( obj.join(',') ); // Chào thế giới!
```

<<<<<<< HEAD
Nó làm việc, bởi vì thuật toán bên trong của `join` hoàn toàn áp dụng được cho mảng giả. Còn nhiều phương thức có sẵn khác cũng có thể mượn được như vậy.
=======
It works because the internal algorithm of the built-in `join` method only cares about the correct indexes and the `length` property. It doesn't check if the object is indeed an array. Many built-in methods are like that.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Có một cách khác đó là cài đặt `obj.__proto__` thành `Array.prototype`, và `obj` mượn được tất cả các phương thức của mảng.

Điều này không thể thực hiện nếu `obj` đã có một nguyên mẫu khác. Nhớ rằng, một đối tượng tại một thời điểm chỉ có một nguyên mẫu.

<<<<<<< HEAD
Việc mượn phương thức rất mềm dẻo, nó cho phép phối hợp các tính năng từ nhiều đối tượng để áp dụng cho đối tượng hiện tại.
=======
Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

## Tóm tắt

<<<<<<< HEAD
- Tất cả các đối tượng có sẵn đều tuân theo mô hình:
    - Các phương thức lưu trong nguyên mẫu (`Array.prototype`, `Object.prototype`, `Date.prototype`...).
    - Đối tượng chỉ chứa dữ liệu (phần tử mảng, thuộc tính, ngày/tháng...).
- Các giá trị cơ sở giữ phương thức trong nguyên mẫu của đối tượng bao: `Number.prototype`, `String.prototype`, `Boolean.prototype`. Chỉ `undefined` và `null` không có đối tượng bao.
- Các nguyên mẫu có sẵn có thể thay đổi được hoặc bổ sung thêm phương thức mới. Nhưng không nên sửa chúng. Chỉ nên sửa nếu ta cần thêm các phương thức mới có trong đặc tả nhưng chưa được JavaScript engine hỗ trợ.
=======
- All built-in objects follow the same pattern:
    - The methods are stored in the prototype (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
    - The object itself stores only the data (array items, object properties, the date)
- Primitives also store methods in prototypes of wrapper objects: `Number.prototype`, `String.prototype` and `Boolean.prototype`. Only `undefined` and `null` do not have wrapper objects
- Built-in prototypes can be modified or populated with new methods. But it's not recommended to change them. The only allowable case is probably when we add-in a new standard, but it's not yet supported by the JavaScript engine
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
