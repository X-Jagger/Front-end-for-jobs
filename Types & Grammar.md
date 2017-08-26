## Types

null undefined boolean number string object symbol(es6)
除了object，都叫基本类型
```
用typeof来检测types：
typeof NaN === 'number //true
typeof Infinity === 'number' //true
typeof undefned ==='undefined'
typeof null === 'object' //true
typeof Symbol() === 'symbol' // true
typeof function a(){ /* .. */ } === "function"; // true
typeof [1,2,3] === "object"; // true
//未出现的变量
typeof a; // "undefined"
//检验null:
var a = null;
(!a && typeof a === 'object');// true
null === null //true
```

检查全局变量 ：

```
if (window.DEBUG) {
	// ..
}
//安全检测
(typeof x !== 'undefined') ? 
```
变量提升
```
if(false){var y}, 这种情况y也被声明了，undefined
```
## Values
### Array:

delete,删除后，剩下一个undefined，并不会改变长度
```
x = [1,2]  delete x[0] , x // [undefined,2]
```
数组的类对象表现与长度：
```
var a = [ ];

a[0] = 1;
//不算在长度里面
a["foobar"] = 2;
a.length;		// 1
而如果是字符数字，则看作数字
var a = [ ];
a["13"] = 42;
a.length; // 14

```
2.类数组（含有0:xx,1:xx..类似）转化为数组
```
###1
function foo() {
	var arr = Array.prototype.slice.call( arguments );
	arr.push( "bam" );
	console.log( arr );
}

foo( "bar", "baz" ); // ["bar","baz","bam"]

###2
var arr = Array.from( arguments );
```

### Strings
1.字符串和数组有些相似，concat,indexOf,.length等

但字符串是immutable，
```
x = 'aa' 
x[0] = 'o';
x// 'aa' 没变
```
字符串不可变的一个结果就是，任意对字符串的改变都会return a new string，

2.字符串可以借用数组的方法，join(),map
```
a = "foo"
var c = Array.prototype.join.call( a, "-" );
var d = Array.prototype.map.call( a, function(v){
	return v.toUpperCase() + ".";
} ).join( "" );
c//f-0-0
d//F.0.0
```
由于字符串的immutable特性，不能借用reverse()
```
//这样做：var c = a.split("").reverse().join("");
//复杂unicode 不适用
```
### Number
双浮点数保存

1.确定小数点后的数：toFiexed(x>=0)
```
var a = 42.59;

a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
```
确定实际位数：toPrecision(x>=1)
```
var a = 42.59;

a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
```
你可以直接用数字后接这些方法，不用用变量保存值再引用这些方法
```
0.21.toPrecision(1) // 0.2,
```
2.特例注意
```
// invalid syntax:
42.toFixed( 3 );	// SyntaxError

// these are all valid:
(42).toFixed( 3 );	// "42.000"
0.42.toFixed( 3 );	// "0.420"
42..toFixed( 3 );	// "42.000"
```

3.进制转换(尽量用小写,)
```
0xf3; // hexadecimal for: 243
0Xf3; // ditto

0363; // octal for: 243
//eS6
0o363;		// octal for: 243
0O363;		// ditto

0b11110011;	// binary for: 243
0B11110011; // ditto

var x=110;  
alert(x);  
alert(x.toString(8));  
alert(x.toString(32));  
alert(x.toString(16));  
//其他转十进制  
var x='110';  
alert(parseInt(x,2));  
alert(parseInt(x,8));  
alert(parseInt(x,16));  
//其他转其他  
//先用parseInt转成十进制再用toString转到目标进制  
alert(String.fromCharCode(parseInt(141,8)))  
alert(parseInt('ff',16).toString(2));   

```
4.小数值的不确定问题,用Number.EPSILON
```
0.1 + 0.2 === 0.3; // false
function numbersCloseEnoughToEqual(n1,n2) {
	return Math.abs( n1 - n2 ) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual( a, b );					// true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 );	// false
```
5.判断是否是整数
2 === 2.00 //true,被看作整数
Number.isInteger()
```
Number.isInteger( 42 );		// true
Number.isInteger( 42.000 );	// true
Number.isInteger( 42.3 );	// false
Number.isSafeInteger( Number.MAX_SAFE_INTEGER );	// true
Number.isSafeInteger( Math.pow( 2, 53 ) );			// false
Number.isSafeInteger( Math.pow( 2, 53 ) - 1 );		// true
```
6.Undefined 
undefined 可以作为标识符使用，也可以被修改，但不要这样使用
```
function foo() {
	undefined = 2; // really bad idea!
}

foo();
function foo() {
	"use strict";
	undefined = 2; // TypeError!
}

foo();
function foo() {
	"use strict";
	var undefined = 2;
	console.log( undefined ); // 2
}

foo();
```
void x(x任意都行)返回undefined

7.NaN
```
typeof NaN === 'number'
NaN === NaN // false
```
判断NaN:
(1): isNaN,判断一切非数字包括NaN
```
var a = 2 / "foo";
var b = "foo"
isNaN( a ); // true
isNaN( b ); // true
```
(2):Es6: Number.isNaN() 只判断NaN
```
var a = 2 / "foo";
var b = "foo";

Number.isNaN( a ); // true
Number.isNaN( b ); // false -- phew!
···
(3)将它和它自己比较
```
NaN === NaN //fasle 

8.Infinity
```
var a = 1 / 0;	// Infinity
var b = -1 / 0;	// -Infinity

Infinity/Infinity // NaN
-3/Infinity // -0
+3/Infinity // 0

```
9.0 & -0
作用仅仅是为了判断变化趋势是什么，负数到0还是正数到0

判断函数
```
function isNegZero(n) {
	n = Number( n );
	return (n === 0) && (1 / n === -Infinity);
}

isNegZero( -0 );		// true
isNegZero( 0 / -3 );	// true
isNegZero( 0 );			// false

+"-0";				// -0
Number( "-0" );		// -0
JSON.parse( "-0" );	// -0

var a = -0
a.toString();				// "0"
a + "";						// "0"
String( a );				// "0"

// strangely, even JSON gets in on the deception
JSON.stringify( a );		// "0"
```
10.超级相等
Object.is(a,b)
```
var a = 2 / "foo";
var b = -3 * 0;

Object.is( a, NaN );	// true
Object.is( b, -0 );		// true

Object.is( b, 0 );		// false
```
**11.Value vs. Reference**

基本类型：null, undefined, string, number, boolean, and ES6's symbol
传入value的复制值

对象（数组）传入pointer（引用指针）

注意下面的例子，foo(a)并没有真正的传入a，只是把a的引用指针复制给了x，也就是说a，x都是指向同样的数组
但当x重新赋值后，就不再指向a的那个数组了
```
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// later
	x = [4,5,6];
	x.push( 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [1,2,3,4]  not  [4,5,6,7]
```
如果不想影响a的指向，指向传入那个数组，可以用foo(a.slice())

想要改值，必须把值包装成对象里的属性
```
function foo(wrapper) {
	wrapper.a = 42;
}

var obj = {
	a: 2
};

foo( obj );

obj.a; // 42
```
### Natives
1.native constructors:

String()
Number()
Boolean()
Array()
Object()
Function()
RegExp()
Date()
Error()
Symbol()

注意下面的表现：
new+natives 出来的是打包的Object，有内部clsss，并且console.log(a)的结果分浏览器不同
```
var a = new String( "abc" );

typeof a; // "object" ... not "String"

a instanceof String; // true

Object.prototype.toString.call( a ); // "[object String]"
Object.prototype.toString.call( [1,2,3] );			// "[object Array]"
//特例：
Object.prototype.toString.call( null );			// "[object Null]"
Object.prototype.toString.call( undefined );	// "[object Undefined]"ji
//基本类型值 自动打包，用new Number()等 反而更慢
Object.prototype.toString.call( "abc" );	// "[object String]"
Object.prototype.toString.call( 42 );		// "[object Number]"
Object.prototype.toString.call( true );		// "[object Boolean]"

注意判断：
var a = new Boolean( false );

if (!a) {
	console.log( "Oops" ); // never runs
}
if('false'){console.log(12)} //12  会打印
```
1.native constructors:

String()
Number()
Boolean()
Array()
Object()
Function()
RegExp()
Date()
Error()
Symbol()

注意下面的表现：
new+natives 出来的是打包的Object，有内部clsss，并且console.log(a)的结果分浏览器不同
```
var a = new String( "abc" );

typeof a; // "object" ... not "String"

a instanceof String; // true

Object.prototype.toString.call( a ); // "[object String]"
Object.prototype.toString.call( [1,2,3] );			// "[object Array]"
//特例：
Object.prototype.toString.call( null );			// "[object Null]"
Object.prototype.toString.call( undefined );	// "[object Undefined]"ji
//基本类型值 自动打包boxing，用new Number()等 反而更慢
Object.prototype.toString.call( "abc" );	// "[object String]"
Object.prototype.toString.call( 42 );		// "[object Number]"
Object.prototype.toString.call( true );		// "[object Boolean]"

注意判断：
var a = new Boolean( false );

if (a) {
	console.log( "Oops" ); // runs
}
if (Boolean(false)) {
	console.log( "Oops" ); // never runs
}
if('false'){console.log(12)} //12  runs

//注意下面 
unboxing: .valueOf()
a.toString()// 'false' if中判断就是true
a.valueOf()// false  if中判断就是fasle
```
2.探究 [undefined] 和 [ undefined x 1 ]内空的关系
```
var a = new Array( 3 );
var b = [ undefined, undefined, undefined ];
var c = [];
c.length = 3;
//对chrome来说结果是下面这样：(不同的浏览器显示结果不同)
a// [ undefined x 3 ]
b// [ undefined, undefined, undefined ]
c// [ undefined x 3 ]
a与c是一样的
```
```
a.join( "-" ); // "--"
b.join( "-" ); // "--"

a.map(function(v,i){ return i; }); // [ undefined x 3 ]
b.map(function(v,i){ return i; }); // [ 0, 1, 2 ]
```
因为a中undefined就是不存在的,只是显示的"undefined"，因此map迭代不了，一定得避免使用空白slot

如果想要手动创造[undefined...]：
```
var a = Array.apply( null, { length: 3 } ); //第二个对象是类数组对象，每一个值都是undefiend,传了三个undefined参数进去
a; // [ undefined, undefined, undefined ]
```
3. Date() & Error()
Date(),结果是字符串的时间
new Date()是对象，
```
new Date()
//Mon Aug 07 2017 13:26:42 GMT+0800 (马来西亚半岛标准时间)
new Date().getTime(); Date.now()
//1502083738834 1970.1.1 毫秒级
```
4.Symbol

作用：values that can be used as properties on objects with little fear of any collision
前面不能加new

5.native prototype
```
String#substr(..), String#substring(..), and String#slice(..):
Function.prototype is a function, RegExp.prototype is a regular expression,

### Coverting Values
1.coertion的结果总是scalar  primitive values:


string,number,boolean

**1.ToString**

1.Abstract Value Operations
toString(): 如果对象有自定义的toString,则调用自定义的,
当Coercion
```
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;

// seven times three digits => 21 digits
a.toString(); // "1.07e21"
null.toString();// error
undefined.toString();// error
null + ''; 'null'
undefined + ''; 'undefiend'

var a = [1,2,3];
a.toString(); // "1,2,3"
var b = {a:1};
b.toString(); // "[object Object]"

```
2..JSON Stringification ：JSON.stringify()
功能和toString()有点像
```
JSON.stringify( "42" );	// ""42"" (a string with a quoted string value in it)
JSON.stringify( null );	// "null"
JSON.stringify( true );	// "true"

//会自动略过undefined,function and symbol  ：undefined
//无限引用的对象会报错
JSON.stringify( undefined );					// undefined
JSON.stringify( function(){} );					// undefined

JSON.stringify( [1,undefined,function(){},4] );	// "[1,null,null,4]"
JSON.stringify( { a:2, b:function(){} } );		// "{"a":2}"

如果一个对象有toJSON()方法，则先引用它
a.toJSON = functioin(){}...
```
toString(x,replacer)第二个参数可以是一个数组或函数,过滤结果的作用
```
var a = {
	b: 42,
	c: "42",
	d: [1,2,3]
};

JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"

JSON.stringify( a, function(k,v){
	if (k !== "c") return v;
} );
// "{"b":42,"d":[1,2,3]}"

```
toString(x,replacer,space)第三个参数，控制缩排，仅供参考
```
var a = {
	b: 42,
	c: "42",
	d: [1,2,3]
};

JSON.stringify( a, null, 3 );
// "{
//    "b": 42,
//    "c": "42",
//    "d": [
//       1,
//       2,
//       3
//    ]
// }"

JSON.stringify( a, null, "-----" );
// "{
// -----"b": 42,
// -----"c": "42",
// -----"d": [
// ----------1,
// ----------2,
// ----------3
// -----]
// }"
```
**2.ToNumber**
```
Number(undefined) //NaN
Number(true) //1
Number(false) //0
Number(null) //0
Number([]) //0
Number('') //0
Number({}) //

//与上面对比:
1+{} //"1[object Object]"
1+[] //'1'

//对象和数组转换时，会先找valueOf(),再找toString()

var a = {
	valueOf: function(){sn
		return "42";
	}
};

var b = {
	toString: function(){
		return "42";
	}
};

var c = [4,2];
c.toString = function(){
	return this.join( "" );	// "42"
};

Number( a );			// 42
Number( b );			// 42
Number( c );			// 42
Number( [ "abc" ] );	// NaN

[] + {}
```
**3.ToBoolean**

(1).falsy values 下面转换时为false
```
null

undefined

fasle

+0 -0 NaN

""
```
(2).Falsy Objects:
```
var a = new Boolean( false );
var b = new Number( 0 );
var c = new String( "" );

var d = Boolean( a && b && c );
d; // true
 唯一的对象转换boolean为false,判断是否是老版本IE
Boolean(document.all)//false
```
(3).Truthy Values
```
var a = "false";
var b = "0";
var c = "''";

var d = Boolean( a && b && c );

var a = [];				// empty array -- truthy or falsy?
var b = {};				// empty object -- truthy or falsy?
var c = function(){};	// empty function -- truthy or falsy?

var d = Boolean( a && b && c );
```
**4.Explicit Coercion**

(1).Strings <-> Numbers
```
Number()
String()
toString()
+

// equal to x = Date.now()//
//x = new Date().getTime()
x = +new Date()

```
(2). ~ & |
| 按位取或

~ 按位去反: 相当于-(x+1)
```
~42;	// -(42+1) ==> -43

//可以用来作为if()条件判断：判断x是否是-1
var a = "Hello World";

~a.indexOf( "lo" );			// -4   <-- truthy!
if (~a.indexOf( "lo" )) {	// true
	// found it!
}

~a.indexOf( "ol" );			// 0    <-- falsy!
!~a.indexOf( "ol" );		// true

if (!~a.indexOf( "ol" )) {	// true
	// not found!
}
```
~~ x和 x|0的特别作用：保留整数部分；对比Math
```
~~2.5 // 2
~~(-2.5) //-2
2.5 | 0 // 2
(-2.5) | 0 //-2

对比Math.floor,Math.round,Math.ceil的负数部分

//返回小于x的最大整数
Math.floor(-0.4)    // -1
Math.floor(-0.5)    // -1
//Math.round(x) = Math.floor(x+0.5)
Math.round(-0.4)    //-0
Math.round(-0.5)    //-0 
Math.round(-0.6)    //-1
//返回大于x的最小整数
Math.ceil(-0.4)     //-0
Math.ceil(-0.5)     //-0
```
(3).Parsing Numeric Strings解析包含数字的字符串
```
parseInt(x,y),x必须是字符串,如果不是字符串 ，则调用隐式转换ToString.
y为表示x是几进制，在pre-es5环境下，会考虑八进制,小心
parseInt('1231sdasd123') //1231
parseFloat('1.23xzxzdsa') //1.23

```
parseInt()第一个参数的隐式转换！
```
parseInt('Infinity',19) //18
parseInt( 0.000008 );		// 0   ("0" from "0.000008")
parseInt( 0.0000008 );		// 8   ("8" from "8e-7")
parseInt( false, 16 );		// 250 ("fa" from "false")
parseInt( parseInt, 16 );	// 15  ("f" from "function..")

parseInt( "0x10" );			// 16
parseInt( "103", 2 );		// 2
```
4.Explicitly * --> Boolean

(1)用Boolean(x)去显式转换~  see above
(2) 用!! 效果和Boolean(x)一样

**5.Implicit Coercion**

1.Implicitly: Strings <--> Numbers

(1). ➕ 

加号两边有string，则转化为string结合

否则为数字加,(ToNumber) 先valueOd()，后toString()
```
var a = 42;
var b = a + "";

b; // "42"

//先valueOd()失败，后toString()

var a = [1,2];
var b = [3,4];

a + b; // "1,23,4"

```
对象➕
```
var a = {
	valueOf: function() { return 42; },
	toString: function() { return 4; }
};

a + "";			// "42" //先调用valueOf(),若没有,再调用toString()

String( a );	// "4"直接调用toString()
```
(2).string -->number ➖0/*/1\1
```
var a = "3.14";
var b = a - 0;

b; // 3.14

var a = [3];
var b = [1];

a - b; // 2
```

2.Implicitly: Booleans --> Numbers

用作多重判断时,如只有一个为真  
```
function onlyOne() {
	var sum = 0;
	for (var i=0; i < arguments.length; i++) {
		sum += Number( !!arguments[i] );
	}
	return sum === 1;
}
```
3.Implicitly: * --> Boolean
&& ||的真正作用
为操作数选择器运算符

结果总是比较的数之一
```
a || b;
// roughly equivalent to:
a ? a : b;

a && b;
// roughly equivalent to:
a ? b : a;

var a = 42;
var b = "abc";
var c = null;

a || b;		// 42
a && b;		// "abc"

c || b;		// "abc"
c && b;		// null
```

4.Symbol Coercion
Boolean(Symbol) //true

5. ==  vs ===

(1) == 允许implicity coercion,===不允许
```
NaN is never equal to itself (see Chapter 2)
+0 and -0 are equal to each other (see Chapter 2)
```

(2)Comparing: strings to numbers
转换为数字再比较

(3)Comparing: anything to boolean
Boolean转换为数字再比较
```
var a = "42";
var b = true;

a == b;	// false
```
(4)Comparing: nulls to undefineds

null 这两兄弟 相互转化和相等

```
null == undefined //true
null === undefined //false
```
(5) objects to non-objects

对象转化为基本类型再判断
```
var a = 42;
var b = [ 42 ];

a == b;	// true

var a = "abc";
var b = Object( a );	// same as `new String( a )`

a === b;				// false
a == b;					// true

三兄弟都是false
var a = null;
var b = Object( a );	// same as `Object()`
a == b;					// false

var c = undefined;
var d = Object( c );	// same as `Object()`
c == d;					// false

var e = NaN;
var f = Object( e );	// same as `new Number( e )`
e == f;					// false
```
(6)Edge Cases
```
"0" == false;			// true -- UH OH!
false == 0;				// true -- UH OH!
false == "";			// true -- UH OH!
false == [];			// true -- UH OH!
"" == 0;				// true -- UH OH!
"" == [];				// true -- UH OH!
0 == [];				// true -- UH OH!

[] == ![];		// true
2 == [2];		// true
"" == [null];	// true

0 == "\n";		// true
0 == "  ";		// true
"true" == true;						// false

(7) Abstract Relational Comparison > < 

两步： -1. 首先ToPrimitive，如果有结果不是string，那么就调用ToNumber，接着再比较 -2.如果结果都是string，则直接一个一个字符比较
```
var a = [ 42 ];

var b = [ "43" ];

a < b;	// true

b < a;	// false

var a = [ "42" ];

var b = [ "043" ];

a < b;	// false

var a = [ 4, 2 ];

var b = [ 0, 4, 3 ];

a < b;	// false

//特别之处， >= 的逻辑是 !<

var a = { b: 42 };

var b = { b: 43 };

a < b;	// false

a == b;	// false

a > b;	// false


a <= b;	// true

a >= b;	// true
```
## Grammer 

### Statements & Expressions
#### Statement Completion Values 

(下面的这个好像没什么用...)
--implicit return of the last statement value in the block.
statements是完整的语句，expressions最终会有一个确定的值
```
var a = 3 * 6;
var b = a;
b;
```
上面,3行都是statement,a = 3 * 6,b = a,3*6,a,b等是expressions;
```
var a, b;

a = if (true) {
    b = 4 + 38;
};
console中会出现一个42结果..
```
#### Expression Side Effects
1.
```
var a = 42;
var b = (a++);

a;  // 43
b;  // 42
```
对比下面
```
var a = 42;
var b = (a++,a);//运算子优先顺序

a;  // 43
b;  // 42
```
2.delete
```
var obj = {
    a: 42
};

obj.a;          // 42
delete obj.a;   // true
obj.a;          // undefined

//delete obj.a会return true:
if(delete obj.a){console.log("return true")};//

```
3.= = =chained assignments
```
var a, b, c;

a = b = c = 42;//a b c都是42
```
#### Contextual Rules,根据场景和使用者确定不同的rules
##### 1.{} curly braces
(1).Object Literals
```
var a = {
    foo:bar()
}
```
(2).Labels //标签的作用

- label in for loop:
此处是continue foo标签所标记的那个loop的下一轮loop
```
{
    foo:bar()
}
foo: for (var i=0; i<4; i++) {
    for (var j=0; j<4; j++) {
        // whenever the loops meet, continue outer loop
        if (j == i) {
            // jump to the next iteration of
            // the `foo` labeled-loop
            continue foo;
        }

        // skip odd multiples
        if ((j * i) % 2 == 1) {
            // normal (non-labeled) `continue` of inner loop
            continue;
        }

        console.log( i, j );
    }
}
// 1 0
// 2 0
// 2 1
// 3 0
// 3 2
```
对比上面，加入break,功能是直接break出label标记的那个loop
```
// `foo` labeled-loop
foo: for (var i=0; i<4; i++) {
    for (var j=0; j<4; j++) {
        if ((i * j) >= 3) {
            console.log( "stopping!", i, j );
            // break out of the `foo` labeled loop
            break foo;
        }

        console.log( i, j );
    }
}
// 0 0
// 0 1
// 0 2
// 0 3
// 1 0
// 1 1
// 1 2
// stopping! 1 3
```

- lable 在{}block中间：
```
function foo() {
    // `bar` labeled-block
    bar: {
        console.log( "Hello" );
        break bar;
        console.log( "never runs" );
    }
    console.log( "World" );
}

foo();
// Hello
// World
```

- 关于JSON，是JS中的syntax,但不是合理的grammar

使用时，

JSON value {"a":42} no

JSON-P foo({"a":42}) yes

(3).Blocks

先看一个例子
```
[] + {}; // "[object Object]" 
//[] is coerced to "" and thus {} is coerced to a string

{} + []; // 0 
//{}is a block,+[] -> 0
0 + [] ; //'0' 

//0 + ""
```

##### 2.else if And Optional Blocks
else if is actually else {if(){}}
####  Operator Precedence
##### 1.&& , || =

= > ,
```
var a = 42, b;
b = ( a++, a );
a;  // 43
b;  // 43

var a = 42, b;
b = a++, a;
a;  // 43
b;  // 42
```
== > && > || > =
```
true || false && false;     // true
"hello world" || 10 == 10 ;  //'hello world'
```
##### 2.Short Circuited && || 短路
只需要判断一半的条件
```
//opts 如果false,后面的就不会抛出错误
function doSomething(opts) {
    if (opts && opts.cool) {
        // ..
    }
}
```
##### 3.&& > || > ?:
```
a && b || c ? c || b ? a : c && b : a

is equal to 

(a && b || c) ? (c || b) ? a : (c && b) : a
((a && b) || c) ? ((c || b) ? a : (c && b)) : a
```
##### 4.Associativity 多个一样的算子

right/left-associativity:

1.&&,||结果一样,方向从左到右

2.? :grouping方向从右到左
```
a ? b : c ? d : e;

结果是a ? b : (c ? d : e)
```

3.= 也是right-associativity
```
var a, b, c;

a = b = c = 42;
//a = (b = (c = 42))
```
#### Automatic Semicolons自动加;
##### 1.ASI (Automatic Semicolon Insertion)

(1).JS parsesr在碰到某些statement末尾的空白/comments会自动插入;
```
var a = 42, b
c;

//equal to
var a = 42,b;
c;  // throw a error
```
(2).碰到break,continue,return,yield时
```
function foo(a) {
    if (!a) return
    a *= 2;
    // ..
}
```
#### Errors

很多errors,发生时间：compile/runtime time
```
var a = /+foo/;     // Error!
function bar(a,b,a) { "use strict"; }   // Error!

```
2.Using Variables Too Early

ES6 define TDZ ("Temporal Dead Zone").
```
//var不会出错
{
    a = 2;      // ReferenceError!
    let a;

}

{
    typeof a;   // undefined
    typeof b;   // ReferenceError! (TDZ)
    let b;
}
```

#### Function Arguments

##### 1.ES6 default parameter values
```
var b = 3;

function foo( a = 42, b = a + b + 5 ) {
    console.log(a,b)
}
foo() // error! b is not defined 
```
如果你省略了参数或者传入undefined,就用default value

```
function foo( a = 42, b = a + 1 ) {
    console.log( a, b );
}

foo();                  // 42 43
foo( undefined );       // 42 43
foo( 5 );               // 5 6
foo( void 0, 7 );       // 42 7
foo( null );            // null 1 null => 0
```
##### 2.arguments 与命名参数

a的指针指向传入的参数，
```
//非严格模式下
//同时refer to arguments[]与a，会绑定他们
function foo(a) {
    a = 42;
    console.log( arguments[0] );
}

foo( 2 );   // 42 (linked)
foo();      // undefined (not linked)

function foo(a) {
    "use strict";
    a = 42;
    console.log( arguments[0] );
}

foo( 2 );   // 2 (not linked)
foo();      // undefined (not linked)
```
#### try..finally

捕获runtime error
1.try catch/finally(二者可以一起存在)
finally{}里的Code,一定会运行的，
right after try(catch)完成
```
function foo() {
    try {
        return 42;
    }catch(e){
       //.. 
    } 
    finally {
        console.log( "Hello" );
    }

    console.log( "never runs" );
}
console.log( foo() );
// Hello 在try完成后运行
// 42 在foo完成后,console.log(42)
```

2.如果finally里thorw一个exception,
那么try里的value会被舍弃

```
function foo() {
    try {
        return 42;
    }
    finally {
        throw "Oops!";
    }

    console.log( "never runs" );
}

console.log( foo() );
// Uncaught Exception: Oops!
```

3.finally里的return会override try里面的
```
function baz() {
    try {
        return 42;
    }
    finally {
        // override previous `return 42`
        return "Hello";
    }
}
baz();  // "Hello"
```

#### Switch

普通的
```
switch (a) {
    case 2:
        // do something
        break;
    case 42:
        // do another thing
        break;
    default:
        // fallback to here

```
升级
```
var a = "42";

switch (true) {
    case a == 10:
        console.log( "10 or '10'" );
        break;
    case a == 42:
        console.log( "42 or '42'" );
        break;
    default:
        // never gets here
}
// 42 or '42'
```






