
# Element živých hodin

Už máme element `<formatovany-cas>`, který zobrazuje hezky naformátovaný čas.

Vytvořte element `<zive-hodiny>`, který bude zobrazovat aktuální čas:
1. Interně by měl používat `<formatovany-cas>` a neměl by duplikovat jeho funkcionalitu.
2. Bude tikat (aktualizovat se) každou sekundu.
3. Při každém tiknutí by měla být vygenerována vlastní událost jménem `tik` s aktuálním datem v `událost.detail` (viz kapitolu <info:dispatch-events>).

Použití:

```html
<zive-hodiny id="elem"></zive-hodiny>

<script>
  elem.addEventListener('tik', událost => console.log(událost.detail));
</script>
```

Ukázka:

[iframe src="solution" height=40]
