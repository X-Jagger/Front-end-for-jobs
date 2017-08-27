### 第二章：词法结构

1.HTML不区分大小写，XHTML,JS区分大小写

2.Unicode转义蓄力可以用在JS中，\u00e9

3.标识符以字母，_,$这三个开始，也可以以非英语语言或数学符号作为标识符

4.保留字：debugger,delete

5.自动填充分号,return,break,continue换行会自动添加分好
```
return
true;
//相当于
return;true;
```

###  第二章：类型、值和变量

1.数据类型：

原始类型：数字、字符串、布尔值

对象类型：object(array,function)

特殊：null undefined

类：Array,Function,Date,RegExp,Error

2.数字中:JS不支持八进制，浏览器支持，0o123 // 87

3.数字
(1)Math
```
Math.max(x,y,z)//返回最大值
Math.random() // [0,1)
Math.sqrt(3) //3的平方根
Math.pow(2,52) // 2的52次幂
Math.sin/cos/
Math.log(10) // 10自然对数

Infinity : isFinite()
NaN : isNaN()

+0 === -0 //true
+Infinity == -Infinity //false
```
(2)二进制浮点数和四舍五入错误

```
0.1 + 0.2
//0.30000000000000004
```
(3)日期和时间
```
var time = new Date();//Wed Aug 23 2017 22:35:46 GMT+0800

time.getFullYear() //2017
time.getMonth() //7(从0开始算)
time.getDate() //23 天数
time.getDay() //3 星期几
time.getHours() // 22

time.toDateString() //"Wed Aug 23 2017"
time.toLocaleDateString() //"2017/8/23"
time.toLocaleTimeString() //"下午10:35:46"
```
2.文本

(1)."dasdas\
dsadas"是一行

"dsdsadas\ndsadsad"是两行

(2).字符串使用

字符串本身是不变的，返回新的
```
var s ="hello,world"
s.indexOf('1',3)
s.charAt(0) // 'h'
s.substring(-1)//"hello,world" 负数变为0，start>stop，就交换
s.slice(-1) // 'd' 
s.substr(-1) // 'd'
s.indexOf('l')
s.lastIndexOf('l')//10:最后出现的位置
s.indexOf('1',3)//3 位置3及之后首次出现l的位置
s.split(',')
s.replace('l','L') //str.replace(regexp|substr, newSubstr|function)
//只会替换第一个匹配的

s.toLowerCase()
s.toUpperCase()

//字符串可以当作只读数组

s[0] // 'h'
```
(3)模式匹配
var test = "testing: 1,2,3";
var pattern = /\d+/g
pattern.test(test) //true
text.search(pattern) //9,首次匹配成功的位置
text.match(pattern)['1','2','3'] //匹配组成的数组
text.replace(pattern,'#') // 'testing: #,#,#'
text.split(/\D+/) ['','1','2','3'] 非数字字符截取字符串
(4).null  undefined
```
typeof undefined // ''undefined
typeof null // 'object'
```
(5).包装对象

存取字符串、数字、布尔值的属性时创建的临时对象称为包装对象，只读，并不能定义新属性
```
var s = 'test'
s.len = 4
var t = s.len //undefined

s.hasOwnProperty('len') //false
注意这些，临时对象销毁了
```
(6).不可变的原始值和可变的对象引用

原始值：number,string,null,undefined,boolean这些无法改变，任何修改只会返回一个新的原始值

数组和对象：赋值给一个变量都是赋值的引用值，它们本身并没有复制一次

#### 复制/克隆
数组复制：
```
浅克隆数组：
(1).concat/slice函数对数组进行浅克隆
(2).ES6 y=[...x]
var x = [1,2,{a:1,b:{c:1}}];
y = x.slice()  // [1,2]

x == y // false
x[2] == y[2] //true
注意，对象都是引用值的复制，二者指向同一个（浅层复制）

深克隆数组：

y = deepClone(x)


```
对象复制/克隆
```
浅复制
var x = {a:1,b:{c:2}}
var y = {...x} 
或者 y = Object.assign({},x)
x == y ,// false
x.b == y.b //true

深复制:
(1)遍历对象,递归
这个函数数组、对象都可以深复制
function deepClone(old, new) {
	new = new || (old.constructor === Array ? [] : {});
	for (var i in old) {
		if (typeof old[i] === 'object') {
			new[i] = (old[i].constructor === Array) ? [] : {};
			deepClone(old[i], new[i])
		} else {
			new[i] = old[i]
		}
	}
	return new;
}
y = deepClone(x)


```
(7).类型转换:对照看YDKJS

1).String()和toString()大部分结果一样
但是null,undefined没有toString()方法，会抛出错误

控制数字的表示
```
var n = 12.34
n.toFixed(3) // 12.340 (小数位数)
n.toExponential(2) // .23e+1
n.toPrecision(3) // 12.3 (全数字位数)
```

2).进制转换
(number).toString(x),x为几进制，number为十进制，转化为其他进制

parseInt('number',x),x为几进制,number为任意进制,转化为十进制
注意,parseInt()尽可能转换
parsefloat()不能转化，表现浮点数
```
String(null) //'null'
null.toString() //error

(100).toString(8) //

parseInt('ff',16) //255
parseInt("3 nlis") //3
parseInt("$3 nlis") //NaN

parseInt('0.7') // 0
parseFloat('0xFF',16) // 0
```
3).对象转化为原始值
new Boolean(false) 是一个对象，会转换为true

每个对象都继承了两个转换方法，toString(),valueOf()
```
[1,2,3].toString() // => "1,2,3"
(function(x) { f(x); }).toString() // => "function(x) {\n f(x);\n}"
/\d+/g.toString() // => "/\\d+/g"
new Date(2010,0,1).toString() // => "Fri Jan 01 2010 00:00:00 GMT-0800 (PST)"
```
valueOf()很多时候简单地返回对象本身

"+" 和 "==" ">"的情况
对非日期对象来说，对象到原始值的转换基本上是对象到数字的转换，首先调用valueOf()
"-"直接转换为数字

(8).变量作用域
1).
函数作用域和变量声明

let const 并没有变量提升

JS中只是函数作用域，函数内（运行了的）声明的所有变量在函数体内始终是可见的（变量提升） 

2).
作为属性的变量：
当声明一个JS全局变量，实际上是定义全局对象的一个属性
用var声明一个变量时，这个对象是不可配置的,
```
var truevar = 1; // A properly declared global variable, nondeletable.
fakevar = 2; // Creates a deletable property of the global object.
this.fakevar2 = 3; // This does the same thing.
delete truevar // => false: variable not deleted
delete fakevar // => true: variable deleted
delete this.fakevar2 // => true: variable deleted
```
3).作用域链


### 第四章 表达式(expression)和运算符

expression通常会计算出一个结果有一个value
4.1 运算符概述
， 忽略前面的操作数，范围最后的操作数
```
x = 1,2,3  //3
```

顺序：
++ -- -/+/~/! delete typeof instanceof in == && || ?: = ,

一元操作符、赋值、三元条件运算符 都是从右向左结合

运算顺序都是从左到右
特别注意：
```
a = 1
b = (a++) +a  // 3  (a++)结束后，计算后一个a时,根据++,a变成2了
b = ++a +a // 4 ++a为2,a也变成2了
```
4.2算数表达式
% 符号一致
```
-5%2 // -1
```
(1).+运算符

如果一个操作数为对象,调用valueOf()，如果没有就再调用toString(),转换完后如果其中一个是字符串，则字符串连接，如果两个都是数字，就加法操作
```
1+{} //'1[object Object]'
2 + undefined //NaN
undefined转换为数字为NaN

```
(2).位运算符

& | ^ ~ << >>

要求操作数是整数，必要时会忽略小数部分，并且会将NaN,Infinity转换为0

~按位非，相当于改变符号并减1, ~10 // -11

<< 
左移1位相当于*2

>> 除2（忽略正余数）
7>>1=3,-7>>1=-4
>>>无符号位右移1位

(3).比较运算符

>=  只是 简单的>

与NaN的比较都是false
```
var a = {}
var b = {}
a>=b //true
```
(4) in 运算符

str in obj,判断属性而不是值

```
var point = { x:1, y:1 }; // Define an object
"x" in point // => true: object has property named "x"
"z" in point // => false: object has no "z" property.
"toString" in point // => true: object inherits toString method

var data = [7,8,9]; // An array with elements 0, 1, and 2
"0" in data // => true: array has an element "0"
1 in data //true
7 in data // false
```

(5).eval()

直接调用eval(),它总是在调用它的上下文作用域内执行

间接调用eval()，则使用全局对象作为其上下文作用域，无法读写定义局部变量和函数

ES5严格模式下，可以查询更改局部变量，不能定义新的变量或函数
```
anged';"); // Direct eval sets local variable
	return x; // Return changed local variable
}

function g() { // This function does a global eval
	var y = "local"; // A local variable
	geval("y += 'changed';"); // Indirect eval sets global variable
	return y; // Return unchanged local variable
}
console.log(f(), x); // Local variable changed: prints "localchanged global":
console.log(g(), y); // Global variable changed: prints "local globalchanged":
```
(6).typeof
返回值为字符串
```
typeof function.... //'function'
typeof null //'object'
null instanceof Object //false
对象和数组  // 'object'
```
(7).delete 用来删除对象属性或数组元素

返回 false  true

删除不存在的属性,true

不能删除var function定义的
```
x = [1,2];
delete x[0] //true
x.length //2 由undefined填充
delete x[0] //true

```

### 第5章 语句
5.1 循环
(1)
for/ in 迭代所有对象的可枚举的属性（包括prototype上的） 小心点

结果的顺序不一定正确

for(variable in object) statement

variable可以被用来赋值
```
var o = {a:1,b:2};
var a = [],i = 0;
for(a[i++] in 0) //empty
a // ['a','b']
```

```

```
(2)
for..of.. 可以迭代出有[Symbol.iterator]这个属性的对象的所有值 ，object不行，Array,String,Map,SetObject.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}都可以
```
let iterable = 'boo';

for (let value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"

for(i of x){console.log(i)} //typeerror
```

Difference between for...of and for...in
上面两个的对比：
```
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```
5.3.跳转

break return continue throw 

(1)标签

(2).break（不可以跳出函数体）

(3)throw

throw expression :

throw new Error('aaaaaaaaa')

(4)try/catch/finally

(5).with(object) 添加作用域链 debugger(增加断点) 都不推荐使用

(6)严格模式

1).禁止使用with

2).所有变量都要先声明

3).调用的函数中的一个this值是undefined,非严格模式中,this指向全局对象
(可以用来判断是否支持严格模式)

### 第六章 对象

对象的属性名可以包含空字符串 {'':1} is right 

值可以是getter 或 setter函数（或两者都有）

属性特性: 可写 可枚举  可配置

对象特性：原型 类(class) 扩展标记(extensible flag)

6.1创建对象

6.1.1 对象直接量
```
var x = {'for':1} //for是保留字，必须有引号
```
最后一个属性后的逗号将忽略，但在IE中会报错

6.1.2 ES5 ：Object.create()

创建一个新对象，第一个参数是这个对象的原型

var o = Objeect.create(null) // 0 不继承任何属性和方法
```
兼容性继承函数，原型继承创建一个新对象
function inherit(p) {
	if (p == null) throw TypeError(); // p must be a non-null object
	if (Object.create) // If Object.create() is defined...
		return Object.create(p); // then just use it.
	var t = typeof p; // Otherwise do some more type checking
	if (t !== "object" && t !== "function") throw TypeError();

	function f() {}; // Define a dummy constructor function.
	f.prototype = p; // Set its prototype property to p.
	return new f(); // Use f() to create an "heir" of p.
}
```
6.2属性的查询和设置

6.2.1属性访问错误

给对象o设置属性p会失败
- O中属性p是只读的，（defineProperty()可以对可配置的只读属性重新赋值）
- o的p是继承的，且p是只读的,不能覆盖
- o没有自由属性p,没有setter方法继承属性p，且可扩展性是false

6.3删除属性

delete不能删除继承属性,delete只是断开属性和宿主对象的联系，而不会去操作属性中的属性
```
a = {p:{x:1}}
b = a.p 
delete a.p
b.x 依旧是1
```
delete不能删除可配置性为false的属性,比如变量声明和函数声明创建的全局对象的属性
```
var x = 1
delete this.x //false
function foo(){}
delete foo //false

严格模式下必须显式指定对象及其属性:
"use strict"
delete x //error
delete this.x //right
```

6.4 检测属性
for str in Object //继承和自有属性 
Obj.hasOwnProperty()
Obj.propertyIsEnumerable() //上面的增强版，自由属性且enumerable attribute 为true时才返回true
```
var o = { x: 1 , b : undefined}
"x" in o; // true: o has an own property "x"
"y" in o; // false: o doesn't have a property "y"
"toString" in o; // true: 
'b' in o // true
```
6.5枚举属性

fro .. in ..
```
for (p in o) {
	if (!o.hasOwnProperty(p)) continue; // Skip inherited properties
}
for (p in o) {
	if (typeof o[p] === "function") continue; // Skip methods
}
```
ES5

Object.keys(o) //返回一个数组，由对象中可枚举的自有属性名称组成

Object.getOwnPropertyNames(0) //返回所有自有属性的名称的数组

6.6属性getter和setter

对象属性值可以用一个或两个方法替代，getter 和 setter ，这称为存取器属性（对比一般的数据属性），总的就有读/写属性

对象直接量定义：
```
var p = {
	// x and y are regular read-write data properties.
	x: 1.0,
	y: 1.0,
	// r is a read-write accessor property with getter and setter.
	// Don't forget to put a comma after accessor methods.
	get r() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	set r(newvalue) {
		var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y);
		var ratio = newvalue / oldvalue;
		this.x *= ratio;
		this.y *= ratio;
	}, // theta is a read-only accessor property with getter only.
	get theta() {
		return Math.atan2(this.y, this.x);
	}
};

读取：p.r
写： p.r = newvalue;


```

6.7属性的特性

数据属性4个特性:value,writable,enumerable,configurable

存取器属性：读(get),写入(set),可枚举性,可配置性

属性描述符property descriptor对象用来代表那四个特性

Object.getOwnPropertyDescriptor() 可以获取某个对象特定属性的s属性描述符

继承属性或不存在的属性 返回undefined
```
// Returns {value: 1, writable:true, enumerable:true, configurable:true}
Object.getOwnPropertyDescriptor({x:1}, "x");
```
设置属性特性： Object.defineProperty()  Object.defineProperties()
```
ar o = {}; // Start with no properties at all
// Add a nonenumerable data property x with value 1.
Object.defineProperty(o, "x", {
	value: 1,
	writable: true,
	enumerable: false,
	configurable: true
});
// Check that the property is there but is nonenumerable
o.x; // => 1
Object.keys(o) // => []
	// Now modify the property x so that it is read-only
Object.defineProperty(o, "x", {
	writable: false
});
// Try to change the value of the property
o.x = 2; // Fails silently or throws TypeError in strict mode
o.x // => 1
	// The property is still configurable, so we can change its value like this:
Object.defineProperty(o, "x", {
	value: 2
});
o.x // => 2
	// Now change x from a data property to an accessor property
Object.defineProperty(o, "x", {
	get: function() {
		return 0;
	}
});
o.x // => 0
```
扩展版extend函数：复制属性的特性

给Object.prototype添加一个不可枚举的extend()方法

将作为参数传入的对象的属性一一复制 

复制属性的所有特性，参数对象的所有自有对象，包括不可枚举的属性也一一复制

```
Object.defineProperty(Object.prototype,
	"extend", // Define Object.prototype.extend
	{
		writable: true,
		enumerable: false, // Make it nonenumerable
		configurable: true,
		value: function(o) { // Its value is this function
			// Get all own props, even nonenumerable ones
			var names = Object.getOwnPropertyNames(o);
			// Loop through them
			for (var i = 0; i < names.length; i++) {
				// Skip props already in this object
				if (names[i] in this) continue;
				// Get property description from o
				var desc = Object.getOwnPropertyDescriptor(o, names[i]);
				// Use it to create property on this
				Object.defineProperty(this, names[i], desc);
			}
		}
	});
```
6.8对象的三个属性

6.8.1 原型属性

Object.getProtypeOf() //查询原型
Object.create(proto, [ propertiesObject ])
new Constructor()

constructor.prototype才是对面直接量的真正的原型

要检测一个对象是否是另一个对象的原型，用isPrototypeOf()
,其功能和nstanceof非常类似

```
var p = {x:1}; // Define a prototype object.
var o = Object.create(p); // Create an object with that prototype.
p.isPrototypeOf(o) // => true: o inherits from p
Object.prototype.isPrototypeOf(o) // => true: p inherits from Object.prototype
```

6.8.2类属性
toString() 返回的 [object class] ，class表示对象的类型信息

不过很多toString()重写了,所以写一个函数
```
es5中不需要对null和undefined作特殊处理
function classof(o) {
    if(0 === null) return 'NUll';
    if(0 === undefined) return 'undefined';
    return Object.prototype.toString.call(0).slice(8,-1);
}

classof(1) //'Number'
classof(false) //'Boolean'
..自定义的 为'Object'
```

6.8.3可扩展性

表示是否可以给对象添加新属性，Object.esExtensible()检查是否可扩展

Object.preventExtensions(o) //不可扩展

Object.seal(o) //不可扩展，所有自有属性不可配置，已有的可写属性可以设置  Object.isSealed()检测是否封闭

Object.freeze(o) //更为严格的冻结，所有数据属性设置为只读，setter不受影响

三者都返回传入的对象

6.9序列化对象

是指将对象的状态转化为字符串，也可以将字符串还原为对象

JSON.stringify() ,JSON.parse(), 都用JSON作为数据交换格式

下面这个是深拷贝~

函数、RegExp、Error对象和Undefined值不能序列化和还原,只能序列化对象可枚举的自有属性

```
o = {x:1, y:{z:[false,null,""]}}; // Define a test object
s = JSON.stringify(o); // s is '{"x":1,"y":{"z":[false,null,""]}}'
p = JSON.parse(s); // p is a deep copy of o
```

6.10对象方法

6.10.1 toLocaleString()方法

可以对数字、日期、时间作本地换转换

### 第七章 数组

7.1 创建数组
```
var undefs = [,,] //两个元素,都是undefined
```
7.2数组元素的读和写

唯一特别之处在于，当使用小于2^32的非负整数作为属性名时数组会自动维护其length属性值。
```
x = [1];
x[1.2] = 2;
x[-1] = -1
x['haha'] = 'haha'
x.length ;// 1
用for..in..全部找出来
用for i=0; i< ..; i++ 只能找出来整数属性的值
```


7.3稀疏数组

(浏览器实现不同...)
不连续索引的数组
```
x1 = [,,,];
x2 = new Array(3);
0 in x1; //false
0 in x2; //false


```
7.4数组长度
```
a = [1,2,3,4,5]; // Start with a 5-element array.
a.length = 3; // a is now [1,2,3].
a.length = 0; // Delete all elements. a is [].
a.length = 5; // Length is 5, but no elements, like new Array(5)
```
7.5数组元素的添加和删除

unshift(),首部插入元素 shift()头部删除一个
pop()尾部删除一个

delete删除元素
```
a = [1,2,3];
delete a[1]; // a now has no element at index 1
1 in a // => false: no array index 1 is defined
a.length // => 3: delete does not affect array length
```
7.6数组遍历

len = arr.length //性能优化

for..in..会遍历继承来的属性以及非整数属性，所以使用应该小心,并且顺序不保证

如判断继承x.hasOwnProperty(i)..

判断非负整数：Math.floor(Math.abs(Number(i))) !== i
```
x = [0,1,null,undefined,,]

for (i = 0; i < 5; i++) {
	console.log(x[i])
}
//0,1,null,undefined,undefined,
for (i in x) {
	console.log(i, x[i])
}
//0,1,null,undefined
```

7.7数组方法

7.7.1 join()

将数组所有元素化为字符串拼接在一起，返回生成的字符串，不改变原数组

不放参数，则用,隔开
```
var a = [1, 2, 3]; // Create a new array with these three elements
a.join(); // => "1,2,3"
a.join(" "); // => "1 2 3"
a.join(""); // => "123"
var b = new Array(10); // An array of length 10 with no elements
b.join('-') // => '---------': a string of 9 hyphens
```
7.7.2 reverse()

直接更改原数组
```
var a = [1,2,3];
a.reverse().join() // => "3,2,1" and a is now [3,2,1]
```

7.8.3 sort()

原数组排序后，返回排序后的数组，会改变原数组

(1).不带参数时,以字母表顺序排序，若包含undefined,放尾部,大写字母排小写字母前面,看清楚不是按照数字大小排序的

```
    var a = [undefined,11,2,-10,'a','b','A','ab']
    a.sort() 
    //  [-10, 11, 2, "A", "a", "ab", "b", undefined]
```
(2).带参数

传入一个比较函数，第一个参数应该在前,则返回一个小于0的数..
```
a.sort(function(a,b){return a-b})//顺序排序
//[-10, 2, 11, "A", "a", "ab", "b", undefined]
```
7.8.4 concat()

创建并返回一个新数组，元素或数组里的接在后面,但数组里的数组依旧是数组

```
var a = [1,2,3,4,5]; 
a.concat(3,4,5) //[1, 2, 3, 4, 5, 3, 4, 5]
a.concat([3,4,5]) //[1, 2, 3, 4, 5, 3, 4, 5]
a.concat([3,4,[5,[6,7]]) //[1, 2, 3, 4, 5, 3, 4, 5,[6,7]]
```
7.8.5 slice(a,b)

创建并返回一个新数组,不改变原数组

a,b为负数就加上数组长度
```
var a = [1,2,3,4,5];
a.slice(3); // Returns [4,5]
a.slice(1,-1); // Returns [2,3,4]
a.slice(-3,-2); // Returns [3]
```
7.8.6 splice(a,b,c)

直接修改原数组
```
var a = [1,2,3,4,5,6,7,8];
a.splice(4); // Returns [5,6,7,8]; a is [1,2,3,4]
a.splice(1,2); // Returns [2,3]; a is [1,4]
a.splice(1,1); // Returns [4]; a is [1]

会直接插入数组之类的
var a = [1,2,3,4,5];
a.splice(2,0,'a','b'); // Returns []; a is [1,2,'a','b',3,4,5]
a.splice(2,2,[1,2],3); // Returns ['a','b']; a is [1,2,[1,2],3,3,4,5]
```
7.8.7 push() and pop()

push()尾部增加一个或多个元素,返回新的数组长度

pop() 删除数组最后一个元素，返回删除的值

```
x = []
x.push(1,2,[4,5]) //3
x.pop() // [4,5]
```
7.8.8 unshift() 和 shift()

类似上面,改为头部,注意多个参数的插入顺序
```
var a = []; // a:[]
a.unshift(1); // a:[1] Returns: 1
a.unshift(22); // a:[22,1] Returns: 2
a.shift(); // a:[1] Returns: 22
a.unshift(3,[4,5]); // a:[3,[4,5],1] Returns: 3
a.shift(); // a:[[4,5],1] Returns: 3
a.shift(); // a:[1] Returns: [4,5]
a.shift(); // a:[] Returns: 1
```
7.8.9 toString() toLocaleString()

和不带参数的join()一样

7.9 ES5 数组方法
都不会修改原数组，callback修改不算

遍历、映射、过滤、检测、简化、搜索

7.9.1 forEach()


从头到尾遍历数组,为每个元素调用指定的函数，第一个参数为该函数，若有第二个参数，则为this

function()里的三个参数分别是 value,i,arr
```
var data = [1,2,3,4,5]; 
var sum = 0;
data.forEach(function(value) { sum += value; }); // Add each value to sum
sum // => 15

// Now increment each array element
data.forEach(function(v, i, a) { a[i] = v + 1; });
data // => [2,3,4,5,6]
```
7.9.2 map()
并不会修改原数组

调用数组的每个元素传递给指定的函数,并返回一个新数组，它包含函数的返回值，

arr.map(function callback(currentValue, index, array) { 
    
}[, thisArg])


```

a = [1, 2, 3];
b = a.map(function(x) { return x*x; }); // b is [1, 4, 9]

var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt); //[1, 2, 3]

注意下面这个:
["1", "2", "3"].map(parseInt);// 但实际的结果是 [1, NaN, NaN]
map中的callback函数只需要接受一个参数,但是并不意味着map只给callback传了一个参数，
这里实际上传入了第二个参数作为parseInt()的第二个参数作为进制数

``` 

7.9.3 filter()

返回新数组
var new_array = arr.filter(callback[, thisArg])

callback
用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
返回true表示保留该元素（通过测试），false则不保留。

```
a = [5, 4, 3, 2, 1];
smallvalues = a.filter(function(x) { return x < 3 }); // [2, 1]
every
```

7.9.4 every() and some()

对数组的逻辑判定，返回true,false

every判断所有元素，只有都true,才返回true;

some()判断存在，只要一个存在就true:

```
a = [1,2,3,4,5];
a.every(function(x) { return x < 10; }) // => true: 
a.every(function(x) { return x % 2 === 0; }) // => false: 

a = [1,2,3,4,5];
a.some(function(x) { return x%2===0; }) // => true a has some even numbers.
a.some(isNaN) // => false
```
7.9.5 reduce()和reduceRight()

用指定的函数将数组元素进行组合，生成单个值

arr.reduce(callback[, initialValue])

callback中(accumulator,value,index,arr) 第一个参数为每一轮累积的结果，最后结果return 一个单值

reduceRight()从右边开始处理数组
```
var a = [1, 2, 3, 4, 5]
var sum = a.reduce(function(x, y) {
	return x + y
}, 0); // Sum of values
var product = a.reduce(function(x, y) {
	return x * y
}, 1); // Product of values
var max = a.reduce(function(x, y) {
	return (x > y) ? x : y;
}); // Largest value

var a = [2, 3, 4]
	// Compute 2^(3^4). Exponentiation has right-to-left precedence
var big = a.reduceRight(function(accumulator, value) {
	return Math.pow(value, accumulator);
});

特别用法算并集 
var objects = [{x:1,a:1}, {y:2,a:2}, {z:3,a:3}];
var leftunion = objects.reduce(union); // {x:1, y:2, z:3, a:1}
var rightunion = objects.reduceRight(union); // {x:1, y:2, z:3, a:3}

```
7.9.6 indexOf() lastIndexOf()

找到第一个具有给定值的元素，返回索引，没找到返回-1.

第二个参数是可选的，指定从哪里开始搜索，lastIndexOf()倒着搜索的

```
a = [0,1,2,1,0];
a.indexOf(1) // => 1
a.lastIndexOf(1) // => 3
a.indexOf(3) // => -1

字符串也有这两个方法
```
7.10 数组类型

判断数组

Array.isArray()

x.constructor === Array  //true

不那么可靠的 [] instanceof Array

ES3兼容性:

```
var isArray = Array.isArray || function(0){
    return typeof 0 === 'object' &&
    object.prototype.toString.call(0) === '[object Array]';
}


不那么稳定..
```
7.11 类数组对象

2^32=>length>=0,且length为整数，非负数整数属性,typeof结果是'object'

判断类数组：
```
function isArrayLike(o) {
	if (o && // o is not null, undefined, etc.
		typeof o === "object" && // o is an object
		isFinite(o.length) && // o.length is a finite number
		o.length >= 0 && // o.length is non-negative
		o.length === Math.floor(o.length) && // o.length is an integer
		o.length < 4294967296) // o.length < 2^32
		return true; // Then o is array-like
	else
		return false; // Otherwise it is not
}
```
使用数组的方法：
```
var a = {"0":"a", "1":"b", "2":"c", length:3}; // An array-like object
Array.prototype.join.call(a, "+") // => "a+b+c"
Array.prototype.slice.call(a, 0) // => ["a","b","c"]: true array copy
Array.prototype.map.call(a, function(x) {
return x.toUpperCase();
}) // => ["A","B","C"]:
```

7.12 作为数组的字符串

字符串行为类似于只读的数组
```
s = "JavaScript"
Array.prototype.join.call(s, " ") // => "J a v a S c r i p t"
Array.prototype.filter.call(s, // Filter the characters of the string
		function(x) {
			return x.match(/[^aeiou]/); // Only match nonvowels
		}).join("") // => "JvScrpt
```

### 第八章 函数

8.2函数调用

8.2.1 函数里的函数里的this 指向window 或 undefined(strict)

```
var o = { // An object o.
	m: function() { 
		var self = this; // Save the this value in a variable.
		console.log(this === o); // Prints "true"
		
		f(); // Now call the helper function f().
		function f() { // A nested function f
			console.log(this === o); // "false": this is global or undefined
		}
	}
};
```

8.2.2 构造函数调用

var o = new Foo() 

创建一个新对象，

这个对象的prototype就是构造函数的prototype，

this指向这个对象,

运行构造函数,如果没有return ,则return这个新对象,如果有return newO,则返回newO

注意Foo这个构造函数有return 返回一个对象，那么最后o的值就是这个对象。

8.3.1可选形参，放最后
```
function getPropertyNames(o, /* optional */ a) {
	if (a === undefined) a = []; // If undefined, use a new array
	for (var property in o) a.push(property);
	return a;
}
// This function can be invoked with 1 or 2 arguments:
var a = getPropertyNames(o); // Get o's properties into a new array
getPropertyNames(p, a); 
```
8.3.2 实参对象

arguments,

尽量不用下面两个，严格模式下都是错的
caller,指代调用当前正在执行的函数的函数

callee  指代当前正在执行的函数

匿名函数中通过callee来递归地调用自身
```
var factorial = function(x) {
    if (x < 1) return 1;
    return x * arguments.callee(x-1);
}
```
8.3.3 将对象属性用作实参

传入对象，用对象属性来作为参数，不用记参数的顺序

8.3.4 实参类型

传入实参后进行类型检查 
```
function sum(a) {
	if (isArrayLike(a)) {
		var total = 0;
		for (var i = 0; i < a.length; i++) { // Loop though all elements
			var element = a[i];
			if (element == null) continue; // Skip null and undefined
			if (isFinite(element)) total += element;
			else throw new Error("sum(): elements must be finite numbers");
		}
		return total;
	} else throw new Error("sum(): argument must be array-like");
}
```
8.4作为值的函数

自定义函数的属性，用来保存一些跟着函数变的值

```
function factorial(n) {
	if (isFinite(n) && n > 0 && n == Math.round(n)) { // Finite, positive ints only
		if (!(n in factorial)) // If no cached result
			factorial[n] = n * factorial(n - 1); // Compute and cache it
		return factorial[n]; // Return the cached result
	} else return NaN; // If input was bad
}
factorial[1] = 1; 
```
8.5 作为命名空间的函数

```
var extend = (function(){
    if(){return }
    else return ...
}())
```
8.6闭包

如果将一个局部变量看作是自定义实现的对象的属性的话，

作用域链：每一段JS代码都有一个与之关联的作用域链，它是一个对象列表或链表，这组对象定义了这段代码‘作用域中’的变量，当JS需要查找变量X时，会从链中的第一个对象开始寻找...

作用域链上有两个对象，一个全局对象，一个是定义函数参数和局部变量的对象，嵌套中定义一个函数时，实际上保存了一个作用域链，当调用这个函数时，创建一个新的对象来存储它的局部变量，并把这个新对象添加到刚保存的作用域链上，这个链就更长了


在JS中函数的执行依赖于变量作用域,这个作用域是在函数定义时决定的，为了实现这种词法作用域，函数对象的内部状态不仅包括了代码逻辑，还包括了引用当前的作用域链。

闭包：函数对象可以通过作用域链关联起来，函数体内的变量可都可以保存在函数作用域链内，链下端的可以访问链上方的变量~ 这个就叫闭包

setTimeout..

共享私有状态

8.7 函数属性、方法和构造函数

8.7.1 length 属性

arguments.length表示传入函数的实参的个数

arguments.callee.length :函数的length属性是只读属性,表示定义时的参数个数

8.7.3 call()方法和apply()方法

对象调用不属于它的函数

call(obj,1,2..)  apply(obj,[1,2])

类数组也可以传入apply ，如arguments

```
fun.apply(thisArg, [argsArray]) 
function.call(thisArg, arg1, arg2, …) 
fun.bind(thisArg[, arg1[, arg2[, …]]])

call与apply的区别在于,传递参数的方式 
bind与他们的区别是,bind是返回这个函数的copy，而call与apply是直接执行
```

8.7.4 bind ()方法

将函数绑定给某个对象，返回一个新的函数,并且传入bind()的实参也会绑定到this，称为柯里化

```
function f(y) { return this.x + y; } 
var o = { x : 1 }; // An object we'll bind to
var g = f.bind(o); // Calling g(x) invokes o.f(x)
g(2) // => 3
```

实参也会绑定到this，称为柯里化
```
var sum = function(x, y) {
	return x + y
};

var succ = sum.bind(null, 1);
succ(2) // => 3: x is bound to 1, and we pass 2 for the y argument

function f(y, z) {
	return this.x + y + z
}; // Another function that adds
var g = f.bind({
	x: 1
}, 2); // Bind this and y
g(3) // => 6: this.x is bound to 1, y is bound to 2 and z is 3
```

如何模拟实现标准的bind()方法? 柯里化+绑定this

注意，用bind()返回的函数并不包含prototype属性,并且可以用作构造函数,用作构造函数时,传入的this无效
```
if (!Function.prototype.bind) {
	Function.prototype.bind = function (o /*,args*/) {
		var self = this, boundArgs = arguments;
		return function () {
			var args = [],i;
			for(i = 0; i < boundArgs.length; i++) {
				args.push(boundArgs[i])
			}
			for (i = 0; i < arguments.length; i++) {
				args.push(arguments[i])
			}
			return self.apply(o,args);
		}
	}
}
```
8.7.6Function 构造函数


```
var f = new Function('x','y','return x*y');
var f = function (x,y) {return x*y}
```

注意一点:Function动态创建并编译函数，它并不是使用词法作用域，相反总是在全局作用域中执行

```
var scope = "global";

function constructFunction() {
	var scope = "local";
	return new Function("return scope"); // Does not capture the local scope!
}
// This line returns "global" because the function returned by the
// Function() constructor does not use the local scope.
constructFunction()(); // => "global"
```
判断函数：
```
function isFunction(x) {
    return Object.prototype.toString.call(x) === '[object Function]'
}
```

8.8函数式编程

8.8.1使用函数处理数组

用map和reduce计算平均数和标准差
```
var sum = function(x,y){return x+y}
var square = function(x) {return x*x}

var data = [1,1,3,5,5]

var mean = data.reduce(sum)/data.length;
var deviations = data.map(function(x){return x-mean})
var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1))
```

ES3实现map(),reduce()函数：
```
map(arr,function) ~:
//如果Array.prototype.map定义了的话，用这个方法

var map = Array.prototype.map 
	? function(a,f) {return a.map(f)}
	: function(a,f) {
		var results = [];
		for (var i = 0, len = a.length; i < len; i++) {
			if (i in a) results[i] = f.call(null,a[i],i,a);
		}
		return results;
	}

var reduce = Array.prototype.reduce 
	? function(a,f,initial) {
		if (arguments.length > 2) return a.reduce(f,initial);
		else return a.reduce(f);
	}
	: function(a,f,initial) {
		var i = 0, len =a.length, accumulator;
		if(arguments.length > 2) accumulator = initial;
		else {//找到数组中第一个已定义的索引
			if (len == 0) throw TypeError();
			while(i < len) {
				if (i in a) {
					accumulator = a[i++];
					breakl
				} else i++;
			}
			if (i == len) throw TypeError();
		}
		while (i < len) {
			if (i in a) {
				accumulator = f.call(undefined,accumulator,a[i],i,a);
			}
			i++;
		}
		return accumulator;
	}

```

8.8.2高阶函数

高阶函数就是操作函数的函数
```
function compose(f, g) {
	return function() {
		return f.call(this, g.apply(this, arguments));
	};
}
var square = function(x) {
	return x * x;
};
var sum = function(x, y) {
	return x + y;
};
var squareofsum = compose(square, sum);
squareofsum(2, 3) // => 25
```

8.8.3不完全函数

期待传入的参数按照自己的意愿排在特定的位置：
```
工具函数将类数组对象转化为真正的数组
并且应用slice来确定特定的arguments
function array(a, n) {
	return Array.prototype.slice.call(a, n || 0);
}

// The arguments to this function are passed on the left
function partialLeft(f /*, ...*/ ) {
	var args = arguments; // Save the outer arguments array
	return function() { // And return this function
		var a = array(args, 1); // Start with the outer args from 1 on.
		a = a.concat(array(arguments)); // Then add all the inner arguments.
		return f.apply(this, a); 
	};
}

// The arguments to this function are passed on the right
function partialRight(f /*, ...*/ ) {
	var args = arguments; // Save the outer arguments array
	return function() { // And return this function
		var a = array(arguments); // Start with the inner arguments.
		a = a.concat(array(args, 1)); // Then add the outer args from 1 on.
		return f.apply(this, a); // Then invoke f on that argument list.
	};
}
```

8.8.4 记忆

牺牲空间复杂度获取更优的时间复杂度

```
function memorize(f) {
	var cache = {}; //缓存结果
	return function() {
		var key = arguments.length + Array.prototype.join.call(arguments,',');
		if (key in cache) return cache[key];
		else return cache[key] = f.apply(this,arguments)
	}
}

//返回两个整数的最大公约数
//欧几里德算法
function gcd(a,b) {
	var t;
	if (a < b) t=b,b=a,a=t; //确保a>=b
	while (b != 0) t=b,b=a%b,a=t;
	return a;
}

var gcdmemo = memorize(gcd);
gcdmemo(85,187)  //17
```