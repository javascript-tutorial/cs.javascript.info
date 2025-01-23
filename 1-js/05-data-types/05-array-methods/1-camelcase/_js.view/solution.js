function camelizace(řetězec) {
  return řetězec
    .split('-') // rozdělí 'mé-dlouhé-slovo' na pole ['mé', 'dlouhé', 'slovo']
    .map(
      // převede první písmena všech prvků pole kromě prvního na velká
      // převede ['mé', 'dlouhé', 'slovo'] na ['mé', 'Dlouhé', 'Slovo']
      (slovo, index) => index == 0 ? slovo : slovo[0].toUpperCase() + slovo.slice(1)
    )
    .join(''); // spojí ['mé', 'Dlouhé', 'Slovo'] do 'méDlouhéSlovo'
}
