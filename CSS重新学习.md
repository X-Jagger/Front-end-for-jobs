## 跟着MDN开始重新过一遍CSS

### Introduction to CSS

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

:scope

:target

:valid

```
- Pseudo-elements

- Combinators

- Multiple selectors