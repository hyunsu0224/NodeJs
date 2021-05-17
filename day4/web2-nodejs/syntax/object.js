var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]);

var roles = {
    'programmer':'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
}
//앞에 들어온 programmer, designer, manager과 같은 것을 키값이라고 한다.
console.log(roles.programmer);

// 객체에서 꺼내와서 반복문으로 처리하는 방법에 대해서 밑에 설명시작

var i = 0;
while(i < members.length){
    console.log(members[i]);
    i = i + 1;
}

console.log(roles.designer);
console.log(roles['designer']);

for(var name in roles){
    console.log('object => ',name, 'value =>', roles[name]);
}