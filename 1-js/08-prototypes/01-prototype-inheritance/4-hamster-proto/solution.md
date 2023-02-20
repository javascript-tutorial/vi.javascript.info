Cùng xem xét cẩn thận chuyện xảy ra khi gọi `speedy.eat("apple")`.

1. Phương thức `speedy.eat` tìm thấy trong nguyên mẫu (`=hamster`), sau đó thực thi với (`this=speedy`) (đối tượng trước dấu chấm).
2. Tiếp theo `this.stomach.push()` cần tìm thuộc tính `stomach` và gọi phương thức `push` của nó. Nó tìm kiếm `stomach` trong `this` (`=speedy`), nhưng không thấy.
3. Rồi nó lần theo chuỗi nguyên mẫu và tìm thấy `stomach` trong `hamster`.
4. Sau đó nó gọi `push`, thêm thức ăn vào trong *stomach của nguyên mẫu*.

Vì vậy tất cả các hamster đều dùng chung một stomach!

Đối với cả `lazy.stomach.push(...)` và `speedy.stomach.push()`, thuộc tính `stomach` được tìm thấy trong nguyên mẫu (vì nó không nằm trong chính đối tượng), sau đó dữ liệu mới được đẩy vào đó.

Xin lưu ý rằng điều đó không xảy ra trong trường hợp một phép gán đơn giản `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // gán cho this.stomach thay vì this.stomach.push
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

// Con speedy tìm thấy thức ăn
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Dạ dày của con lazy trống rỗng
alert( lazy.stomach ); // <không có gì>
```

Bây giờ tất cả đều hoạt động tốt, bởi vì `this.stomach=` không thực hiện tra cứu `stomach`. Giá trị được ghi trực tiếp vào đối tượng `this`.

Ngoài ra, chúng ta hoàn toàn có thể tránh được vấn đề trên bằng cách đảm bảo rằng mỗi con hamster đều có dạ dày của riêng nó:

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

// Con speedy tìm thấy thức ăn
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Dạ dày của con lazy trống rỗng
alert( lazy.stomach ); // <không có gì>
```

Như một giải pháp phổ biến, tất cả các thuộc tính mô tả trạng thái của một đối tượng cụ thể, như `stomach` ở trên, nên được ghi vào đối tượng đó. Điều đó ngăn chặn những vấn đề như vậy.
