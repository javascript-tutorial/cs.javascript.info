function zkrať(řetězec, maxDélka) {
  return (řetězec.length > maxDélka) ? 
    řetězec.slice(0, maxDélka - 1) + '…' : řetězec;
}