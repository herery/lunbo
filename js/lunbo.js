function initLunbo (tagId, params) {

	tagId = typeof tagId == String ? tagId : 'lunbo';
	var urls =  params.urls && params.urls instanceof Array ? [].concat(params.urls) : [];
	var index = 0;
	var sum = urls.length;
	var width = params.width || 500;
	var height = params.height || 400;
	var speed = params.speed || 2000;

	var lunbo = document.getElementById(tagId);
	lunbo.style.width = width + "px";
	lunbo.style.height = height + "px";

	var wrap = document.createElement("div");
	wrap.className = 'lunbo-container';
	wrap.id = 'lunbo-container';
	wrap.style.width = sum * width + "px";
	wrap.style.height = height + "px";
	for (var i = 0; i < sum; i++) {
		var imgE = document.createElement("img");
		imgE.src = urls[i];
		imgE.style.width = width + "px";
		imgE.style.height = height + "px";
		wrap.appendChild(imgE);
	}

	var prev = document.createElement("div");
	prev.className = 'lunbo-btn lunbo-turn lunbo-left';
	prev.id = 'lunbo-left';
	prev.innerText = '<';
	var next = document.createElement("div");
	next.className = 'lunbo-btn lunbo-turn lunbo-right';
	next.id = 'lunbo-right';
	next.innerText = '>';

    var listDiv = document.createElement("div");
    listDiv.className = 'lunbo-list';
    var list = document.createElement("ul");
    list.id = 'lunbo-list-ul';

    for (var i = 0; i < sum; i++) {
    	var liE = document.createElement("li");
    	liE.className = 'lunbo-btn lunbo-list-li';
    	liE.className = i == 0 ? liE.className + ' lunbo-list-in' : liE.className;
    	liE.innerText = i + 1;
    	list.appendChild(liE);

    }
    listDiv.appendChild(list);

    lunbo.appendChild(wrap);
    lunbo.appendChild(next);
    lunbo.appendChild(prev);
    lunbo.appendChild(listDiv);
	// var wrap = document.getElementById("lunbo-container");
 //    var next = document.getElementById("lunbo-right");
 //    var prev = document.getElementById("lunbo-left");
 //    var list = document.getElementById("lunbo-list-ul");
    var lists = document.getElementsByTagName("li");

	next.addEventListener('click', nextClick);
	prev.addEventListener('click', preClick);
	list.addEventListener('click', function (event) {
		var target = event.target || event.srcElement;
		var i = parseInt(target.innerText);
		index = i > 0 && i <= sum ? i - 1 : 0 ;
		indexClick(index);
		indexClass(index);
	});

	clearInterval(timer);
	var timer = setInterval(nextClick, speed);

	lunbo.onmouseover = function(){
	    clearInterval(timer);
	};
	lunbo.onmouseout = function(){
	    clearInterval(timer);
	    timer = setInterval(nextClick, speed);
	};

	function nextClick() {
        if ( ++index < sum) {
        	wrap.style.left = - ( width * index) + "px";
        } else {
        	index = 0;
        	wrap.style.left = 0;
        }
        indexClass(index);
    }

    function preClick () {
        if ( --index >= 0) {
        	wrap.style.left = - ( width * index) + "px";
        } else {
        	index = sum - 1;
        	wrap.style.left =  - ( width * (sum-1)) + "px";
        }
        indexClass(index);
    }
	
	function indexClick (i) {
		if ( 0 <= i && i < sum ) {
			index = i;
			wrap.style.left = - ( width * index) + "px";
		}
	}
	function indexClass (i) {
		if ( 0 <= i && i < sum ) {
			var doc = document.getElementsByClassName('lunbo-list-in');
			removeClass(doc[0], 'lunbo-list-in');
			addClass(lists[i], 'lunbo-list-in');
		}
	}


	function hasClass(ele, cls) { 
        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    }
	function addClass(ele, cls) { 
        if (!hasClass(ele, cls)) ele.className += " "+cls;
    }
    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }

}