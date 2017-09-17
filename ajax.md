# # # 一、 什么是Ajax ? 原生XMLHttpRequest对象
AJAX stands
for Asynchronous JavaScript And XML
就是使用XMLHttpRequest对象和服务器交流。 信息传递格式多种多样，
包括 JSON, XML, HTML, and text files

# # # # Step 1– How to make an HTTP request

  (1).httpRequest = new XMLHttpRequest();

(2).当收到response后， 处理函数这样设立

httpRequest.onreadystatechange = function() {
  //数据如何处理
};

(3).make the request.

httpRequest.open('GET', url, true);
httpRequest.send();

open() 第一个参数还有GET, POST, HEAD

url有同源策略限制

当你想POST传输数据给服务器时, send() 里的参数是某种格式的data,
  比如query string, multipart / form - data, JSON, XML, and so on.
"name=value&anothername=" + encodeURIComponent(myVar) + "&so=on"

在send之前还必须申明头信息
  > httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


# # # # Step 2– Handling the server response

处理函数
httpRequest.onreadystatechange = nameOfTheFunction;

在这个函数里有几步需要完成：

  (1) 检查request 's state,表示服务器的连接状态,4表示请求结束,response is ready

if (httpRequest.readyState === 4(XMLHttpRequest.DONE)) { //就是4
  // Everything is good, the response was received.
} else {
  // Not ready yet.
}

所有的值

0(uninitialized) or(request not initialized)
1(loading) or(server connection established)
2(loaded) or(request received)
3(interactive) or(processing request)
4(complete) or(request finished and response is ready)

(2) 检查HTTP的 response code 状态码, 查看请求是否成功进行，

成功情况
response.ok === true;
response.status === 200

if (httpRequest.status === 200) {
  // Perfect!
} else {
  // There was a problem with the request.
  // For example, the response may have a 404 (Not Found)
  // or 500 (Internal Server Error) response code.
}


(3).检查好之后, two options to access the data：

通常我们会JSON.parse(httpRequest.responseText) 将string转化为JSON格式的数据 `
`
`
httpRequest.responseText– returns the server response as a string of text
httpRequest.responseXML– returns the response as an XMLDocument object you can traverse with JavaScript DOM functions `
`
`

# # # # Step 3– A Simple Example
  `
`
` < button id = "ajaxButton"
type = "button" > Make a request < /button>

< script >
  (function() {
    var httpRequest;
    document.getElementById("ajaxButton").addEventListener('click', makeRequest);

    function makeRequest() {
      httpRequest = new XMLHttpRequest();

      if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }
      httpRequest.onreadystatechange = alertContents;
      httpRequest.open('GET', 'test.html');
      httpRequest.send();
    }

    function alertContents() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          alert(httpRequest.responseText);
        } else {
          alert('There was a problem with the request.');
        }
      }
    }
  })(); < /script>


# # # # Step 5– Working with data


httpRequest.send('userName=' + encodeURIComponent(userName));


由于上述过程的麻烦程度， 所以有其它一些优雅的方式来进行异步请求, $.ajax, promise, async / await等等

# # # 二、 其他一些优雅的异步方案

# # # # promise(fetch就是基于promise)

# # # # # 1. 含义： Promise

对象用于一个异步操作的最终完成（ 或失败） 及其结果值的表示。(简单点说就是处理异步请求。。 一个诺言， 一个成功， 一个失败）

  解决了无尽的callbacks噩梦

  语法： `

new Promise(
  /* executor */
  function(resolve, reject) {...
  }
);

  一个 Promise有以下几种状态:

  pending: 初始状态， 不是成功或失败状态。 fulfilled: 意味着操作成功完成。 rejected: 意味着操作失败。

  有两个地方使用Prommise对象， 在函数里和函数外

  函数里:
  -创建Promise - 异步函数返回promise对象， 函数有两个参数, resolve, reject - 如果异步成功, promise对象交给resolve方法来解决 - 异步失败， 交给rejected方法来reject

  resolve, reject就是通过then() 来添加的, 异步成功的结果传给resolve也就是传给了then的第一个函数, reject里的结果传给then() 的第二个参数 函数外： - 引用函数获得promise对象 - 用then() 绑定成功和失败的事件处理 `

var promise = new Promise(function(resolve, reject) {
  if ( /*异步成功*/ ) {
    resolve(value);
  } else {
    reject(error)
  }
});

promise.then(function(value) {
  //success
}, function(error) {
  //failure
})


  注意
  catch () 方法返回一个promise， 处理rejected情况， 实际上就是then(undefiend, X) obj.catch(onRejected) internally calls obj.then(undefined, onRejected)).
# # # # # 2 fetch
  (1).含义: 浏览器提供的原生Ajax接口， 用来替代$.ajax, 基于Promise, 加强版XMLHttp

和$.ajax的区别：(1).不会reject on http error status 会正常处理

  (2) 默认不会发送和接受cookies


var myHeaders = new Headers();

var myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch('flowers.jpg', myInit).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});


//发送证书
fetch('https://example.com', {
  credentials: 'include'
})


检查fetch是否成功, 两个检查， 一个对promise的错误处理, 一个对response.ok的检查

response.ok => http status code: 200 - 299

fetch('flowers.jpg').then(function(response) {
  if (response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});



# # # # async / await

async函数

async函数是用来取代回调函数的另一种方法。

只要函数名之前加上async关键字， 就表明该函数内部有异步操作。 该异步操作应该返回一个Promise对象， 前面用await关键字注明。 当函数执行的时候， 一旦遇到await就会先返回， 等到触发的异步操作完成， 再接着执行函数体内后面的语句。

async function getStockPrice(symbol, currency) {
  let price = await getStockPrice(symbol);
  return convert(price, currency);
}

上面代码是一个获取股票报价的函数， 函数前面的async关键字， 表明该函数将返回一个Promise对象。 调用该函数时， 当遇到await关键字， 立即返回它后面的表达式（ getStockPrice函数） 产生的Promise对象， 不再执行函数体内后面的语句。 等到getStockPrice完成， 再自动回到函数体内， 执行剩下的语句。

下面是一个更一般性的例子。


function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncValue(value) {
  await timeout(50);
  return value;
}

上面代码中， asyncValue函数前面有async关键字， 表明函数体内有异步操作。 执行的时候， 遇到await语句就会先返回， 等到timeout函数执行完毕， 再返回value。

async函数并不属于ES6， 而是被列入了ES7， 但是traceur编译器已经实现了这个功能。

# # # # generator

# # # 三、 HTTP

应用层 HTTP： 无状态、 无连接

传输层 TCP

有三次握手保证通信的可靠性：

发送端 - > 接收站： SYN
接收站 - > 发送端： SYN / ACK
发送端 - > 接收站： ACK 握手结束


网络层 IP

链路层


二、 HTTP协议详解之请求篇

http请求由三部分组成， 分别是： 请求行、 消息报头、 请求正文

1、 请求行以一个方法符号开头， 以空格分开， 后面跟着请求的URI和协议的版本， 格式如下： Method Request - URI HTTP - Version CRLF
其中 Method表示请求方法； Request - URI是一个统一资源标识符； HTTP - Version表示请求的HTTP协议版本； CRLF表示回车和换行（ 除了作为结尾的CRLF外， 不允许出现单独的CR或LF字符）。

请求方法（ 所有方法全为大写） 有多种， 各个方法的解释如下：
GET 请求获取Request - URI所标识的资源
POST 向指定的资源提交要被处理的数据
HEAD 请求获取由Request - URI所标识的资源的响应消息报头
PUT 请求服务器存储一个资源， 并用Request - URI作为其标识
DELETE 请求服务器删除Request - URI所标识的资源
TRACE 请求服务器回送收到的请求信息， 主要用于测试或诊断
CONNECT 保留将来使用
OPTIONS 请求查询服务器的性能， 或者查询与资源相关的选项和需求


  (2)
POST 与 PUT的区别在于， 重复put没有副作用， 重复POST会有副作用， 比如会生成更多的XXX

如果你自己命名你自己创造的对象， 就用PUT, 否则用POST

  (3)
GET 与 POST的区别：

GET 后退按钮 / 刷新 无影响
GET 请求可被缓存
GET 请求保留在浏览器历史记录中
GET 请求可被收藏为书签
GET 请求不应在处理敏感数据时使用
GET 请求有长度限制
GET 请求只应当用于取回数据

POST 后退按钮 / 刷新 数据会被重新提交
POST 请求不会被缓存
POST 请求不会保留在浏览器历史记录中
POST 不能被收藏为书签
POST 请求对数据长度没有要求


# # # 安全 & 跨域

# # # # JavaScript防http劫持与XSS

原文： http: //www.cnblogs.com/coco1s/p/5777260.html

  HTTP劫持与XSS跨站脚本（ Cross - site scripting）、 CSRF跨站请求伪造（ Cross - site request forgery）

一、 XSS 怎么防御
  (1).一个经典的防御方法就是对内容进行转义和过滤 `

var escapeHtml = function(str) {
  if (!str) return '';
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quto;');
  str = str.replace(/'/g, '&#39;'); // str = str.replace(/ /g, '&#32;'); 
  return str;
};
var name = escapeHtml(` < script > alert('SB') < /script>`);


(2). CSP大法  

content security policy

自定义规则限制哪些内容可信哪些不可信


Content - Security - Policy: script - src 'self';

这样除了在同一个域名下的JS文件外，其他的脚本都不可以执行了

二、CSRF跨站请求伪造（Cross-site request forgery）

在 Cookies 中会存放用户的身份凭证。在大部分时候，就是一个 SessionId 。当用户下次访问我们的网站的时候，我们用这个凭证识别出用户是谁，有没有登录态。

此时如果我们向第三方网站的代码发出请求，cookies就被暴露了

CSRF防御： 判断来源和添加token

referrer不是自己的网站就返回错误

因为，html里的action可以跨域提交，表单里添加唯一的token，确保来源表单提交是可信的

sameSite:   strict  

表单提交必须使用POST



####  跨域

1.浏览器的同源策略：协议，端口、和域名对于两个页面是相同的，则两个页面具有相同的源。

IE的例外： 

(1).两个相互之间高度互信的域名，公司域名，不遵守同源限制
(2).端口，端口不同也算同源

源的修改：
`
``
document.domain = "company.com";
//页面将会成功地通过对 http://company.com/dir/page.html 的同源检测
``
`
注：浏览器单独保存端口号。任何的赋值操作，包括document.domain = document.domain都会以null值覆盖掉原来的端口号

1.3 限制范围：
cookie,localStorage,indexDB无法获取

DOM无法获取

AJAX无法请求

二、cookie 

适用于cookie和Iframe窗口
同源的网页才能共享cookie,两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置document.domain共享 Cookie。

二、iframe

iframe.contentWindow 返回内联框架的window对象

contentDocument返回内联框架的document对象

子代想获得主窗口的DOM或者反过来，如果一级域名相同，也可以使用设置documen.domain，拿到DOM

三、完全不同源的网站的跨域解决

3.1 片段识别符

指的是URL的#号后面的部分，比如http://example.com/x.html#fragment的#fragment。如果只是改变片段标识符，页面不会重新刷新。
`
``
父窗口可以把信息， 写入子窗口的片段标识符。

var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;
子窗口通过监听hashchange事件得到通知。

myIFrame.contentWindow.onhashchange = checkMessage;

function checkMessage() {
  var message = myIFrame.contentWindow.location.hash;
  // ...
}
同样的， 子窗口也可以改变父窗口的片段标识符。

parent.location.href = target + "#" + hash; //在子窗口控制台无法访问
``
`
成功测试~  console里可以选择窗口环境，

3.2 window.name

window.name无论是否同源，只要在一个窗口里，都可以访问读取

`
``
父窗口打开一个子窗口， 网页信息写入window.name属性，
window.name = data;
接着， 子窗口跳回一个与主窗口同域的网站
location = 'http://parent.url.com/xxx.html';
然后， 主窗口就可以读取子窗口的window.name了
var data = document.getElementById('myFrame').contentWindow.name;

优点是window.name容量很大， 缺点是必须监听子窗口window.name属性的变化 ``
`

3.3 window.postMessage (来自HTML5)

向谁发送消息，就用谁的窗口作主语： 可以反复传递消息

发送：

window.frames[0].postMessage('hello buddy', URL);

接受：addEventListener,onmessage都可以(考虑兼容性)

postEvent是一个对象，有几个重要属性

data：顾名思义，是传递来的message
source：发送消息的窗口对象
origin：发送消息窗口的源（协议+主机+端口号）

window.frames[0].contentWindow.addEventListener('message', function(postEvent) {
  console.log(postEvent.data)
})

3.4 LocalStorage

通过window.postMessage,读写其他窗口的localStorage也成了可能

localStorage.setItem(payload.key, JSON.stringify(payload.data));

localStorage.getItem(payload.key);
localStorage.removeItem(payload.key);

四、AJAX规避同源限制

1.架设服务器代理，浏览器请求同源服务器，再由后者请求外部服务
2.JSONP
3.WebSocket
4.CORS


4.1 JSONP  只能发出GET请求

服务器与客户端跨源通信，简单适用，老式浏览器全都支持

基本思想：动态插入script元素,由它向跨源网址发送请求，服务器收到请求后，将数据放到一个指定名字的callback回调函数里传回来

function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type", "text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function() {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};


服务器参数的返回

foo({
  "ip": "8.8.8.8"
})


注意会立即调用foo,作为参数的JSON数据作为JS对象，不用使用JSON.pase

4.2  WebSocket

WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信

览器发出的WebSocket请求的头信息

GET / chat HTTP / 1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec - WebSocket - Key: x3JJHMbDL1EzLkh9GBhXDw ==
  Sec - WebSocket - Protocol: chat, superchat
Sec - WebSocket - Version: 13
Origin: http: //example.com


服务器根据Origin这个字段来判断是否允许本次通信，如果该域名在白名单，服务器就会允许


4.3 CORS，Cross-Origin Resource Sharing 跨源资源分享,W3C标准
终极解决方法

(1)、

CORS需要浏览器和服务器同时支持，IE不能低于IE10，只要服务器实现了CORS接口，就可以跨源通信。

(2)、两种请求

浏览器将CORS请求分为两类：简单请求、非简单请求

只要同时满足以下两大条件，就属于简单请求。

1) 请求方法是以下三种方法之一：
HEAD
GET
POST（ 2） HTTP的头信息不超出以下几种字段：
Accept
Accept - Language
Content - Language
Last - Event - ID
Content - Type： 只限于三个值application / x - www - form - urlencoded、 multipart / form - data、 text / plain 

(3)、简单请求

3.1基本流程 

对于简单请求，直接在头部信息里加一个Origin字段

GET / cors HTTP / 1.1
Origin: http: //api.bob.com
  Host: api.alice.com
Accept - Language: en - US
Connection: keep - alive
User - Agent: Mozilla / 5.0...

如果Origin指定的源不在许可范围内，服务器会返回一个正常的HTTP回应，浏览器发现回应的头信息里没有 Access-Control-Allow-Origin字段，
抛出错误，被onerror回调函数捕获，这种错误无法被状态码识别。

如果允许：

Access - Control - Allow - Origin: http: //api.bob.com
  Access - Control - Allow - Credentials: true //是否允许发送Cookie，默认不发送
Access - Control - Expose - Headers: FooBar //增添额外的header信息
Content - Type: text / html;
charset = utf - 8 

3.2 withCredentials 属性

CORS默认不发送Cookie和HTTP认证信息，如果要发送cookie需要双方支持

Access-Control-Allow-Credentials: true

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。

xhr.withCredentials = false;

需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

4 非简单请求

PUT,DELETE ,Content-Type字段的类型是application/json。 

会多一个步骤，HTTP查询请求 preflight


OPTIONS / cors HTTP / 1.1
Origin: http: //api.bob.com
  Access - Control - Request - Method: PUT
Access - Control - Request - Headers: X - Custom - Header
Host: api.alice.com
Accept - Language: en - US
Connection: keep - alive
User - Agent: Mozilla / 5.0...


服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

Access-Control-Allow-Origin: *
如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信

4.3 浏览器的正常请求和回应
一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。
下面是"预检"请求之后，浏览器的正常CORS请求。

PUT / cors HTTP / 1.1
Origin: http: //api.bob.com
  Host: api.alice.com
X - Custom - Header: value
Accept - Language: en - US
Connection: keep - alive
User - Agent: Mozilla / 5.0...

上面头信息的Origin字段是浏览器自动添加的。
下面是服务器正常的回应。

Access - Control - Allow - Origin: http: //api.bob.com
  Content - Type: text / html;
charset = utf - 8


上面头信息中，Access-Control-Allow-Origin字段是每次回应都必定包含的。


CORS与JSONP的使用目的相同，但是比JSONP更强大。
JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。