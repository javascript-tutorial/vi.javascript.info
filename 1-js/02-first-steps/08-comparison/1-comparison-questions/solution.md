```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Some of the reasons:

1. Hiển nhiên, true.
2. So sánh theo thứ tự từ điển, nên là false.
3. Một lần nữa, so sánh theo thứ tự từ điển, ký tự đầu tiên của `"2"` thì lớn hơn ký tự đầu tiên của `"1"`.
4. Chỉ giá trị `null` và `undefined` là bằng nhau.
5. So sánh bằng nhau một cách chặt chẽ. Kiểu dữ liệu của cả 2 khác nhau nên kết quả là false.
6. Tương tự như `(4)`, `null` chỉ bằng với `undefined`.
7. So sánh chặt chẽ với các kiểu dữ liệu khác nhau.
