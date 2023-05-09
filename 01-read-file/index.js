const fs = require('fs'); // подключаеи файлавую систему

fs.createReadStream('01-read-file/text.txt').addListener('data', (data) => {
  console.log(data.toString())
});