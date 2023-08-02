function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // hàm shooter
      alert( i ); // nên hiện số của nó
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // shooter số 0 hiển thị 10
army[5](); // và số 5 cũng ra 10...
// ... tất cả các shooter hiển thị 10 thay vì số của chúng 0, 1, 2, 3...
*/
