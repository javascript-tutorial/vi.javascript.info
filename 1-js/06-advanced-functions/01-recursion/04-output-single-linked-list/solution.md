# Giải pháp dựa trên vòng lặp

Biến thể dựa trên vòng lặp của giải pháp:

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

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Hãy lưu ý rằng chúng ta sử dụng một biến tạm thời `tmp` để duyệt qua danh sách. Về mặt kỹ thuật, chúng ta có thể sử dụng tham số chức năng `list` để thay thế:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Nhưng đó sẽ là không khôn ngoan. Trong tương lai, chúng ta có thể cần mở rộng một hàm, làm điều gì đó khác với danh sách. Nếu chúng ta thay đổi `list`, thì chúng ta sẽ mất khả năng đó.

Nói về tên biến tốt, `list` ở đây chính là danh sách. Yếu tố đầu tiên của nó. Và nó nên giữ nguyên như vậy. Điều đó rõ ràng và đáng tin cậy.

Mặt khác, vai trò của `tmp` chỉ là duyệt danh sách, giống như `i` trong vòng lặp `for`.

# Giải pháp đệ quy

Biến thể đệ quy của `printList(list)` tuân theo logic đơn giản: để xuất danh sách, chúng ta nên xuất phần tử hiện tại `list`, sau đó thực hiện tương tự cho `list.next`:

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

function printList(list) {

  alert(list.value); // xuất mục hiện tại

  if (list.next) {
    printList(list.next); // làm tương tự cho phần còn lại của danh sách
  }

}

printList(list);
```

Bây giờ cái nào tốt hơn?

Về mặt kỹ thuật, vòng lặp hiệu quả hơn. Hai biến thể này thực hiện tương tự, nhưng vòng lặp không dành tài nguyên cho các lệnh gọi hàm lồng nhau.

Mặt khác, biến thể đệ quy ngắn hơn và đôi khi dễ hiểu hơn.
