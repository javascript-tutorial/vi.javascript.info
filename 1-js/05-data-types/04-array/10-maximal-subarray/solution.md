# Giải pháp chậm

Chúng ta có thể tính toán tất cả các tổng con có thể.

Cách đơn giản nhất là lấy mọi phần tử và tính tổng của tất cả các array con bắt đầu từ nó.

Chẳng hạn, đối với `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Bắt đầu từ -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Bắt đầu từ 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Bắt đầu từ 3:
3
3 + (-9)
3 + (-9) + 11

// Bắt đầu từ -9
-9
-9 + 11

// Bắt đầu từ 11
11
```

Mã thực sự là một vòng lặp lồng nhau: vòng lặp bên ngoài trên các phần tử array và bên trong đếm các tổng con bắt đầu bằng phần tử hiện tại.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // nếu chúng ta không lấy phần tử nào, số 0 sẽ được trả về

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

Giải pháp có độ phức tạp về thời gian là [O(n<sup>2</sup>)](https://vi.wikipedia.org/wiki/Kí_hiệu_O_lớn). Nói cách khác, nếu chúng ta tăng kích thước array lên 2 lần, thuật toán sẽ hoạt động lâu hơn 4 lần.

Đối với các array lớn (1000, 10000 mục trở lên), các thuật toán như vậy có thể dẫn đến tình trạng chậm chạp nghiêm trọng.

# Giải pháp nhanh chóng

Hãy di chuyển array và giữ tổng một phần hiện tại của các phần tử trong biến `s`. Nếu `s` trở thành số âm tại một thời điểm nào đó, thì hãy gán `s=0`. Tối đa của tất cả `s` như vậy sẽ là câu trả lời.

Nếu mô tả quá mơ hồ, hãy xem mã, nó đủ ngắn:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // cho mỗi mục của arr
    partialSum += item; // thêm nó vào partialSum
    maxSum = Math.max(maxSum, partialSum); // ghi nhớ số tối đa
    if (partialSum < 0) partialSum = 0; // trả về không nếu âm
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

Thuật toán yêu cầu chính xác 1 lần truyền array, vì vậy độ phức tạp về thời gian là O(n).

Bạn có thể tìm thêm thông tin chi tiết về thuật toán tại đây: [Vấn đề array con tối đa](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Nếu vẫn chưa rõ tại sao nó hoạt động, thì hãy theo dõi thuật toán trên các ví dụ trên, xem nó hoạt động như thế nào, điều đó tốt hơn bất kỳ từ nào.
