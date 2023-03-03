
# Chuyển đổi đối tượng thành nguyên thủy

Điều gì xảy ra khi các đối tượng được thêm `obj1 + obj2`, bớt `obj1 - obj2` hoặc được in bằng cách sử dụng `alert(obj)`?

Trong trường hợp đó, các đối tượng được tự động chuyển đổi thành nguyên thủy và sau đó thao tác được thực hiện.

Trong chương <info:type-conversions> chúng ta đã thấy các quy tắc chuyển đổi số, chuỗi và boolean của nguyên hàm. Nhưng chúng ta đã không nói về các đối tượng. Bây giờ, khi chúng ta đã biết về các phương thức và ký tự, ta có thể nói về nó.

1. Tất cả các đối tượng là `true` trong ngữ cảnh boolean. Chỉ có chuyển đổi số và chuỗi.
2. Việc chuyển đổi số xảy ra khi chúng ta trừ các đối tượng hoặc áp dụng các hàm toán học. Ví dụ: có thể trừ các đối tượng `Date` (được trình bày trong chương <info:date>) và kết quả của `date1 - date2` là chênh lệch múi giờ giữa hai ngày.
3. Đối với việc chuyển đổi chuỗi -- nó thường xảy ra khi chúng ta xuất một đối tượng như `alert(obj)` và trong các ngữ cảnh tương tự.

## Nguyên thủy

Chúng ta có thể tinh chỉnh chuyển đổi chuỗi và số, sử dụng các phương thức đối tượng đặc biệt.

Có ba biến thể chuyển đổi loại, được gọi là "gợi ý", được mô tả trong [thông số kỹ thuật](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Đối với chuyển đổi đối tượng thành chuỗi, khi chúng ta đang thực hiện thao tác trên một đối tượng mong đợi một chuỗi, chẳng hạn như `alert`:

    ```js
    // đầu ra
    alert(obj);

    // sử dụng đối tượng làm khóa thuộc tính
    anotherObj[obj] = 123;
    ```

`"number"`
: Đối với chuyển đổi từ đối tượng sang số, như khi chúng ta làm toán:

    ```js
    // chuyển đổi rõ ràng
    let num = Number(obj);

    // toán học (trừ nhị phân cộng)
    let n = +obj; // cộng một ngôi
    let delta = date1 - date2;

    // so sánh bé hơn / lớn hơn
    let greater = user1 > user2;
    ```

`"default"`
: Xảy ra trong một số trường hợp hiếm hoi khi toán tử "không chắc chắn" nên mong đợi loại nào.

     Chẳng hạn, dấu cộng nhị phân `+` có thể hoạt động với cả chuỗi (nối chúng) và số (cộng chúng), vì vậy cả chuỗi và số đều hoạt động. Vì vậy, nếu một dấu cộng nhị phân lấy một đối tượng làm đối số, nó sẽ sử dụng gợi ý `"mặc định"` để chuyển đổi nó.

     Ngoài ra, nếu một đối tượng được so sánh bằng cách sử dụng `==` với một chuỗi, số hoặc ký tự, thì cũng không rõ nên thực hiện chuyển đổi nào, vì vậy gợi ý `"mặc định"` được sử dụng.

    ```js
    // nhị phân cộng sử dụng gợi ý "mặc định"
    let total = obj1 + obj2;

    // obj == số sử dụng gợi ý "mặc định"
    if (user == 1) { ... };
    ```

    Các toán tử so sánh lớn hơn và nhỏ hơn, chẳng hạn như `<` `>`, cũng có thể hoạt động với cả chuỗi và số. Tuy nhiên, chúng sử dụng gợi ý `"số"`, không phải `"mặc định"`. Đó là vì lý do lịch sử.

     Tuy nhiên, trong thực tế, chúng ta không cần nhớ những chi tiết đặc biệt này, bởi vì tất cả các đối tượng tích hợp sẵn ngoại trừ một trường hợp (đối tượng `Date`, chúng ta sẽ tìm hiểu sau) thực hiện chuyển đổi `"default"` theo cách tương tự như ` "number"`. Và chúng ta cũng có thể làm như vậy.

```smart header="Không có gợi ý `\"boolean\"`"
Xin lưu ý -- chỉ có ba gợi ý. Nó đơn giản mà.

Không có gợi ý "boolean" (tất cả các đối tượng là `true` trong ngữ cảnh boolean) hoặc bất kỳ thứ gì khác. Và nếu chúng ta xử lý `"default"` và `"number"` giống nhau, giống như hầu hết các phần mềm tích hợp sẵn, thì chỉ có hai chuyển đổi.
```

**Để thực hiện chuyển đổi, JavaScript cố gắng tìm và gọi ba phương thức đối tượng:**

1. Gọi `obj[Symbol.toPrimitive](hint)` - phương thức có khóa tượng trưng `Symbol.toPrimitive` (ký tự hệ thống), nếu phương thức đó tồn tại,
2. Ngược lại nếu gợi ý là `"string"`
     - thử `obj.toString()` và `obj.valueOf()`, bất cứ thứ gì tồn tại.
3. Ngược lại nếu gợi ý là `"number"` hoặc `"default"`
     - thử `obj.valueOf()` và `obj.toString()`, bất cứ thứ gì tồn tại.

## Symbol.toPrimitive

Hãy bắt đầu từ phương pháp đầu tiên. Có một ký tự tích hợp có tên `Symbol.toPrimitive` nên được sử dụng để đặt tên cho phương thức chuyển đổi, như sau:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // phải trả về một giá trị nguyên thủy
   // gợi ý = một trong số "string", "number", "default"
};
```

Chẳng hạn, ở đây đối tượng `user` thực hiện nó:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`gợi ý: ${hint}`);
    return hint == "string" ? `{tên: "${this.name}"}` : this.money;
  }
};

// bản trình diễn chuyển đổi:
alert(user); // gợi ý: string -> {name: "John"}
alert(+user); // gợi ý: number -> 1000
alert(user + 500); // gợi ý: default -> 1500
```

Như chúng ta có thể thấy từ mã, `user` trở thành một chuỗi tự mô tả hoặc một số tiền tùy thuộc vào chuyển đổi. Phương thức duy nhất `user[Symbol.toPrimitive]` xử lý tất cả các trường hợp chuyển đổi.


## toString/valueOf

Các phương thức `toString` và `valueOf` có từ thời cổ đại. Chúng không phải là các ký tự (các ký tự không tồn tại từ lâu), mà là các phương thức có tên chuỗi "thông thường". Chúng cung cấp một cách thay thế "kiểu cũ" để thực hiện chuyển đổi.

Nếu không có `Symbol.toPrimitive` thì JavaScript sẽ cố gắng tìm chúng và thử theo thứ tự:

- `toString -> valueOf` cho gợi ý "chuỗi".
- `valueOf -> toString` ngược lại.

Các phương thức này phải trả về một giá trị nguyên thủy. Nếu `toString` hoặc `valueOf` trả về một đối tượng, thì đối tượng đó sẽ bị bỏ qua (giống như khi không có phương thức nào).

Theo mặc định, một đối tượng đơn giản có các phương thức `toString` và `valueOf` sau:

- Phương thức `toString` trả về một chuỗi `"[object Object]"`.
- Phương thức `valueOf` trả về chính đối tượng đó.

Đây là bản trình diễn:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Vì vậy, nếu chúng ta cố gắng sử dụng một đối tượng dưới dạng một chuỗi, chẳng hạn như trong `alert`, thì theo mặc định, chúng ta sẽ thấy `[object Object]`.

Và `valueOf` mặc định được đề cập ở đây chỉ vì mục đích hoàn thiện, để tránh bất kỳ sự nhầm lẫn nào. Như bạn có thể thấy, nó trả về chính đối tượng và do đó bị bỏ qua. Đừng hỏi tôi tại sao, đó là vì lý do lịch sử. Vì vậy, chúng ta có thể cho rằng nó không tồn tại.

Hãy thực hiện các phương pháp này.

Chẳng hạn, ở đây `user` thực hiện tương tự như trên bằng cách sử dụng kết hợp `toString` và `valueOf` thay vì `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // cho gợi ý="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // cho gợi ý="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Như chúng ta có thể thấy, hành vi giống như ví dụ trước với `Symbol.toPrimitive`.

Thông thường, chúng ta muốn có một nơi "bắt tất cả" duy nhất để xử lý tất cả các chuyển đổi nguyên thủy. Trong trường hợp này, chúng ta chỉ có thể triển khai `toString`, như sau:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

Trong trường hợp không có `Symbol.toPrimitive` và `valueOf`, `toString` sẽ xử lý tất cả các chuyển đổi nguyên thủy.

## Các kiểu trả về

Điều quan trọng cần biết về tất cả các phương pháp chuyển đổi nguyên thủy là chúng không nhất thiết phải trả về nguyên thủy "gợi ý".

Không có quyền kiểm soát liệu `toString` có trả về chính xác một chuỗi hay không hoặc liệu phương thức `Symbol.toPrimitive` có trả về một số cho gợi ý `"number"` hay không.

Điều bắt buộc duy nhất: các phương thức này phải trả về một đối tượng nguyên thủy, không phải đối tượng.

```smart header="Ghi chú lịch sử"
Vì các lý do lịch sử, nếu `toString` hoặc `valueOf` trả về một đối tượng, thì không có lỗi, nhưng giá trị đó bị bỏ qua (chẳng hạn như nếu phương thức không tồn tại). Đó là bởi vì trong thời cổ đại không có khái niệm "lỗi" tốt trong JavaScript.

Ngược lại, `Symbol.toPrimitive` *phải* trả về một giá trị gốc, nếu không sẽ có lỗi.
```

## chuyển đổi hơn nữa

Như chúng ta đã biết, nhiều toán tử và hàm thực hiện chuyển đổi kiểu, ví dụ: phép nhân `*` chuyển đổi toán hạng thành số.

Nếu chúng ta chuyển một đối tượng làm đối số, thì có hai giai đoạn:
1. Đối tượng được chuyển đổi thành nguyên thủy (sử dụng các quy tắc được mô tả ở trên).
2. Nếu nguyên mẫu kết quả không đúng loại, nó sẽ được chuyển đổi.

Ví dụ:

```js run
let obj = {
  // toString xử lý tất cả các chuyển đổi khi không có các phương pháp khác
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, đối tượng được chuyển đổi thành "2" nguyên thủy, sau đó phép nhân biến nó thành một số
```

1. Phép nhân `obj * 2` đầu tiên chuyển đổi đối tượng thành nguyên thủy (đó là một chuỗi `"2"`).
2. Sau đó, `"2" * 2` trở thành `2 * 2` (chuỗi được chuyển thành số).

Phép cộng nhị phân sẽ nối các chuỗi trong tình huống tương tự, vì nó sẵn sàng chấp nhận một chuỗi:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), chuyển đổi thành nguyên thủy trả về một chuỗi => nối
```

## Bản tóm tắt

Quá trình chuyển đổi từ đối tượng sang nguyên thủy được gọi tự động bởi nhiều hàm và toán tử tích hợp sẵn mong đợi nguyên thủy làm giá trị.

Có 3 loại (gợi ý) của nó:
- `"string"` (dành cho `alert` và các thao tác khác cần chuỗi)
- `"number"` (dành cho toán học)
- `"default"` (một vài toán tử)

Các thông số kỹ thuật mô tả rõ ràng toán tử nào sử dụng gợi ý nào. Có rất ít toán tử "không biết điều gì sẽ xảy ra" và sử dụng gợi ý `"default"`. Thông thường đối với các đối tượng tích hợp, gợi ý `"default"` được xử lý theo cách giống như `"number"`, do đó, trong thực tế, hai gợi ý cuối cùng thường được hợp nhất với nhau.

Thuật toán chuyển đổi là:

1. Gọi `obj[Symbol.toPrimitive](hint)` nếu phương thức tồn tại,
2. Ngược lại nếu gợi ý là `"string"`
     - thử `obj.toString()` và `obj.valueOf()`, bất cứ thứ gì tồn tại.
3. Ngược lại nếu gợi ý là `"number"` hoặc `"default"`
     - thử `obj.valueOf()` và `obj.toString()`, bất cứ thứ gì tồn tại.

Trong thực tế, thường chỉ cần triển khai `obj.toString()` như một phương thức "bắt tất cả" cho tất cả các chuyển đổi trả về một biểu diễn đối tượng "con người có thể đọc được" cho mục đích ghi nhật ký hoặc gỡ lỗi.
