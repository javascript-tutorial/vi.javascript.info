# Kiểm tra tự động với Mocha

Kiểm tra tự động sẽ được sử dụng trong các tác vụ tiếp theo và nó cũng được sử dụng rộng rãi trong các dự án thực tế.

## Tại sao chúng ta cần kiểm tra?

Khi chúng ta viết một hàm, chúng ta thường có thể hình dung nó sẽ làm gì: tham số nào cho kết quả nào.

Trong quá trình phát triển, chúng ta có thể kiểm tra hàm bằng cách chạy nó và so sánh kết quả với kết quả mong đợi. Chẳng hạn, chúng ta có thể làm điều đó trong bảng điều khiển.

Nếu có điều gì sai -- thì ta sửa mã, chạy lại, kiểm tra kết quả -- và cứ thế cho đến khi nó hoạt động.

Nhưng "chạy lại" thủ công như vậy là không hoàn hảo.

**Khi kiểm tra mã bằng cách chạy lại thủ công, rất dễ bỏ sót điều gì đó.**

Chẳng hạn, chúng ta đang tạo một hàm `f`. Ta đã viết một số mã, thử nghiệm: `f(1)` hoạt động, nhưng `f(2)` không hoạt động. Chúng ta sửa mã và bây giờ `f(2)` hoạt động. Có vẻ hoàn chỉnh? Nhưng chúng ta đã quên kiểm tra lại `f(1)`. Điều đó có thể dẫn đến một lỗi.

Điều đó rất điển hình. Khi chúng ta phát triển một thứ gì đó, chúng ta ghi nhớ rất nhiều trường hợp sử dụng có thể xảy ra. Nhưng thật khó để mong đợi một lập trình viên kiểm tra tất cả chúng một cách thủ công sau mỗi lần thay đổi. Vì vậy, nó trở nên dễ dàng để sửa chữa một thứ và phá vỡ một thứ khác.

**Kiểm tra tự động có nghĩa là các kiểm tra được viết riêng, bên cạnh mã. Chúng chạy các hàm của chúng ta theo nhiều cách khác nhau và so sánh kết quả với kết quả mong đợi.**

## Behavior Driven Development (BDD)

Hãy bắt đầu với một kỹ thuật có tên [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) hoặc, ngắn gọn, BDD.

****BDD là ba thứ trong một: kiểm tra VÀ tài liệu VÀ ví dụ.**

Để hiểu BDD, chúng ta sẽ xem xét một trường hợp phát triển thực tế.

## Phát triển "pow": thông số kỹ thuật

Giả sử chúng ta muốn tạo một hàm `pow(x, n)` nâng `x` lên một lũy thừa nguyên `n`. Chúng ta giả định rằng `n≥0`.

Tác vụ đó chỉ là một ví dụ: có toán tử `**` trong JavaScript có thể làm điều đó, nhưng ở đây chúng ta tập trung vào quy trình phát triển cũng có thể được áp dụng cho các tác vụ phức tạp hơn.

Trước khi tạo mã của `pow`, chúng ta có thể hình dung chức năng này sẽ làm gì và mô tả nó.

Mô tả như vậy được gọi là *thông số kỹ thuật* hay nói ngắn gọn là thông số và chứa mô tả về các trường hợp sử dụng cùng với các bài kiểm tra dành cho chúng, như sau:

```js
describe("luỹ thừa", function() {

  it("nâng lên mũ n", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Một thông số kỹ thuật có ba khối xây dựng chính mà bạn có thể thấy ở trên:

`describe("title", function() { ... })`
: Chúng ta đang mô tả hàm gì. Trong trường hợp của chúng ta, chúng ta đang mô tả hàm `pow`. Được sử dụng để nhóm "công nhân" -- các khối `it`.

`it("use case description", function() { ... })`
: Trong tiêu đề của `it`, chúng ta *theo cách mà con người có thể đọc được* mô tả trường hợp sử dụng cụ thể và đối số thứ hai là một hàm kiểm tra trường hợp đó.

`assert.equal(value1, value2)`
: Mã bên trong khối `it`, nếu triển khai đúng, sẽ thực thi mà không có lỗi.

    Hàm `assert.*` được sử dụng để kiểm tra xem `pow` có hoạt động như mong đợi hay không. Ngay tại đây, chúng ta đang sử dụng một trong số chúng -- `assert.equal`, nó so sánh các đối số và đưa ra lỗi nếu chúng không bằng nhau. Tại đây, nó kiểm tra xem kết quả của `pow(2, 3)` có bằng `8` hay không. Có nhiều loại so sánh và kiểm tra khác mà chúng ta sẽ bổ sung sau.

Thông số kỹ thuật có thể được thực thi và nó sẽ chạy bài kiểm tra được chỉ định trong khối `it`. Chúng ta sẽ thấy điều đó sau.

## Dòng chảy phát triển

Dòng phát triển thường trông như thế này:

1. Thông số kỹ thuật ban đầu được viết, với các bài kiểm tra hàm cơ bản nhất.
2. Triển khai ban đầu được tạo.
3. Để kiểm tra xem nó có hoạt động hay không, chúng ta chạy framework kiểm tra [Mocha](https://mochajs.org/) (sẽ sớm có thêm thông tin chi tiết) để chạy thông số kỹ thuật đó. Trong khi hàm không hoàn thành, lỗi được hiển thị. Chúng ta thực hiện chỉnh sửa cho đến khi mọi thứ hoạt động.
4. Bây giờ chúng ta có một thực hiện ban đầu đang hoạt động với bài kiểm tra.
5. Chúng ta thêm nhiều trường hợp sử dụng hơn vào thông số kỹ thuật, có thể chưa được triển khai hỗ trợ. Các thử nghiệm bắt đầu thất bại.
6. Đến bước 3, cập nhật việc triển khai cho đến khi kiểm tra không có lỗi.
7. Lặp lại các bước 3-6 cho đến khi hàm sẵn sàng.

Vì vậy, sự phát triển là * lặp đi lặp lại *. Chúng ta viết thông số kỹ thuật, triển khai nó, đảm bảo nó vượt qua các bài kiểm tra, sau đó viết thêm các bài kiểm tra khác, đảm bảo chúng hoạt động, v.v. Cuối cùng, chúng ta vừa có một triển khai hoạt động và các bài kiểm tra cho nó.

Hãy xem dòng phát triển này trong trường hợp thực tế của chúng ta.

Bước đầu tiên đã hoàn tất: chúng ta có thông số kỹ thuật ban đầu cho `pow`. Bây giờ, trước khi thực hiện, hãy sử dụng một số thư viện JavaScript để chạy bài kiểm tra, chỉ để xem chúng có hoạt động không (tất cả chúng sẽ không thành công).

## Thông số kỹ thuật hoạt động

Ở trong hướng dẫn này, chúng ta sẽ sử dụng các thư viện JavaScript sau để kiểm tra:

- [Mocha](http://mochajs.org/) -- framework cốt lõi: nó cung cấp các hàm kiểm tra phổ biến bao gồm `describe` và `it` và hàm chính chạy các bài kiểm tra.
- [Chai](http://chaijs.com) -- thư viện có nhiều xác nhận. Nó cho phép sử dụng rất nhiều xác nhận khác nhau, bây giờ chúng ta chỉ cần `assert.equal`.
- [Sinon](http://sinonjs.org/) -- một thư viện để theo dõi các hàm, mô phỏng các hàm tích hợp sẵn và hơn thế nữa, chúng ta sẽ cần đến nó sau này.

Các thư viện này phù hợp cho cả kiểm tra trên trình duyệt và phía máy chủ. Ở đây chúng ta sẽ xem xét biến thể trình duyệt.

Trang HTML đầy đủ với các khung này và thông số kỹ thuật `pow`:

```html src="index.html"
```

Trang này có thể được chia thành năm phần:

1. `<head>` -- thêm các thư viện và kiểu của bên thứ ba cho các bài kiểm tra.
2. `<script>` có hàm kiểm tra, trong trường hợp của chúng ta -- có mã cho `pow`.
3. Các thử nghiệm -- trong trường hợp của chúng ta là một tập lệnh bên ngoài `test.js` có `describe("pow", ...)` ở phía trên.
4. Phần tử HTML `<div id="mocha">` sẽ được Mocha sử dụng để xuất kết quả.
5. Các bài kiểm tra được bắt đầu bằng lệnh `mocha.run()`.

Kết quả:

[iframe height=250 src="pow-1" border=1 edit]

Hiện tại, thử nghiệm không thành công, có lỗi. Điều đó hợp lý: chúng ta có một mã hàm trống trong `pow`, vì vậy `pow(2,3)` trả về `undefined` thay vì `8`.

Trong tương lai, hãy lưu ý rằng có nhiều trình chạy kiểm tra cấp cao hơn, như [karma](https://karma-runner.github.io/) và những trình chạy kiểm tra khác, giúp dễ dàng tự động chạy nhiều bài kiểm tra khác nhau.

## Thực hiện ban đầu

Hãy thực hiện một triển khai đơn giản của `pow` để vượt qua các bài kiểm tra:

```js
function pow(x, n) {
  return 8; // :) chúng ta gian lận!
}
```

Chà, bây giờ nó hoạt động!

[iframe height=250 src="pow-min" border=1 edit]

## Cải thiện thông số kỹ thuật

Những gì chúng ta đã làm chắc chắn là gian lận. Hàm này không hoạt động: một nỗ lực tính toán `pow(3,4)` sẽ cho kết quả không chính xác, nhưng các phép kiểm tra đã vượt qua.

...Nhưng tình huống khá điển hình, nó xảy ra trong thực tế. Nó vượt qua các bài kiểm tra, nhưng hàm hoạt động sai. Thông số kỹ thuật của chúng ta là không hoàn hảo. Chúng ta cần thêm nhiều trường hợp sử dụng hơn cho nó.

Hãy thêm một phép thử nữa để kiểm tra xem `pow(3, 4) = 81`.

Chúng ta có thể lựa chọn một trong hai cách tổ chức kiểm tra tại đây:

1. Biến thể đầu tiên -- thêm một `assert` nữa vào cùng `it`:

    ```js
    describe("luỹ thừa", function() {

      it("nâng lên mũ n", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. Thứ hai -- thực hiện hai bài kiểm tra:

    ```js
    describe("luỹ thừa", function() {

      it("2 mũ 3 là 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 mũ 4 là 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

Sự khác biệt chính là khi `assert` gây ra lỗi, khối `it` sẽ ngay lập tức chấm dứt. Vì vậy, trong biến thể đầu tiên nếu `assert` đầu tiên không thành công, thì chúng ta sẽ không bao giờ thấy kết quả của `assert` thứ hai.

Thực hiện các bài kiểm tra riêng biệt rất hữu ích để có thêm thông tin về những gì đang diễn ra, vì vậy biến thể thứ hai sẽ tốt hơn.

Và bên cạnh đó, có một quy tắc nữa rất tốt để tuân theo.

**Mỗi bài kiểm tra chỉ kiểm tra một thứ.**

Nếu chúng ta nhìn vào bài kiểm tra và thấy có hai lần kiểm tra độc lập trong đó, thì tốt hơn là chia nó thành hai lần kiểm tra đơn giản hơn.

Vì vậy, hãy tiếp tục với biến thể thứ hai.

Kết quả:

[iframe height=250 src="pow-2" edit border="1"]

Như chúng ta có thể mong đợi, bài kiểm tra thứ hai đã thất bại. Chắc chắn rồi, hàm của chúng ta luôn trả về `8`, trong khi `assert` mong đợi `81`.

## Cải thiện việc thực hiện

Hãy viết một cái gì đó thực tế hơn để vượt qua các bài kiểm tra:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Để chắc chắn rằng hàm hoạt động tốt, hãy kiểm tra nó để biết thêm giá trị. Thay vì viết các khối `it` theo cách thủ công, chúng ta có thể tạo chúng trong `for`:

```js
describe("luỹ thừa", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} mũ 3 là ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

Kết quả:

[iframe height=250 src="pow-3" edit border="1"]

## Mô tả lồng nhau

Chúng ta sẽ thêm nhiều bài kiểm tra hơn nữa. Nhưng trước đó, hãy lưu ý rằng hàm trợ giúp `makeTest` và `for` nên được nhóm lại với nhau. Chúng ta sẽ không cần `makeTest` trong các bài kiểm tra khác, nó chỉ cần trong `for`: nhiệm vụ chung của chúng là kiểm tra xem `pow` tăng lên như thế nào với công suất nhất định.

Việc nhóm lại được thực hiện với một `describe` lồng nhau:

```js
describe("luỹ thừa", function() {

*!*
  describe("nâng x lên mũ 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} lũy thừa 3 là ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... nhiều bài kiểm tra để tiếp theo ở đây, cả describe và it có thể được thêm vào
});
```

`describe` lồng nhau xác định một "nhóm con" mới của các bài kiểm tra. Trong đầu ra, chúng ta có thể thấy thụt đầu dòng có tiêu đề:

[iframe height=250 src="pow-4" edit border="1"]

Trong tương lai, chúng ta có thể thêm nhiều `it` và `describe` ở cấp cao nhất với các hàm trợ giúp của riêng chúng, chúng sẽ không thấy `makeTest`.

````smart header="`before/after` và `beforeEach/afterEach`"
Chúng ta có thể thiết lập các hàm `before/after` để thực thi trước/sau khi chạy các bài kiểm tra, cũng như các hàm `beforeEach/afterEach` để thực thi trước/sau *mọi* `it`.

Ví dụ:

```js no-beautify
describe("kiểm tra", function() {

  before(() => alert("Bài kiểm tra bắt đầu – trước tất cả các bài kiểm tra"));
  after(() => alert("Bài kiểm tra kết thúc – sau tất cả các bài kiểm tra"));

  beforeEach(() => alert("Trước khi kiểm tra – nhập một bài kiểm tra"));
  afterEach(() => alert("Sau khi kiểm tra – xóa một bài kiểm tra"));

  it('bài kiểm tra 1', () => alert(1));
  it('bài kiểm tra 2', () => alert(2));

});
```

Trình tự chạy sẽ là:

```
Bài kiểm tra đã bắt đầu – trước tất cả các bài kiểm tra (before)
Trước khi kiểm tra – nhập một bài kiểm tra (beforeEach)
1
Sau khi kiểm tra – thoát khỏi kiểm tra (afterEach)
Trước khi kiểm tra – nhập một bài kiểm tra (beforeEach)
2
Sau khi kiểm tra – thoát khỏi kiểm tra (afterEach)
Bài kiểm tra kết thúc – sau tất cả các bài kiểm tra (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

Thông thường, `beforeEach/afterEach` và `before/after` được sử dụng để thực hiện khởi tạo, bộ đếm loại bỏ hoặc làm điều gì đó khác giữa các bài kiểm tra (hoặc nhóm kiểm tra).
````

## Mở rộng thông số kỹ thuật

Chức năng cơ bản của `pow` đã hoàn tất. Sự lặp lại đầu tiên của sự phát triển được thực hiện. Khi chúng ta đã ăn mừng và uống rượu sâm panh xong -- hãy tiếp tục và cải thiện nó.

Như đã nói, hàm `pow(x, n)` có nghĩa là hoạt động với các giá trị nguyên dương `n`.

Để chỉ ra một lỗi toán học, các hàm JavaScript thường trả về `NaN`. Hãy làm tương tự cho các giá trị không hợp lệ của `n`.

Trước tiên hãy thêm hành vi vào thông số kỹ thuật (!):

```js
describe("luỹ thừa", function() {

  // ...

  it("đối với n âm, kết quả là NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("đối với n không nguyên, kết quả là NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

Kết quả với các bài kiểm tra mới:

[iframe height=530 src="pow-nan" edit border="1"]

Các bài kiểm tra mới được thêm vào không thành công vì quá trình triển khai của chúng ta không hỗ trợ chúng. Đó là cách BDD được thực hiện: đầu tiên chúng ta viết các bài kiểm tra không thành công, sau đó thực hiện triển khai cho chúng.

```smart header="Các khẳng định khác"
Hãy lưu ý xác nhận `assert.isNaN`: nó kiểm tra `NaN`.

Chẳng hạn, có các xác nhận khác trong [Chai](http://chaijs.com):

- `assert.equal(value1, value2)` -- kiểm tra đẳng thức `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- kiểm tra sự bằng nhau nghiêm ngặt `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- kiểm tra nghịch đảo các kiểm tra ở trên.
- `assert.isTrue(value)` -- kiểm tra xem `value === true`
- `assert.isFalse(value)` -- kiểm tra xem `value === false`
- ...danh sách đầy đủ có trong [tài liệu](http://chaijs.com/api/assert/)
```

Vì vậy, chúng ta nên thêm một vài dòng vào `pow`:

```js
function pow(x, n) {
*!*
  nếu (n < 0) trả về NaN;
  nếu (Math.round(n) != n) trả về NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Bây giờ nó hoạt động, đều vượt qua tất cả các bài kiểm tra:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Mở toàn bộ ví dụ cuối cùng trong sandbox."]

## Tóm tắt

Trong BDD, thông số kỹ thuật đi trước, tiếp theo là triển khai. Cuối cùng, chúng ta vừa có thông số kỹ thuật và mã.

Thông số kỹ thuật có thể được sử dụng theo ba cách:

1. Như **Bài kiểm tra** - họ đảm bảo rằng mã hoạt động chính xác.
2. Như **Tài liệu** -- tiêu đề của `describe` và `it` cho biết hàm này làm gì.
3. Như **Ví dụ** -- các bài kiểm tra thực sự là các ví dụ hoạt động cho thấy cách sử dụng một hàm.

Với thông số kỹ thuật, chúng ta có thể cải thiện, thay đổi, thậm chí viết lại hàm từ đầu một cách an toàn và đảm bảo rằng nó vẫn hoạt động bình thường.

Điều đó đặc biệt quan trọng trong các dự án lớn khi một hàm được sử dụng ở nhiều nơi. Khi chúng ta thay đổi một hàm như vậy, không có cách nào để kiểm tra thủ công xem mọi nơi sử dụng hàm đó có còn hoạt động bình thường hay không.

Nếu không có bài kiểm tra, mọi người có hai cách:

1. Để thực hiện thay đổi, không có vấn đề gì. Và sau đó, người dùng của chúng ta gặp lỗi, vì chúng ta có thể không kiểm tra thứ gì đó theo cách thủ công.
2. Hoặc, nếu hình phạt cho các lỗi là khắc nghiệt, vì không có kiểm tra, mọi người trở nên ngại sửa đổi các hàm đó, và sau đó mã trở nên lỗi thời, không ai muốn nhúng tay vào. không tốt cho sự phát triển.

**Kiểm tra tự động giúp tránh những vấn đề này!**

Nếu dự án được bao phủ bởi các bài kiểm tra, thì sẽ không có vấn đề như vậy. Sau bất kỳ thay đổi nào, chúng ta có thể chạy bài kiểm tra và thấy rất nhiều kiểm tra được thực hiện chỉ trong vài giây.

**Bên cạnh đó, mã được kiểm tra tốt sẽ có kiến trúc tốt hơn.**

Đương nhiên, đó là vì mã được kiểm tra tự động dễ sửa đổi và cải thiện hơn. Nhưng cũng có một lý do khác.

Để viết các bài kiểm tra, mã phải được tổ chức theo cách sao cho mọi hàm đều có nhiệm vụ được mô tả rõ ràng, đầu vào và đầu ra được xác định rõ ràng. Điều đó có nghĩa là một kiến trúc tốt ngay từ đầu.

Trong cuộc sống thực đôi khi không dễ dàng như vậy. Đôi khi rất khó để viết một thông số kỹ thuật trước mã thực tế, vì vẫn chưa rõ nó sẽ hoạt động như thế nào. Nhưng nói chung, các bài kiểm tra viết giúp phát triển nhanh hơn và ổn định hơn.

Ở phần sau của hướng dẫn, bạn sẽ gặp nhiều nhiệm vụ với các bài kiểm tra được tích hợp sẵn. Vì vậy, bạn sẽ thấy nhiều ví dụ thực tế hơn.

Viết bài kiểm tra yêu cầu kiến thức JavaScript tốt. Nhưng chúng ta chỉ mới bắt đầu tìm hiểu nó. Vì vậy, để ổn định mọi thứ, hiện tại bạn không bắt buộc phải viết các bài kiểm tra, nhưng bạn đã có thể đọc chúng ngay cả khi chúng phức tạp hơn một chút so với trong chương này.
