# Các phương thức và thuộc tính được bảo vệ và riêng tư

Một trong những nguyên tắc quan trọng nhất của lập trình hướng đối tượng đó là phân tách giao diện bên trong với giao diện bên ngoài.

Đây là nguyên tắc mà bạn "phải tuân theo" nếu muốn phát triển bất cứ ứng dụng nào phức tạp hơn ứng dụng "Hello World".

Để hiểu điều này, chúng ta hãy tách mình ra khỏi việc phát triển phần mềm và hướng mắt vào thế giới thực.

Thường các thiết bị chúng ta đang dùng khá phức tạp. Nhưng phân tách giao diện bên trong với giao diện bên ngoài cho phép ta sử dụng chúng mà không gặp phải vấn đề gì.

## Một ví dụ thực tế

Ví dụ, máy pha cà phê. Nhìn ở bên ngoài (giao diện bên ngoài) trông nó khá đơn giản: một cái nút, một màn hình hiển thị, vài lỗ trống...

![](coffee.jpg)

Nhưng bên trong (giao diện bên trong)...

![](coffee-inside.jpg)

Có rất nhiều chi tiết. Nhưng chúng ta có thể sử dụng mà không cần biết gì về chúng.

Máy pha cà phê hoạt động rất tin cậy phải không? Chúng ta có thể sử dụng chúng nhiều năm mà không hỏng, và nếu có hỏng hóc gì chỉ cần mang nó đi sửa.

Bí mật về độ tin cậy và đơn giản của máy pha cà phê đó là giấu đi toàn bộ các chi tiết bên trong.

Nếu bạn tháo toàn bộ vỏ ngoài của của chúng, bạn sẽ thấy khó sử dụng hơn vì không biết phải bấm vào đâu, hơn nửa còn nguy hiểm (do hở điện), và dễ gây hỏng hóc.

Như bạn sẽ thấy, trong lập trình, các đối tượng cũng giống các máy pha cà phê.

Nhưng để giấu đi các chi tiết bên trong, chúng ta không dùng các vỏ bảo vệ, mà sử dụng các cú pháp đặc biệt.

## Internal and external interface

Trong lập trình hướng đối tượng, các thuộc tính và phương thức được chia thành hai nhóm:

- *Giao diện bên trong* (Internal interface) -- các thuộc tính và phương thức chỉ có thể truy cập từ các phương thức của class, không truy cập được từ bên ngoài.
- *Giao diện bên ngoài* (External interface) -- các thuộc tính và phương thức có thể truy cập được từ bên ngoài class.

Đối chiếu với máy pha cà phê -- những thứ được giấu: ống hơi, bộ phận làm nóng... -- thuộc về giao diện bên trong.

Giao diện bên trong được dùng bởi chính đối tượng, khi nó hoạt động các chi tiết bên trong của nó tương tác với nhau. Ví dụ ống hơi được nối với bộ phận làm nóng.

Từ bên ngoài máy pha cà phê được che kín bởi vỏ bảo vệ để không ai có thể thấy, hay chạm vào được các chi tiết bên trong của nó. Các chi tiết này bị ẩn đi và không thể truy cập được. Chúng ta chỉ có thể sử dụng các tính năng của máy pha cà phê qua giao diện bên ngoài.

Vậy nên, để sử dụng một đối tượng thì tất cả những gì chúng ta phải biết là giao diện bên ngoài của nó. Chúng ta không cần quan tâm về cách làm việc bên trong của đối tượng, và điều này thật tuyệt!

Đó chỉ là sự giới thiệu chung, dưới đây ta đi vào chi tiết.

Trong JavaScript, có hai kiểu trường của đối tượng (trường là tên gọi chung của thuộc tính và phương thức):

- Công khai (public): có thể truy cập được từ mọi nơi. Chúng thuộc về giao diện bên ngoài. Cho đến lúc này chúng ta mới chỉ sử dụng các trường kiểu này.
- Riêng tư (private): chỉ truy cập được từ bên trong class. Chúng là giao diện bên trong.

Trong nhiều ngôn ngữ khác cũng tồn tại các trường "được bảo vệ" (protected): chỉ có thể truy cập từ bên trong class và những class mở rộng nó (giống private, nhưng cộng thêm quyền truy cập từ các class kế thừa). Chúng cũng hữu ích cho giao diện bên trong. Theo một nghĩa nào đó, chúng phổ biến hơn các trường riêng tư, bởi vì chúng ta thường muốn các class kế thừa có quyền truy cập vào chúng.

JavaScript không hỗ trợ trường "protected" ở cấp ngôn ngữ, nhưng vì chúng hay được dùng, nên chúng được mô phỏng.

Bây giờ chúng ta sẽ tạo một máy pha cà phê trong JavaScript sử dụng các kiểu trên. Chúng có rất nhiều chi tiết, nhưng để đơn giản chúng không mô phỏng lại (mặc dù có thể).

## Bảo vệ thuộc tính "waterAmount"

Tạo một class máy pha cà phê đơn giản trước:

```js run
class CoffeeMachine {
  waterAmount = 0; // lượng nước bên trong

  constructor(power) {
    this.power = power;
    alert( `Đã tạo máy pha cà phê có công suất: ${power}` );
  }

}

// tạo máy pha cà phê có công suất 100
let coffeeMachine = new CoffeeMachine(100);

// thêm nước
coffeeMachine.waterAmount = 200;
```

Các thuộc tính `waterAmount` và `power` là public. Chúng ta có thể dễ dàng lấy/thiết-lập nó từ bên ngoài.

Chúng ta không muốn ai cũng có thể thay đổi mức nước, nên sẽ thay đổi thuộc tính `waterAmount` thành thuộc tính "protected". Ví dụ, ta không muốn bất cứ ai cài đặt nó dưới không.

**Các thuộc tính được bảo vệ thường bắt đầu bằng `_`.**

Đây là quy ước giữa các lập trình viên khi viết các thuộc tính và phương thức không nên truy cập từ bên ngoài.

Phương thức được đặt tên lại là `_waterAmount`:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// tạo máy pha cà phê
let coffeeMachine = new CoffeeMachine(100);

// Thêm nước
coffeeMachine.waterAmount = -10; // Lỗi: Lượng nước âm
```

Giờ việc truy cập thuộc tính bị kiểm soát, nên việc thiết lập lượng nước dưới không trở thành không thể.

## Thuộc tính chỉ đọc "power"

Với thuộc tính `power`, ta khiến nó trở thành thuộc tính chỉ đọc. Nó cần khi một thuộc tính được cài đặt một lần và sau đó không được sửa lại.

Đó chính xác là thứ ta cần với máy pha cà phê, công suất không bao giờ thay đổi.

Để thực hiện chúng ta chỉ tạo getter mà không tạo setter:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// tạo máy pha cà phê
let coffeeMachine = new CoffeeMachine(100);

alert(`Công suất là: ${coffeeMachine.power}W`); // Công suất là: 100W

coffeeMachine.power = 25; // Lỗi (không có setter)
```

````smart header="Các hàm getter/setter"
Ở đây chúng ta sử dụng cú pháp getter/setter.

Nhưng thường các hàm `get.../set...` được ưa thích sử dụng hơn, giống như:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

Dù trông có vẻ dài, nhưng các hàm này mềm dẻo hơn. Chúng có thể nhận nhiều đối số (kể cả khi lúc này ta không cần).

Nhưng ưu điểm của get/set là nó ngắn hơn. Vậy nên không có quy tắc nào bắt buộc ở đây. Việc sử dụng cái nào là do bạn.
````

```smart header="Các trường protected được thừa kế"
Nếu chúng ta thừa kế `class MegaMachine extends CoffeeMachine`, thì không có gì ngắn cấm truy cập `this._waterAmount` hoặc `this._power` từ các phương thức của class mới.

Vậy nên các trường "protected" được thừa kế một cách tự nhiên. Không như các trường private mà ta sẽ thấy dưới đây.
```

## Thuộc tính riêng "#waterLimit"

[recent browser=none]

Gần đây trong tiêu chuẩn, JavaScript đã hộ trợ ở cấp độ ngôn ngữ các phương thức và thuộc tính "private".

Chúng được bắt đầu bằng `#`. Và chúng chỉ có thể truy cập được từ bên trong lớp.

Ví dụ, `#waterLimit` là thuộc tính private và `#checkWater` là phương thức private:

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// không thể truy cập từ bên ngoài class
coffeeMachine.#fixWaterAmount(123); // Lỗi
coffeeMachine.#waterLimit = 1000; // Lỗi
*/!*
```

Ở cấp độ ngôn ngữ, `#` là ký tự đặc biệt để đánh dấu các trường private. Chúng ta không thể truy cập chúng từ ngoài và từ các class thừa kế.

Các trường private không xung đột với trường public cùng tên. Chúng ta có thể đồng thời có `#waterAmount` và `waterAmount`.

Ví dụ, khiến `waterAmount` thành thuộc tính truy cập cho `#waterAmount`:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Lỗi
```

Không như các trường "protected", trường "private" được cấm truy cập từ ngoài bởi chính ngôn ngữ.

Nhưng nếu ta thừa kế từ `CoffeeMachine`, thì không thể truy cập được `#waterAmount`. Chúng ta cần getter/setter `waterAmount`:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Lỗi: chỉ truy cập được từ CoffeeMachine
*/!*
  }
}
```

Trong nhiều tình huống, hạn chế như là quá nghiêm trọng. Nếu chúng ta thừa kế `CoffeeMachine`, chúng ta có lý do chính đáng để truy cập thuộc tính bên trong `CoffeeMachine`. Đó là lý do tại sao các trường "protected" được sử dụng nhiều hơn, mặc dù chúng không được hỗ trợ bởi một cú pháp của ngôn ngữ.

````warn header="Trường private không truy cập được bằng cú pháp this[name]"
Các trường private rất đặc biệt.

Như chúng ta biết, các trường có thể truy cập được bằng `this[name]`:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

Với các trường private `this['#name']` không làm việc. Đó là một hạn chế về cú pháp để đảm bảo sự riêng tư.
````

## Tóm tắt

Trong thuật ngữ của OOP, phân tách giao diện bên trong với giao diện bên ngoài gọi là [đóng gói(encapsulation)](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).

Nó cung cấp các lợi ích sau:

Bảo vệ người dùng, để họ không tự bắn vào chân mình
: Tưởng tượng có một nhóm người sử dụng một máy pha cà phê. Nó được tạo bởi công ty "Best CoffeeMachine" và đang chạy tốt, nhưng lớp vỏ đã bị bóc. Các bộ phận bên trong bị phơi bày.

    Tất cả thành viên đều là người văn minh -- họ sử dụng máy pha cà phê như dự định. Nhưng một trong số họ, John, đã quyết định rằng anh ấy là người thông minh nhất, thực hiện một số điều chỉnh trong máy pha cà phê. Thế là máy cà phê hỏng hai ngày sau đó.

    Chắc chắn lỗi không phải của John, mà là người đã tháo vỏ máy và để cho John thực hiện thao tác của mình.

    Trong lập trình cũng như vậy. Nếu một người dùng class thay đổi thứ gì đó không nên được thay đổi từ bên ngoài -- hậu quả không thể lường trước.

Khả năng hỗ trợ
: Tình huống trong lập trình phức tạp hơn máy pha cà phê ngoài đời, bởi chúng ta không mua các ứng dụng một lần. Các ứng dụng liên tục trải qua sự phát triển và cải tiến.

    **Nếu chúng ta tách riêng giao diện bên trong và giao diện bên ngoài, thì người viết class có thể tự do thay đổi các thuộc tính và phương thức bên trong class, mà không cần thông báo cho người dùng.**

    Nếu bạn là nhà phát triển của class như vậy, thật tuyệt khi biết rằng các phương thức private có thể được đổi tên một cách an toàn, các tham số của chúng có thể được thay đổi và thậm chí bị loại bỏ, vì không có mã bên ngoài nào phụ thuộc vào chúng.

    Với người dùng, khi có phiên bản ứng dụng mới, nó có thể được đại tu hoàn toàn từ bên trong, nhưng giao diện bên ngoài hay cách sử dụng không thay đổi.

Che giấu những thứ phức tạp không cần thiết
: Mọi người thích sử dụng những thứ đơn giản. Ít nhất là từ bên ngoài. Những thứ phức tạp bên trong họ thường không quan tâm.

    Các lập trình viên cũng không ngoại lệ.

    **Sẽ thuận tiện hơn khi cách thực thi chi tiết bên trong bị ẩn đi để giữ cho giao diện bên ngoài đơn giản, kết hợp với tài liệu sử dụng cho giao diện ngoài được viết tốt.**

Để ẩn giao diện bên trong chúng ta có thể sử dụng các thuộc tính "protected" hoặc "private":

- Trường "protected" bắt đầu với `_`. Nó chỉ là quy ước, không bắt buộc bởi ngôn ngữ. Các lập trình viên không nên truy cập trực tiếp các trường này từ bên ngoài, chỉ truy cập từ bên trong class hoặc từ các class thừa kế.
- Trường "private" bắt đầu với `#`. JavaScript sẽ đảm bảo chúng ta chỉ có thể sử dụng chúng từ bên trong class.

Lúc này, trường riêng tư chưa được hỗ trợ bởi tất cả trình duyệt, nhưng chúng ta có thể polyfill chúng.
