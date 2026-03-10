Řešení je:

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

Jinými slovy: (úplná výška) minus (odrolovaná horní část) minus (viditelná část) -- to je přesně odrolovaná dolní část.
