/*
可以完成对象和数组的深浅复制
对象的成环没有判断...

*/

function isObject(x) {
	return Object.prototype.toString.call(x).slice(8, -1) === 'Object';
}

function isArray(x) {
	return Object.prototype.toString.call(x).slice(8, -1) === 'Array';
}
var $ = {};
$.extend = function() {
	var len = arguments.length;
	var bool = false;
	var target = arguments[0];
	var i = 1;
	if (typeof target === 'boolean') {
		bool = target;
		target = arguments[1];
		i++;
	}
	if (!isObject(target) || !isObject(target)) return false;
	for (; i < len; i++) {
		var src = arguments[i];
		if (isObject(src) || isArray(src)) {
			if (bool === false) { //非相互影响的浅复制
				for (var j in src) {

					if (src[j] === target || src[j] == null) continue;
					if (isObject(src[j])) {
						target[j] = Object.assign({}, src[j]);
					}
					if (isArray(src[j])) {
						target[j] = src[j].slice()
					} else {
						target[j] = src[j];
					}
				}

			} else { //深复制

				for (var j in src) {

					if (isObject(src[j])) target[j] = target[j] || {};
					if (isArray(src[j])) target[j] = target[j] || [];
					if (src[j] == null) continue;
					if (isObject(src[j]) || isArray(src[j])) {
						for (var k in src[j]) {
							if (src[j][k] === target[j]) continue;
							if (isObject(src[j][k])) {

								target[j][k] = target[j][k] || {};
								target[j][k] = $.extend(bool, target[j][k], src[j][k]);
							}
							if (isArray(src[j][k])) {
								target[j][k] = target[j][k] || [];
								target[j][k] = $.extend(bool, target[j][k], src[j][k]);
							} else target[j][k] = src[j][k]
						}

					} else target[j] = src[j];
				}
			}
		}
	}
	return target;
}


// var a = {
// 	hello: 1
// };
// var b = {
// 	name: b
// }
// var c = $.extend(a, b);
$.extend(true, {}, {
	a: 2
}, {
	c: [1, 2, 3],
	d: {
		e: 1,
		f: d,
	}
}, {
	f: [{
		a: 1
	}, {
		b: 2,
		c: [1, 2]
	}]
})