import fse from 'fs-extra';
import glob from 'glob';

export function clean() {
  emptyDist();
}

function emptyDist() {
  // fse.emptyDirSync('dist');
  const excludeFiles = [
    '../_src',
    '../LICENSE',
    '../.gitignore',
    '../.editorconfig',
  ];
  let files = glob.sync('../*');
  files = files.filter(f => !excludeFiles.includes(f))
  console.log('\n\nfiles:\n', files, '\n\n');
  files.forEach(f => {
    fse.remove(f);
  });
}
