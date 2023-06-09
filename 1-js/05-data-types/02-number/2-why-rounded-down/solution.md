Bên trong, phân số thập phân `6,35` là một số nhị phân vô tận. Như mọi khi trong những trường hợp như vậy, nó được lưu trữ với độ chính xác bị mất.

Hãy xem nào:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

Mất độ chính xác có thể gây ra cả tăng và giảm số. Trong trường hợp cụ thể này, con số trở nên nhỏ hơn một chút, đó là lý do tại sao nó được làm tròn xuống.

Và `1,35` là gì?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Ở đây, độ chính xác bị mất khiến con số lớn hơn một chút, vì vậy nó được làm tròn lên.

**Làm cách nào để chúng ta có thể khắc phục sự cố với `6.35` nếu chúng ta muốn nó được làm tròn đúng cách?**

Chúng ta nên đưa nó đến gần một số nguyên hơn trước khi làm tròn:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Lưu ý rằng `63,5` hoàn toàn không mất độ chính xác. Đó là vì phần thập phân `0,5` thực ra là `1/2`. Các phân số chia cho lũy thừa của `2` được biểu diễn chính xác trong hệ thống nhị phân, bây giờ chúng ta có thể làm tròn nó:


```js run
alert( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(làm tròn) -> 6.4
```

