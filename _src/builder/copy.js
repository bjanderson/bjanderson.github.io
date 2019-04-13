import fse from 'fs-extra';
import glob from 'glob';

export function copy() {
  copyAssets()
  copyNonHtml()
}

function copyAssets() {
  fse.copySync('src/assets', '../');
}

function copyNonHtml() {
  const files = glob.sync('./src/html/**/*.!(html|md)');
  for (const file of files) {
    fse.copySync(file, file.replace('src/html/', '../'));
  }
}
