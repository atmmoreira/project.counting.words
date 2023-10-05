const path = require('path');
const fs = require('fs');

function readFolder(folderPath) {
  return new Promise((resolve, reject) => {
    try {
      let files = fs.readdirSync(folderPath);
      files = files.map((file) => path.join(folderPath, file));
      resolve(files);
    } catch (error) {
      reject(error);
    }
  });
}

function finishWith(array, pattern) {
  return array.filter((el) => el.endsWith(pattern));
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(filePath);
      resolve(content.toString());
    } catch (error) {
      reject(error);
    }
  });
}

function readFiles(filesPaths) {
  return Promise.all(filesPaths.map((path) => readFile(path)));
}

function removeEmptyLines(array) {
  return array.filter((el) => el.trim());
}

function removeTimeStampsLines(array, pattern) {
  return array.filter((el) => !el.includes(pattern));
}

function removeNumbersLines(array) {
  return array.filter((el) => {
    const num = parseInt(el.trim());
    return num !== num;
  });
}

function removeSymbols(symbols) {
  return function(array) {
    return array.map(el => {
      let textWithoutSymbols = el;
      symbols.forEach(symbol => {
        textWithoutSymbols = textWithoutSymbols.split(symbol).join('')
      })
      return textWithoutSymbols;
    })
  }
}

module.exports = {
  readFolder,
  finishWith,
  readFile,
  readFiles,
  removeEmptyLines,
  removeTimeStampsLines,
  removeNumbersLines,
  removeSymbols
};
