import fm from 'front-matter';
import fse from 'fs-extra';
import glob from 'glob';
import { getBlogPostsHtml } from './blog';
import { clean } from './clean';
import { DOCUMENT_BODY, DOCUMENT_TITLE, WEBSITE_NAME } from './constants';
import { copy } from './copy';
import { css } from './css';
import { paths } from './paths';

const blogPosts = [];
const indexHtmlFile = glob.sync(paths.indexTemplate)[0];
const htmlTemplate = fse.readFileSync(indexHtmlFile).toString();

clean();
copy();
processHtml();
css();
createBlogPostsHtml();

function processHtml() {
  const files = glob.sync('./src/html/**/*.html');
  for (const file of files) {
    const fileText = fse.readFileSync(file).toString();
    const frontMatter = fm(fileText);
    addBlogPost(file, frontMatter);
    const html = getHtml(frontMatter, file);

    const outFile = file
      .replace('./src/html/', '../')
      .replace(/md$/, 'html');

    const parts = outFile.split('/');
    parts.pop();
    const outDir = parts.join('/');

    fse.mkdirpSync(outDir);
    fse.writeFileSync(outFile, html);
  }
}

function getHtml(frontMatter, file) {
  let html = '';
  if (frontMatter.attributes.title && frontMatter.attributes.title !== 'Home') {
    html = htmlTemplate.replace(DOCUMENT_TITLE, frontMatter.attributes.title + ' | ' + WEBSITE_NAME);
  } else {
    html = htmlTemplate.replace(DOCUMENT_TITLE, WEBSITE_NAME);
  }

  html = html.replace(DOCUMENT_BODY, frontMatter.body);

  html = setActiveLink(html, file);
  return html;
}

function addBlogPost(file, frontMatter) {
  if (file.indexOf('index.html') > -1 &&
    file !== './src/html/index.html' &&
    !frontMatter.attributes.hidden
  ) {
    frontMatter.attributes.file = file.replace('./src/html', '');
    frontMatter.attributes.link = frontMatter.attributes.file.replace('/index.html', '');
    blogPosts.push(frontMatter.attributes);
  }
}

function createBlogPostsHtml() {
  const file = '../index.html';
  const blogPostsHtml = getBlogPostsHtml(blogPosts);
  const frontMatter = {
    attributes: {title: 'Blog'},
    body: blogPostsHtml
  }
  const html = getHtml(frontMatter, file);
  fse.writeFileSync(file, html);
}

function setActiveLink(html, file) {
  const orig = 'class="navbar-item" href="/';
  const active = 'class="navbar-item active" href="/';
  const map = [
    {filePath: '/about.html', href: 'about'},
  ];

  for (const m of map) {
    if (file.indexOf(m.filePath) > -1) {
      const re = new RegExp(`${orig}${m.href}`, 'g');
      html = html.replace(re, `${active}${m.href}`)
    }
  }
  return html;
}
