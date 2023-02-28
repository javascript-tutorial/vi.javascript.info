describe("test", function() {
  
   // Mocha thường đợi các bài kiểm tra trong 2 giây trước khi coi chúng sai
  
  this.timeout(200000); // Với mã này, chúng ta tăng mã này - trong trường hợp này là 200.000 mili giây

  // Điều này là do chức năng "cảnh báo", bởi vì nếu bạn trì hoãn nhấn nút "OK" thì các bài kiểm tra sẽ không vượt qua!
  
  before(() => alert("Bài kiểm tra bắt đầu – trước tất cả các bài kiểm tra"));
  after(() => alert("Bài kiểm tra kết thúc – sau tất cả các bài kiểm tra"));

  beforeEach(() => alert("Trước một bài kiểm tra – nhập một bài kiểm tra"));
  afterEach(() => alert("Trước một bài kiểm tra – nhập một bài kiểm tra"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
