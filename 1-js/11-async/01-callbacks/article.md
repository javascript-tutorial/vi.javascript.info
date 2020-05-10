

# Giới thiệu: callbacks

Có rất nhiều hành động trong Javascript là *bất đồng bộ*.

Có ví dụ sau, hãy nhìn vào hàm `loadScript(src)`:

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

Mục đích của hàm trên dùng để nạp 1 đoạn code mới vào. Khi thêm dòng `<script src="…">` vào code, trình duyệt sẽ nạp đoạn code đó vào và chạy chúng.

Ta có thể sử dụng chúng như sau:

```js
// nạp và chạy đoạn code
loadScript('/my/script.js');
```

Hàm trên được gọi là "bất đồng bộ," bởi vì hành động (nạp code từ tệp js) không kết thúc ngay lập tức mà sau đó mới hoàn thành xong.

Hãy xem đoạn code dưới gọi hàm `loadScript(…)`, khi hàm dưới chạy nó sẽ không đợi nạp hết code trong hàm.

```js
loadScript('/my/script.js');
// đoạn code trong loadScript
// sẽ không đợi nạp hết code trong hàm
// ...
```

Ta muốn sử dụng một đoạn mã sớm nhất có thể khi nó được nạp. Trong đó có nhiều hàm và ta muốn chạy chúng.

Nhưng khi ta gọi lập ngay tức sau hàm `loadScript(…)`, các hàm đó không hoạt động:

```js
loadScript('/my/script.js'); // đoạn mã có "function newFunction() {…}"

*!*
newFunction(); // không tìm thấy hàm
*/!*
```

Như đã biết, trình duyệt hầu như không có đủ thời gian để nạp hết tất cả các code. Hiện tại, hàm `loadScript` không cho ta biết khi nào nạp hết code trong nó. Đoạn code được nạp và cuối cùng sẽ chạy, đó là tất cả. Nhưng ta muốn biết khi nào chúng xảy ra, ta sử dụng các hàm và biến mới trong tệp js đó.

Thêm hàm `callback` như là tham số thứ 2 vào trong `loadScript` để nó được chạy khi đoạn mã được nạp vào:

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

Bây giờ nếu ta muốn gọi một hàm mới trong đoạn mã, ta nên viết chúng trong vào tham số thứ 2:

```js
loadScript('/my/script.js', function() {
  // tham số thứ 2 sẽ được chạy khi toàn bộ code trong tệp js được nạp xong
  newFunction(); // bây giờ nó sẽ chạy như ta mong muốn
  ...
});
```

Ý tưởng trên là: đưa tham số thứ 2 như là một hàm (thường là hàm vô danh) sau đó chúng sẽ chạy khi mà hành động trước đó thành công. 
Đây là ví dụ với đoạn mã thực tế:
```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // hàm sẽ được định danh sau khi nạp xong tệp js 
});
*/!*
```

Cách làm trên được gọi là cách viết "gọi lại" trong lập trình bất đồng bộ. Một hàm làm việc gì đó bất đồng bộ nên cung cấp một biến `callback` để chúng ta có thể đưa vào một hàm khác để chạy sau khi hàm đó đã chạy thành công. 

Tại đây ta đã làm trong `loadScript`, tất nhiên đây là cách tiếp cận thường gặp.

## Gọi hàm trong gọi hàm

Làm thế nào để ta có thể nạp 2 tệp js một cách tuần tự: nạp xong tệp đầu rồi mới nạp tiếp tệp sau?

Cách thông thường sẽ là gọi lại `loadScript` trong hàm gọi lại, ví dụ: 

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });
*/!*

});
```

Sau khi `loadScript` ở ngoài cùng thành công, hàm gọi lại sẽ được khởi tạo trong đó.

Sẽ làm sao nếu ta muốn nạp thêm tệp js...?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...tiếp tục nạp sau khi tất cả tệp js trên thành công
    });
*/!*

  })

});
```

Như đã thấy, mỗi hành động sẽ được để trong hàm gọi lại. Điều này ổn khi có vài hành động nhưng sẽ xấu khi có nhiều, ta sẽ nhiều trường hợp khác sau.

## Xử lý lỗi

Ở những ví dụ trên ta không quan tâm đến các lỗi. Nhưng nếu tệp js nạp bị lỗi? Hàm gọi lại của ta nên xử lý chúng trong trường hợp lỗi.

Đây là phiên bản được cải thiện của `loadScript` để xử lý khi có lỗi:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
*/!*

  document.head.append(script);
}
```

Nó sẽ gọi `callback(null, script)` khi nạp thành công và `callback(error)` trong khi bị lỗi.

Cách dùng:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // xử lý lỗi
  } else {
    // tệp js được nạp thành công
  }
});
```

Một lần nữa, cách làm trên ta sử dụng cho `loadScript` là một cách thường gặp. Nó được gọi là "trả về lỗi trước khi gọi lại".

Quy chuẩn:
1. Tham số đầu tiên trong `callback` được phục vụ khi có lỗi xảy ra. Sau đó `callback(err)` được gọi.
2. Tham số thứ 2 (và tham số kế tiếp nếu cần) sẽ là kết quả khi thành công. Sau đó `callback(null, result1, result2…)` sẽ đuọc gọi.

Do đó một hàm `callback` được sử dụng cho cả báo lỗi và trả về kết quả thành công.

## Pyramid of Doom

Từ cái nhìn đầu tiên, nó là có thể là một cách cách xử lý mã bất đồng bộ. Và đúng vậy. Cho một hoặc có lẽ hai gọi lồng nhau thì nó cũng ổn.

Nhưng cho nhiều hành động bất đồng bộ đi theo lần lượt ta sẽ có mã như thế này:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...tiếp tục sau tất cả các tệp js được nạp thành công (*)
  */!*
          }
        });

      }
    })
  }
});
```

Trong đoạn mã trên:
1. Ta nạp tệp `1.js`, sau đó không có lỗi trả về.
2. Ta nạp tệp `2.js`, sau đó không có lỗi trả về.
3. Ta nạp tệp `3.js`, sau đó không có lỗi trả về -- ta làm hành động gì đó trong else `(*)`.

Như cách gọi gọi lồng nhiều cấp trên, đoạn code sẽ trở nên phức tạp hơn để quản lý chúng, đặc biệt nếu ta thực tại ta cần xử lý nhiều hơn ở các chỗ `...`, các chỗ đó có thể nhiều vòng lặp hoặc các điều kiện và hơn thế.

Chúng ta thường gọi chúng "callback hell" hoặc "pyramid of doom."

<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    })
  }
});
-->

![](callback-hell.svg)

"Hình chóp" của gọi lồng nhau tăng trưởng lên đến quyền với mỗi hành động không đồng bộ. Sớm nhất có thể, nó sẽ tăng vùn vụt tới mức không kiểm soát được.

Do đó cách này không phải là cách tốt.

Ta có thể thử thay thế vấn đề trên bằng cách tạo ra mỗi hành động tương ứng với mỗi hàm như sau:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...tiếp tục sau tất cả các hành động trên thành công (*)
  }
};
```

Như bạn thấy? Nó là như nhau, và không có lồng nhiều cấp nữa bởi vì ta đã tạo mỗi hành động là mỗi hàm khác nhau.
Nó có hoạt động, nhưng đoạn mã trông thành nhiều phần khác nhau. Nó khó đọc, và có lẽ bạn nhận cần chú ý hơn khi đọc những hàm trên. Điều đó thật bất tiện, nhất là nếu độc giả chưa quen với mã và không biết cách đọc mã. 

Hơn nữa, các hàm được đặt tên `step*` chỉ làm một công việc duy nhất, chúng được tạo ra để tránh "pyramid of doom". Không hàm nào sẽ sử dụng lại chúng bên ngoài chuỗi hành động. Vậy là có một chút sự bừa bộn ở đây.

Ta muốn có cái gì tốt hơn.

May mắn thay, có một số cách có thể tránh được "pyramid of doom". Một trong những cách tốt nhất là sử dụng "promises", điều này sẽ được nói về chương tiếp theo.
