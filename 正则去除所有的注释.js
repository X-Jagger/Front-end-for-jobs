var str = `sdsadas
//what can you see //hello it's me 
"http://test"

"/*tesdst*/"
/*test*/
conosle.log("what //hello it's me ")`

var rex = /\"[\S\s]*?\"/g;
var strx = str.replace(rex, '');

var re = /(\/\*[\s\S]*?\*\/)|(\/\/.*)/g;
var arr = strx.match(re);
arr.forEach((v, i) => {
	str = str.replace(v, '')
})