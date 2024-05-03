# Mở đầu về Javascript

Hãy xem JavaScript có gì đặc biệt, chúng ta có thể đạt được gì với nó và những công nghệ khác hoạt động tốt thế nào với nó.

## JavaScript là gì?

*JavaScript* ban đầu được tạo ra để "làm cho các trang web trở nên sống động".

Các chương trình trong ngôn ngữ này được gọi là *kịch bản (scripts)*. Chúng có thể được viết ngay trong HTML của trang web và chạy khi tải trang.

Các tập lệnh (scripts) được cung cấp và thực thi dưới dạng văn bản thuần túy. Chúng không cần chuẩn bị hay biên dịch để có thể chạy được.

Ở khía cạnh này, JavaScript rất khác với ngôn ngữ lập trình có tên là [Java](https://vi.wikipedia.org/wiki/Java_(ng%C3%B4n_ng%E1%BB%AF_l%E1%BA%ADp_tr%C3%ACnh)).

```smart header="Vì sao nó được gọi là <u>Java</u>Script?"
Khi Javascript được tạo ra, ban đầu nó có một cái tên khác: "LiveScript". Nhưng lúc đó Java đang rất phổ biến, vì vậy người ta đã quyết định rằng đặt một ngôn ngữ mới là "em trai" của Java sẽ có ích.

Nhưng với sự phát triển của mình, JavaScript đã trở thành một ngôn ngữ hoàn toàn độc lập, với những đặc điểm kỹ thuật riêng của mình được gọi là [ECMAScript](https://vi.wikipedia.org/wiki/ECMAScript), và bây giờ nó chẳng liên quan gì đến Java cả.
```

Ngày nay, JavaScript không những có thể thực thi trên trình duyệt, mà còn trên cả máy chủ (server), hoặc trên bất cứ nơi nào có chương trình tên là [the JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Trình duyệt đã có sẵn một Javascript engine đôi khi được gọi là "JavaScript virtual machine".

Những engine khác nhau thì sẽ có những "tên mã" khác nhau. Chẳng hạn:

- [V8](https://vi.wikipedia.org/wiki/Chrome_V8) -- trong Chrome và Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- trong Firefox.
- ...Có một số tên mã khác như "Chakra" cho IE, "ChakraCore" cho Microsoft Edge, "Nitro" và "SquirrelFish" cho Safari v.v.

Nên ghi nhớ các thuật ngữ trên bởi vì chúng được sử dụng khá nhiều trong các bài viết dành cho nhà phát triển (developer) trên Internet, và cả chúng ta. Ví dụ, nếu "tính năng X được hỗ trợ bởi V8", vậy nó có lẽ sẽ hoạt động trên Chrome và Opera.

```smart header="Engine hoạt động như thế nào?"

Engine khá phức tạp, tuy nhiên có thể hiểu đơn giản như sau:

1. Engine (được nhúng nếu là trình duyệt) đọc ("phân tích cú pháp") tập lệnh.
2. Tiếp theo nó chuyển đổi ("biên dịch") tập lệnh sang mã máy.
3. Và sau đó mã máy chạy, khá nhanh.

Engine áp dụng tối ưu hóa ở mỗi bước của quá trình. Nó thậm chí còn theo dõi tập lệnh đã biên dịch khi nó chạy, phân tích dữ liệu chạy qua nó và tối ưu hóa hơn nữa mã máy dựa trên kiến thức đó.
```

## JavaScript có thể làm gì trong trình duyệt?

Javascript hiện đại là một ngôn ngữ lập trình "an toàn". Nó không cung cấp quyền truy cập cấp thấp vào bộ nhớ hay CPU, bởi vì ban đầu nó được tạo ra cho trình duyệt vốn dĩ không yêu cầu những điều đó.

Sức mạnh của Javascript phụ thuộc rất lớn vào môi trường mà nó đang hoạt động. Chẳng hạn, [Node.js](https://vi.wikipedia.org/wiki/Node.js) hỗ trợ các hàm giúp cho Javascript có thể đọc/ghi các tập tin tùy ý, thực hiện các yêu cầu mạng, etc.

Javascript trong trình duyệt có thể làm mọi thứ có liên quan đến thao tác của trang web, tương tác với người dùng, và máy chủ web (webserver).

Ví dụ, JavaScript trong trình duyệt có khả năng:

- Thêm HTML mới vào trang, thay đổi nội dung có sẵn, sửa đổi phong cách (styles).
- Phản ứng với các hành động của người dùng, chạy khi nhấp chuột, chuyển động của con trỏ, nhấn phím.
- Gửi yêu cầu qua mạng đến các máy chủ từ xa, tải xuống và tải lên file (cái gọi là [AJAX](https://vi.wikipedia.org/wiki/Ajax_(l%E1%BA%ADp_tr%C3%ACnh)) và công nghệ [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Lấy và đặt cookie, đặt câu hỏi cho người truy cập, hiện tin nhắn.
- Ghi nhớ dữ liệu ở phía máy khách ("lưu trữ cục bộ - local storage").

## JavaScript không thể làm gì trong trình duyệt?

Nhiều tính năng của Javascript trong trình duyệt bị giới hạn vì lợi ích an toàn của người dùng. Mục đích là để ngăn chặn những trang web độc hại truy cập thông tin cá nhân hoặc gây hại đến dữ liệu của người dùng.

Một số hạn chế có thể kể là:

- JavaScript trên một trang web không thể đọc/ghi các tệp tùy ý trên đĩa cứng, sao chép chúng hoặc thực thi các chương trình. Nó không có quyền truy cập trực tiếp vào các chức năng của hệ điều hành.

    Nhiều trình duyệt hiện đại cho phép làm việc với tập tin, nhưng bị giới hạn và chỉ được truy cập nếu như người dùng thực hiện một hành động nhất định nào đó, ví dụ như "thả" các tập tin vào cửa sổ trình duyệt hoặc chọn chúng qua thẻ `<input>`.

    Có nhiều cách để tương tác với camera/microphone và thiết bị khác, nhưng chúng yêu cầu sự cho phép rõ ràng của người dùng. Vì vậy, một trang web hỗ trợ Javascript sẽ không bật lén camera, quan sát và gửi thông tin cho [NSA](https://vi.wikipedia.org/wiki/C%C6%A1_quan_An_ninh_Qu%E1%BB%91c_gia_(Hoa_K%E1%BB%B3)).
- Các tab/cửa sổ nhìn chung không biết gì về nhau. Thỉnh thoảng có, ví dụ như một cửa sổ dùng Javascript để mở cửa sổ khác. Nhưng kể cả như vậy, JavaScript từ trang này vẫn không thể can thiệp vào trang kia nếu như chúng đến từ tên miền, giao thức hoặc port khác.

    Cái này được gọi là "Same Origin Policy". Để làm việc với nó, *cả 2 trang web* cần phải đồng ý cho việc trao đổi dữ liệu và bao gồm cả các đoạn mã Javascript đặc biệt nhằm xử lí nó. Chúng ta sẽ nhắc đến trong phần hướng dẫn sau.

    Hạn chế ở đây là, một lần nữa, cho an toàn của người dùng. Một trang web từ `http://anysite.com` mà người dùng vừa mở không được can thiệp vào trang web có URL là `http://gmail.com` ở tab khác với mục đích đánh cắp thông tin cá nhân.
- Javascript có thể dễ dàng giao tiếp qua mạng để đến máy chủ - nơi đang chứa trang web hiện tại. Nhưng khả năng nhận dữ liệu từ trang web khác hoàn toàn bị tê liệt. Mặc dù có thể, nó đòi hỏi phải có thỏa thuận rõ ràng (được thể hiện trong HTTP headers) từ phía điều khiển. Lại lần nữa, đây là giới hạn vì an toàn.

![](limitations.svg)

Những giới hạn trên sẽ không tồn tại nếu như Javascript được sử dụng bên ngoài trình duyệt, như máy chủ chẳng hạn. Các trình duyệt hiện đại cũng cho phép các plugin/tiện ích có thể hỏi cho các quyền mở rộng.

## Điều gì khiến cho Javascript khác biệt?

Có ít nhất *ba* điều tuyệt vời ở Javascript:

```compare
+ Tích hợp hoàn toàn với HTML/CSS.
+ Những điều đơn giản được thực hiện một cách đơn giản.
+ Được hỗ trợ bởi tất cả các trình duyệt chính và được bật theo mặc định.
```

Javascript là công nghệ trình duyệt duy nhất kết hợp cả 3 điều trên.

Đó là những thứ khiến cho Javascript trở nên độc đáo. Đó là lí do tại sao nó là công cụ phổ biến nhất để tạo giao diện trình duyệt.

Điều đó nói rằng, JavaScript cũng cho phép tạo các ứng dụng di động, máy chủ v.v.

## Những ngôn ngữ "trên nền tảng" JavaScript

Cú pháp của Javascript không phù hợp cho tất cả mọi người. Những người khác nhau lại muốn các tính năng khác nhau.

Đó là điều được mong đợi, vì các dự án và yêu cầu đều khác nhau đối với mọi người.

Vì vậy gần đây có rất nhiêu ngôn ngữ mới xuất hiện, chúng được *dịch mã* (chuyển đổi) sang Javascript trước khi chúng chạy trên trình duyệt.

Những công cụ hiện đại làm cho việc dịch trở nên nhanh chóng và minh bạch, thực sự cho phép các nhà phát triển viết mã bằng ngôn ngữ khác và tự động chuyển đổi nó trơn tru và hiệu quả.

Có thể kể đến một số ngôn ngữ:

- [CoffeeScript](http://coffeescript.org/) là một "cú pháp đặc biệt" cho JavaScript. Nó giới thiệu cú pháp ngắn hơn, cho phép chúng ta viết mã rõ ràng và chính xác hơn. Thông thường thì các nhà phát triển Ruby thích nó.
- [TypeScript](http://www.typescriptlang.org/) được tập trung cho việc "gõ dự liệu một cách nghiêm ngặt" nhằm đơn giản hóa việc phát triển và hỗ trợ các hệ thống phức tạp. Nó được phát triển bởi Microsoft.
- [Flow](http://flow.org/) cũng thêm một vài cách gõ dữ liệu, nhưng theo một cách khác. Phát triển bởi Facebook.
- [Dart](https://www.dartlang.org/) là một ngôn ngữ độc lập có engine riêng và có thể chạy trong môi trường khác ngoài trình duyệt, nó cũng có thể được dịch sang Javascript. Phát triển bởi Google.
- [Brython](https://brython.info/) là một trình chuyển tiếp Python sang JavaScript cho phép viết các ứng dụng bằng Python thuần túy mà không cần JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) là một ngôn ngữ lập trình hiện đại, ngắn gọn và an toàn, mà có thể nhắm đến trình duyệt hoặc Node.

Sẽ có nhiều hơn số kể trên. Dĩ nhiên, ngay cả khi chúng ta sử dụng một trong những ngôn ngữ đó, chúng ta cũng nên biết Javascript để thực sự hiểu chúng ta đang làm gì.

## Tóm tắt

- Javascript được tạo ra với mục đích ban đầu chỉ cho trình duyệt, nhưng bây giờ đã được sử dụng rộng rãi trên nhiều môi trường khác.
- Ngày nay, Javascript có một vị trí khác biệt như là ngôn ngữ trình duyệt được sử dụng rộng rãi nhất với sự tích hợp đầy đủ với HTML/CSS.
- Có nhiều ngôn ngữ được "dịch" sang JavaScript và cung cấp một số tính năng nhất định. Nên xem qua chúng, ít nhất là một thời gian ngắn sau khi thành thạo JavaScript.
