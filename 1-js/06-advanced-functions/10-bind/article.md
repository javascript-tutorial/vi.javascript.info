libs:
  - lodash

---

# Ràng buộc "this" cho hàm

Có một vấn đề chúng ta đã biết khi dùng `setTimeout` với các phương thức của đối tượng hoặc truyền những phương thức này từ hàm này sang hàm khác đó là mất `this`.

Ngay lập tức `this` không còn làm việc đúng. Tình huống này rất thường xảy ra với các lập trình viên chưa có nhiều kinh nghiệm, nhưng đôi khi các lập trình viên có kinh nghiệm vẫn gặp phải.

## Mất "this"

Như ta đã biết trong JavaScript giá trị `this` rất dễ bị mất. `this` bị mất khi một phương thức được truyền tới nơi khác, tách khỏi đối tượng chứa nó.

Trong ví dụ sau `this` bị mất khi phương thức được truyền vào `setTimeout`:

```js run
let user = {
  firstName: "Hùng",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Xin chào, undefined!
*/!*
```

Như bạn thấy, giá trị xuất ra không phải là "Hùng" dựa theo `this.firstName` mà là `undefined`!

Đó là bởi vì `setTimeout` nhận được phương thức `user.sayHi` chứ không nhận được đối tượng `user`. Nói cách khác phương thức được truyền đi độc lập với đối tượng. Dòng cuối có thể viết lại tường mình hơn như sau:

```js
let f = user.sayHi;
setTimeout(f, 1000); // mất đối tượng user
```

Phương thức `setTimeout` khi chạy trong trình duyệt tự động đặt `this=window` khi hàm `f` được chạy (với Node.js, `this` là đối tượng timer, nhưng nó không quan trọng ở đây). Cho nên `this.firstName` trở thành `window.firstName` là thuộc tính không tồn tại. Trong những trường hợp tương tự khác `this` thường trở thành `undefined`.

Một công việc khá điển hình đó là chúng ta muốn truyền một phương thức của đối tượng tới một nơi khác (ở trên là tới `setTimeout`) để chạy nó ở đây. Vậy làm cách nào để chắc chắn rắn nó chạy với giá trị `this` đúng?

## Giải pháp 1: sử dụng hàm bao

Giải pháp đơn giản nhất là sử dụng một hàm bao:

```js run
let user = {
  firstName: "Hùng",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Xin chào, Hùng!
}, 1000);
*/!*
```

Phương thức đã làm việc, vì hàm bao nhận được `user` từ lexical environment bên ngoài, sau đó chạy phương thức từ đối tượng `user` này.

Cách viết tương tự, nhưng ngắn hơn sử dụng hàm mũi tên:

```js
setTimeout(() => user.sayHi(), 1000); // Xin chào, Hùng!
```

Trông tốt đó, nhưng có một lỗ hổng nhỏ xuất hiện.

Chuyện gì xảy ra nếu trước khi `setTimeout` kích hoạt (sau 1 giây), `user` thay đổi giá trị? Ngay lập tức nó gọi nhầm đối tượng!


```js run
let user = {
  firstName: "Hùng",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...trong vòng 1 giây
user = { sayHi() { alert("Một người dùng khác trong setTimeout!"); } };

// Một người dùng khác trong setTimeout?!?
```

Giải pháp tiếp tiếp theo giúp khắc phục lỗ hổng trên.

## Giải pháp 2: sử dụng "bind"

Mọi hàm đều có sẵn một phương thức có tên [bind](mdn:js/Function/bind) cho phép cố định giá trị cho `this`.

Cú pháp cơ bản là:

```js
// cú pháp phức tạp hơn sẽ nói sau
let boundFunc = func.bind(context);
```

Kết quả của `func.bind(context)` là một đối tượng giống hàm, có thể gọi được như hàm, chuyển lời gọi này cho `func` và đặt `this=context`.

Nói cách khác gọi `boundFunc` giống như gọi `func` nhưng với `this` luôn là `context`.

Ví dụ, ở đây `funcUser` chuyển lời gọi cho `func` với `this=user`:

```js run  
let user = {
  firstName: "Hùng"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // Hùng  
*/!*
```

Ở đây `func.bind(user)` có thể coi là một "biến thể đã ràng buộc `this`" của `func`, với `this` bị ràng buộc với `user`.

Tất cả đối số truyền cho `funcUser` được chuyển nguyên vẹn cho `func`, ví dụ:

```js run  
let user = {
  firstName: "Hùng"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// ràng buộc this với user
let funcUser = func.bind(user);

*!*
funcUser("Xin chào"); // Xin chào, Hùng (đối số "Xin chào" được chuyển cho func, và this=user)
*/!*
```

Bây giờ thử áp dụng với phương thức của một đối tượng:


```js run
let user = {
  firstName: "Hùng",
  sayHi() {
    alert(`Xin chào, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

sayHi(); // Xin chào, Hùng!

setTimeout(sayHi, 1000); // Xin chào, Hùng!
```

Tại dòng `(*)` ta lấy phương thức `user.sayHi` và ràng buộc `this` của nó với `user`. Hàm `sayHi` là hàm đã ràng buộc, có thể gọi một mình hoặc truyền đi bất cứ đâu để chạy mà không bị mất `this`.

Các đối số được truyền nguyên vẹn tới hàm gốc, chỉ `this` bị cố định bởi `bind`:

```js run
let user = {
  firstName: "Hùng",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Xin chào"); // Xin chào, Hùng ("Xin chào" được truyền tới say)
say("Tạm biệt"); // Tạm biệt, Hùng ("Tạm biệt" được truyền tới say)
```

````smart header="Phương thức tiện lợi: `bindAll`"
Nếu một đối tượng có nhiều phương thức ta có thể sử dụng một vòng lặp `for..in` để ràng buộc tất cả các phương thức này:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Một số thư viện JavaScript cung cấp các hàm để ràng buộc hàng loạt như trên, ví dụ [_.bindAll(obj)](http://lodash.com/docs#bindAll) trong thư viện lodash.
````

## Tóm tắt

Phương thức `func.bind(context, ...args)` trả về một phiên bản đã ràng buộc `this` của hàm `func`, nó ràng buộc `this` với đối số đầu tiên nếu có.

Thường ta sử dụng `bind` để cố định `this` trong phương thức của đối tượng để có thể truyền phương thức tới nơi khác. Ví dụ, tới `setTimeout`. Còn vài lý do nữa để sử dụng `bind` trong lập trình hiện đại, chúng ta sẽ còn gặp nó sau này.
