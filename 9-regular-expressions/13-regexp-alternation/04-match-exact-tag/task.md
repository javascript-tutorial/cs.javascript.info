# Najděte celou značku

Napište regulární výraz, který najde značku `<style...>`. Měl by najít celou značku: nemusí mít žádné atributy `<style>` nebo jich může mít několik `<style type="..." id="...">`.

...Tento RV by však neměl najít `<styler>`!

Příklad:

```js
let rv = /váš RV/g;

alert( '<style> <styler> <style test="...">'.match(rv) ); // <style>, <style test="...">
```
