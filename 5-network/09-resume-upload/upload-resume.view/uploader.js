class Uploader {

  constructor({soubor, onProgress}) {
    this.soubor = soubor;
    this.onProgress = onProgress;

    // vytvoříme idSouboru, který unikátně identifikuje soubor
    // můžeme také přidat identifikátor uživatelského připojení (pokud nějaké máme), aby byl ještě unikátnější
    this.idSouboru = soubor.name + '-' + soubor.size + '-' + soubor.lastModified;
  }

  async vraťPočetOdeslanýchBytů() {
    let odpověď = await fetch('status', {
      headers: {
        'X-File-Id': this.idSouboru
      }
    });

    if (odpověď.status != 200) {
      throw new Error("Nelze získat počet odeslaných bytů: " + odpověď.statusText);
    }

    let text = await odpověď.text();

    return +text;
  }

  async upload() {
    this.počátečníByte = await this.vraťPočetOdeslanýchBytů();

    let xhr = this.xhr = new XMLHttpRequest();
    xhr.open("POST", "upload", true);

    // pošleme id souboru, aby server věděl, který soubor má obnovit
    xhr.setRequestHeader('X-File-Id', this.idSouboru);
    // pošleme byte, od kterého obnovujeme, aby server věděl, že obnovujeme
    xhr.setRequestHeader('X-Start-Byte', this.počátečníByte);

    xhr.upload.onprogress = (e) => {
      this.onProgress(this.počátečníByte + e.loaded, this.počátečníByte + e.total);
    };

    console.log("posíláme soubor, začínáme od", this.počátečníByte);
    xhr.send(this.soubor.slice(this.počátečníByte));

    // vrátíme
    //   true, pokud bylo odeslání úspěšné
    //   false, pokud bylo přerušeno
    // throw v případě chyby
    return await new Promise((splň, zamítni) => {

      xhr.onload = xhr.onerror = () => {
        console.log("upload end status:" + xhr.status + " text:" + xhr.statusText);

        if (xhr.status == 200) {
          splň(true);
        } else {
          zamítni(new Error("Odeslání selhalo: " + xhr.statusText));
        }
      };

      // onabort se spustí jen při volání xhr.abort()
      xhr.onabort = () => resolve(false);

    });

  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

}
