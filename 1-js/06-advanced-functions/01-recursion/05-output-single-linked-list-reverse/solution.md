# Sử dụng đệ quy

Logic đệ quy hơi rắc rối ở đây.

Đầu tiên chúng ta cần xuất phần còn lại của danh sách và *sau đó* xuất danh sách hiện tại:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Sử dụng một vòng lặp

Biến thể vòng lặp cũng phức tạp hơn một chút so với đầu ra trực tiếp.

Không có cách nào để lấy giá trị cuối cùng trong `danh sách` của chúng ta. Chúng ta cũng không thể "quay lại".

Vì vậy, những gì chúng ta có thể làm là trước tiên xem qua các mục theo thứ tự trực tiếp và ghi nhớ chúng trong một array, sau đó xuất ra những gì chúng ta đã nhớ theo thứ tự ngược lại:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Hãy lưu ý rằng giải pháp đệ quy thực sự hoạt động chính xác như vậy: nó tuân theo danh sách, ghi nhớ các mục trong chuỗi các lệnh gọi lồng nhau (trong ngăn xếp ngữ cảnh thực thi), sau đó xuất chúng.
