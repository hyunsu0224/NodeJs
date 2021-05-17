// var M = {
//     v : 'v',
//     f : function(){
//         console.log(this.v);
//     }
// }

//모듈을 가져오는 함수
var part = require('./mpart.js');
// 다른 파일에 있는 함수를 가져오기 위해서는 require 를 쓴다.
console.log(part);

// M.f();

part.f();