var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
  //request 요청할때 웹브라우저가 보낸 정보, response응답할때 우리가 웹브라우저에 전송할 정보
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname ==='/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js'
          var list = templateList(filelist);
          var template = templateHTML(title, list, 
            `<h2>${title}</h2>${description}`, 
            `<a href="/create">create</a>`);
        
          response.writeHead(200);
          response.end(template); //사용자가 접속한 URL에 따라서 읽어주는 부분
        });
    } else {
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`,'utf8', function(err, description){
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, 
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> 
             <a href="/update?id=${title}">update</a>
             <form action="delete_process" method="post"> 
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
             </form>
             `
          );//form에 onsubmit을 추가하여 삭제하기 전에 한번 더 확인 할수 있도록 할 수있다.
          response.writeHead(200);
          response.end(template);
        });
      });
    }
   } else if(pathname === '/create'){
    fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `
        <form action="/create_process" method="post">
        <p>
          <input type="text" name="title" placeholder="title">
        </p>
        <p>
          <textarea name="description"placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
        </form>
        ` ,'');
      response.writeHead(200);
      response.end(template);
    });
 } else if (pathname === '/create_process') {
  var body = '';

  request.on('data', function (data) {
    // POST 방식으로 전송될때 양이 너무 많지 않도록 조절하기 위한 코드
    // data라는 인자를 통해서 수신한 정보를 보냄
      body = body + data;
      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
  });
  request.on('end', function () {
      var post = qs.parse(body); //parse를 통해서 가져온 값을 객체화 가능하다.
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location : `/?id=${title}`});
        response.end();
      })
    });
  } else if(pathname ==='/update'){
    fs.readdir('./data', function(error, filelist){
      fs.readFile(`data/${queryData.id}`,'utf8', function(err, description){
        var title = queryData.id;
        var list = templateList(filelist);
        var template = templateHTML(title, list, 
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p>
            <input type="text" name="title" placeholder="title" value="${title}">
          </p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
          </form>
          `,
         `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if(pathname === '/update_process'){
    var body = '';

  request.on('data', function (data) {
      body = body + data;
  });
  request.on('end', function () {
      var post = qs.parse(body); 
      var title = post.title;
      var description = post.description;
      var id = post.id;
      fs.rename(`data/${id}`, `data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location : `/?id=${title}`});
          response.end();
        })
      })
      console.log(post);
      // 사용자가 만약 제목을 변경하거나 한다? 기존에 있는 css 파일을 css3로 이름을 변경한다. 내용도 변경이된다.
    });
  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(error){
          response.writeHead(302, {Location : `/`});
          response.end();
        })
      });
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
});

app.listen(3000);