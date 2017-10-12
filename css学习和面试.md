### 一、Flex布局--弹性布局

任何一个容器都可以指定为 Flex 布局。
```
.box{
  display: flex;
}
```
行内元素也可以使用 Flex 布局。
```
.box{
  display: inline-flex;
}
```
Webkit 内核的浏览器，必须加上-webkit前缀。
```
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```
注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

二、基本概念
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
    
三、容器的属性
- flex-direction：主轴方向(row | row-reverse | column | column-reverse)
- flex-wrap：如何换行(nowrap | wrap | wrap-reverse)
- flex-flow:上面两个属性的合写(row nowrap,...)
- justify-content：主轴上的对齐方式(flex-start | flex-end | center | space-between | space-around)
- align-items：交叉轴如何对齐(flex-start | flex-end | center | baseline | stretch)
- align-content：多根轴线的对齐方式,只有一个轴线不起作用(flex-start | flex-end | center | space-between | space-around | stretch)

四、项目的属性

- order:排列顺序，值越小越靠前
- flex-grow:放大比例，默认为0，即使存在剩余空间也不放大
- flex-shrink：缩小比例，默认为1,空间不足，将缩小
- flex-basis：分配多余空前之前，项目所占的主轴空间,默认为auto
- flex: auto (1 1 auto) 和 none (0 0 auto) 上三个的缩写
- align-self：独自的对齐方式,继承父元素的align-items(auto | flex-start | flex-end | center | baseline | stretch;)

五： flex实现子元素垂直水平居中
父元素：
    display:center;
    justify-content:center;
    align-items:center;
    width:相对应的设置
    height:对应的设置
子元素：(如果想实现宽度自适应)
    flex-grow:1;
    flex-shrink:1;
    flex-basis:auto 
    其实就是flex:auto;

只有父元素定义flex，子元素定义margin:auto：

### 二、BFC & IFC

#### BFC Block Formatting Context块格式上下文

视觉格式化模型：处理文档并将它显示在视觉媒体上的机制，定义了盒的生成，包括行盒，块盒，匿名盒

三个定位方案

在定位的时候，浏览器就会根据元素的盒类型和上下文对这些元素进行定位，可以说盒就是定位的基本单位。定位时，有三种定位方案，分别是常规流，浮动已经绝对定位。

常规流(Normal flow)

- 在常规流中，盒一个接着一个排列;
- 在块级格式化上下文里面， 它们竖着排列；
- 在行内格式化上下文里面， 它们横着排列;
- 当position为static或relative，并且float为none时会触发常规流；
- 对于静态定位(static positioning)，position: static，盒的位置是常规流布局里的位置；
- 对于相对定位(relative positioning)，position: relative，盒偏移位置由这些属性定义top，bottom，leftandright。即使有偏移，仍然保留原有的位置，其它常规流不能占用这个位置。

浮动(Floats)

- 盒称为浮动盒(floating boxes)；
- 它位于当前行的开头或末尾；
- 这导致常规流环绕在它的周边，除非设置 clear 属性；

绝对定位(Absolute positioning)

绝对定位方案，盒从常规流中被移除，不影响常规流的布局；
- 它的定位相对于它的包含块，相关CSS属性：top，bottom，left及right；
- 如果元素的属性position为absolute或fixed，它是绝对定位元素；
- 对于position: absolute，元素定位将相对于最近的一个relative、fixed或absolute的父元素，如果没有则相对于body；
- 
块格式化上下文

到这里，已经对CSS的定位有一定的了解了，从上面的信息中也可以得知，块格式上下文是页面CSS 视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。

##### BFC的创建方法

- 根元素或其它包含它的元素；
- float属性不为none.
- position属性不为static和relative.
- display属性为下列之一:table-cell,table-caption,inline-block,flex,or inline-flex.
- overflow属性不为visible.

##### BFC的效果

就如刚才提到的，BFC的最显著的效果就是建立一个隔离的空间，断绝空间内外元素间相互的作用。然而，BFC还有更多的特性：

简单归纳一下：

- 内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）；
- 处于同一个BFC中的元素相互影响，可能会发生margin collapse；
- 每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；
- 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算；
- 浮动盒区域不叠加到BFC上；
这么多性质有点难以理解，但可以作如下推理来帮助理解：html的根元素就是<html>，而根元素会创建一个BFC，创建一个新的BFC时就相当于在这个元素内部创建一个新的<html>，子元素的定位就如同在一个新<html>页面中那样，而这个新旧html页面之间时不会相互影响的。

上述这个理解并不是最准确的理解，甚至是将因果倒置了（因为html是根元素，因此才会有BFC的特性，而不是BFC有html的特性），但这样的推理可以帮助理解BFC这个概念。

##### 应用

- 1.消除margin collapse
    只有当元素在同一个BFC中，垂直方向上的margin才会collapse
    因此可以再建立一个BFC去阻止
    
    折叠的结果：
    - 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
    - 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
    - 两个外边距一正一负时，折叠结果是两者的相加的和。
   
    以上的条件意味着下列的规则：
    - 创建了新的BFC的元素（例如浮动元素或者'overflow'值为'visible'以外的元素）与它的子元素的外边距不会折叠
    - 浮动元素不与任何元素的外边距产生折叠（包括其父元素和子元素）
    - 绝对定位元素不与任何元素的外边距产生折叠
    - inline-block元素不与任何元素的外边距产生折叠
    - 一个常规文档流元素的margin-bottom与它下一个常规文档流的兄弟元素的margin-top会产生折叠，除非它们之间存在间隙（clearance）。
    - 一个常规文档流元素的margin-top 与其第一个常规文档流的子元素的margin-top产生折叠，条件为父元素不包含 padding 和 border ，子元素不包含 clearance。
    - 一个 'height' 为 'auto' 并且 'min-height' 为 '0'的常规文档流元素的 margin-bottom 会与其最后一个常规文档流子元素的 margin-bottom 折叠，条件为父元素不包含 padding 和 border ，子元素的 margin-bottom 不与包含 clearance 的 margin-top 折叠。
    - 一个不包含border-top、border-bottom、padding-top、padding-bottom的常规文档流元素，并且其 'height' 为 0 或 'auto'， 'min-height' 为 '0'，其里面也不包含行盒(line box)，其自身的 margin-top 和 margin-bottom 会折叠。
    

- 2.利用BFC去容纳浮动元素
    单纯的一个容器里容纳浮动元素，容器是不会有高度的，因此容器看起来像是不存在的
    将容器变为一个BFC，就可以容纳浮动元素了
- 3.利用BFC阻止文本换行
    就是默认情况下文本都是环绕浮动元素的，但我们有时候想要的是图片单独浮动在左，文字独立在右，因此就可以用BFC把右边的文字单独包裹起来，这样就可以了







### 三、垂直水平居中

一. 文本的水平垂直居中

line-height + text-align:center  

二. 利用盒模型的水平垂直居中

- padding填充 
     padding: (@wrapWidth - @contentWidth) / 2
- margin填充 
    margin-left: auto;
    margin-right: auto; //前两个实现水平居中
    margin-top: (@wrapHeight - @contenHeight) / 2

三. absolute布局上下文下的水平垂直居中

- 50% + -50%
     left: 50% 将盒子置于父容器的重点，然后将盒子向左偏移盒子自身宽度的50%;
     ```
     1.{
      width: 200px;
      height: 100px;
      margin-left: -100px;
      margin-top: -50px;
    }

    2.{
      transform:translate3d(-50%, -50%, 0);
    }
    3.
     ```
- text-align:center + absolute
- absolute + margin : auto

六.IFC布局上下文下的水平垂直居中
IFC又是个什么概念呢，你可以看看官方文档，也可以简单的理解为 display为inline性质的行级元素的布局。

text-align:center + vertical-align:middle


### 四、CSS画圆画三角形等

### 五、轮播图

### 六、雪碧图

### 七、CSS的一些性能优化

### 八、三栏布局 (一些自适应实现/四栏均分布局/响应式布局/响应式布局的兼容性解决)

1.左右定宽中间

- (1) Position固定位置实现
```
position:absolute;left:0;right:0;width:200px 
margin 0 200px;

```
- (2).纯float实现，中间的div要放在HTML结构的最后/ 可以加BFC实现间隔或者不加 直接在中间Margin上实现间隔
```
.left{
  width: 200px;height:500px; float:left; background-color: red;
  margin-left:-200px;
}
.right{
  width: 200px;height:500px;float:right;background-color: blue;
  margin-right:-200px;
}
.mid{
  height:500px;margin:0 200px 0 200px;background-color: green;
}
```

- (3).float和BFC配合圣杯布局  不好用-。-
```
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .content {
        float: left;
        width: 100%;
        }
        .main {
        height: 200px;
        margin-left: 110px;
        margin-right: 220px;
        background-color: green;
        }
  .left {
      float: left;
      height: 200px;
      width: 100px;
      margin-left: -100%;
      background-color: red;
  }
  .right {
      width: 200px;
      height: 200px;
      float: right;
      margin-left: -200px;
      background-color: blue;
  } 
    </style>
</head>
<body>
    <div class="content">
        <div class="main"></div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
</body>
</html>
```
- (4).flex布局

外部容器display:flex,justify-content:space-between; 中间 width:100%
```
.left{
  width: 200px;height:500px;background-color: red;
}
.right{
  width: 200px;height:500px;background-color: blue;
}
.mid{
  width:100%;height:500px;margin: 0 10px ;background-color: green;
}
.main{
  display: flex;justify-content: space-around;
}
```


