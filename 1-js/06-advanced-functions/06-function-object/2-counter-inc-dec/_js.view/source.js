function makeCounter() {
  let count = 0;

  // ... mã của bạn ...
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

counter.set(10); // đặt số lượng đếm mới

alert( counter() ); // 10

counter.decrease(); // giảm số lượng đi 1

alert( counter() ); // 10 (thay vì 11)
