importance: 4

---

# Lọc đảo chữ cái

[Đảo ngữ](https://en.wikipedia.org/wiki/Anagram) là những từ có cùng số lượng chữ cái giống nhau, nhưng theo thứ tự khác nhau.

Ví dụ:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Viết một hàm `aclean(arr)` trả về một array đã được làm sạch từ đảo chữ cái.

Ví dụ:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

Từ mỗi nhóm đảo chữ chỉ nên còn lại một từ, bất kể đó là từ nào.

