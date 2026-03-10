importance: 3

---

# Proč nefunguje „return false“?

Proč v následujícím kódu vůbec nefunguje `return false`?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">prohlížeč přejde na w3.org</a>
```

Prohlížeč po kliknutí pokračuje na URL, ale to my nechceme.

Jak to opravit?
