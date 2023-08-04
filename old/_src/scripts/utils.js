
const fs = require('fs');
const path = require('path');

let testing = false;



const BASE_FOLDERS = {
  'app-state': path.resolve(__dirname, '..', 'src', 'app', 'app-state'),
  components: path.resolve(__dirname, '..', 'src', 'app', 'components'),
  models: path.resolve(__dirname, '..', 'src', 'app', 'models')
}

function createFile(baseFolder, folder, fileName, text) {
  fileName = path.join(BASE_FOLDERS[baseFolder], folder, fileName);
  if (testing) {
    console.log('\n##### File not written - testing mode #####\n');
  } else {
    fs.writeFile(fileName, text, function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
}

function createFolder(baseFolder, folder) {
  folder = path.join(BASE_FOLDERS[baseFolder], folder);
  if (testing) {
    console.log('\n##### Folder not created - testing mode #####\n');
  } else {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    } else {
      console.log(`\n${folder} already exists. Enter a new folder name.\n`);
      process.exit(0);
    }
  }
}

function getUpper(str) {
  let pieces = str.split('-');
  let upper = '';
  for (let piece of pieces) {
    upper += piece.charAt(0).toUpperCase() + piece.slice(1);
  }
  return upper;
}

function getUpperSpaced(str) {
  let pieces = str.split('-');
  let upperSpaced = '';
  for (let piece of pieces) {
    if (upperSpaced !== '') {
      upperSpaced += ' ';
    }
    upperSpaced += piece.charAt(0).toUpperCase() + piece.slice(1);
  }
  return upperSpaced.trim();
}

function readFile(baseFolder, folder, fileName) {
  fileName = path.join(BASE_FOLDERS[baseFolder], folder, fileName);
  return fs.readFileSync(fileName, 'utf8');
}

module.exports = {
  createFile,
  createFolder,
  getUpper,
  getUpperSpaced,
  readFile
}
