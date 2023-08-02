

describe("máy tính", function() {
  
  context("khi 2 và 3 được nhập vảo", function() {
    beforeEach(function() {
      sinon.stub(window, "nhắc");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      calculator.read();
    });

    afterEach(function() {
      prompt.restore();
    });
    
    it('đọc nhận hai giá trị và lưu chúng dưới dạng thuộc tính đối tượng', function () {
      assert.equal(calculator.a, 2);
      assert.equal(calculator.b, 3);
    });

    it("tổng là 5", function() {
      assert.equal(calculator.sum(), 5);
    });

    it("tích của phép nhân là 6", function() {
      assert.equal(calculator.mul(), 6);
    });
  });

});
