
describe("máy tính", function() {
  let calculator;
  before(function() {
    sinon.stub(window, "nhắc")

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    calculator = new Calculator();
    calculator.read();
  });
  
  it("phương thức đọc yêu cầu hai giá trị bằng nhắc và ghi nhớ chúng trong thuộc tính đối tượng", function() {
    assert.equal(calculator.a, 2);
    assert.equal(calculator.b, 3);
  });

  it("khi nhập vào 2 và 3, tổng là 5", function() {
    assert.equal(calculator.sum(), 5);
  });

  it("khi nhập vào 2 và 3, tích là 6", function() {
    assert.equal(calculator.mul(), 6);
  });

  after(function() {
    prompt.restore();
  });
});
