importance: 5

---

# Decorator gián điệp

Tạo một decorator `spy(func)` sẽ trả về một wrapper lưu tất cả các lệnh gọi để hoạt động trong thuộc tính `calls` của nó.

Mỗi cuộc gọi được lưu dưới dạng một array đối số.

Ví dụ:

```js
function work(a, b) {
  alert( a + b ); // công việc là một hàm hoặc phương thức tùy ý
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

Tái bút: Decorator đó đôi khi hữu ích cho thử nghiệm đơn vị. Dạng nâng cao của nó là `sinon.spy` trong thư viện [Sinon.JS](http://sinonjs.org/).
