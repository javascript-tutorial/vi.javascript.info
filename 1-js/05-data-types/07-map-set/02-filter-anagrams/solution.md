Để tìm tất cả các đảo chữ cái, hãy tách từng từ thành các chữ cái và sắp xếp chúng. Khi sắp xếp theo chữ cái, tất cả các đảo ngữ đều giống nhau.

Ví dụ:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Chúng ta sẽ sử dụng các biến thể được sắp xếp theo chữ cái làm khóa map để chỉ lưu trữ một giá trị cho mỗi khóa:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // tách từ bằng các chữ cái, sắp xếp chúng và nối lại
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Việc phân loại chữ cái được thực hiện bởi chuỗi các cuộc gọi trong dòng `(*)`.

Để thuận tiện, hãy chia nó thành nhiều dòng:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Hai từ khác nhau `'PAN'` và `'nap'` có cùng dạng sắp xếp theo chữ cái `'anp'`.

Dòng tiếp theo đưa từ vào map:

```js
map.set(sorted, word);
```

Nếu chúng ta gặp lại một từ có cùng dạng sắp xếp theo chữ cái, thì từ đó sẽ ghi đè lên giá trị trước đó bằng cùng một khóa trong map. Vì vậy, chúng ta sẽ luôn có tối đa một từ cho mỗi mẫu dạng ký tự.

Cuối cùng, `Array.from(map.values())` có thể lặp lại các giá trị map (chúng ta không cần khóa trong kết quả) và trả về một array của chúng.

Ở đây chúng ta cũng có thể sử dụng một đối tượng đơn giản thay vì `Map`, vì các khóa là các chuỗi.

Đó là cách giải pháp có thể giống:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
