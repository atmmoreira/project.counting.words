const path = require('path');
const fns = require('./functions/index');

const pathFiles = path.join(__dirname, '../legendas');

const symbols = ['.','?',',','"','♪','_','<i>','</i>','\r','[',']','(',')','-'];

const joinContent = (contents) => contents.join(' ');
const separateByLines = (lines) => lines.split('\n');
const separateByWords = (words) => words.split(' ');

// function countWords(words) {
//   return words.reduce((acc, word) => {
//     const w = word.toLowerCase();
//     acc[w] ? (acc[w] += 1) : (acc[w] = 1);
//     return acc;
//   }, {});
// }

function countWords(words) {
  return Object.values(
    words.reduce((acc, word) => {
      const w = word.toLowerCase();
      const qtd = acc[w] ? acc[w].qtd + 1 : 1;
      acc[w] = { word: w, qtd };
      return acc;
    }, {})
  );
}

function sortWords(attr, order = 'asc') {
  return function (array){
    const asc = (word1, word2) => word1[attr] - word2[attr];
    const desc = (word1, word2) => word2[attr] - word1[attr];
    return array.sort(order === 'asc' ? asc : desc);
  }
}

fns
  .readFolder(pathFiles)
  .then((files) => fns.finishWith(files, '.srt'))
  .then((filesSrt) => fns.readFiles(filesSrt))
  .then(joinContent)
  .then(separateByLines)
  .then((lines) => fns.removeEmptyLines(lines))
  .then((linesWithTimes) => fns.removeTimeStampsLines(linesWithTimes, '-->'))
  .then((numberLines) => fns.removeNumbersLines(numberLines))
  .then(fns.removeSymbols(symbols))
  .then(joinContent)
  .then(separateByWords)
  .then((lines) => fns.removeEmptyLines(lines))
  .then((numberLines) => fns.removeNumbersLines(numberLines))
  .then(countWords)
  .then(sortWords('qtd', 'desc'))
  .then(console.log);
