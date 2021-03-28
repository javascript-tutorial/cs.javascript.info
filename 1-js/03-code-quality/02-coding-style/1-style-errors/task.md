importance: 4

---

# Špatný styl

Co je špatného na stylu níže uvedeného kódu?

```js no-beautify
function mocnina(x,n)
{
  let výsledek=1;
  for(let i=0;i<n;i++) {výsledek*=x;}
  return výsledek;
}

let x=prompt("x?",''), n=prompt("n?",'')
if (n<=0)
{
  alert(`${n}-tá mocnina není podporována, zadejte prosím celé číslo větší než nula`);
}
else
{
  alert(mocnina(x,n))
}
```

Opravte ho.
