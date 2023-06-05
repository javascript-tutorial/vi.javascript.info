function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // hàm shooter
      alert( i ); // nên hiện số của nó
    };
    shooters.push(shooter);
  }

  return shooters;
}
