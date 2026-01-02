importance: 3

---

# Obarvěte externí odkazy oranžově

Obarvěte všechny externí odkazy oranžově změnou jejich vlastnosti `style`.

Odkaz je externí, jestliže:
- Jeho `href` obsahuje `://`.
- Ale nezačíná `http://internal.com`.

Příklad:

```html run
<a name="seznam">seznam</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // nastavíme styl pro jediný odkaz
  let odkaz = document.querySelector('a');
  odkaz.style.color = 'orange';
</script>
```

Výsledek by měl být:

[iframe border=1 height=180 src="solution"]
