# Các phép so sánh

Chúng ta biết có nhiều phép toán so sánh trong toán học:

- Lớn hơn/nhỏ hơn: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Lớn hơn/nhỏ hơn hoặc bằng: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- So sánh bằng: `a == b` (hãy để ý là có 2 dấu bằng `=`. Nếu chỉ có 1 ký hiệu `a = b` thì có nghĩa đây là 1 phép gán).
- So sánh khác. Trong toán học có ký hiệu là <code>&ne;</code>, còn trong JavaScript nó được viết như là một phép gán với một dấu chấm than phía trước: <code>a != b</code>.

## Kết quả sẽ là giá trị Boolean

Giống như tất cả các phép toán khác, phép so sánh có kết quả là 1 giá trị. Trong trường hợp này, giá trị đó là một boolean.

- `true` -- nghĩa là "có", "đúng" hay "sự thật".
- `false` -- nghĩa là "không", "sai" hay "không đúng sự thật".

Ví dụ:

```js run
alert(2 > 1); // true (đúng)
alert(2 == 1); // false (sai)
alert(2 != 1); // true (đúng)
```

Kết quả của 1 phép so sánh có thể được gán vào 1 biến khác, như bất cứ giá trị nào:

```js run
let result = 5 > 4; // gán kết quả của phép so sánh
alert(result); // true
```

## So sánh chuỗi

Để kiểm tra 1 chuỗi ký tự có lớn hơn 1 chuỗi khác hay không, JavaScript sử dụng thứ tự từ điển.

Nói cách khác, các chuỗi được so sánh từng chữ cái.

Ví dụ:

```js run
alert("Z" > "A"); // true
alert("Glow" > "Glee"); // true
alert("Bee" > "Be"); // true
```

Thuật toán để so sánh 2 chuỗi ký tự đơn giản như sau:

1. So sánh ký tự đầu tiên của cả 2 chuỗi.
2. Nếu ký tự đầu tiên của chuỗi thứ nhất lớn hơn (hoặc nhỏ hơn) ký tự đầu tiên của chuỗi còn lại, nghĩa là chuỗi thứ nhất lớn hơn (hoặc nhỏ hơn) chuỗi thứ hai. Chúng ta đã xong.
3. Mặt khác, nếu các ký tự đầu tiên của cả hai chuỗi giống nhau, chúng ta sẽ so sánh các ký tự thứ hai giống như vậy.
4. Lặp lại cho tới ký tự cuối của một trong hai chuỗi.
5. Nếu cả 2 chuỗi có cùng chiều dài, thì 2 chuỗi bằng nhau. Ngược lại, chuỗi dài hơn thì lớn hơn.

Trong ví dụ trên, phép so sánh `'Z' > 'A'` có kết quả ở ngay bước đầu tiên trong khi 2 chuỗi `"Glow"` và `"Glee"` được so sánh từng ký tự như sau:

1. `G` hoàn toàn giống với `G`.
2. `l` hoàn toàn giống với `l`.
3. `o` thì lớn hơn `e`. Dừng lại. Chuỗi đầu tiên lớn hơn.

```smart header="Not a real dictionary, but Unicode order"
Thuật toán so sánh được đưa ra ở trên gần tương đương với thuật toán được sử dụng trong từ điển hoặc danh bạ điện thoại, nhưng nó không hoàn toàn giống nhau.

Ví dụ, chữ thường và chữ hoa. Một chữ cái viết hoa `"A"` sẽ không bằng chữ thường `"a"`. Vậy cái nào lớn hơn? Chữ thường `"a"`. Tại sao? Bởi vì ký tự chữ thường có chỉ mục lớn hơn trong bảng mã hóa nội bộ mà JavaScript sử dụng (Unicode). Chúng ta sẽ quay lại chi tiết cụ thể và hậu quả của việc này trong chương này<info:string>.
```

## So sánh khác kiểu

Khi so sánh giá trị của các kiểu dữ liệu khác nhau, JavaScript chuyển đổi các giá trị về kiểu số.

Ví dụ:

```js run
alert("2" > 1); // true, chuỗi '2' trở thành số 2
alert("01" == 1); // true, chuỗi '01' trở thành số 1
```

Với các giá trị boolean, `true` trở thành `1` và `false` trở thành `0`.

Ví dụ:

```js run
alert(true == 1); // true
alert(false == 0); // true
```

````smart header="Một kết quả hay ho"
Có khả năng sẽ xảy ra cùng 1 lúc:

- Hai giá trị bằng nhau.
- Một là `true` trong kiểu boolean và giá trị còn lại là `false` trong kiểu boolean.

Ví dụ:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

Với JavaScript, kết quả này là khá bình thường. Việc kiểm tra bằng nhau sẽ chuyển đổi các giá trị về kiểu số (vì thế `"0"` trở thành `0`), trong khi rõ ràng việc chuyển đổi về `Boolean` sử dụng 1 tập các quy tắc khác.
````

## So sánh bằng nhau một cách chặt chẽ

Việc kiểm tra bằng thông thường `==` có 1 vấn đề. Nó không thể phân biệt `0` với `false`:

```js run
alert(0 == false); // true
```

Điều tương tự cũng xảy ra với chuỗi rỗng:

```js run
alert("" == false); // true
```

Điều này xảy ra vì các giá trị khác kiểu đều được chuyển thành kiểu số với phép so sánh bằng `==`. Một chuỗi rỗng, cũng như `false`, đều trở thành 0.

Vậy nếu chúng ta muốn phân biệt `0` với `false`?

**Một phép toán kiểm tra bằng nhau chặt chẽ `===` sẽ kiểm tra bằng nhau mà không chuyển đổi kiểu.**

Nói cách khác, nếu `a` và `b` khác kiểu dữ liệu, thì `a === b` ngay lập tức trả về `false` mà không cần chuyển đổi chúng.

Hãy thử xem:

```js run
alert(0 === false); // false, vì kiểu dữ liệu khác nhau
```

Cũng có một phép toán "kiểm tra khác nhau chặt chẽ" `!==` tương tự như `!=`.

Phép toán kiểm tra bằng nhau chặt chẽ có thể dài hơn 1 chút khi viết, nhưng làm cho nó rõ ràng những gì đang xảy ra và để lại ít lỗi hơn.

## So sánh với null và undefined

Có một hành vi không trực quan khi `null` hay `undefined` được so sánh với các giá trị khác.

Với việc kiểm tra bằng nhau chặt chẽ `===`
: Các giá trị này khác nhau, vì chúng có kiểu dữ liệu khác nhau.

    ```js run
    alert( null === undefined ); // false
    ```

Với việc kiểm tra không chặt chẽ `==`
: Có 1 quy tắc đặc biệt. Hai giá trị này là một "cặp đôi ngọt ngào": chúng bằng nhau (trong nghĩa của `==`), nhưng không bằng giá trị khác.

    ```js run
    alert( null == undefined ); // true
    ```

Với toán học và các phép so sánh khác `< > <= >=`
: `null/undefined` được chuyển sang số: `null` trở thành `0`, trong khi `undefined` trở thành `NaN`.

Bây giờ chúng ta hãy xem những điều hay ho khi chúng ta áp dụng những quy tắc này. Và quan trọng hơn, làm sao để không rơi vào bẫy với chúng.

### Kết quả lạ lùng: null vs 0

Chúng ta hãy so sánh `null` với số 0:

```js run
alert(null > 0); // (1) false
alert(null == 0); // (2) false
alert(null >= 0); // (3) *!*true*/!*
```

Về mặt toán học, thật lạ lùng. Kết quả cuối cùng cho thấy rằng "`null` thì lớn hơn hoặc bằng với số 0", vì vậy một trong 2 phép so sánh phía trên chắc hẳn phải là `true`, nhưng cả 2 lại là false.

Nguyên nhân là vì phép so sánh bằng `==` và các phép so sánh `> < >= <=` hoạt động khác nhau. Các phép so sánh sẽ chuyển đổi `null` thành số, có giá trị là `0`. Chính vì vậy (3) `null >= 0` là true và (1) `null > 0` là false.

Mặt khác, việc kiểm tra bằng nhau `==` với `undefined` và `null` được định nghĩa sao cho, không có bất kỳ sự chuyển đổi kiểu nào, chúng luôn bằng nhau và khác các giá trị khác. Vì vậy (2) `null == 0` thì false.

### Không thể so sánh được với undefined

Giá trị `undefined` không nên được so sánh với các giá trị khác:

```js run
alert(undefined > 0); // false (1)
alert(undefined < 0); // false (2)
alert(undefined == 0); // false (3)
```

Tại sao nó không thích số 0 đến vậy? Luôn luôn sai!

Có kết quả như vậy là vì:

- Các phép so sánh `(1)` và `(2)` trả về `false` vì `undefined` được chuyển đổi thành `NaN` và `NaN` là 1 giá trị số đặc biệt mà sẽ trả về `false` với tất cả các phép so sánh.
- Việc kiểm tra bằng nhau `(3)` trả về `false` vì `undefined` chỉ bằng với `null`, `undefined`, và khác các giá trị khác.

### Hạn chế vấn đề

Tại sao chúng ta có những ví dụ này? Chúng ta có nên ghi nhớ những đặc thù này mọi lúc không? Uhmmm, không thực sự cần thiết. Trên thực tế, những vấn đề khó này sẽ dần dần trở nên quen thuộc theo thời gian, nhưng có một cách chắc chắn để né những vấn đề với chúng:

Chỉ cần có sự quản lý lỗi đặc biệt khi so sánh với `undefined/null` ngoại trừ sử dụng phép so sánh bằng nhau chặt chẽ `===`.

Không sử dụng các phép so sánh `>= > < <=` với 1 biến có khả năng `null/undefined`, nếu bạn không thật sự biết chắc bạn đang làm gì. Nếu 1 biến có thể có những giá trị này , hãy kiểm tra chúng riêng biệt.

## Tóm lược

- Các phép toán so sánh trả về 1 giá trị boolean.
- Các chuỗi được so sánh từng ký tự (letter-by-letter) theo thứ tự từ điển.
- Khi các giá trị khác kiểu được so sánh, chúng sẽ được chuyển đổi thành kiểu số (trong trường hợp không kiểm tra bằng một cách chặt chẽ).
- Các giá trị `null` và `undefined` thì bằng nhau `==` và khác tất cả các giá trị khác.
- Hãy cẩn thận khi sử dụng phép so sánh như `>` hay `<` với các biến có khả năng là `null/undefined`. Sẽ tốt hơn nếu kiểm tra `null/undefined` riêng biệt.
