let http = require('http');
let static = require('node-static');
let fileServer = new static.Server('.');
let path = require('path');
let fs = require('fs');
let debug = require('debug')('example:resume-upload');

let uploads = Object.create(null);

function onUpload(req, res) {

  let fileId = req.headers['x-file-id'];
  let startByte = +req.headers['x-start-byte'];

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }

  // budeme ukládat soubory „nikam“
  let filePath = '/dev/null';
  // mohli bychom místo toho použít skutečnou cestu, např.
  // let filePath = path.join('/tmp', fileId);

  debug("onUpload fileId: ", fileId);

  // inicializujeme nový příjem
  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];

  debug("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

  let fileStream;

  // pokud startByte je 0 nebo není nastaven, vytvoříme nový soubor, jinak zkontrolujeme velikost a připojíme data k existujícímu
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
    debug("New file created: " + filePath);
  } else {
    // můžeme zkontrolovat i velikost souboru na disku, abychom měli jistotu
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
    // připojíme k existujícímu souboru
    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });
    debug("File reopened: " + filePath);
  }


  req.on('data', function(data) {
    debug("bytes received", upload.bytesReceived);
    upload.bytesReceived += data.length;
  });

  // pošleme do souboru tělo požadavku
  req.pipe(fileStream);

  // když je požadavek dokončen a všechna jeho data jsou zapsána
  fileStream.on('close', function() {
    if (upload.bytesReceived == req.headers['x-file-size']) {
      debug("Upload finished");
      delete uploads[fileId];

      // s přijatým souborem zde můžeme dělat něco jiného

      res.end("Success " + upload.bytesReceived);
    } else {
      // ztráta spojení, necháme soubor nedokončený
      debug("File unfinished, stopped at " + upload.bytesReceived);
      res.end();
    }
  });

  // v případě I/O chyby ukončíme požadavek
  fileStream.on('error', function(err) {
    debug("fileStream error");
    res.writeHead(500, "File error");
    res.end();
  });

}

function onStatus(req, res) {
  let fileId = req.headers['x-file-id'];
  let upload = uploads[fileId];
  debug("onStatus fileId:", fileId, " upload:", upload);
  if (!upload) {
    res.end("0")
  } else {
    res.end(String(upload.bytesReceived));
  }
}


function accept(req, res) {
  if (req.url == '/status') {
    onStatus(req, res);
  } else if (req.url == '/upload' && req.method == 'POST') {
    onUpload(req, res);
  } else {
    fileServer.serve(req, res);
  }

}




// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Server listening at port 8080');
} else {
  exports.accept = accept;
}
