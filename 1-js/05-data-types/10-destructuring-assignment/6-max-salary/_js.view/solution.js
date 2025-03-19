function nejvyššíPlat(platy) {

  let maxPlat = 0;
  let maxJméno = null;

  for(const [jméno, plat] of Object.entries(platy)) {
    if (maxPlat < plat) {
      maxPlat = plat;
      maxJméno = jméno;
    }
  }

  return maxJméno;
}