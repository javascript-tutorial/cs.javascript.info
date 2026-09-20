
CSS pro animaci `width` a `height` současně:
```css
/* původní třída */

#letadlo {
  transition: all 3s;
}

/* JS přidává .zvětšování */
#letadlo.zvětšování {
  width: 400px;
  height: 240px;
}
```

Prosíme všimněte si, že událost `transitionend` se spustí dvakrát -- pro každou vlastnost jednou. Kdybychom tedy neprovedli další kontrolu, zpráva by se zobrazila dvakrát. 
