const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/front-end/runtime.js',
    './dist/front-end/polyfills.js',
    './dist/front-end/scripts.js',
    './dist/front-end/main.js',
  ];

  const rootDir = '../ui.apps/src/main/content/jcr_root/etc/designs/ngx-aem';

  await fs.ensureDir(`${rootDir}/clientlib-site/js`);
  await fs.ensureDir(`${rootDir}/clientlib-site/css`);

  await concat(files, `${rootDir}/clientlib-site/js/ng-aem.js`);

  await fs.copyFile('./dist/front-end/styles.css', `${rootDir}/clientlib-site/css/ng-aem.css`);

  await fs.copy('./dist/front-end/etc/designs/ngx-aem/assets/', `${rootDir}/assets`);

  await fs.copy('./dist/front-end/weathericons-regular-webfont.eot', `${rootDir}/clientlib-site/css/weathericons-regular-webfont.eot`);
  await fs.copy('./dist/front-end/weathericons-regular-webfont.svg', `${rootDir}/clientlib-site/css/weathericons-regular-webfont.svg`);
  await fs.copy('./dist/front-end/weathericons-regular-webfont.ttf', `${rootDir}/clientlib-site/css/weathericons-regular-webfont.ttf`);
  await fs.copy('./dist/front-end/weathericons-regular-webfont.woff', `${rootDir}/clientlib-site/css/weathericons-regular-webfont.woff`);

  await appendDataIfNotExists(`${rootDir}/clientlib-site/js.txt`, 'ng-aem.js');
  await appendDataIfNotExists(`${rootDir}/clientlib-site/css.txt`, 'ng-aem.css');

  console.log("\n\nDone with moving angular libs to AEM");

})();

async function appendDataIfNotExists(file, toAppend) {
  const data = await fs.readFile(file, 'utf8');
  if (!data.split('\n').find((val) => val === toAppend)) {
    await fs.writeFile(file,  data + '\n' + toAppend);
  }
}


