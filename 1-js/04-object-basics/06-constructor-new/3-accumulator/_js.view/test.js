describe("Bộ tích luỹ", function() {

  beforeEach(function() {
    sinon.stub(window, "nhắc")
  });

  afterEach(function() {
    prompt.restore();
  });

  it("giá trị ban đầu là đối số của hàm tạo", function() {
    let accumulator = new Accumulator(1);

    assert.equal(accumulator.value, 1);
  });

  it("sau khi đọc 0, giá trị là 1", function() {
    let accumulator = new Accumulator(1);
    prompt.returns("0");
    accumulator.read();
    assert.equal(accumulator.value, 1);
  });

  it("sau khi đọc 1, giá trị là 2", function() {
    let accumulator = new Accumulator(1);
    prompt.returns("1");
    accumulator.read();
    assert.equal(accumulator.value, 2);
  });
});
