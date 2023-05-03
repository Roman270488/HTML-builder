const fs = require('fs'); // подключаеи файлавую систему

fs.readFile('01-read-file/text.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data); // либо data.toString() без 'utf-8'
});
