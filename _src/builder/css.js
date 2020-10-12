import autoprefixer from 'autoprefixer';
import fse from 'fs-extra';
import glob from 'glob';
import sass from 'sass';
import postcss from 'postcss';
import { paths } from './paths';

export function css() {
  processCss();
}

function processCss() {
  const files = glob.sync(paths.styleScss);

  for (const file of files) {
    const data = fse.readFileSync(file).toString();
    const result = sass.renderSync({data});
    runAutoprefixer(result.css);
  }
}

function runAutoprefixer(css) {
  postcss([ autoprefixer ])
    .process(css, {from: undefined})
    .then(function (result) {
      result.warnings().forEach(function (warn) {
        console.warn(warn.toString());
      });
      fse.writeFileSync('../styles.css', result.css);
    });
}
