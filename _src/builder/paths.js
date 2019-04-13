import path from 'path';

const src = path.resolve('src');
const assets = path.resolve(src, 'assets');
const html = path.resolve(src, 'html');
const styles = path.resolve(src, 'styles');
const templates = path.resolve(src, 'templates');

export const paths = {
  indexTemplate: path.resolve(templates, 'index.html'),
  assets,
  html,
  styles,
  styleScss: path.resolve(styles, 'styles.scss'),
  src,
  templates,
}
