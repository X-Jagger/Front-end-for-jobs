浏览的渲染线程和JS执行线程是互斥的，并且JavaScript默认是阻塞加载的。页面的下载和渲染都必须停下来等待脚本执行完成

不管是script标签直接引入的情况，还是src加载的外部资源，都会阻塞页面的渲染。所以一般我们为了从体验上考虑，会将JS文件放置在body标签闭合之前

优化建议

将script脚本文件放置在body标签闭合之前
减少script请求数量
无阻塞脚本, 在页面加载完成后才加载 JavaScript 代码。这就意味着在 window 对象的 onload事件触发后再下载脚本:
defer, async
动态添加script元素

javascript引擎线程 javascript引擎是基于事件驱动单线程执行的，JS引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JS线程在运行JS程序。
GUI渲染线程 GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时,该线程就会执行。但需要注意GUI渲染线程与JS引擎是互斥的，当JS引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。
浏览器事件触发线程 事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeOut、也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JS的单线程关系所有这些事件都得排队等待JS引擎处理。（当线程中没有执行任何同步代码的前提下才会执行异步代码）


### 延迟加载

1. script放在body之前
2. 使用script标签的defer和async,延迟加载和并行加载
3. 监听onload或其它事件，动态添加script节点（这个表现好）
4. 通过ajax下载js脚本，动态添加script节点
5. 

### 单线程模型

1.JS是单线程的，但浏览器不是，它有JS引擎线程、界面渲染线程、浏览器事件触发线程、HTTP请求线程

浏览器可以实现多线程下载外部资源，但是因为JS是单线程的，必须依次执行

2.并发模式与Event Loop

如果有事件发生并指定了回调函数，那么事件处理函数就会进入任务队列，当主线程空闲时，就会开始处理人物队列里的任务

当某个任务执行完了，其他任务才会被执行

event loop绝不阻塞

3.定时器

setTimeout模拟setInterval
```
var x;
setTimout(function() {
	//执行一些函数
	console.log(1000)
	x = setTimeout(arguments.callee,2000)
},2000)
```
区别： 
上面案例中的 setTimeout 总是会在其回调函数执行后延迟 1000ms（或者更多，但不可能少）再次执行回调函数，从而实现setInterval的效果，而 setInterval 总是 1000ms 执行一次，而不管它的回调函数执行多久。

所以，如果 setInterval 的回调函数执行时间比你指定的间隔时间相等或者更长，那么其回调函数会连在一起执行。

4.浏览器的内核是多线程的

一个浏览器至少实现三个常驻线程：

1.JavaScript引擎线程 JavaScript引擎是基于事件驱动单线程执行的，JavaScript 引擎一直等待着任务队列中任务的到来，然后加以处理。

2.GUI渲染线程 GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时,该线程就会执行。但需要注意GUI渲染线程与JavaScript引擎是互斥的，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JavaScript引擎空闲时立即被执行。

3.浏览器事件触发线程 事件触发线程，当一个事件被触发时该线程会把事件添加到“任务队列”的队尾，等待JavaScript引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeOut、也可来自浏览器内核的其他线程如鼠标点击、AJAX异步请求等，但由于JavaScript是单线程执行的，所有这些事件都得排队等待JavaScript引擎处理。



注意：回流必将引起重绘，而重绘不一定会引起回流
### reflow : (layout)

Resizing the window
Changing the font
Adding or removing a stylesheet
Content changes, such as a user typing text in
an input box
Activation of CSS pseudo classes such as :hover (in IE the activation of the pseudo class of a sibling)
Manipulating the class attribute
A script manipulating the DOM
Calculating offsetWidth and offsetHeight（和位置相关的都会reflow）
Setting a property of the style attribute
### repaint (element skins)
改变background-color, 颜色之类

#### 避免多次的reflow,repaint

减少对render tree的操作

1. 直接改变className,
2. 要操作的元素进行离线处理，处理完后一起更新
    DocumentFragment进行缓存，然后再回流重绘 引发一次    display:none技术 引发两次；cloneNode replaceChild技术 引发一次
3. 不要经常访问会引起浏览器flush队列的属性（位置信息）
4. 设置动画元素position属性为fixed或者absolute
5. 避免设置多项内联样式，使用class来设置样式
6. 避免使用tabel布局
7. 避免在CSS中使用运算式

