var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(){
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
    ${body}
  </body>
  </html>
`;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(url.parse(_url, true).pathname);

    if(pathname ==='/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          console.log(filelist)
          var title = 'Welcome';
          var description = 'Hello, Node.js'
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template); //사용자가 접속한 URL에 따라서 읽어주는 부분
        }) 
    } else {
      fs.readdir('./data', function(error, filelist){
        console.log(filelist)
        var title = 'Welcome';
        var description = 'Hello, Node.js'
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
          list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }
        list = list + '</ul>';
        fs.readFile(`data/${queryData.id}`,'utf8', function(err, description){
          var title = queryData.id;
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template); //사용자가 접속한 URL에 따라서 읽어주는 부분
      });
    });
    }
  } else{
    response.writeHead(404);
    response.end('Not Found');
  }

});
app.listen(3000);