async function vraťUživatele(jména) {
  let jobs = [];

  for(let jméno of jména) {
    let job = fetch(`https://api.github.com/users/${jméno}`).then(
      úspěšnáOdpověď => {
        if (úspěšnáOdpověď.status != 200) {
          return null;
        } else {
          return úspěšnáOdpověď.json();
        }
      },
      neúspěšnáOdpověď => {
        return null;
      }
    );
    jobs.push(job);
  }

  let výsledky = await Promise.all(jobs);

  return výsledky;
}
