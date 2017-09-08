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

  (1) 检查request state, 表示服务器的连接状态, 4 表示请求结束, response is ready

  ``
`
if (httpRequest.readyState === 4(XMLHttpRequest.DONE)) {//就是4
    // Everything is good, the response was received.
} else {
    // Not ready yet.
}
`
``
所有的值
  ``
`
0 (uninitialized) or (request not initialized)
1 (loading) or (server connection established)
2 (loaded) or (request received)
3 (interactive) or (processing request)
4 (complete) or (request finished and response is ready)
`
``
(2) 检查HTTP的 response code, 查看请求是否成功进行，

成功情况
response.ok === true;
response.status === 200 ``
`
if (httpRequest.status === 200) {
    // Perfect!
} else {
    // There was a problem with the request.
    // For example, the response may have a 404 (Not Found)
    // or 500 (Internal Server Error) response code.
}
`
``

(3).检查好之后, two options to access the data：

通常我们会JSON.parse(httpRequest.responseText) 将string转化为JSON格式的数据 ``
`
httpRequest.responseText – returns the server response as a string of text
httpRequest.responseXML – returns the response as an XMLDocument object you can traverse with JavaScript DOM functions
`
``

# # # # Step 3– A Simple Example
  ``
`
<button id="ajaxButton" type="button">Make a request</button>

<script>
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
})();
</script>
`
``

# # # # Step 5– Working with data

  ``
`
httpRequest.send('userName=' + encodeURIComponent(userName));
`
``

由于上述过程的麻烦程度， 所以有其它一些优雅的方式来进行异步请求, $.ajax, promise, async / await等等

# # # 二、 其他一些优雅的异步方案

# # # # promise(fetch就是基于promise)

# # # # # 1. 含义： Promise

对象用于一个异步操作的最终完成（ 或失败） 及其结果值的表示。(简单点说就是处理异步请求。。 一个诺言， 一个成功， 一个失败）

  解决了无尽的callbacks噩梦

  语法： ``
  `
new Promise(
    /* executor */
    function(resolve, reject) {...}
);
`
  ``
  一个 Promise有以下几种状态:

  pending: 初始状态， 不是成功或失败状态。 fulfilled: 意味着操作成功完成。 rejected: 意味着操作失败。

  有两个地方使用Prommise对象， 在函数里和函数外

  函数里:
  -创建Promise - 异步函数返回promise对象， 函数有两个参数, resolve, reject - 如果异步成功, promise对象交给resolve方法来解决 - 异步失败， 交给rejected方法来reject

  resolve, reject就是通过then() 来添加的, 异步成功的结果传给resolve也就是传给了tthen的第一个函数, reject里的结果传给then() 的第二个参数 函数外： - 引用函数获得promise对象 - 用then() 绑定成功和失败的事件处理 ``
  `
var promise = new Promise(function(resolve,reject) {
    if (/*异步成功*/) {
        resolve(value);
    } else {
        reject(error)
    }
});

promise.then(function(value){
    //success
},function(error) {
    //failure
})
`
  ``

  注意
  catch () 方法返回一个promise， 处理rejected情况， 实际上就是then(undefiend, X) obj.catch(onRejected) internally calls obj.then(undefined, onRejected)).
# # # # # 2 fetch
  (1).含义: 浏览器提供的原生Ajax接口， 用来替代$.ajax, 基于Promise, 加强版XMLHttp

和$.ajax的区别：(1).不会reject on http error status 会正常处理

  (2) 默认不会发送和接受cookies

  ``
`
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

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
`
``

检查fetch是否成功, 两个检查， 一个对promise的错误处理, 一个对response.ok的检查

response.ok => http status code: 200 - 299

  ``
`
fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then(function(myBlob) { 
  var objectURL = URL.createObjectURL(myBlob); 
  myImage.src = objectURL; 
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});
`
``


# # # # async / await

async函数

async函数是用来取代回调函数的另一种方法。

只要函数名之前加上async关键字， 就表明该函数内部有异步操作。 该异步操作应该返回一个Promise对象， 前面用await关键字注明。 当函数执行的时候， 一旦遇到await就会先返回， 等到触发的异步操作完成， 再接着执行函数体内后面的语句。
  ``
`

async function getStockPrice(symbol, currency) {
    let price = await getStockPrice(symbol);
    return convert(price, currency);
}
`
``
上面代码是一个获取股票报价的函数， 函数前面的async关键字， 表明该函数将返回一个Promise对象。 调用该函数时， 当遇到await关键字， 立即返回它后面的表达式（ getStockPrice函数） 产生的Promise对象， 不再执行函数体内后面的语句。 等到getStockPrice完成， 再自动回到函数体内， 执行剩下的语句。

下面是一个更一般性的例子。
  ``
`

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncValue(value) {
  await timeout(50);
  return value;
}
`
``
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

Using CORS
Using JSONP