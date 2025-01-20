function velkéPrvníPísmeno(řetězec) {
  if (!řetězec) return řetězec;

  return řetězec[0].toUpperCase() + řetězec.slice(1);
}