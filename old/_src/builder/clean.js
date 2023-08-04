import fse from 'fs-extra';
import glob from 'glob';

export function clean() {
  emptyDist();
}

function emptyDist() {
  const excludeFiles = [
    '../_src',
    '../LICENSE',
    '../.gitignore',
    '../.editorconfig',
  ];
  let files = glob.sync('../*');
  files = files.filter(f => !excludeFiles.includes(f))
  files.forEach(f => {
    fse.removeSync(f);
  });
}
