const fs = require('fs');
const path = require('path');
const addFile = '03-files-in-folder/secret-folder';

fs.readdir(addFile, {withFileTypes : true}, (err, data) => {
  if (err) throw err;
  data.forEach((elem) => {
    fs.stat(`${addFile}/${elem.name}`, (err, stats) => {
      if (err) throw err;
      if(stats.isFile()) {
        let convertSize = stats.size / 1024;
        console.log(`${elem.name.replace(/\.[^/.]+$/, "")} - ${path.extname(elem.name).split('').slice(1).join('')} - ${convertSize.toFixed(3)}kb`);
      }
    });
  });
});
