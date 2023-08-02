describe("throttle(f, 1000)", function() {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function() {
    this.clock = sinon.useFakeTimers();
    f1000 = throttle(f, 1000);
  });

  it("the first call runs now", function() {
    f1000(1); // chạy ngay bây giờ
    assert.equal(log, "1");
  });

  it("then calls are ignored till 1000ms when the last call works", function() {
    f1000(2); // (điều tiết - ít hơn 1000 ms kể từ lần chạy cuối cùng)
    f1000(3); // (điều tiết - ít hơn 1000 ms kể từ lần chạy cuối cùng)
    // sau 1000 ms cuộc gọi f(3) được lên lịch

    assert.equal(log, "1"); // ngay bây giờ chỉ có cuộc gọi đầu tiên được thực hiện

    this.clock.tick(1000); // sau 1000ms...
    assert.equal(log, "13"); // log==13, cuộc gọi đến f1000(3) được thực hiện
  });

  it("the third call waits 1000ms after the second call", function() {
    this.clock.tick(100);
    f1000(4); // (điều tiết - ít hơn 1000 ms kể từ lần chạy cuối cùng)
    this.clock.tick(100);
    f1000(5); // (điều tiết - ít hơn 1000 ms kể từ lần chạy cuối cùng)
    this.clock.tick(700);
    f1000(6); // (điều tiết - ít hơn 1000 ms kể từ lần chạy cuối cùng)

    this.clock.tick(100); // bây giờ 100 + 100 + 700 + 100 = 1000 ms đã trôi qua

    assert.equal(log, "136"); // cuộc gọi cuối cùng là f(6)
  });

  after(function() {
    this.clock.restore();
  });

});

describe('throttle', () => {

  it('runs a forwarded call once', done => {
    let log = '';
    const f = str => log += str;
    const f10 = throttle(f, 10);
    f10('once');

    setTimeout(() => {
      assert.equal(log, 'once');
      done();
    }, 20);
  });

});
