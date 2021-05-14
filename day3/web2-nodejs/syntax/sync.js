var fs = require('fs');

/* 동기적인 방식
readFilesync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

console.log('A');                                               //이게 비동기적인 방식인데 nodejs에서는 무조건 비동기적인 방식이 좋다.
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');                                                  