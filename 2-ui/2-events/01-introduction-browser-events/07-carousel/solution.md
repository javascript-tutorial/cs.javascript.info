Pás obrázků můžeme reprezentovat jako seznam `ul/li` obrázků `<img>`.

Normálně by takový pás byl široký, ale umístíme kolem něj `<div>` s pevnou velikostí, abychom jej „odřízli“, takže bude vidět jen část pásu:

![](carousel1.svg)

Aby se seznam zobrazil vodorovně, musíme na `<li>` aplikovat správné CSS vlastnosti, např. `display: inline-block`.

U `<img>` bychom také měli pozměnit `display`, neboť standardně je `inline`. Pod `inline` elementy je rezervován prostor navíc pro „ocásky pod písmeny“, takže ho můžeme odstranit pomocí `display:block`.

Abychom provedli rolování, můžeme posunout `<ul>`. To lze udělat mnoha způsoby, například změnou `margin-left` nebo (pro lepší výkon) použít `transform: translateX()`:

![](carousel2.svg)

Vnější `<div>` má pevnou šířku, takže „extra“ obrázky budou odříznuty.

Celý kolotoč je samostatná „grafická komponenta“ na stránce, takže je lepší ho zabalit do jediného `<div class="kolotoč">` a nastavovat styly věcí, které jsou uvnitř.
