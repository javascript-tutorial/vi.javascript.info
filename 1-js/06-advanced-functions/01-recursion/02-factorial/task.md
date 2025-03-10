importance: 4

---

# Tính giai thừa

[Giai thừa](https://vi.wikipedia.org/wiki/Giai_th%E1%BB%ABa) của một số tự nhiên là một số nhân với `"số trừ một"`, sau đó nhân với `"số trừ hai"`, v.v. `1`. Giai thừa của `n` được ký hiệu là `n!`

Chúng ta có thể viết một định nghĩa về giai thừa như thế này:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Giá trị của giai thừa cho `n` khác nhau:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Nhiệm vụ là viết một hàm `factorial(n)` để tính toán `n!` bằng cách gọi đệ quy.

```js
alert( factorial(5) ); // 120
```

Tái bút: Gợi ý: `n!` có thể được viết là `n * (n-1)!` Ví dụ: `3! = 3*2! = 3*2*1! = 6`
