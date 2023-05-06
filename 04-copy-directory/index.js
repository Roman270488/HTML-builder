const fs = require('fs');
const defFolder = '04-copy-directory/files';
const copyFolder = '04-copy-directory/files-copy';
const copyDir = (files, filesCopy) => {
  fs.mkdir(filesCopy, { recursive : true }, (err) => {
    if (err) throw err;
  
    fs.readdir(filesCopy, { withFileTypes : true }, (err, data) => {
      if (err) throw err;
  
      fs.readdir(files, { withFileTypes : true }, (err, data) => {
        if (err) throw err;
        data.forEach((elem) => {
          fs.copyFile(`${files}/${elem.name}`, `${filesCopy}/${elem.name}`, () => {});
        });
      });

      data.forEach((elem) => {fs.unlink(`${filesCopy}/${elem.name}`, () => {});});
  
    });

  });
}
copyDir(defFolder, copyFolder);



