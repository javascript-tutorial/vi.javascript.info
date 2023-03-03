# Số

Trong JavaScript hiện đại, có hai loại số:

1. Các số thông thường trong JavaScript được lưu trữ ở định dạng 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), còn được gọi là "số dấu phẩy động có độ chính xác kép". Đây là những con số mà chúng tA sử dụng hầu hết thời gian và chúng ta sẽ nói về chúng trong chương này.

2. Số BigInt, để biểu diễn số nguyên có độ dài tùy ý. Đôi khi chúng cần thiết vì một số thông thường không được vượt quá <code>2<sup>53</sup></code> hoặc nhỏ hơn <code>-2<sup>53</sup></code> . Vì bigint được sử dụng trong một vài lĩnh vực đặc biệt nên chúng ta dành cho chúng một chương đặc biệt <info:bigint>.

Vì vậy, ở đây chúng ta sẽ nói về các số thông thường. Hãy mở rộng kiến thức của chúng ta về chúng.

## Nhiều cách khác để viết một số

```js
let billion = 1000000000;
```

Chúng ta cũng có thể sử dụng dấu gạch dưới `_` làm dấu phân cách:

```js
let billion = 1_000_000_000;
```

Ở đây, dấu gạch dưới `_` đóng vai trò "đường cú pháp", nó làm cho số dễ đọc hơn. JavaScript engine chỉ cần bỏ qua `_` giữa các chữ số, do đó, nó chính xác là một tỷ như trên.

Tuy nhiên, trong cuộc sống thực, chúng ta cố gắng tránh viết các chuỗi số 0 dài. Chúng ta quá lười biếng cho việc đó. Chúng ta sẽ cố gắng viết thứ gì đó như `"1 tỷ"` cho một tỷ hoặc `"7,3 tỷ"` cho 7 tỷ 300 triệu. Điều này cũng đúng với hầu hết các số lớn.

Trong JavaScript, chúng ta có thể rút ngắn một số bằng cách thêm chữ cái `"e"` vào nó và chỉ định số lượng số 0:

```js run
let billion = 1e9;  // 1 tỷ, nghĩa đen: 1 và 9 số 0

alert( 7.3e9 );  // 7,3 tỷ (giống như 7300000000 hoặc 7_300_000_000)
```

Nói cách khác, `e` nhân số với `1` với số lượng các số 0 đã cho.

```js
1e3 = 1 * 1000 // e3 nghĩa là *1000
1.23e6 = 1.23 * 1000000 // e6 nghĩa là *1000000
```

Bây giờ chúng ta hãy viết một cái gì đó rất nhỏ. Giả sử, 1 micro giây (một phần triệu giây):

```js
let ms = 0.000001;
```

Giống như trước đây, việc sử dụng `"e"` có thể hữu ích. Nếu chúng ta muốn tránh viết các số 0 một cách rõ ràng, chúng ta có thể nói tương tự như:

```js
let ms = 1e-6; // sáu số không ở bên trái từ 1
```

Nếu chúng ta đếm các số 0 trong `0,000001`, thì có 6 số trong số đó. Vì vậy, tự nhiên đó là `1e-6`.

Nói cách khác, một số âm sau `"e"` có nghĩa là phép chia cho 1 với số lượng các số 0 đã cho:

```js
// -3 chia cho 1 với 3 số 0
1e-3 = 1 / 1000 (=0.001)

// -6 chia hết cho 1 với 6 chữ số 0
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

### Số hex, nhị phân và bát phân

[Hệ thập lục phân](https://en.wikipedia.org/wiki/Hệ thập lục phân) được sử dụng rộng rãi trong JavaScript để thể hiện màu sắc, ký tự mã hóa và cho nhiều thứ khác. Vì vậy, một cách tự nhiên, tồn tại một cách viết ngắn hơn: `0x` và sau đó là số.

Ví dụ:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (giống nhau, tviết hoa không quan trọng)
```

Các hệ thống số nhị phân và bát phân hiếm khi được sử dụng, nhưng cũng được hỗ trợ bằng cách sử dụng tiền tố `0b` và `0o`:


```js run
let a = 0b11111111; // dạng nhị phân của 255
let b = 0o377; // dạng bát phân của 255

alert( a == b ); // true, cùng một số 255 ở cả hai bên
```

Chỉ có 3 hệ thống số với sự hỗ trợ như vậy. Đối với các hệ thống số khác, chúng ta nên sử dụng hàm `parseInt` (mà chúng ta sẽ thấy ở phần sau của chương này).

## toString(base)

Phương thức `num.toString(base)` trả về một chuỗi đại diện cho `num` trong hệ thống số với `base` đã cho.

Ví dụ:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` có thể thay đổi từ `2` đến `36`. Theo mặc định, đó là `10`.

Các trường hợp sử dụng phổ biến cho việc này là:

- **base=16** được sử dụng cho màu hex, mã hóa ký tự, v.v., các chữ số có thể là `0..9` hoặc `A..F`.
- **base=2** chủ yếu dùng để gỡ lỗi các hoạt động theo bit, các chữ số có thể là `0` hoặc `1`.
- **base=36** là giá trị lớn nhất, các chữ số có thể là `0..9` hoặc `A..Z`. Toàn bộ bảng chữ cái Latinh được sử dụng để đại diện cho một số. Một trường hợp buồn cười nhưng hữu ích cho `36` là khi chúng ta cần biến một mã định danh số dài thành một số khác ngắn hơn, chẳng hạn như để tạo một url ngắn. Có thể đơn giản biểu diễn nó trong hệ thống số với cơ số `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Hai dấu chấm để gọi một phương thức"
Hãy lưu ý rằng hai dấu chấm trong `123456..toString(36)` không phải là lỗi đánh máy. Nếu chúng ta muốn gọi một phương thức trực tiếp trên một số, như `toString` trong ví dụ trên, thì chúng ta cần đặt hai dấu chấm `..` sau nó.

Nếu chúng ta đặt một dấu chấm đơn: `123456.toString(36)`, thì sẽ xảy ra lỗi, vì cú pháp JavaScript ngụ ý phần thập phân sau dấu chấm đầu tiên. Và nếu chúng ta đặt thêm một dấu chấm, thì JavaScript sẽ biết rằng phần thập phân trống và bây giờ sẽ thực hiện phương thức.

Cũng có thể viết `(123456).toString(36)`.
```

## Làm tròn

Một trong những thao tác được sử dụng nhiều nhất khi làm việc với số là làm tròn số.

Có một số chức năng tích hợp để làm tròn:

`Math.floor`
: Làm tròn xuống: `3.1` trở thành `3` và `-1.1` trở thành `-2`.

`Math.ceil`
: Làm tròn lên: `3.1` trở thành `4` và `-1.1` trở thành `-1`.

`Math.round`
: Làm tròn đến số nguyên gần nhất: `3.1` trở thành `3`, `3.6` trở thành `4`, trường hợp ở giữa: `3.5` cũng làm tròn lên `4`.

`Math.trunc` (không được Internet Explorer hỗ trợ)
: Xóa mọi thứ sau dấu thập phân mà không làm tròn: `3.1` trở thành `3`, `-1.1` trở thành `-1`.

Đây là bảng để tóm tắt sự khác biệt giữa chúng:

| | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`| `3` | `4` | `3` | `3` |
|`3.6`| `3` | `4` | `4` | `3` |
|`-1.1`| `-2` | `-1` | `-1` | `-1` |
|`-1.6`| `-2` | `-1` | `-2` | `-1` |


Các chức năng này bao gồm tất cả các cách có thể để xử lý phần thập phân của một số. Nhưng nếu chúng ta muốn làm tròn số đến chữ số `thứ n` sau dấu thập phân thì sao?

Chẳng hạn, chúng ta có `1.2345` và muốn làm tròn nó thành 2 chữ số, chỉ nhận được `1.23`.

Có hai cách để làm như vậy:

1. Nhân chia.

     Ví dụ: để làm tròn số đến chữ số thứ 2 sau dấu thập phân, chúng ta có thể nhân số đó với `100` (hoặc lũy thừa lớn hơn của 10), gọi hàm làm tròn rồi chia lại.
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. Phương thức [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) làm tròn số thành `n` chữ số sau dấu chấm và trả về một chuỗi đại diện của kết quả.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Điều này làm tròn lên hoặc xuống đến giá trị gần nhất, tương tự như `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Hãy lưu ý rằng kết quả của `toFixed` là một chuỗi. Nếu phần thập phân ngắn hơn yêu cầu, các số 0 sẽ được thêm vào cuối:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", thêm số 0 để tạo thành chính xác 5 chữ số
    ```

    Chúng ta có thể chuyển đổi nó thành một số bằng cách sử dụng phép cộng đơn nguyên hoặc lệnh gọi `Number()`: `+num.toFixed(5)`.

## Tính toán không chính xác

Bên trong, một số được thể hiện ở định dạng 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), do đó, có chính xác 64 bit để lưu trữ một số: 52 bit trong số đó được sử dụng để lưu trữ các chữ số, 11 trong số chúng lưu trữ vị trí của dấu thập phân (chúng bằng 0 đối với số nguyên) và 1 bit dành cho dấu.

Nếu một số quá lớn, nó sẽ tràn bộ nhớ 64-bit, có khả năng tạo ra vô số:

```js run
alert( 1e500 ); // Vô hạn
```

What may be a little less obvious, but happens quite often, is the loss of precision.

Consider this (falsy!) test:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

That's right, if we check whether the sum of `0.1` and `0.2` is `0.3`, we get `false`.

Strange! What is it then if not `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Ouch! There are more consequences than an incorrect comparison here. Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.

But why does this happen?

A number is stored in memory in its binary form, a sequence of bits - ones and zeroes. But fractions like `0.1`, `0.2` that look simple in the decimal numeric system are actually unending fractions in their binary form.

In other words, what is `0.1`? It is one divided by ten `1/10`, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.

So, division by powers `10` is guaranteed to work well in the decimal system, but division by `3` is not. For the same reason, in the binary numeral system, the division by powers of `2` is guaranteed to work, but `1/10` becomes an endless binary fraction.

There's just no way to store *exactly 0.1* or *exactly 0.2* using the binary system, just like there is no way to store one-third as a decimal fraction.

The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don't allow us to see that "tiny precision loss", but it exists.

We can see this in action:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

And when we sum two numbers, their "precision losses" add up.

That's why `0.1 + 0.2` is not exactly `0.3`.

```smart header="Not only JavaScript"
The same issue exists in many other programming languages.

PHP, Java, C, Perl, Ruby give exactly the same result, because they are based on the same numeric format.
```

Can we work around the problem? Sure, the most reliable method is to round the result with the help of a method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
```

Please note that `toFixed` always returns a string. It ensures that it has 2 digits after the decimal point. That's actually convenient if we have an e-shopping and need to show `$0.30`. For other cases, we can use the unary plus to coerce it into a number:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into integers, do the maths, and then divide back. Then, as we're doing maths with integers, the error somewhat decreases, but we still get it on division:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

So, multiply/divide approach reduces the error, but doesn't remove it totally.

Sometimes we could try to evade fractions at all. Like if we're dealing with a shop, then we can store prices in cents instead of dollars. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely possible. Just round them to cut "tails" when needed.

````smart header="The funny thing"
Try running this:

```js run
// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000
```

This suffers from the same issue: a loss of precision. There are 64 bits for the number, 52 of them can be used to store digits, but that's not enough. So the least significant digits disappear.

JavaScript doesn't trigger an error in such events. It does its best to fit the number into the desired format, but unfortunately, this format is not big enough.
````

```smart header="Two zeroes"
Another funny consequence of the internal representation of numbers is the existence of two zeroes: `0` and `-0`.

That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.

In most cases the distinction is unnoticeable, because operators are suited to treat them as the same.
```

## Tests: isFinite and isNaN

Remember these two special numeric values?

- `Infinity` (and `-Infinity`) is a special numeric value that is greater (less) than anything.
- `NaN` represents an error.

They belong to the type `number`, but are not "normal" numbers, so there are special functions to check for them:


- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    But do we need this function? Can't we just use the comparison `=== NaN`? Sorry, but the answer is no. The value `NaN` is unique in that it does not equal anything, including itself:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` converts its argument to a number and returns `true` if it's a regular number, not `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, because a special value: NaN
    alert( isFinite(Infinity) ); // false, because a special value: Infinity
    ```

Sometimes `isFinite` is used to validate whether a string value is a regular number:


```js run
let num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );
```

Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.  

```smart header="Compare with `Object.is`"

There is a special built-in method [`Object.is`](mdn:js/Object/is) that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's true, because internally the number has a sign bit that may be different even if all other bits are zeroes.

In all other cases, `Object.is(a, b)` is the same as `a === b`.

This way of comparison is often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt and parseFloat

Numeric conversion using a plus `+` or `Number()` is strict. If a value is not exactly a number, it fails:

```js run
alert( +"100px" ); // NaN
```

The sole exception is spaces at the beginning or at the end of the string, as they are ignored.

But in real life we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.

That's what `parseInt` and `parseFloat` are for.

They "read" a number from a string until they can't. In case of an error, the gathered number is returned. The function `parseInt` returns an integer, whilst `parseFloat` will return a floating-point number:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
```

There are situations when `parseInt/parseFloat` will return `NaN`. It happens when no digits could be read:

```js run
alert( parseInt('a123') ); // NaN, the first symbol stops the process
```

````smart header="The second argument of `parseInt(str, radix)`"
The `parseInt()` function has an optional second parameter. It specifies the base of the numeral system, so `parseInt` can also parse strings of hex numbers, binary numbers and so on:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Other math functions

JavaScript has a built-in [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object which contains a small library of mathematical functions and constants.

A few examples:

`Math.random()`
: Returns a random number from 0 to 1 (not including 1).

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (any random numbers)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Returns the greatest/smallest from the arbitrary number of arguments.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Returns `n` raised to the given power.

    ```js run
    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024
    ```

There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Summary

To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).

For different numeral systems:

- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.

For converting values like `12pt` and `100px` to a number:

- Use `parseInt/parseFloat` for the "soft" conversion, which reads a number from a string and then returns the value they could read before the error.

For fractions:

- Round using `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` or `num.toFixed(precision)`.
- Make sure to remember there's a loss of precision when working with fractions.

More mathematical functions:

- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small, but can cover basic needs.
