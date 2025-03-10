importance: 5

---

# Sắp xếp theo lĩnh vực

Chúng ta đã có một array các đối tượng để sắp xếp:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

Cách thông thường để làm điều đó sẽ là:

```js
// theo tên (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// theo tuổi (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Chúng ta có thể làm cho nó ít dài dòng hơn như thế này không?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Vì vậy, thay vì viết một hàm, chỉ cần đặt `byField(fieldName)`.

Viết hàm `byField` có thể được sử dụng cho việc đó.
