importance: 2

---

# Kết nối

Có một đối tượng `ladder` cho phép đi lên và đi xuống:

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // hiển thị bước hiện tại
    alert( this.step );
  }
};
```

Bây giờ, nếu chúng ta cần thực hiện một số cuộc gọi theo trình tự, có thể thực hiện như sau:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

Sửa đổi mã của `up`, `down` và `showStep` để thực hiện các cuộc gọi có thể kết nối được, như thế này:

```js
ladder.up().up().down().showStep().down().showStep(); // hiện 1 rồi 0
```

Cách tiếp cận như vậy được sử dụng rộng rãi trên các thư viện JavaScript.
