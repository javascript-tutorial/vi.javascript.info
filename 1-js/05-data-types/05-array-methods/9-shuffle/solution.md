Giải pháp đơn giản có thể là:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Điều đó phần nào có tác dụng, bởi vì `Math.random() - 0.5` là một số ngẫu nhiên có thể dương hoặc âm, vì vậy hàm sắp xếp sẽ sắp xếp lại các phần tử một cách ngẫu nhiên.

Nhưng vì hàm sắp xếp không được sử dụng theo cách này nên không phải tất cả các hoán vị đều có cùng xác suất.

Ví dụ, hãy xem xét đoạn mã dưới đây. Nó chạy `shuffle` 1000000 lần và đếm số lần xuất hiện của tất cả các kết quả có thể có:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// số lần xuất hiện cho tất cả các hoán vị có thể
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// hiển thị số lượng của tất cả các hoán vị có thể
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Một kết quả ví dụ (phụ thuộc vào JS engine):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Chúng ta có thể thấy rõ sự thiên vị: `123` và `213` xuất hiện thường xuyên hơn nhiều so với các số khác.

Kết quả của mã có thể khác nhau giữa các JavaScript engine, nhưng chúng ta có thể thấy rằng cách tiếp cận này không đáng tin cậy.

Tại sao nó không hoạt động? Nói chung, `sort` là một "hộp đen": chúng ta ném một array và một hàm so sánh vào đó và mong muốn array được sắp xếp. Nhưng do sự so sánh hoàn toàn ngẫu nhiên, hộp đen trở nên điên loạn và chính xác thì nó điên rồ như thế nào phụ thuộc vào việc triển khai cụ thể khác nhau giữa các engine.

Có nhiều cách tốt khác để thực hiện nhiệm vụ. Chẳng hạn, có một thuật toán tuyệt vời gọi là [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). Ý tưởng là di chuyển array theo thứ tự ngược lại và hoán đổi từng phần tử với một phần tử ngẫu nhiên trước nó:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // hoán đổi phần tử array[i] và array[j]
     // chúng ta sử dụng cú pháp "phân công phá hủy" để đạt được điều đó
     // bạn sẽ tìm thấy thêm chi tiết về cú pháp đó trong các chương sau
     // tương tự có thể được viết là:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

Hãy kiểm tra nó theo cùng một cách:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// số lần xuất hiện cho tất cả các hoán vị có thể
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// hiển thị số lượng của tất cả các hoán vị có thể
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Đầu ra ví dụ:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Bây giờ có vẻ tốt: tất cả các hoán vị xuất hiện với cùng xác suất.

Ngoài ra, về hiệu suất, thuật toán Fisher-Yates tốt hơn nhiều, không có chi phí "sắp xếp".
