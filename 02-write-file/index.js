const fs = require('fs');
const readline = require('readline');
const {stdin: input, stdout: output,} = require('node:process');
const rl = readline.createInterface({ input, output });
const newFilse = (text, flag) => {fs.writeFile('02-write-file/text.txt', `${text}`, flag, () => {});}
const welcome = () => {console.log('\nTo exit, type "exit" or press "ctrl + c" \nEnter text:');}
const exit = () => {console.log('\nSee you later!'); rl.close();}
newFilse('');
welcome();
 
rl.on('line', (line) => {
  if (line === 'exit' || line === 'EXIT' || line === 'Exit') {
    exit();
  } else {
    newFilse(`${line}\n`, {'flag': 'a'});
  }
});

rl.on('SIGINT', () => {
  exit();
});
