# Data types

<<<<<<< HEAD
Một biến trong JavaScript có thể lưu bất cứ kiểu dữ liệu nào. Chẳng hạn một biến lúc này lưu một chuỗi và lúc khác lưu một số.
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```js
// no error
let message = "hello";
message = 123456;
```

<<<<<<< HEAD
Ngôn ngữ lập trình cho phép điều này gọi là "ngôn ngữ có kiểu động" hay "dynamically typed", nghĩa là vẫn có các kiểu dữ liệu khác nhau, nhưng một biến không bị ràng buộc với một kiểu dữ liệu duy nhất.

Có 7 kiểu dữ liệu "cơ bản" trong JavaScript. Ở bài này ta chỉ giới thiệu qua về chúng và ở những bài sau sẽ tìm hiểu chi tiết từng kiểu dữ liệu.

## Kiểu số
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.

## Number
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```js
let n = 123;
n = 12.345;
```

Kiểu *số* biểu diễn được cả số nguyên lẫn số thực.

Có nhiều toán tử làm việc với các số như: nhân `*`, chia `/`, cộng `+`, trừ `-`, ...

Ngoài các số thông thường, còn có các giá trị số đặc biệt khác là: `Infinity`, `-Infinity` và `NaN`.

- `Infinity` biểu diễn giá trị [vô cùng](https://en.wikipedia.org/wiki/Infinity) ∞ trong toán học. Nó là một giá trị đặc biệt lớn hơn bất kỳ số nào.

    Chúng ta có thể thu được giá trị này bằng cách chia một số dương cho không:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Hoặc chỉ trực tiếp:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` biểu diễn một lỗi tính toán. Nó là kết quả của một phép tính sai hoặc không xác định:

    ```js run
    alert( "not a number" / 2 ); // NaN
    ```

    Khi `NaN` xuất hiện. Bất kỳ phép tính nào sau đó đều trả về `NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    Cho nên, nếu `NaN` xuất hiện trong một biểu thức toán học, nó lan truyền tới kết quả của cả biểu thức.

```smart header="Các phép toán luôn an toàn"
Làm toán trong JavaScript rất "an toàn". Ta có thể làm bất cứ thứ gì: chia cho không, coi một chuỗi như một số, ...

Script sẽ không bao giờ dừng lại. Tệ nhất, chúng ta cũng nhận được giá trị `NaN`.
```

Các giá trị đặc biệt được đặt vào kiểu "số". Tất nhiên chúng không phải số là theo cách hiểu thông thường về số.

Ta sẽ học được nhiều hơn về các số ở bài <info:number>.

<<<<<<< HEAD
## Kiểu chuỗi
=======
## BigInt

In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.


```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## String
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Một chuỗi trong JavaScript bắt buộc phải nằm giữa các quote.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

Trong JavaScript, có 3 kiểu quote:

1. Double quote: `"Hello"`.
2. Single quote: `'Hello'`.
3. Backtick: <code>&#96;Hello&#96;</code>.

<<<<<<< HEAD
Double và single quotes là các quote "đơn giản". Không có sự khác biệt nào giữa chúng trong JavaScript.
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Backtick được xem là quote được mở rộng tính năng. Nó cho phép ta nhúng biến và biểu thức vào chuỗi bằng cách đặt chúng trong `${…}`, ví dụ:

```js run
let name = "John";

// nhúng một biến
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// nhúng một biểu thức
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

Biểu thức trong `${…}` được chạy và kết quả của nó trở thành một phần của chuỗi. Chúng ta có thể đặt bất cứ gì vào đó: một biến như `name` hay một biểu thức số học như `1 + 2` hoặc biểu thức phức tạp hơn.

Chú ý rằng chỉ backtick cho phép tính năng này. Single quote và double quote không hỗ trợ!
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2}
```

Chúng ta sẽ tìm hiểu về chuỗi kỹ hơn ở bài <info:string>.

<<<<<<< HEAD
```smart header="Không có kiểu *ký tự*."
Trong một số ngôn ngữ khác, có một kiểu dữ liệu đặc biệt gọi là kiểu "ký tự" dùng để biểu diễn một kí tự. Ví dụ, trong ngôn ngữ C và trong Java nó là `char`.

Trong JavaScript, không có kiểu này. Chỉ có kiểu chuỗi: `string`. Một chuỗi có thể gồm chỉ một kí tự hoặc nhiều kí tự.
```

## Kiểu lôgic
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
```

## Boolean (logical type)
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Kiểu lôgic chỉ có hai giá trị: `true` và `false`.

Kiểu này thường dùng để lưu các giá có/không: `true` nghĩa là "có, đúng", và `false` nghĩa là "không, sai".

Ví dụ:

```js
let nameFieldChecked = true; // có, trường name đã được kiểm tra
let ageFieldChecked = false; // không, trường age chưa được kiểm tra
```

Giá trị lôgic cũng là kết quả của các phép so sánh:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (kết quả so sánh là "đúng")
```

Chúng ta sẽ tìm hiểu sâu hơn về kiểu này trong bài <info:logical-operators>.

## giá trị "null"

Giá trị đặc biệt `null` không thuộc về bất cứ kiểu nào đã nói ở trên.

Mình nó tạo nên một kiểu riêng, kiểu này chỉ có duy nhất giá trị `null`:

```js
let age = null;
```

Trong JavaScript, `null` không phải là "tham chiếu tới đối tượng không tồn tại" hoặc một "con trỏ null" như vài ngôn ngữ khác.

Nó chỉ là một giá trị đặc biệt biểu diễn sự "trống rỗng" hoặc "không có gì" hoặc một "giá trị không biết".

<<<<<<< HEAD
Đoạn mã trên cho biết rằng `age` không được biết hoặc còn trống vì lý do nào đó.
=======
The code above states that `age` is unknown.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

## Giá trị "undefined"

Giá trị đặc biệt `undefined` cũng đứng một mình. Nó tạo ra một kiểu riêng, giống như `null`.

Ý nghĩa của `undefined` là "chưa được gán giá trị".

Nếu một biến đã được khai báo, nhưng chưa được gán, giá trị của nó là `undefined`:

```js run
let age;

<<<<<<< HEAD
alert(x); // hiện "undefined"
```

Nói chính xác, có thể gán giá trị `undefined` cho bất cứ biến nào:
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...Nhưng không nên làm như vậy. Thường, chúng ta sử dụng `null` để gán một giá trị "trống" hoặc "không biết" cho một biến, và sử dụng `undefined` chỉ để kiểm tra một biến đã được gán giá trị hay chưa.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

## Kiểu đối tượng (Object) và kiểu Symbol

Kiểu đối tượng hay `object` là một kiểu đặc biệt.

<<<<<<< HEAD
Mọi kiểu dữ liệu khác được gọi là kiểu "cơ sở" bởi giá trị của chúng chỉ gồm một thứ (một chuỗi, một số hoặc một cái gì đó). Ngược lại, các đối tượng được dùng để lưu trữ nhiều thứ cùng lúc. Chúng ta sẽ tiếp xúc với chúng trong bài <info:object> sau khi đã học về các kiểu cơ sở.

Kiểu `symbol` được dùng để tạo ra các định danh duy nhất cho các đối tượng. Ta chỉ nói về nó ở đây cho đầy đủ, nhưng tốt hơn nên học nó sau khi đã học về các đối tượng.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

## Toán tử typeof [#type-typeof]

Toán tử `typeof` trả về kiểu của đối số. Nó hữu dụng khi chúng ta muốn kiểm tra kiểu dữ liệu của một giá trị để thực hiện các công việc khác nhau dựa trên kết quả.

Nó hỗ trợ hai cú pháp:

1. Như một toán tử: `typeof x`.
2. Như một hàm: `typeof(x)`.

Nói cách khác, nó làm việc với cả dạng có dấu ngoặc đơn hoặc không có dấu ngoặc đơn. Kết quả hoàn toàn giống nhau.

Gọi `typeof x` trả về một chuỗi mô tả tên của kiểu dữ liệu:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Ba dòng cuối cần phải giải thích thêm:

<<<<<<< HEAD
1. `Math` là một đối tượng có sẵn cung cấp nhiều toán tử toán học. Chúng ta sẽ học về nó ở bài <info:number>. Ở đây, nó chỉ dùng làm ví dụ cho một đối tượng bất kỳ.
2. Kết quả của `typeof null` là `"object"`. Điều này sai. Nó là một lỗi được chấp nhận của `typeof`, được giữ lại để tương thích với các phiên bản cũ của ngôn ngữ. Tất nhiên, `null` không phải là đối tượng. Nó là một giá trị đặc biệt tạo nên một kiểu riêng. Một lần nữa nhắc lại đây là một lỗi của ngôn ngữ JavaScript.
3. Kết quả của `typeof alert` là `"function"`, bởi `alert` là một hàm (function). Chúng ta sẽ học về các hàm ở một bài tiếp theo, ở đó ta sẽ thấy rằng không có kiểu nào gọi là "function" trong JavaScript cả. Các hàm (function) cũng là các đối tượng. Nhưng `typeof` coi nó khác đi, trả về `"function"`. Điều này tuy không chính xác, nhưng lại rất tiện lợi khi lập trình.

=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

## Tóm tắt

<<<<<<< HEAD
Có 7 kiểu dữ liệu cơ bản trong JavaScript.

- `number` biểu diễn số bất kỳ: số nguyên hoặc số thực.
- `string` biểu diễn chuỗi ký tự. Một chuỗi kí tự gồm một hoặc nhiều kí tự, không có kiểu biểu diễn riêng một kí tự.
- `boolean` biểu diễn các kết luận đúng/sai.
- `null` biểu diễn giá trị chưa biết -- kiểu này chỉ gồm một giá trị duy nhất là `null`.
- `undefined` biểu diễn giá trị chưa gán -- kiểu này chỉ gồm một giá trị duy nhất là `undefined`.
- `object` biểu diễn các cấu trúc dữ liệu phức tạp, lưu trữ cùng lúc nhiều thứ.
- `symbol` biểu diễn các định danh duy nhất.
=======
There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Toán tử `typeof` cho phép chúng ta biết kiểu của giá trị lưu trong một biến.

- Hai dạng: `typeof x` hoặc `typeof(x)`.
- Trả về chuỗi biểu diễn tên của kiểu dữ liêu, ví dụ `"string"`.
- Với `null` nó trả về `"object"` -- đây là một lỗi còn tồn tại trong ngôn ngữ, nó không thực sự là một đối tượng.

Ở các bài tiếp theo, chúng ta sẽ tập trung vào các kiểu dữ liệu cơ sở và khi đã quen thuộc với chúng, ta sẽ chuyển tới các đối tượng.
