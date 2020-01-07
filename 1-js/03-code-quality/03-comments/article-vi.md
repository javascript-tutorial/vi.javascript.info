# Chú thích

Như chúng ta đã biết ở chương info:structure, chú thích có thể là một dòng đơn: bắt đầu với // hoặc là trên nhiều dòng /* ... */.

Chúng ta thường sử dụng chú thích để mô tả như thế nào và tại sao đoạn mã chạy đúng.

Ở cái nhìn đầu tiên, chú thích có thể dễ hiểu, tuy nhiên những người non kinh nghiệm trong lập trình thường không chính xác khi sử dụng chúng.

## Những chú thích không tốt

Những người thiếu kinh nghiệm có xu hướng dùng chú thích để giải thích "việc gì đang diễn ra trong đoạn code". Như sau:

```js
// Đoạn code này sẽ làm việc này (...) và việc kia (...)
// ...và ai biết...
đoạn code;
rất là;
phức tạp;
```

Tuy nhiên trong đoạn code tốt, số lượng những chú thích như thế phải rất nhỏ. Một cách nghiêm túc, đoạn code phải nên hiểu được một cách dễ dàng mà không cần những chú thích như vậy.

Có một quy luật được công nhận rộng rãi về điều này: "nếu đoạn mã nguồn không rõ ràng đến nỗi nó cần phải có chú thích, thì thay vì thế, có lẽ nó nên được viết lại".

### Công thức: đặt ra các hàm

Thỉnh thoảng ta sẽ có nhiều lợi ích khi thay thế đoạn mã với một hàm, như ở đây:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // check if i is a prime number
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

Một biến thể tốt hơn, với hàm `isPrime` được đặt ra:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Bây giờ chúng ta có thể hiểu mã nguồn dễ dàng hơn. Hàm isPrime này tự nó trở thành chú thích. Những mã nguồn như vậy được gọi là *tự-mô-tả*.

### Công thức: tạo nhiều hàm

Và nếu chúng ta có một "trang mã nguồn" dài như thế này:

```js
// ở đây chúng ta thêm vào whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// ở đây chúng ta thêm vào juice
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Thế thì có vẻ nó sẽ tốt hơn để chuyển đổi mã nguồn vào các hàm như:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Một lần nữa, các hàm tự nó sẽ nói lên việc gì đang được thực hiện. Chẳng có gì để chú thích. Và cấu trúc mã nguồn sẽ tốt hơn khi tách thành các hàm như vậy. Rất rõ ràng rằng các hàm đang thực hiện điều gì, nó nhận vào các tham số gì và sẽ trả về giá trị gì.

Trong thực tế, chúng ta không thể nào hoàn toàn tránh khỏi các chú thích "giải thích". Tồn tại những thuật toán phức tạp. Và tồn tại những "cách thức" thông minh cho mục đích tối ưu hóa. Tuy nhiên nhìn chung chúng ta nên giữ cho mã nguồn đơn giản và tự-mô-tả.

## Những chú thích tốt

Vậy thì, những chú thích giải thích thường là không tốt. Những chú thích nào thì gọi là tốt?

Mô tả kiến trúc
: Cung cấp cái nhìn ở mức-độ-cao của thành phần; các thành phần tương tác như thế nào, dòng chảy mã nguồn như thế nào trong các tình huống khác nhau... Tóm lại -- là cái nhìn từ trên cao xuống của mã nguồn. Có một ngôn ngữ đặc biệt [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) để xây dựng sơ đồ kiến trúc mức-độ-cao để giải thích mã nguồn. Chắc chắn rất đáng để học.

Làm tài liệu các tham số hàm và cách sử dụng
: Có một cú pháp đặc biệt [JSDoc](http://en.wikipedia.org/wiki/JSDoc) để làm tài liệu một hàm: cách dùng, các tham số, giá trị trả về.

    Ví dụ như:
    ```js
    /**
     * Trả về x được nâng lên mũ n.
     *
     * @param {number} x The number to raise.
     * @param {number} n The power, must be a natural number.
     * @return {number} x raised to the n-th power.
     */
    function pow(x, n) {
      ...
    }
    ```

    Các chú thích như vậy cho phép chúng ta hiểu mục đích của hàm và sử dụng nó đúng cách mà không cần tìm trong mã của nó.

    Nhân tiện, nhiều trình biên tập như [WebStorm](https://www.jetbrains.com/webstorm/) có thể hiểu chúng và sử dụng chúng để cung cấp chức năng hoàn thành tự động và một số kiểm tra mã nguồn tự động.

    Ngoài ra, có những công cụ như [JSDoc 3](https://github.com/jsdoc3/jsdoc) có thể tạo tài liệu HTML từ các chú thích. Bạn có thể đọc thêm thông tin về JSDoc tại <http://usejsdoc.org/>.

Tại sao tác vụ được giải quyết cách này?
: Những gì được viết ra là quan trọng. Nhưng những gì *không* được viết ra có thể còn quan trọng hơn để hiểu những gì đang diễn ra. Tại sao nhiệm vụ được giải quyết chính xác theo cách này? Mã nguồn không đưa ra câu trả lời.

    Nếu có nhiều cách để giải quyết tác vụ, tại sao lại chọn cách này? Đặc biệt là khi nó không phải là một trong những cách rõ ràng nhất.

    Không có những chú thích như vậy, tình huống sau đây là có thể xảy ra:
    1. Bạn (hoặc đồng nghiệp của bạn) mở mã nguồn được viết cách đây một thời gian và thấy rằng nó "không phải tối ưu".
    2. Bạn nghĩ rằng: "Lúc đó tôi thật ngu ngốc, và bây giờ tôi thật thông minh", và viết lại bằng cách sử dụng "giải pháp rõ ràng và chính xác hơn".
    3. ...Sự thôi thúc viết lại mã nguồn là tốt. Nhưng trong quá trình bạn thấy rằng "giải pháp rõ ràng hơn" bạn đang cài đặt thực sự bị thiếu sót. Bạn thậm chí còn lờ mờ nhớ lý do tại sao, bởi vì bạn đã thử nó từ lâu rồi. Bạn quay đảo lại cài đặt chính xác, nhưng thời gian đã bị lãng phí.

    Chú thích giải thích cho giải pháp cài đặt là rất quan trọng. Chúng giúp tiếp tục phát triển đúng cách.

Có tính năng tinh tế nào của mã nguồn không? Chúng được sử dụng ở đâu?
: Nếu mã có bất cứ điều gì tinh tế và phản trực giác, thì nó chắc chắn đáng để bình luận.

## Tổng kết

Một dấu hiệu quan trọng của một lập trình viên tốt là chú thích: sự hiện diện của chúng và thậm chí sự vắng mặt của chúng.

Chú thích tốt cho phép chúng ta duy trì mã nguồn tốt, quay lại mã nguồn sau khi trì hoãn và sử dụng mã hiệu quả hơn.

**Chú thích này:**

- Tổng thể kiến trúc, cái nhìn ở mức-độ-cao.
- Cách sử dụng hàm.
- Các giải pháp quan trọng, đặc biệt là khi không rõ ràng, khó nhận ra ngay lập tức.

**Tránh các chú thích:**

- Nói lên "mã nguồn hoạt động thế nào" và "những gì nó làm".
- Đặt chúng vào chỉ khi nó không thể làm cho mã đơn giản và tự mô tả đến mức nó không yêu cầu chúng.

Chú thích cũng được sử dụng cho các công cụ tạo tài liệu tự động như JSDoc3: các công cụ đọc chúng và tạo tài liệu HTML (hoặc tài liệu ở định dạng khác).
