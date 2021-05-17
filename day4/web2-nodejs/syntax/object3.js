var o = {
    v1:'v1',
    v2:'v2'
}

function f1(){
    console.log(o.v1);
}
function f2(){
    console.log(o.v2);
}

f1();
f2();
var o = {
    v1 : 'v1',
    v2 : 'v2',
    f1 : function(){
        console.log(this.v1);
    },
    f2 : function(){
        console.log(this.v2);
    }
}

//this는 객체 내에 있는 값을 이용한다는 뜻. 본인이 속해있는 객체를 지정하는것.


