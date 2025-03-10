importance: 5

---

# Dịch border-left-width sang borderLeftWidth

Viết hàm `camelize(str)` để thay đổi các từ được phân tách bằng dấu gạch ngang như "my-short-string" thành "myShortString" có viết hoa.

Đó là: loại bỏ tất cả các dấu gạch ngang, mỗi từ sau dấu gạch ngang sẽ được viết hoa.

Ví dụ:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

Tái bút: Gợi ý: sử dụng `split` để chia chuỗi thành một array, biến đổi nó và `join` trở lại.
