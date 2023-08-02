importance: 4

---

# Lọc đảo chữ

[Đảo chữ](https://vi.wikipedia.org/wiki/Phép_đảo_chữ) là những từ có cùng số lượng chữ cái giống nhau, nhưng theo thứ tự khác nhau.

Ví dụ:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Viết một hàm `aclean(arr)` trả về một array đã được làm sạch từ đảo chữ.

Ví dụ:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" hoặc "PAN,cheaters,era"
```

Từ mỗi nhóm đảo chữ chỉ nên còn lại một từ, bất kể đó là từ nào.

