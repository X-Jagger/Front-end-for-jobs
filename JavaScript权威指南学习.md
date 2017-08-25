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