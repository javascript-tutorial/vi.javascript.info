importance: 4

---

# Bad style

Có gì sai với cách viết code này?

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
  alert(`Luỹ thừa ${n} không được hỗ trợ, vui lòng nhập một số nguyên lớn hơn 0`);
}
else
{
  alert(pow(x,n))
}
```

Hãy sửa nó.
