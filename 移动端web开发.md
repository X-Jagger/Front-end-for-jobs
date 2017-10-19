###移动端综合所有问题解决
http://caibaojian.com/toutiao/6215  Web移动端布局
一、允许网页宽度自动调整
```
<meta name="viewport" content="width=device-width, initial-scale=1.0 minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
```
二、单位

rem

计算font-size： 媒体查询 或者 js计算 document.documentElement.clientWidth/375 *16

三、 flexbox布局

雪碧图：rem换算成px非常精确，如果雪碧图图标之间的距离过小，就可能导致图标过界，

因此图与图之间的间隙需要留相应大一点。

rem在Pc上兼容性可能不是很好

flex应该用兼容写法