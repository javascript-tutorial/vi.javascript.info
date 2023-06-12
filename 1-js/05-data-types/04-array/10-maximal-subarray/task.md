importance: 2

---

# Một array con tối đa

Đầu vào là một dãy số, ví dụ: `array = [1, -2, 3, 4, -9, 6]`.

Nhiệm vụ là: tìm array con liền kề của `arr` với tổng các phần tử lớn nhất.

Viết hàm `getMaxSubSum(arr)` sẽ trả về tổng đó.

Ví dụ:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (tổng các mục được đánh dấu)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (lấy tất cả)
```

Nếu tất cả các mục đều âm, điều đó có nghĩa là chúng ta không lấy gì (array con trống), vì vậy tổng bằng 0:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Vui lòng thử nghĩ ra một giải pháp nhanh chóng: [O(n<sup>2</sup>)](https://vi.wikipedia.org/wiki/Kí_hiệu_O_lớn) hoặc thậm chí là O(n) nếu có thể.
