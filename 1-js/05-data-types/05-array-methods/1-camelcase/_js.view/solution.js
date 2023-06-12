function camelize(str) {
  return str
    .split('-') // tách 'từ-dài-của-tôi' thành array ['từ', 'dài', 'của', 'tôi']
    .map(
      // viết hoa các chữ cái đầu tiên của tất cả các phần tử array ngoại trừ phần tử đầu tiên
       // chuyển ['từ', 'dài', 'của' 'tôi'] thành ['từ', 'Dài', 'Của', 'Tôi']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // nối ['từ', 'Dài', 'Của', 'Tôi'] thành 'từDàiCủaTôi'
}
