importance: 4

---

# Proč 6.35.toFixed(1) == 6.3?

Podle dokumentace `Math.round` a `toFixed` zaokrouhlují obě na nejbližší číslo: `0..4` se zaokrouhluje dolů, zatímco `5..9` nahoru.

Například:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

Proč se v podobném níže uvedeném příkladu `6.35` zaokrouhlí na `6.3` a ne na `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

Jak zaokrouhlit `6.35` správně?

