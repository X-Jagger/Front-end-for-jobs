1.什么是HTML的语义化？

语义化的含义就是用正确的标签做正确的事情，HTML语义化就是让页面的内容结构化，便于对浏览器搜索引擎解析，在没有CSS情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于SEO。 使阅读源代码的人更容易将网站分块，便于阅读维护理解。

2.HMTL中哪些是行标签，块标签？

#### inline elements:
```
<a>: 超链接
属性： 
href: 可以是URL,或者URL碎片（#id),或者file:, ftp:,mailto:,tel:,
download:XX 
target: _self,_blank,_parent,_top
rel: 描述目标对象和连接对象的关系(nofollow,noreferrer,stylesheet..
<link rel="stylesheet" href="">
<a href = "#"></a>
<a href = "#top"> </a>//to the topof the current page.
<a href = "mailto:839054164@qq.com">Send email to XX</a>
<a href="tel:+491570156">+49 157 0156</a>
<a href="" download=canvas.toDataURL()></a>

<b> : 黑体
<big> : 大一点 (过时)
<em>：斜体 强调 
<strong>：黑体 重要 
<cite>  斜体 名字的引用
<dfn> 斜体 标记定义
<i> 普通斜体
<u></u> 类似 <ins></ins>下划线
<s></s> 类似<del></del> 删除线
<small>  小一号（large to medium, small to x-small）
<tt> 过时 monotype font，使用<code> 或者<span> with css
<code> 使用monotype font 代表计算机code
<abbr> 缩写 <abbr title="Internationalization">I18N</abbr>
<acronym> 过时，缩写
<kbd> 代表用户输入，monospace font
<samp> 样品输出，monotype font
<time> 机器可读的时间（添加到日历啥的）<time
  datetime="2001-05-15T19:00">May 15</time>
<var> 代表数学表达式中的变量  <var>x</var> = <var>y</var> + 2 
<bdo> 双向覆盖，改变文字显示方向;属性rtl,ltr,<bdo dir="rtl">123</bdo> // 321
<br> 空各行 line break

<img> 图片
    1.属性：(1)alt 替代文本 
    (2)crossorigin：跨域请求；crossorigin="anonymous" 表示此元素的CORS请求将不设置凭据标志（跨域请求不发送用户凭据）
    crossorigin="anonymous"  表示CORS请求将提供凭据
    (3).height：图片的高度（H5只能用px,H4可以用百分数）
    (4).longdes 一个更详细的对图的描述
    (5).width:宽度
    (6).srcset,sizes属性 这两个必须配合使用
    sizes属性用来指明一系列的尺寸，包括媒体环境
    用户根据source size值来从srcset中选择一个用"w"描述的图片来源

    srcset属性表示来源和带"w"的宽度描述符，或者带"x"的像素密度，二选1 
    此时src作为备选
    <img src="clock-demo-thumb-200.png" 
      alt="Clock" 
      srcset="clock-demo-thumb-200.png 200w,
          clock-demo-thumb-400.png 400w"
      sizes="(min-width: 600px) 200px, 50vw">
    2.onerror:响应错误事情 
    (1).src属性为空或者null
    (2).srcURL跟页面的URL一样
    (3).图片被破坏了
    (4).图片格式不支持

<map> : 和<area>配合使用定义一个Image map（可点击区域）(兼容性不好)
<object> 代表一个外部资源（被当作图片，嵌套浏览器上下文，或者被插件管理的资源）（兼容不好）
<q> 就是短名言名句引用，<blockquote> 长引用 ，属性cite：URL

<script>:脚本
    属性： 
        (1).async 异步下载，下载好了立马执行 
        (2)crossorigin:和img的一样
        (3).defer 延迟执行，但异步下载不受影响 
        (4).text  可执行文本
        (5).type..
<span> Inline容器，用来style，作用类似div
<sub> 更小更低的span，印刷需要 <p>H<sub>2</sub>O</p> H2O(2要更小)
<sup> 更高更大的span，印刷需要

<button>
    属性：
        (1).disabled 
        (2).form 值为<form>的id，这个button就变成了该from的提交button
        (3).formaction，覆盖form中的action
        (4).fromenctype:提交的内容的种类,覆盖form的enctype
        (5).formmethod: post、 get,覆盖form的method
        (6).formnovalidate:不会被验证，覆盖form的novalidate 表单不会验证表单的输入。
        (7).formtarget: _self,_blank,_parent,_top
        (8). name : button的名字，和form数据一起被提交
        (9).type: Button的类型，submit,reset,button
        (10).value:按钮的值，和form数据一起提交
    <button>比input更好style

<input>
    属性： 
        (1).type :number, color, email,hidden,checkbox, image,radio, date, file, month, password, range, or time.
        (2)accept,如果type是file,这个accept就表明服务器接受的种类
        (3)autocomplete: off,on....so on
        (4).autofocus
        (5).capture
        (6).checked 如果是ratio,checkbox被选中
        (7)disabled 无法交互
        (8).form,formaction,formenctype,formmethod,formnovalidate,formtarget
        (9).height,如果type是image,。。
        (10).inputmode 使用那种输入模式（键盘).不怎么起作用
        (11).list,值为<datalist>元素的id
        (12).min/max 最大值(numeric or date-time)
        (13)minlength/maxlength  最长的字符数(text,email,search,password,tel,url)
        (14).multiple true or false, 用户是否可以输入多个值（email,file）
        (15).name 随数据一起上传
        (16) pattern  正则判断,text, search, tel, url, email, or password
        (17).placeholder 
        (18).readonly readonly=true 只读
        (19).required 必须在提交之前输入值
        (20) src 如果type是image
        (21).value input的初值
        (22)width: 如果type是image，这个决定了图片的宽度

<label> ：代表了一个控制标签;
    属性：for规定label与哪个表单元素绑定,值是那个表单（input）的id，这样点击label的时候就相当于点击了Input
<select> 选择菜单 子选项<option>,子选项加selected表示被选中 
    属性:
        (1).disabled
        (2).form
        (3).mutiple
        (4).name
        (5).required
        (6).size
<textarea>：多行纯文字编辑框
    属性:
        (1).autocomplete
        (2).autofocus 
        (3).cols宽(20),rows多少行
        (4).form 
        (5).maxlength/minlength  
        (6).name
        (7).placeholder 
        (8) readonly
        (9).required
        (10).spellcheck=true// 支持不好
        (11).wrap 

```

####  block elements：注意下面的都是block
```
<address>地址等联系信息（特殊的排版格式）
h5 <article> HTML5 如名  没有什么特殊.
h5 <aside> HTML5A 旁白 没有什么特殊.
<blockquote>长块级引用，左边会有缩进

h5 <canvas> 

<dl>描述列表（词汇表，名词解释），特殊排版
<dt>每一个描述头
<dd>描述内容
<div>通用块分离
<fieldset>在一个form里分多个labels组，特殊的框框排版，
    属性：<legend>是它独特的标题，位于左上角
        (1)disabled,除了<legend>外，子代不可编辑，接不到任何事件
        (2)form 值是form的id,默认最近form的id
        (3)name

h5 <figcaption> figure 的标题
h5 <figure> 媒体内容单元（图片、示例图、图标、代码片段）
h5 <footer> 页脚内容，nothing different

<form>表单
    action :处理表单信息的URI
    enctype: 信息类型
    method:get/post 
    name:名字
    target:哪个页面来接收提交后的返回结果_self,_blank,_parent,_top

<h1>, <h2>, <h3>, <h4>, <h5>, <h6>Heading levels 1-6.
h5 <header> 头部信息（logo,一些介绍之类的）
h5 <hgroup> 多级头信息(h1-h6) 格式没什么特别 
<hr>分割行
<ul>Unordered list.
<ol>Ordered list.
<li>列表子元素 
    (2).value 只在ol下有用，指明现在的序数值
    (1).type : a,A,i,I,1 
<main>不同于document的主要内容，不影响页面的DOM结构概念(无特殊样式)
<nav>导航栏 (无特殊样式)
<noscript>如果script不支持或者被浏览器关闭显示的内容
h5 <output> 计算结果或者用户操作结果
    for:其他元素的IDs（对结果有影响的）
    form: form的id值
    name: 用来指定的名字
    <form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
        <input type="range" name="b" value="50" /> +
        <input type="number" name="a" value="10" /> =
        <output name="result">60</output>
    </form>

<p>Paragraph.
<pre>空格不会被省略掉
h5 <section> 独特的一部分（放一些没有更好的名字指定的内容）
<table>Table. 
    <colgroup><col></colgroup>
    <thead><tr><th></th></tr></thead>
    <tbody><tr><td></td></tr></tbody>
    <tfoot><tr><td></td></tr></tfoot>
<tfoot>Table footer.

h5 <video> 
    autoplay
    buffered 缓存媒体的事件
    controls 有或没有，浏览器提供对视频的控制
    crossorigin
    height、width
    loop，默认是false
    muted ，默认是false,静音
    played 
    preload: none,metadata(只预加载一些基本数据，如length),auto,''(auto)
    poster: URL，未播放时的海报
    src:URL
```

#### HTML5新增加内容
```
文件类型声明（<!DOCTYPE>）仅有一型：<!DOCTYPE HTML>。
新的解析顺序：不再基于SGML。
新的元素：section, video, progress, nav, meter, time, aside, canvas, command, datalist, details, embed, figcaption, figure, footer, header, hgroup, keygen, mark, output, rp, rt, ruby, source, summary, wbr。
input元素的新类型：date, email, url等等。
新的属性：ping（用于a与area）, charset（用于meta）, async（用于script）。
全域属性：id, tabindex, repeat。
新的全域属性：contenteditable, contextmenu, draggable, dropzone, hidden, spellcheck
```