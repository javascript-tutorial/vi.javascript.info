# Ninja code


```quote author="Khổng Tử (Luận ngữ)"
Học mà không suy nghĩ thì vô ích; suy nghĩ mà không học thì nguy hiểm.
```

Các lập trình viên ninja trong quá khứ đã sử dụng những thủ thuật này để mài giũa tâm trí của những người bảo trì mã.

Các chuyên gia đánh giá mã tìm kiếm chúng trong các tác vụ kiểm thử.

Các nhà lập trình viên ít kinh nghiệm đôi khi sử dụng chúng thậm chí còn tốt hơn cả các lập trình viên ninja.

Hãy đọc kỹ chúng và tìm hiểu xem bạn là ai -- một ninja, một người mới hay có thể là một người đánh giá mã?


```warn header="Phát hiện trớ trêu"
Nhiều người cố gắng đi theo con đường ninja. Chỉ có một số ít thành công.
```


## Ngắn gọn là linh hồn của trí thông minh

Làm cho mã càng ngắn càng tốt. Cho thấy bạn thông minh như thế nào.

Hãy để các tính năng ngôn ngữ tinh tế hướng dẫn bạn.

Chẳng hạn, hãy xem toán tử bậc ba này `'?'`:

```js
// lấy từ một thư viện javascript nổi tiếng
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Ngầu, phải không? Nếu bạn viết như vậy, một nhà phát triển bắt gặp dòng này và cố gắng hiểu giá trị của `i` là gì sẽ có một khoảng thời gian vui vẻ. Sau đó đến với bạn, tìm kiếm một câu trả lời.

Nói với họ rằng ngắn hơn luôn tốt hơn. Bắt đầu dẫn họ vào con đường của ninja.

## Biến có một chữ cái

```quote author="Lão Tử (Đạo đức kinh)"
Đạo ẩn trong vô ngôn. Chỉ có Đạo là bắt đầu tốt và
hoàn thành tốt.
```

Một cách khác để viết mã ngắn hơn là sử dụng các tên biến có một chữ cái ở mọi nơi. Giống như `a`, `b` hoặc `c`.

Một biến ngắn biến mất trong mã giống như một ninja thực sự trong rừng. Sẽ không ai có thể tìm thấy nó bằng cách sử dụng "tìm kiếm" của trình chỉnh sửa. Và ngay cả khi ai đó làm được, họ sẽ không thể "giải mã" cái tên `a` hoặc `b` có nghĩa là gì.

...Nhưng có một ngoại lệ. Một ninja thực thụ sẽ không bao giờ sử dụng `i` làm bộ đếm trong vòng lặp `"for"`. Bất cứ nơi nào, nhưng không phải ở đây. Nhìn xung quanh, có nhiều chữ cái kỳ lạ hơn. Ví dụ: `x` hoặc `y`.

Một biến kỳ lạ làm bộ đếm vòng lặp đặc biệt ngầu nếu thân vòng lặp chiếm 1-2 trang (hãy dài hơn nếu bạn có thể). Sau đó, nếu ai đó nhìn sâu vào bên trong vòng lặp, họ sẽ không thể nhanh chóng nhận ra rằng biến có tên `x` là bộ đếm vòng lặp.

## Sử dụng chữ viết tắt

Nếu quy tắc của nhóm cấm sử dụng tên có một chữ cái và tên mơ hồ -- hãy rút ngắn chúng, hãy viết tắt.

Như thế này:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

Chỉ những người có trực giác thực sự tốt mới có thể hiểu được những cái tên như vậy. Cố gắng rút ngắn mọi thứ. Chỉ một người xứng đáng mới có thể duy trì sự phát triển mã của bạn.

## Bay cao. Hãy trừu tượng.

```quote author="Lão Tử (Đạo đức kinh)"
Quảng trường lớn không có góc<br>
Con tàu vĩ đại đã hoàn thành lần cuối,<br>
Nốt tuyệt vời là âm thanh quý hiếm,<br>
Hình ảnh tuyệt vời không có hình thức.
```

Trong khi chọn tên, hãy cố gắng sử dụng từ trừu tượng nhất. Như `obj`, `data`, `value`, `item`, `elem`, v.v.

- **Tên lý tưởng cho một biến là `data`.** Sử dụng nó ở mọi nơi bạn có thể. Thật vậy, mọi biến đều chứa *dữ liệu*, phải không?

    ...Nhưng phải làm gì nếu `data` đã được sử dụng? Hãy thử `value`, nó cũng phổ biến. Xét cho cùng, một biến cuối cùng sẽ nhận được *giá trị*.

- **Đặt tên biến theo kiểu: `str`, `num`...**

    Hãy thử chúng. Một người mới bắt đầu có thể thắc mắc - những cái tên như vậy có thực sự hữu ích cho một ninja không? Thật sự, chúng có!

    Chắc chắn, tên biến vẫn có ý nghĩa gì đó. Nó cho biết những gì bên trong biến: một chuỗi, một số hoặc thứ gì đó khác. Nhưng khi một người ngoài cuộc cố gắng hiểu mã, họ sẽ ngạc nhiên khi thấy rằng thực tế không có thông tin gì cả! Và cuối cùng họ sẽ thất bại trong việc thay đổi đoạn code mà bạn đã suy nghĩ kỹ lưỡng để viết ra

    Kiểu giá trị rất dễ tìm ra bằng cách gỡ lỗi. Nhưng ý nghĩa của biến là gì? Nó lưu trữ chuỗi/số nào?

    Không có cách nào để tìm ra nếu không có một sự suy ngẫm tốt!

- **...Nhưng nếu không còn những tên như vậy nữa thì sao?** Chỉ cần thêm một số: `data1, item2, elem5`...

## Kiểm tra sự chú ý

Chỉ một lập trình viên thực sự chu đáo mới có thể hiểu mã của bạn. Nhưng làm thế nào để kiểm tra điều đó?

**Một trong các cách -- sử dụng các tên biến tương tự, như `date` và `data`.**

Trộn chúng ở nơi bạn có thể.

Việc đọc nhanh mã như vậy trở nên không thể. Và khi có một lỗi đánh máy... Ummm... Chúng ta bị mắc kẹt lâu rồi, đã đến lúc uống trà.


## Từ đồng nghĩa thông minh

```quote author="Lão Tử (Đạo đức kinh)"
Đạo có thể nói không phải là Đạo vĩnh cửu. Tên có thể đặt tên không phải là tên vĩnh cửu.
```

Sử dụng tên *tương tự* cho những thứ *giống nhau* khiến cuộc sống trở nên thú vị hơn và thể hiện sự sáng tạo của bạn với công chúng.

Chẳng hạn, hãy xem xét các tiền tố hàm. Nếu một hàm hiển thị thông báo trên màn hình -- hãy bắt đầu hàm đó bằng `display…`, chẳng hạn như `displayMessage`. Và sau đó, nếu một hàm khác hiển thị trên màn hình một thứ khác, chẳng hạn như tên người dùng, hãy bắt đầu bằng `show…` (chẳng hạn như `showName`).

Nói bóng gió rằng có một sự khác biệt tinh tế giữa các hàm như vậy, trong khi không có.

Thỏa thuận với các ninja khác trong nhóm: nếu John bắt đầu "hiển thị" các hàm với `display...` trong mã của anh ấy, thì Peter có thể sử dụng `render..`, và Ann -- `paint...`. Lưu ý rằng mã đã trở nên thú vị và đa dạng hơn bao nhiêu.

...Và bây giờ là cú hat-trick!

Đối với hai hàm có sự khác biệt quan trọng -- hãy sử dụng cùng một tiền tố!

Chẳng hạn, hàm `printPage(page)` sẽ sử dụng một máy in. Và hàm `printText(text)` sẽ đưa văn bản lên màn hình. Hãy để một độc giả không quen biết suy nghĩ kỹ về hàm có tên tương tự `printMessage`: "Nó đặt thông báo ở đâu? Đến máy in hay trên màn hình?". Để làm cho nó thực sự tỏa sáng, `printMessage(message)` nên xuất nó trong cửa sổ mới!

## Sử dụng lại tên

```quote author="Lão Tử (Đạo đức kinh)"
Sau khi toàn bộ được chia, các bộ phận<br>
cần tên.<br>
Đã có đủ tên.<br>
Người ta phải biết khi nào nên dừng lại.
```

Chỉ thêm một biến mới khi thực sự cần thiết.

Thay vào đó, hãy sử dụng lại các tên hiện có. Chỉ cần viết các giá trị mới vào chúng.

Trong một hàm, hãy cố gắng chỉ sử dụng các biến được truyền dưới dạng tham số.

Điều đó sẽ khiến bạn thực sự khó xác định chính xác cái gì có trong biến *now*. Và cũng như nó đến từ đâu. Mục đích là để phát triển trực giác và trí nhớ của một người đọc mã. Một người có trực giác kém sẽ phải phân tích từng dòng mã và theo dõi các thay đổi qua từng nhánh mã.

**Một biến thể nâng cao của phương pháp này là ngầm (!) thay thế giá trị bằng giá trị tương tự ở giữa vòng lặp hoặc hàm.**

Ví dụ:

```js
function ninjaFunction(elem) {
  // 20 dòng code làm việc với elem

  elem = clone(elem);

  // 20 dòng nữa, hiện đang hoạt động với bản sao của elem!
}
```

Một lập trình viên đồng nghiệp muốn làm việc với `elem` trong nửa sau của hàm sẽ ngạc nhiên... Chỉ trong quá trình gỡ lỗi, sau khi kiểm tra mã, họ mới phát hiện ra rằng mình đang làm việc với một bản sao!

Nhìn thấy trong mã thường xuyên. Hiệu quả chết người ngay cả đối với một ninja dày dặn kinh nghiệm.

## Gạch dưới cho vui

Đặt dấu gạch dưới `_` và `__` trước tên biến. Giống như `_name` hoặc `__value`. Sẽ thật tuyệt nếu chỉ bạn biết ý nghĩa của chúng. Hoặc, tốt hơn, thêm chúng chỉ để giải trí, không có ý nghĩa cụ thể nào cả. Hoặc ý nghĩa khác nhau ở những nơi khác nhau.

Bạn giết hai con thỏ bằng một phát bắn. Đầu tiên, mã trở nên dài hơn và khó đọc hơn, và thứ hai, một nhà phát triển đồng nghiệp có thể mất nhiều thời gian để cố gắng tìm ra ý nghĩa của dấu gạch dưới.

Một ninja thông minh đặt dấu gạch dưới tại một điểm của mã và tránh chúng ở những nơi khác. Điều đó làm cho mã trở nên dễ hỏng hơn và tăng khả năng xảy ra lỗi trong tương lai.

## Thể hiện tình yêu của bạn

Hãy để mọi người thấy các thực thể của bạn tuyệt vời như thế nào! Những cái tên như `superElement`, `megaFrame` và `niceItem` chắc chắn sẽ khai sáng cho người đọc.

Thật vậy, từ một mặt, một cái gì đó được viết: `super..`, `mega..`, `nice..` Nhưng mặt khác -- điều đó không mang lại chi tiết. Người đọc có thể quyết định tìm kiếm ý nghĩa ẩn giấu và suy ngẫm trong một hoặc hai giờ trong thời gian làm việc được trả lương của họ.


## Chồng chéo các biến bên ngoài

```quote author="Quan Vũ"
Khi ở trong ánh sáng, không thể nhìn thấy gì trong bóng tối.<br>
Khi ở trong bóng tối, bạn có thể nhìn thấy mọi thứ trong ánh sáng.
```

Sử dụng cùng tên cho các biến bên trong và bên ngoài một hàm. Đơn giản, không cần nỗ lực để tạo ra các tên mới.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...rất nhiều dòng...
  ...
  ... // <-- một lập trình viên muốn làm việc với người dùng ở đây và...
  ...
}
```

Một lập trình viên nhảy vào bên trong `render` có thể sẽ không nhận thấy rằng có một `user` cục bộ che khuất cái bên ngoài.

Sau đó, họ sẽ cố gắng làm việc với `user` với giả định rằng đó là biến bên ngoài, kết quả của `authenticateUser()`... Cái bẫy đã bung ra! Xin chào, trình gỡ lỗi...


## Tác dụng phụ ở mọi nơi!

Có những hàm tưởng chừng như không thay đổi gì, như `isReady()`, `checkPermission()`, `findTags()`... Chúng được cho là thực hiện tính toán, tìm kiếm và trả về dữ liệu mà không thay đổi bất cứ thứ gì bên ngoài chúng. Nói cách khác, không có "tác dụng phụ".

**Một thủ thuật thực sự hay là thêm một hành động "hữu ích" cho chúng, bên cạnh nhiệm vụ chính.**

Biểu cảm ngạc nhiên sửng sốt trên khuôn mặt đồng nghiệp của bạn khi họ nhìn thấy một chức năng có tên `is..`, `check..` hoặc `find...` đang thay đổi điều gì đó -- chắc chắn sẽ mở rộng ranh giới lý trí của bạn.

**Một cách khác để gây bất ngờ là trả về kết quả không chuẩn.**

Thể hiện suy nghĩ ban đầu của bạn! Hãy để lệnh gọi `checkPermission` trả về không phải `true/false`, mà là một đối tượng phức tạp với kết quả kiểm tra.

Những nhà phát triển cố gắng viết `if (checkPermission(..))`, sẽ thắc mắc tại sao nó không hoạt động. Hãy nói với họ: "Hãy đọc tài liệu!". Và đưa ra bài viết này.


## Hàm mạnh mẽ!

```quote author="Lão Tử (Đạo đức kinh)"
Đạo lớn chảy khắp nơi,<br>
cả bên trái và bên phải.
```

Đừng giới hạn hàm bởi những gì được viết trong tên của nó. Hãy rộng rãi hơn.

Chẳng hạn, một hàm `validateEmail(email)` có thể (ngoài việc kiểm tra tính chính xác của email) hiển thị thông báo lỗi và yêu cầu nhập lại email.

Các hành động bổ sung không nên rõ ràng từ tên hàm. Một lập trình viên ninja thực thụ cũng sẽ khiến chúng không bị lộ ra khỏi mã.

**Kết hợp nhiều hành động thành một để bảo vệ mã của bạn không bị sử dụng lại.**

Hãy tưởng tượng, một nhà phát triển khác chỉ muốn kiểm tra email và không xuất bất kỳ thông báo nào. Hàm `validateEmail(email)` của bạn thực hiện cả hai sẽ không phù hợp với họ. Vì vậy, họ sẽ không phá vỡ tâm trí của bạn bằng cách hỏi bất cứ điều gì về nó.

## Tóm tắt

Tất cả "mẩu lời khuyên" ở trên là từ những mã ở thực tế... Đôi khi, được viết bởi các nhà phát triển có kinh nghiệm. Thậm chí có thể nhiều kinh nghiệm hơn bạn;)

- Làm theo một số trong số đó, và mã của bạn sẽ trở nên đầy bất ngờ.
- Làm theo nhiều trong số đó, và mã của bạn sẽ thực sự là của bạn, không ai muốn thay đổi nó.
- Hãy làm theo tất cả, và mã của bạn sẽ trở thành bài học quý giá cho các nhà phát triển trẻ đang tìm kiếm sự khai sáng.
