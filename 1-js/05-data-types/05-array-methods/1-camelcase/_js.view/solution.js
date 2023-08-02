function camelize(str) {
  return str
    .split('-') // tách 'my-long-word' thành array ['my', 'long', 'word']
    .map(
      // viết hoa các chữ cái đầu tiên của tất cả các phần tử array ngoại trừ phần tử đầu tiên
       // chuyển ['my', 'long', 'word'] thành ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // nối ['my', 'Long', 'Word'] thành 'myLongWord'
}
