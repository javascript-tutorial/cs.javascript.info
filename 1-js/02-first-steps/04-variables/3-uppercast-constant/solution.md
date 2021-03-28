Obecně používáme velká písmena pro konstanty, které jsou „zakódovány natvrdo“. Jinými slovy, když je jejich hodnota známa ještě před spuštěním programu a je přímo uvedena v kódu.

V tomto kódu je to přesně případ proměnné `datumNarození`. Pro ni bychom tedy mohli použít velká písmena.

Naproti tomu `věk` se počítá až při běhu programu. Dnes máme jeden věk, za rok budeme mít jiný. Je to konstanta v tom smyslu, že se její hodnota nezmění při provádění kódu, ale je „trochu méně konstantní“ než `datumNarození`: její hodnota je vypočítávána, takže pro ni bychom měli nechat malá písmena.
