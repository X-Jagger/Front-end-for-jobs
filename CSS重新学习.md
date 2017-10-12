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

- Pseudo-elements

- Combinators

- Multiple selectors