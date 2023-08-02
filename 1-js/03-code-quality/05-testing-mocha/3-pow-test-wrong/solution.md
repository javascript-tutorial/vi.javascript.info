Bài kiểm tra thể hiện một trong những cám dỗ mà nhà phát triển gặp phải khi viết bài kiểm tra.

Những gì chúng ta có ở đây thực sự là 3 bài kiểm tra, nhưng được bố trí dưới dạng một hàm duy nhất với 3 lần xác nhận.

Đôi khi viết theo cách này dễ dàng hơn, nhưng nếu có lỗi xảy ra, thì sẽ khó nhận ra điều gì đã xảy ra.

Nếu xảy ra lỗi ở giữa quy trình thực thi phức tạp, thì chúng ta sẽ phải tìm ra dữ liệu tại thời điểm đó. Chúng ta thực sự sẽ phải *gỡ lỗi cho bài kiểm tra*.

Sẽ tốt hơn nhiều nếu chia bài kiểm tra thành nhiều khối `it` với đầu vào và đầu ra được viết rõ ràng.

Như thế này:
```js
describe("Nâng x lên luỹ thừa n", function() {
  it("5 mũ 1 bằng 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 mũ 2 bằng 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 mũ 3 bằng 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Chúng ta đã thay thế một khối `it` bằng `describe` và một nhóm các khối `it`. Bây giờ nếu có gì đó không thành công, chúng ta sẽ thấy rõ ràng dữ liệu là gì.

Ngoài ra, chúng ta có thể tách riêng một bài kiểm tra và chạy nó ở chế độ độc lập bằng cách viết `it.only` thay vì `it`:


```js
describe("Nâng x lên luỹ thừa n", function() {
  it("5 mũ 1 bằng 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha sẽ chỉ chạy block này
  it.only("5 mũ 2 bằng 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 mũ 3 bằng 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
