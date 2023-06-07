
describe('Thang', function() {
  before(function() {
    window.alert = sinon.stub(window, "nhắc");
  });
  
  beforeEach(function() {
    ladder.step = 0;
  });

  it('up() nên trả về cái này', function() {
    assert.equal(ladder.up(), ladder);
  });

  it('down() nên trả về cái này', function() {
    assert.equal(ladder.down(), ladder);
  });

  it('showStep() nên gọi alert', function() {
    ladder.showStep();
    assert(alert.called);
  });

  it('up() nên tăng số bước', function() {
    assert.equal(ladder.up().up().step, 2);
  });

  it('down() should decrease step', function() {
    assert.equal(ladder.down().step, -1);
  });

  it('down().up().up().up() ', function() {
    assert.equal(ladder.down().up().up().up().step, 2);
  });
  
  after(function() {
    ladder.step = 0;
    alert.restore();
  });
});
