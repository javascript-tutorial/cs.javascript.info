Interně je desetinné číslo `6.35` nekonečné binární číslo. Jako vždy v takových případech je uloženo se ztrátou přesnosti.

Podívejme se:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

Ztrátou přesnosti se číslo může zvýšit i snížit. V tomto konkrétním případě se číslo o něco málo sníží, proto bude zaokrouhleno dolů.

A co `1.35`?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Zde ztráta přesnosti číslo trošičku zvýšila, takže se zaokrouhlilo nahoru.

**Jak můžeme problém s `6.35` vyřešit, chceme-li, aby se zaokrouhlilo správně?**

Měli bychom je před zaokrouhlením přiblížit k celému číslu:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Všimněte si, že `63.5` nemá vůbec žádnou ztrátu přesnosti. Je to proto, že desetinná část `0.5` je ve skutečnosti `1/2`. Zlomky s mocninou `2` ve jmenovateli jsou v binární soustavě reprezentovány přesně, takže je nyní můžeme zaokrouhlit:


```js run
alert( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(zaokrouhleno) -> 6.4
```

