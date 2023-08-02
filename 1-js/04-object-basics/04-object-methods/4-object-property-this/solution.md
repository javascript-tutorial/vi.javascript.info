**Trả lời: có lỗi.**

Hãy thử nó:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

Đó là bởi vì các quy tắc đặt `this` không nhìn vào định nghĩa đối tượng. Chỉ có thời điểm sử dụng mới là quan trọng.

Ở đây, giá trị của `this` bên trong `makeUser()` là `undefined`, bởi vì nó được gọi dưới dạng một hàm, không phải dưới dạng một phương thức có cú pháp "dấu chấm".

Giá trị của `this` là một cho toàn bộ hàm, các khối mã và các object literal không ảnh hưởng đến giá trị đó.

Vì vậy, `ref: this` thực sự lấy `this` hiện tại của hàm.

Chúng ta có thể viết lại hàm và trả về cùng giá trị `this` với giá trị `undefined`:

```js run
function makeUser(){
  return this; // lần này không có đối tượng theo nghĩa đen
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
Như bạn có thể thấy kết quả của `alert( makeUser().name )` giống với kết quả của `alert( user.ref.name )` trong ví dụ trước.

Đây là trường hợp ngược lại:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // John
```

Bây giờ nó hoạt động, bởi vì `user.ref()` là một phương thức. Và giá trị của `this` được đặt cho đối tượng trước dấu chấm `.`.
