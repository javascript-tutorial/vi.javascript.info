
function readNumber() {
  let num;

  do {
    num = prompt("Vui lòng nhập số?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}
