importance: 5

---

# Có gì sai trong bài kiểm tra?

Có gì sai trong bài kiểm tra `pow` bên dưới?

```js
it("Nâng x lên luỹ thừa n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

Tái bút: Về mặt cú pháp, bài kiểm tra là chính xác và đỗ.
