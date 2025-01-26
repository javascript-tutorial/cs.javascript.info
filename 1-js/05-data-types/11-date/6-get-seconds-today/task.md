importance: 5

---

# Kolik sekund už dnes uplynulo?

Napište funkci `vraťDnešníSekundy()`, která vrátí počet sekund, které uplynuly od začátku dnešního dne.

Například jestliže je právě `22:00` a dnes se neměnil letní čas na zimní nebo naopak, pak:

```js
vraťDnešníSekundy() == 36000 // (3600 * 10)
```

Funkce by měla fungovat v kterýkoli den. To znamená, že by neměla mít napevno zakódovanou hodnotu „dneška“.
