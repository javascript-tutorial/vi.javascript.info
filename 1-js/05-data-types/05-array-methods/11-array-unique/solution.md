Hãy đi qua các item array:
- Đối với mỗi item, chúng ta sẽ kiểm tra xem kết quả array đã có item đó chưa.
- Nếu đúng thì bỏ qua, nếu không thì cộng vào kết quả.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

Mã này hoạt động, nhưng có một vấn đề tiềm ẩn về hiệu suất trong đó.

Phương thức `result.includes(str)` đi bên trong array `result` và so sánh từng phần tử với `str` để tìm kết quả khớp.

Vì vậy, nếu có `100` phần tử trong `result` và không có phần tử nào khớp với `str`, thì nó sẽ duyệt toàn bộ `result` và thực hiện so sánh chính xác `100`. Và nếu `result` lớn, chẳng hạn như `10000`, thì sẽ có các phép so sánh `10000`.

Bản thân nó không phải là vấn đề, bởi vì các JavaScript engine rất nhanh, do đó, array `10000` walk chỉ là một phần triệu giây.

Nhưng chúng ta thực hiện kiểm tra như vậy cho từng phần tử của `arr`, trong vòng lặp `for`.

Vì vậy, nếu `arr.length` là `10000` thì chúng ta sẽ có thứ gì đó như `10000*10000` = 100 triệu phép so sánh. Đó là rất nhiều.

Vì vậy, giải pháp chỉ tốt cho các array nhỏ.

Hơn nữa trong chương <info:map-set> chúng ta sẽ xem cách tối ưu hóa nó.
