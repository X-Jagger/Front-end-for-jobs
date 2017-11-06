## 跟着MDN开始重新过一遍CSS

### 一、Introduction to CSS

#### CSS syntax

##### 1.选择器

@import 'custom.css';引入其他的CSS文件到这个CSS中
@charset and @import (metadata)
@media or @document (conditional information, also called nested statements, see below.)
@font-face (descriptive information)

- Simple selectors :

 (1). type(div,p)/id#/class./universal selector*/

 (2). combinators:  所有后代（空格），所有儿子（>）,相邻的兄弟(+),所有的兄弟(~)
```
section p {//section所有的p后代
  color: blue;
}

section > p {//section的所有儿子P
  background-color: yellow;
}

h2 + p { //有h2相邻的p
  text-transform: uppercase;
}

h2 ~ p {//所有和h2是兄弟的p
  border: 1px dashed black;
}
```

- Attribute selectors

 (1).存在属性选择器

    [attr] 所有带有attr属性的

    [attr=val] attr的值是val的

    [attr~=val] attr有多个值，其中一个是val

 (2).类正则子**字符串**属性选择器

    [attr|=val] attr值是val,或着是val-.

    [attr^=val] attr值是val开头

    [attr$=val] attr值是val结尾

    [attr*=val] attr值包含val这个字符串,和[attr~=val]不一样，这个会把空格算在一起当成属性值

  (3).对比探究[attr~=val]和[attr*=val]
```
<li data-quantity="700g" data-vegetable="spicysdasdad ">Red pepper</li>

[data-vegetable*="spicy"] {
  color: red;
}
包含了spicy就可以，~=就不行

<li data-quantity="700g" data-vegetable="spicy">Red pepper</li>

[data-vegetable*="spicy "] {
  color: red;
}
多了一个空格不行，不是子字符串
```

- Pseudo-classes and pseudo-elements伪类伪元素选择器

(1).伪类：  以:开头的，选择某一个状态的elements
``` 
link — :visited — :hover — :active按照这个顺序来定义规则

:link 表示没有被访问的链接，用在带有href属性的a,area,link

:visited 表示被访问的链接

:hover 鼠标划过的elements

:active 表示被用户激活,多用到a,button a:active{color:red;}

:any 选择任何一个满足条件的selector  
    :-moz-any(section, article, aside, nav) h1 {
      font-size: 25px;
    }

:checked 表示被选择的  radio (<input type="radio">), checkbox (<input type="checkbox">), or option (<option> in a <select>) 
单独使用不加前缀表示所有被选择的...

:default 表示任何是默认值的表单元素（原始被选中等等）,用在button,checkbox,radio,option

:dir(rtl/ltr)：表示不同方向的文本

:disabled 表示被disabled的元素

:empty 没有children的任何元素（空白也可看成拥有children）

:enabled 除disabled外的可以被激活的元素(包括可以focus的)：selected,clicked on,typed into,etc.

:first @page :first这样使用 表示被打印的第一页

:left @page :left  represents all left-hand pages of a printed document.

:right 

:first-child 兄弟元素中的第一个元素(不管啥types)

:last-child

:last-of-type

:first-of-type p:first-of-type 兄弟元素中的第一个特定种类的元素

:fullscreen div:fullscreen 代表全屏下的某个种类的元素

:focus 表示被focus住的元素(选中表单元素，clicks,taps 或者用"tab"选中)

:focus-within 自己被focus或者有个被focus的后代

:indeterminate 表示状态是indeterminate的表单元素
    <input type="checkbox"> elements whose indeterminate attribute is set to true by JavaScript
    <input type="radio"> elements, when all radio buttons with the same name value in the form are unchecked
    <progress> 进度条

:in-range 用在input带有min max属性中，值在他们中间的元素

:out-of-range 用在input带有min max属性中，值在他们之外的元素

:invalid 表示input,form元素内容未经过validate（url,email验证等）

:lang()

:not() :not(p) 所有的非X元素，里面只能放一个selector

:nth-child() :nth-child(4n) ：4，8，12在一组siblings中选择every fourth element
              :nth-child(-n+3) 前三个
:nth-last-child() :nth-last-child(4n) 在一组siblings中倒数开始选

:nth-last-of-type() p:nth-last-of-type(4n)

:nth-of-type() p:nth-of-type(4n) 在siblings中选择every fourth <p> element

:only-child 独生子元素

:only-of-type p:only-of-type  特定类型的独生子

:optional 所有没有required属性的input,select,textarea

:read-only 只读元素<input type="text" readonly>

:read-write 可读可写

:required 带有这个元素的..input select textarea

:root 表示document的根元素

:target <a href="#p1"> p:target{} 选择url中带#id那部分element

:valid 任何通过合格验证的input,form

```

- Pseudo-elements 创建伪元素
```
::after 在选择的element的最后创造一个inline伪元素,用content来指定内容
        a::after {
          content: "→";
        }

::before 和上者相反

::first-letter apply styles to块元素的第一行的第一个字母(前面不能有images or inline tables)

::first-line 

::selection 被用户选出的突出的部分
        可以应用的CSS只有以下：color,background-color,cursor,outline,text-decoration,text-shadow

```

##### 2.CSS values and units

- 数字
- 百分比
- 颜色
- 坐标位置
- 函数

(1).数字
Length and size:
```
mm,cm,in
pt,pc
ex,ch x的高,0的宽(支持不好)
em
rem
vw,vh 1/100视口宽高
```

Unitless values无单位数字
```
line-height：1.5 表示乘以的倍数
```

Number of animations
```
animation-iteration-count: 5
```

(2).百分比
width,height : parent element
margin,padding : parent's width

(3).颜色
Keywords　red
16进制值　#ff0000
RGB rgb(255,0,0)
Opacity 不透明度

(3).Functions
```
/* calculate the new position of an element after it has been rotated by 45 degress */
transform: rotate(45deg);
/* calculate the new position of an element after it has been moved across 50px and down 60px */
transform: translate(50px, 60px);
/* calculate the computed value of 90% of the current width minus 15px */
width: calc(90%-15px);
/* fetch an image from the network to be used as a background image */
background-image: url('myimage.png');

```

##### 3.Cascade and inheritance 层叠和继承

###### 3.1CSS优先级判断:

- Importance
- Specificity
- Source order

(1)!important 最高优先级
```
.better {
  border: none !important;
}
```

(2).specificity
>Universal selector (*), combinators (+, >, ~, ' ') and negation pseudo-class (:not) have no effect on specificity.

计算特异性总数:
ones 1 :tagname,伪元素(::xx)
tens 10:class,属性选择器([href=..]),伪类(:X)
hundreds 100:id
thousands 1000:style属性里的
```
h1  0001
#important   0100
h1 + p::first-letter   0003
li > a[href=*"en-US"] > .inline-warning 0022
#important div > div > a:hover, inside an element's style attribute 1113

```

(3).source order
如果前两个一样，那么后面的css覆盖前面的

###### 3.2 Inheritance

有些属性会被继承，有些不会。

控制继承的三个值
- inherit：继承父亲
- initial：浏览器默认|inherit
- unset：inherit | initial
```
body {
  color: green;
}
.inherit a { //绿
  color: inherit;
}
.initial a {//默认黑
  color: initial
}
.unset a {//继承 绿
  color: unset;
}
```

##### 4.The box model

###### 4.1一些属性:

(1)overflow:
auto：scroll  
hidden 
visible
 (2).background clip
背景由颜色和图片构成，默认extends to the outer edge of the border
,可以用background-clip来剪切
```
.default     { background-clip: border-box;  }
.padding-box { background-clip: padding-box; }
.content-box { background-clip: content-box; }
```
(3)outline

类似border,不过不会改变border的参数,不属于box model
显示在box的top
```
{ outline: 1px solid #000; }
```

###### 4.2 Types of CSS boxes

(1)类型由display控制

(2)block,inline,inline-block

inline:在一行，width,height设置无用，padding,margin只会影响周围的text，border有效果但是不会影响block元素

inline-block:能设置width,height,盒子不会被broken的inline元素，占位和inline一样，一行一行的，设置了width,height还是保持那个盒子

-------
### 二、Styling text

- Fundamental text and font styling
- Styling lists
- Styling links
- Web fonts

##### 1.Fundamental text and font styling
- 1.1 Font styles
- 1.2 Text layout styles

###### 1.1.Fonts

(1).color: 

(2).font-family 

web safe fonts: Arial,Courier New,Georgia,Times New Roman

generic fonts: serif, sans-serif, monospace, cursive,and fantasy.

font stacks, font的名字如果不止一个词，则要加引号
```
p {
  font-family: "Trebuchet MS", Verdana, sans-serif;
}
```

(3).font-size 

em,rem,px

(4).font style,weight,text transform, text decoration
```
font-style:斜体=>on or off
    normal 
    italic 斜体
    oblique 模拟的倾斜

font-weight: 字体粗细
    normal,bold:一般和粗体
    lighter,bolder:
    100-900

text-transform:转换字体
    none:避免任何转换
    uppercase,lowercase 
    capitalize 所有首字母大写
    full-width 

text-decoration 字体装扮划线(线的位置,样式，颜色)
    none 去除所有decoration
    underline 下划线
    overline 上划线
    line-through 删除线
```
(5). 阴影
```
text-shadow: 4px 4px 5px red;
(水平偏移，垂直偏移，模糊半径默认为0，颜色默认为black) 前两个可以为负数值
text-shadow: -1px -1px 1px #aaa,
             0px 4px 1px rgba(0,0,0,0.5),
             4px 4px 5px rgba(0,0,0,0.7),
             0px 0px 7px rgba(0,0,0,0.4);
```

###### 1.2.Text layout styles

(1).text-align
```
left: Left justifies the text.
right: Right justifies the text.
center: Centers the text.
justify:排版，使用不同的gaps使每一行text长度相同
```
(2).line-height
```
line-height: 1.5;/*倍数*/
line-height: 15px;
```
(3).letter-spacing & word-spacing
字母，单词间隔
```
p::first-line {
  letter-spacing: 2px;
  word-spacing: 4px;
}
```
(4).white-space 
```
**          New lines   Spaces and tabs Text wrapping**
normal      Collapse        Collapse    Wrap
nowrap      Collapse        Collapse    No wrap
pre         Preserve        Preserve    No wrap
pre-wrap    Preserve        Preserve    Wrap
pre-line    Preserve        Collapse    Wrap
```
##### 2.Styling lists

###### 三种lists
```
<ul><li></li></ul>
<ol><li></li></ol>
<dl>
<dt></dt>
  <dd></dd>
</dl>

都有其默认的样式:
ul,ol {
    margin:16px,0;
    padding-left:40px;
}
dl{
    margin:16px,0;
}
dd{
    padding-left:40px
}
p{
    margin:16px,0;
}
```
###### 2.1 Handling list spacing 解决默认空格问题

[text styling and spacing exampl](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists)

###### 2.2 List-specific styles 特别列表风格

用在ul,ol上的

list-style-type: 标号的种类

list-style-position: 位置，在list items里还是在外

list-style-image:用自定义图片代替
```
ol {
  list-style-type: upper-roman;
  list-style-position: inside;(整个list items会向右一点)
  list-style-image: url(star.svg); //限制较多，如控制位置大小,不好用
}
```
完整的自定义图片顶替标号，用background-image
```
ul {
  padding-left: 2rem;
  list-style-type: none;
}

ul li {
  padding-left: 2rem;
  background-image: url(star.svg);
  background-position: 0 0;
  background-size: 1.6rem 1.6rem;
  background-repeat: no-repeat;
}
```
缩写：
```
ul {
  list-style: square url(example.png) inside;
}
```

###### 2.3 Controlling list counting 控制计数

(1).start属性 
```
<ol start="4">
  <li>Toast pitta, leave to cool, then slice down the edge.</li>
  <li>Fry the halloumi in a shallow, non-stick pan, until browned on both sides.</li>
</ol>
```
(2).reversed 倒序 (可以为负数)
(3).value 自己设定数字
```
<ol>
  <li value="2">Toast pitta, leave to cool, then slice down the edge.</li>
  <li value="4">Fry the halloumi in a shallow, non-stick pan, until browned on both sides.</li>
</ol>
```

##### 3.Styling links

###### 5 Link states
(1).
- :link(unvisited)
- :visited :同一个href访问了都会变紫色
- :hover (鼠标划过)
- :focus (Tap)
- :active (点下的那一下)

(2).default styles
- Links are underlined.
- Unvisited links are blue.
- Visited links are purple.
- Hovering a link makes the mouse pointer change to a little hand icon.
- Focused links have an outline around them (Tap)
- active links are red; 
```
//注意这个outline,类似border
a {
  outline: none; 
  text-decoration: none;
}
```

(3).Including icons on links 加图标
```
a[href*="http"] {
  background: url('https://mdn.mozillademos.org/files/12982/external-link-52.png') no-repeat 100% 0; (x，y的位置相对于左边)
  background-size: 16px 16px;
  padding-right: 19px;
}
```
(4) Styling links as buttons
```
ul {
  padding: 0; //去除列表默认的Padding-left：40px
  width: 100%;
}

li {
  display: inline; //默认是block,分行排, 同时去掉前面的点
}

a {
  outline: none;
  text-decoration: none;
  display: inline-block;//默认为inline,设为可以自定义宽度的inline元素
  width: 19.5%; 
  margin-right: 0.625%;
  text-align: center;
  line-height: 3;
  color: black;
}

li:last-child a {
  margin-right:0; //最后一个不需要右边距
```


##### 4.Web fonts

```
@font-face {
  font-family: "myFont";
  src: url("myFont.ttf");
  font-weight: normal;
  font-style: normal;
}

html {
  font-family: "myFont", "Bitstream Vera Serif", serif;
}
```

-------
### 三、Styling boxes

- Box model recap
- Backgrounds
- Borders
- Styling tables
- Advanced box effects

#### 3.1 Box model recap

- Box properties
- Advanced box properties
- Box display types

##### 3.1.1 Box properties

(1) width,height 设置的content box的宽高
(2) box heights 不遵守百分比规则，总是随box content的高度，除非设定px,em 
(3) border 也忽略百分比
(4) margin有 margin崩塌

##### 3.1.2 Advanced box properties

(1). max-width,min-width等

应用：自适应居中
```
width: 70%;
max-width: 1280px;
min-width: 480px;
margin: 0 auto; <!-- 水平居中 --> 
<!-- 效果是开始占据整个一行，超过1280px后水平居中 -->
```
针对图片的宽度和布局
```
display: block;
margin: 0 auto;
max-width: 100%;
```

(2).使用border-box
##### 3.1.3 Box display types 

- block
- inline
- inline-block
- table
- flex
- grid

#### 3.2 Backgrounds

是一个元素的content,padding,border下的区域，不包括margin

##### 3.2.1 The basics: color, image, position, repeat

(1) Background color

- 默认背景颜色是透明而不是白色
-都应该设定背景颜色，因为有些背景图片
可能无法显示，这时候就需要一个背景颜色 to make it more readable

(2) Background image

默认repeat横向完了纵向
```
background-image: url(..)
```
(3) Background repeat

- no-repeat
- repeat-x
- repeat-y

(4) Background position

background-position: x y (坐标位置) 可以是px,rem,%,center..
```
background-position: 99% center;
```
##### 3.2.2 Background image: gradients(梯度)

流畅的颜色改变---像梯子一样

linear-gradient 一个方向向另一个方向
```
background-image: linear-gradient(to bottom, yellow, #dddd00 50%, orange);
// 或者用degree values, 0deg === top 90deg === right
```

##### 3.2.3 Background attachment

控制当content滚动的时候，背景如何动

值：
- scroll 随page视窗滚动而滚动，而不是随element
- fixed 不动，就在原来的位置
- local 随element,page滚动而滚动,就是跟随element

##### 3.2.3 Multiple backgrounds

背景从上而下叠加摆放
```
background: url(image.png) no-repeat 99% center,
            url(background-tile.png),
            linear-gradient(to bottom, yellow, #dddd00 50%, orange);
background-color: yellow;
```

##### 3.2.4 Background size (IE 9)
```
background-size: 16px 16px; (水平垂直方向)
```

#### 3.3 Borders
- border-top, border-right, border-bottom, border-left
- border-width, border-style, border-color
- border-color 
- border-style
    solid,dashed虚线,dotted
- border-radius
    20px(左上右下) 10px;()
    20px(左上) 10px 50px(右下);

#### 3.4 Styling tables //不要用这个布局

#### 3.5 Box shadows, blend modes and filters

(1)Box shadows

初
```
box-shadow: 5px 5px 5px rgba(0,0,0,0.7);
水平移动 垂直移动 模糊半径 shadow颜色

```

inset:放在那四个值前，代表inner内部shadow
```
  box-shadow: 1px 1px 1px black,
              inset 2px 3px 5px rgba(0,0,0,0.3),
```

(2) Filters 

举例应用,二者对比,filter可以应用到box里面的内容，
box-shadow只能应用到box外面
```
.filter {
  -webkit-filter: drop-shadow(5px 5px 1px rgba(0,0,0,0.7));
  filter: drop-shadow(5px 5px 1px rgba(0,0,0,0.7));
}

.box-shadow {
  box-shadow: 5px 5px 1px rgba(0,0,0,0.7);
}
```

(3) Blend modes 混合

