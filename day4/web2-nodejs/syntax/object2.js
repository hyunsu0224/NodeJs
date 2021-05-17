//객체지향형
//데이터, 데이터를 처리하는 방식이 프로그래밍
//배열, 객체를 이용해서 데이터를 처리한다.
//여기서 데이터가 많아지면 함수를 이용한다.

var f = function(){
    console.log(1+1);
    console.log(1+2);
}

console.log(f);

f();

var a = [f];
a[0]();

var o = {
    func:f
}

o.func();
// var i = if(true){
//     console.log(1)
// }

// var w = while(true){
//     console.log(2)
// }