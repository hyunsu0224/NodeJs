/*
function a (){
    console.log('A');
}
*/
var a = function(){
    console.log('A');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);

// 자바스크립트에서는 함수를 값으로 지정이 가능한데, 여기서 주의할점은 callback 함수로써 함수로 지정된 값을 함수로써 호출해서
// 지정된 함수값을 다른 함수로 호출이 가능하도록 하는 것이 가능하다.