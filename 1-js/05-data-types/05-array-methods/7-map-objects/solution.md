
```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```

Hãy lưu ý rằng trong các arrow function, chúng ta cần sử dụng các dấu ngoặc bổ sung.

Chúng ta không thể viết như thế này:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Như chúng ta đã nhớ, có hai arrow function: không có phần thân `value => expr` và có phần thân `value => {...}`.

Ở đây, JavaScript sẽ coi `{` là phần bắt đầu của thân hàm, không phải phần đầu của đối tượng. Cách giải quyết là bọc chúng trong dấu ngoặc "bình thường":

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Bây giờ thì ổn.


