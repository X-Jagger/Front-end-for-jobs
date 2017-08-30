//Global

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		element.className += ' ' + value;
	}
}

function highlightPage() {
	var nav = document.getElementsByTagName('nav')[0];
	var links = nav.getElementsByTagName('a');
	//console.log('links:', links);
	[...links].forEach(function(v) {
		//console.log('v:', v);
		var url = v.getAttribute('href').substring(2);
		//
		if (window.location.href.includes(url)) {
			v.className = 'here';
			var idtext = v.lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id', idtext);
		}
	})
}

function moveElement(elementId, final_x, final_y, interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementId)) return false;
	var elem = document.getElementById(elementId);
	if (elem.movement) clearTimeout(elem.movement);

	var xpos = parseInt(elem.style.left + 0);
	var ypos = parseInt(elem.style.top + 0);
	var dist = 0;

	if (xpos == final_x && ypos == final_y) return true;
	if (xpos < final_x) {
		dist = Math.ceil((final_x - xpos) / 10)
		xpos += dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos - final_x) / 10)
		xpos -= dist;
	}
	if (ypos < final_y) {
		dist = Math.ceil((final_y - ypos) / 10)
		ypos += dist;
	}
	if (ypos > final_y) {
		dist = Math.ceil((ypos - final_y) / 10)
		ypos -= dist;
	}

	elem.style.left = xpos + 'px';
	elem.style.top = ypos + 'px';

	elem.movement = setTimeout(() => moveElement(elementId, final_x, final_y, interval), interval);
}

function prepareSlideShow() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;

	var intro = document.getElementById('intro');
	var slideshow = document.createElement('div');
	slideshow.setAttribute('id', 'slideshow');
	var preview = document.createElement('img');
	preview.setAttribute('src', 'images/slideshow.gif');
	preview.setAttribute('alt', 'a glimpse of what awaits you');
	preview.setAttribute('id', 'preview')
	slideshow.appendChild(preview)
	insertAfter(slideshow, intro)

	//幻灯片效果
	var links = document.getElementsByTagName('a')
	var destination;
	[...links].forEach(function(v) {
		v.onmouseover = function() {
			destination = this.getAttribute('href');
			if (destination.includes('index.html')) {
				moveElement('preview', 0, 0, 5)
			}
			if (destination.includes('about.html')) {
				moveElement('preview', -150, 0, 5)
			}
			if (destination.includes('photos.html')) {
				moveElement('preview', -300, 0, 5)
			}
			if (destination.includes('live.html')) {
				moveElement('preview', -450, 0, 5)
			}
			if (destination.includes('contact.html')) {
				moveElement('preview', -600, 0, 5)
			}

		}
	})

	//幻灯片放到一个小窗口里
	var frame = document.createElement('img')
	frame.setAttribute('src', 'images/frame.gif')
	frame.setAttribute('alt', '')
	frame.setAttribute('id', 'frame')
	slideshow.appendChild(frame);
	console.log('hello')
	console.log(document.getElementById('frame'))
}

function showSection(id) {
	var sections = document.getElementsByTagName('section');
	[...sections].forEach(function(v) {
		if (v.getAttribute('id') == id) {
			v.style.display = 'block'
		} else {
			v.style.display = 'none'
		}
	})
}

function prepareInternalNav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;

	var article = document.getElementsByTagName('article')
	if (article.length == 0) return false;
	var nav = article[0].getElementsByTagName('nav')[0];
	if (!nav || nav.length == 0) return false;

	var links = nav.getElementsByTagName('a');
	[...links].forEach(function(v) {
		//局部变量
		var sectionId = v.getAttribute('href').substring(1);
		v.sectionId = sectionId;


		document.getElementById(sectionId).style.display = 'none';
		v.onclick = function() {
			showSection(this.sectionId);
			return false;
		}
	})

}

//photos
function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return true;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if (!document.getElementById("description")) return false;
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else {
		var text = "";
	}
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return false;
}

function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("alt", "my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description, gallery);
	insertAfter(placeholder, description);
}

function prepareGallery() {
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	[...links].forEach(function(v) {
		v.onclick = () =>
			showPic(v);
	})

}

//表格增强

//间隔斑点颜色
function stripeTables() {
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName('table');
	[...tables].forEach((v) => {
		var odd = false;
		var rows = v.getElementsByTagName('tr');
		[...rows].forEach((v) => {
			if (odd == true) {
				addClass(v, 'odd');
				odd = false;
			} else {
				odd = true;
			}
		})
	})
}

function highlightRows() {

	var rows = document.getElementsByTagName('tr');
	[...rows].forEach((v) => {
		v.oldClassName = v.className;
		v.onmouseover = () => addClass(v, 'highlight');
		v.onmouseout = () => v.className = v.oldClassName;
	})
}

//Contact 表单

//placeholder 兼容性 form对象

function resetFields(whichform) {
	if (Modernizr.input.placeholder) return;
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type == "submit") continue;
		if (!element.getAttribute('placeholder')) continue;
		element.onfocus = function() {
			if (this.value == this.getAttribute('placeholder')) {
				this.value = "";
			}
		}
		element.onblur = function() {
			if (this.value == "") {
				this.value = this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}

//表单验证

//是否填写

function isFilled(field) {
	console.log('1', field.value);
	if (Number(field.value) == 0) return false;
	var placeholder = field.placeholder || field.getAttribute('placeholder')
	console.log(placeholder, field.value);
	return placeholder != field.value;
}

//是否是邮箱
//邮箱正常的格式是xxx123@123xxx.com
//，@的左边有可能包含下划线(_)、连字符（-）、（.）、（\）
//这些符号，但只能放在数字或字母的中间，并且（@）与（.）
function isEmail(field) {
	var re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
	return re.test(field.value);
}

function validateForm(whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.getAttribute("required") == 'required') {
			if (!isFilled(element)) {
				alert(element.value + "is wrong" + "Please fill in the " + element.name + " field.");
				return false;
			}
		}
		if (element.getAttribute("type") == 'email') {
			if (!isEmail(element)) {
				alert("The " + element.name + " field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function prepareForms() {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		console.log(thisform)
		thisform.onsubmit = function() {
			if (!validateForm(this)) return false;
			var article = document.getElementsByTagName('article')[0];
			if (submitFormWithAjax(this, article)) return false;
			return true;
		}
	}
}


// Ajax

function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function() {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			} catch (e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch (e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {}
			return false;
		}
	return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
	// Remove the existing content.
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	//  Create a loading image.
	var content = document.createElement("img");
	content.setAttribute("src", "images/loading.gif");
	content.setAttribute("alt", "Loading...");
	// Append the loading element.
	element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {

	var request = getHTTPObject();
	if (!request) {
		return false;
	}

	// Display a loading message.
	displayAjaxLoading(thetarget);

	// Collect the data.
	var dataParts = [];
	var element;
	for (var i = 0; i < whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	var data = dataParts.join('&');

	request.open('POST', whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				} else {
					thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
				}
			} else {
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	};

	request.send(data);

	return true;
};



addLoadEvent(highlightPage);
addLoadEvent(prepareSlideShow);
addLoadEvent(prepareInternalNav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows)
addLoadEvent(prepareForms);