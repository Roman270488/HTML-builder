const fs = require('fs');
const prom = require('fs/promises');
const path = require('path');
const finalFolder = '06-build-page/project-dist'; 
const initSources = '06-build-page/assets';
const initHtml = '06-build-page/template.html'; 
const initStyles = '06-build-page/styles'; 
const initComponents = '06-build-page/components';

async function createHtmlLayout() {
  let templateTag = await prom.readFile(initHtml, 'utf-8');
  const data = await prom.readdir(initComponents);
  await prom.copyFile(initHtml, `${finalFolder}/index.html`);
  await Promise.all(data.map((elem) => {
    return new Promise(async (result) => {
      const priceData = await prom.readFile(`${initComponents}/${elem}`, 'utf-8');
      const nameFile = path.basename(elem, '.html');
      templateTag = templateTag.replace(`{{${nameFile}}}`, priceData);
      result();
    });
  }));
  await prom.writeFile(`${finalFolder}/index.html`, templateTag,{'flags' : 'w'});
}

async function createStyleCss() {
  const dataStream = fs.createWriteStream(`${finalFolder}/style.css`, {'flags' : 'w'});
  const data = await prom.readdir(initStyles, { withFileTypes : true }, () => {});
  await Promise.all(data.map((elem) => {
    return new Promise(async (result) => {
      if(path.extname(`${initStyles}/${elem.name}`) === '.css' && !elem.isDirectory()) {
        const priceData = await prom.readFile(`${initStyles}/${elem.name}`, 'utf-8');
        dataStream.write(priceData);
        dataStream.write('\n');
        result(); 
      }
    });
  }));
}

function assetsCopy(initSources, finalFolder) {
  fs.mkdir(finalFolder, { recursive: true }, () => {});
  fs.readdir(initSources, { withFileTypes: true }, (err, data) => {
    if (err) throw err;
    data.forEach((elem) => {
      if (elem.isFile()) {
        fs.copyFile(`${initSources}/${elem.name}`, `${finalFolder}/${elem.name}`, () => {});
      } else {
        assetsCopy(`${initSources}/${elem.name}`, `${finalFolder}/${elem.name}`);
      }
    });
  });
};

fs.mkdir(finalFolder, { recursive: true }, () => {});
assetsCopy(initSources, `${finalFolder}/assets`);

createHtmlLayout();
createStyleCss();
