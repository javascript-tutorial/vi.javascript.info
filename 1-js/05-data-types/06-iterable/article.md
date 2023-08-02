
# Iterable

Các đối tượng *iterable* là sự tổng quát hóa của các array. Đó là một khái niệm cho phép chúng ta làm cho bất kỳ đối tượng nào có thể sử dụng được trong vòng lặp `for..of`.

Tất nhiên, array là iterable. Nhưng có nhiều đối tượng tích hợp khác cũng là iterable. Chẳng hạn, các chuỗi cũng là iterable.

Nếu một đối tượng về mặt kỹ thuật không phải là một array, nhưng đại diện cho một tập hợp (danh sách, bộ) của một thứ gì đó, thì `for..of` là một cú pháp tuyệt vời để lặp qua nó, vì vậy hãy xem cách làm cho nó hoạt động.


## Symbol.iterator

Chúng ta có thể dễ dàng nắm bắt khái niệm iterable bằng cách tạo một cái của riêng mình.

Chẳng hạn, chúng ta có một đối tượng không phải là một array, nhưng có vẻ phù hợp với `for..of`.

Giống như một đối tượng `range` đại diện cho một khoảng số:

```js
let range = {
  from: 1,
  to: 5
};

// Chúng ta muốn for..of hoạt động:
// for(let num of range) ... num=1,2,3,4,5
```

Để làm cho đối tượng `range` là iterable (và do đó để `for..of` hoạt động), chúng ta cần thêm một phương thức vào đối tượng có tên `Symbol.iterator` (một ký hiệu tích hợp đặc biệt dành riêng cho điều đó).

1. Khi `for..of` bắt đầu, nó sẽ gọi phương thức đó một lần (hoặc báo lỗi nếu không tìm thấy). Phương thức phải trả về một *iterator* -- một đối tượng có phương thức `next`.
2. Về sau, `for..of` hoạt động *chỉ với đối tượng được trả về đó*.
3. Khi `for..of` muốn giá trị tiếp theo, nó sẽ gọi `next()` trên đối tượng đó.
4. Kết quả của `next()` phải có dạng `{done: Boolean, value: any}`, trong đó `done=true` có nghĩa là vòng lặp kết thúc, nếu không thì `value` là giá trị tiếp theo.

Đây là triển khai đầy đủ cho `range` với nhận xét:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. gọi for..of ban đầu gọi đây
range[Symbol.iterator] = function() {

  // ...nó trả về đối tượng iterator:
   // 2. Về sau, for..of chỉ hoạt động với đối tượng iterator bên dưới, yêu cầu nó cung cấp các giá trị tiếp theo
  return {
    current: this.from,
    last: this.to,

    // 3. next() được gọi trên mỗi lần lặp bởi vòng lặp for..of
    next() {
      // 4. nó sẽ trả về giá trị như một đối tượng {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// bây giờ nó hoạt động!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Hãy lưu ý tính năng cốt lõi của iterable: tách các mối liên quan.

- Bản thân `range` không có phương thức `next()`.
- Thay vào đó, một đối tượng khác, cái gọi là "iterator" được tạo bởi lệnh gọi `range[Symbol.iterator]()`, và `next()` của nó tạo ra các giá trị cho phép lặp.

Vì vậy, đối tượng iterator tách biệt với đối tượng mà nó lặp lại.

Về mặt kỹ thuật, chúng ta có thể hợp nhất chúng và sử dụng chính `range` làm iterator để làm cho mã đơn giản hơn.

Như thế này:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Bây giờ `range[Symbol.iterator]()` trả về chính đối tượng `range`: nó có phương thức `next()` cần thiết và ghi nhớ tiến trình lặp hiện tại trong `this.current`. Ngắn hơn ư? Đúng. Và đôi khi điều đó cũng tốt.

Nhược điểm là bây giờ không thể có hai vòng lặp `for..of` chạy trên đối tượng đồng thời: chúng sẽ chia sẻ trạng thái lặp, bởi vì chỉ có một iterator -- chính đối tượng đó. Nhưng hai `for-of` song song là một điều hiếm gặp, ngay cả trong các tình huống không đồng bộ.

```smart header="Iterator vô hạn"
Iterator vô hạn cũng có thể làm được. Chẳng hạn, `range` trở thành vô hạn đối với `range.to = Infinity`. Hoặc chúng ta có thể tạo một đối tượng iterable để tạo ra một chuỗi vô hạn các số giả ngẫu nhiên. Cũng có thể hữu ích.

Không có giới hạn nào đối với `next`, nó có thể trả về ngày càng nhiều giá trị hơn, đó là điều bình thường.

Tất nhiên, vòng lặp `for..of` trên một lần lặp như vậy sẽ là vô tận. Nhưng chúng ta luôn có thể dừng nó bằng cách sử dụng `break`.
```


## Chuỗi là iterable

Array và chuỗi là các iterable tích hợp được sử dụng rộng rãi nhất.

Đối với một chuỗi, `for..of` lặp qua các ký tự của nó:

```js run
for (let char of "test") {
  // kích hoạt 4 lần: một lần cho mỗi ký tự
  alert( char ); // t, sau đó e, sau đó s, sau đó t
}
```

Và nó hoạt động chính xác với các cặp thay thế!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, và sau đó 😂
}
```

## Gọi một iterator một cách rõ ràng

Để hiểu sâu hơn, hãy xem cách sử dụng iterator một cách rõ ràng.

Chúng ta sẽ lặp qua một chuỗi theo cách chính xác giống như `for..of`, nhưng với các lệnh gọi trực tiếp. Mã này tạo một iterator chuỗi và nhận các giá trị từ nó "thủ công":

```js run
let str = "Hello";

// làm tương tự như
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // xuất từng ký tự một
}
```

Điều đó hiếm khi cần thiết, nhưng cho phép chúng ta kiểm soát quy trình nhiều hơn so với `for..of`. Chẳng hạn, chúng ta có thể chia quá trình lặp lại: lặp lại một chút, sau đó dừng lại, làm việc khác rồi tiếp tục sau.

## Iterable và dạng array [#array-like]

Hai thuật ngữ chính thức trông giống nhau, nhưng rất khác nhau. Hãy chắc chắn rằng bạn hiểu rõ về chúng để tránh nhầm lẫn.

- *Iterable* là các đối tượng triển khai phương thức `Symbol.iterator`, như được mô tả ở trên.
- *Dạng array* là các đối tượng có chỉ mục và `length`, vì vậy chúng có dạng array.

Khi chúng ta sử dụng JavaScript cho các tác vụ thực tế trong trình duyệt hoặc bất kỳ môi trường nào khác, chúng ta có thể gặp các đối tượng iterable hoặc có dạng array hoặc cả hai.

Chẳng hạn, các chuỗi đều là iterable (`for..of` hoạt động trên chúng) và có dạng array (chúng có chỉ mục số và `length`).

Nhưng nếu đã là iterable thì có thể không có dạng array. Và ngược lại, một cái dạng array có thể không phải iterable.

Ví dụ: `range` trong ví dụ trên là iterable, nhưng không có dạng array, bởi vì nó không có các thuộc tính được lập chỉ mục và `length`.

Và đây là đối tượng dạng array, nhưng không phải iterable:

```js run
let arrayLike = { // có chỉ mục và length => dạng array
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Cả iterable và dạng array thường *không phải array*, chúng không có `push`, `pop`, v.v. Điều đó khá bất tiện nếu chúng ta có một đối tượng như vậy và muốn làm việc với nó như với một array. Ví dụ. chúng ta muốn làm việc với `range` bằng các phương thức array. Làm thế nào để đạt được điều đó?

## Array.from

Có một phương thức phổ quát [Array.from](mdn:js/Array/from) nhận một giá trị iterable hoặc dạng array và tạo một `Array` "thực" từ nó. Sau đó, chúng ta có thể gọi các phương thức array trên đó.

Ví dụ:

```js run
let arrayLike = {
  0: "Xin chào",
  1: "Thế giới",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // Thế giới (phương thức hoạt động)
```

`Array.from` tại dòng `(*)` lấy đối tượng, kiểm tra xem nó là iterable hay dạng array, sau đó tạo một array mới và sao chép tất cả các mục vào đó.

Điều tương tự cũng xảy ra với một iterable:

```js run
// giả sử range được lấy từ ví dụ trên
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString chuyển đổi hoạt động)
```

Cú pháp đầy đủ cho `Array.from` cũng cho phép chúng ta cung cấp hàm "mapping" tùy chọn:
```js
Array.from(obj[, mapFn, thisArg])
```

Đối số thứ hai tùy chọn `mapFn` có thể là một hàm sẽ được áp dụng cho từng phần tử trước khi thêm nó vào array và `thisArg` cho phép chúng ta đặt `this` cho nó.

Ví dụ:

```js run
// giả sử range được lấy từ ví dụ trên

// bình phương mỗi số
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Ở đây chúng ta sử dụng `Array.from` để biến một chuỗi thành một array ký tự:

```js run
let str = '𝒳😂';

// tách str thành array ký tự
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

Không giống như `str.split`, nó dựa vào tính chất có thể lặp lại của chuỗi và do đó, giống như `for..of`, hoạt động chính xác với các cặp thay thế.

Về mặt kỹ thuật ở đây, nó hoạt động giống như:

```js run
let str = '𝒳😂';

let chars = []; // Array.from bên trong thực hiện cùng một vòng lặp
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...Nhưng nó ngắn hơn.

Chúng ta thậm chí có thể xây dựng `slice` nhận biết thay thế trên đó:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// phương thức gốc không hỗ trợ các cặp thay thế
alert( str.slice(1, 3) ); // rác (hai mảnh từ các cặp thay thế khác nhau)
```


## Tóm tắt

Các đối tượng có thể được sử dụng trong `for..of` được gọi là *iterable*.

- Về mặt kỹ thuật, iterable phải triển khai phương thức có tên `Symbol.iterator`.
     - Kết quả của `obj[Symbol.iterator]()` được gọi là *iterator*. Nó xử lý quá trình lặp lại hơn nữa.
     - Iterator phải có phương thức có tên là `next()` trả về một đối tượng `{done: Boolean, value: any}`, ở đây `done:true` biểu thị kết thúc quá trình lặp, nếu không thì `value` là giá trị tiếp theo.
- Phương thức `Symbol.iterator` được gọi tự động bởi `for..of`, nhưng chúng ta cũng có thể thực hiện trực tiếp.
- Các iterator tích hợp sẵn như chuỗi hoặc array, cũng triển khai `Symbol.iterator`.
- Iterator chuỗi biết về các cặp thay thế.


Các đối tượng có các thuộc tính được lập chỉ mục và `length` được gọi là *dạng array*. Các đối tượng như vậy cũng có thể có các thuộc tính và phương thức khác, nhưng thiếu các phương thức tích hợp sẵn của array.

Nếu chúng ta xem xét bên trong đặc điểm kỹ thuật -- chúng ta sẽ thấy rằng hầu hết các phương thức tích hợp sẵn đều giả định rằng chúng hoạt động với các iterable hoặc dạng array thay vì array "thực", vì điều đó trừu tượng hơn.

`Array.from(obj[, mapFn, thisArg])` tạo một `Array` thực từ một `obj` iterable hoặc có dạng array, và sau đó chúng ta có thể sử dụng các phương thức array trên đó. Các đối số tùy chọn `mapFn` và `thisArg` cho phép chúng ta áp dụng một hàm cho từng mục.
