importance: 4

---

# Načtení viditelných obrázků

Řekněme, že máme pomalého klienta a chceme ušetřit přenesená data.

Z tohoto důvodu jsme se rozhodli nezobrazovat obrázky hned, ale nahradit je dočasným obsahem, například:

```html
<img *!*src="placeholder.svg"*/!* width="128" height="128" *!*data-src="real.jpg"*/!*>
```

Na začátku jsou tedy všechny obrázky `placeholder.svg`. Když stránka doroluje na pozici, z níž uživatel může obrázek vidět, změníme `src` obrázku na hodnotu uvedenou v `data-src`, a tak se obrázek načte.

Následuje příklad v `iframe`:

[iframe src="solution"]

Při rolování v něm uvidíte, že se obrázky načítají „na požádání“.

Požadavky:
- Když se stránka načte, měly by se okamžitě před jakýmkoli rolováním načíst obrázky, které jsou vidět na obrazovce.
- Některé obrázky mohou být obvyklé, bez `data-src`. Na ty by kód neměl sahat.
- Když se obrázek načte, neměl by se při dalším rolování načítat znovu.

P.S. Pokud to dokážete, vytvořte pokročilejší řešení, které bude „přednahrávat“ obrázky, které jsou jednu stránku nad nebo pod aktuální pozicí.

P.P.S. Ošetřujte jen svislé rolování, ne vodorovné.
