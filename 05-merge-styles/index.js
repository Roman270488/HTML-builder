let fs = require("fs");
let path = require("path");
const folderSource = '05-merge-styles/styles';
const destFile = '05-merge-styles/project-dist/bundle.css';


fs.readdir(folderSource, { withFileTypes : true }, (err, data) => {
  if (err) throw err;

  data.forEach((elem) => {
    const streamData  = fs.createReadStream(path.join(`${folderSource}/${elem.name}`), { encoding: 'utf-8' });

    if(path.extname(elem.name) === '.css' && elem.isFile() ) {
      streamData.addListener('data', (priceData) => {
          fs.writeFile(destFile, priceData, {'flag' : 'a'}, () => {});
      });
    }

    fs.access(destFile, (err) => {
      if(!err) {fs.unlink(destFile, () => {});}
    });

  });
});

