//// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;

//柯里化封装函数，func是普通函数，args用收集func所需要的参数
function createCurry(func, args) {

	var arity = func.length;
	var args = args || [];

	return function() {
		var _args = [].slice.call(arguments);
		[].push.apply(_args, args);

		// 如果参数个数小于最初的func.length，则递归调用，继续收集参数
		if (_args.length < arity) {
			return createCurry.call(this, func, _args);
		}

		// 参数收集完毕，则执行func
		return func.apply(this, _args);
	}
}

//思路收集所有的参数，然后再统一计算
function add() {
	var args = [].slice.call(arguments);

	function _add() {
		_add.toString = function() {
			return args.reduce((a, b) => a + b)
		}
		if (arguments.length > 0) {
			args = args.concat([].slice.call(arguments));
			return _add();
		} else {
			return _add;
		}
	}
	return _add();
}