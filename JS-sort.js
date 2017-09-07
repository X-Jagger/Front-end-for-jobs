/*改良版本2： 这种最优
改进冒泡排序： 设置一标志性变量pos,
用于记录每趟排序中最后一次进行交换的位置。
由于pos位置之后的记录均已交换到位,
故在进行下一趟排序时只要扫描到pos位置即可。
*/
/*
冒泡：
稳定、
最佳情况：T(n) = O(n)
当输入的数据已经是正序时（都已经是正序了，为毛何必还排序呢....）
最差情况：T(n) = O(n2)
当输入的数据是反序时(卧槽，我直接反序不就完了....)
平均情况：T(n) = O(n2)
*/
function bubbleSort(arr) {
	console.time('bubbleSort time cost');
	var len = arr.length;
	var pos = len - 1;
	for (var i = 0; i < len; i++) {
		var stop = pos;
		for (var j = 0; j < stop; j++) {
			if (arr[j] > arr[j + 1]) {
				var temp = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = temp;
				pos = j;
			}
		}
	}
	console.timeEnd('bubbleSort time cost');
	return arr;
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('bubbleSort', bubbleSort(arr))

//bubbleSort time cost: 0.033203125ms


/*2.选择排序（Selection Sort）
不稳定

因为无论什么数据进去都是O(n²)的时间复杂度.....
所以用到它的时候，数据规模越小越好


(1)算法简介

选择排序(Selection-sort)是一种简单直观的排序算法。
它的工作原理：首先在未排序序列中找到最小（大）元素，
存放到排序序列的起始位置，然后，再从剩余未排序元素中继续
寻找最小（大）元素，
然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
*/

function selectionSort(arr) {
	var len = arr.length;
	var minIndex, tmep;
	console.time("selectionSort");
	for (var i = 0; i < len - 1; i++) {
		minIndex = i;
		for (var j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}
	console.timeEnd("selectionSort")
	return arr;
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('selectionSort', selectionSort(arr))

//selectionSort: 0.10107421875ms
// [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]


/*
3.快速排序（Quick Sort）
(3)算法分析

最佳情况：T(n) = O(nlogn)
最差情况：T(n) = O(n2)
平均情况：T(n) = O(nlogn)

快速排序的内循环比大多数排序算法都要短小，
这意味着它无论是在理论上还是在实际中都要更快。
它的主要缺点是非常脆弱，在实现时要非常小心才能避免低劣的性能。
(1)算法简介

它将数组拆分为两个子数组, 其中一个子数组的所有元素都
比另一个子数组的元素小, 
然后对这两个子数组再重复进行上述操作, 
直到数组不可拆分, 排序完成.

*/
function quickSort(arr) {
	if (arr.length <= 1) { //如果数组中只有一位数，返回数组
		return arr;
	}
	var mNumIndex = Math.floor(arr.length / 2); //取基准值的下标
	var mNum = arr.splice([mNumIndex], 1)[0]; //取基准值
	var left = []; //左边数组
	var right = []; //右边数组

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < mNum) { //如果数组小于基准值，放在左边数组
			left.push(arr[i]);
		} else { ///否则
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat([mNum], quickSort(right)); //返回左边数组+基准值+右边数组
}

console.log(quickSort(arr)); //-33,0,2,11,22,32,77


/*
4.插入排序（Insertion Sort）
稳定
(4)算法分析

最佳情况：输入数组按升序排列。T(n) = O(n)
最坏情况：输入数组按降序排列。T(n) = O(n2)
平均情况：T(n) = O(n2)

可以优化用二分法来查找

*/
function insertionSort(arr) {
	console.time('insertionSort');
	var len = arr.length;
	for (var i = 1; i < len; i++) {
		var key = arr[i];
		var j = i - 1;
		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = key;
	}
	console.timeEnd("insertionSort")
	return arr;
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('insertionSort', insertionSort(arr))

//insertionSort: 0.0302734375ms

4.