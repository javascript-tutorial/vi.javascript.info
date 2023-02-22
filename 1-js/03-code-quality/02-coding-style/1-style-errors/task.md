importance: 4

---

# Phong cách tệ

Có gì sai với phong cách mã dưới đây?

```js no-beautify
function pow(x,n)
{
  let result=1;
  for(let i=0;i<n;i++) {result*=x;}
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'')
if (n<=0)
{
  alert(`Nguồn ${n} không được hỗ trợ, vui lòng nhập một số nguyên lớn hơn 0`);
}
else
{
  alert(pow(x,n))
}
```

Hãy sửa nó.
