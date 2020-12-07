Cùng xem xét cẩn thận chuyện xảy ra khi gọi `speedy.eat("apple")`.

1. Phương thức `speedy.eat` tìm thấy trong nguyên mẫu (`=hamster`), sau đó chạy trong `speedy` (`this=speedy`).

2. Tiếp theo `this.stomach.push()` cần tìm thuộc tính `stomach` và gọi phương thức `push` từ đó. Trước tiên `stomach` được tìm trong `this` (`=speedy`), nhưng không thấy.

3. Sau đó `stomach` được tìm thấy trong nguyên mẫu `hamster` từ giờ `this.stomach` là `hamster.stomach`.

4. Khi gọi `this.stomach.push` thì `"apple"` được thêm vào `hamster.stomach`.

Vậy nên cả hai con hamsters đều dùng chung `hamster.stomach` - tức có cùng một cái dạ dày! Khi một con no, con kia cũng no là vì thế.

<<<<<<< HEAD
Mỗi khi `stomach` được lấy từ nguyên mẫu, thì `this.stomach.push` lại làm thay đổi `hamster.stomach`.
=======
Both for `lazy.stomach.push(...)` and `speedy.stomach.push()`, the property `stomach` is found in the prototype (as it's not in the object itself), then the new data is pushed into it.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Chú ý rằng chuyện này không xảy ra nếu ta gán `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // gán tới to this.stomach thay vì this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy ăn táo
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy không được ăn theo
alert( lazy.stomach ); // <không có gì>
```

Giờ tất cả làm việc, vì `this.stomach=` là hành động ghi nên không sử dụng thuộc tính `stomach` của nguyên mẫu `hamster`. Giá trị được ghi vào đối tượng `this` (tức đối tượng được thừa kế).

<<<<<<< HEAD
Ta cũng có thể tránh được vấn đề trên bằng cách tạo riêng cho mỗi con hamster một cái dạ dày:
=======
Also we can totally avoid the problem by making sure that each hamster has their own stomach:
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy ăn táo
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Dạ dày của Lazy vẫn trống
alert( lazy.stomach ); // <không có gì>
```

<<<<<<< HEAD
Đây là giải pháp tổng quát, các thuộc tính mô tả trạng thái của đối tượng, giống `stomach` ở trên nên được ghi riêng vào đối tượng đó, không nên dùng chung từ một nguyên mẫu. Điều này giúp ta không gặp phải vấn đề trên.
=======
As a common solution, all properties that describe the state of a particular object, like `stomach` above, should be written into that object. That prevents such problems.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
