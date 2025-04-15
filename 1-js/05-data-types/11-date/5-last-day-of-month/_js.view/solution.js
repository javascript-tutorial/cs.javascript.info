function vraťPosledníDenVMěsíci(rok, měsíc) {
  let datum = new Date(rok, měsíc + 1, 0);
  return datum.getDate();
}
