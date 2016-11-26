var product = {
	id: 1,
	name: '汽车',
	smallImage: 'img/small.jpg',
	bigImage: 'img/big.jpg'
}
window.onload = function() {
	init();
	register();
	//初始化网页的显示，设定左边div的背景图片
	function init() {
		document.getElementById("leftDiv").style.backgroundImage = "url(" + product.smallImage + ")";
		document.getElementById("rightDiv").style.backgroundImage = "url(" + product.bigImage + ")";
		document.getElementById("rightDiv").style.visibility = "hidden";
		createMengBan();
	}
	/**
	 * 绑定事件
	 * 鼠标进入事件（创建小的div模板层）
	 * 鼠标移动事件
	 * 鼠标离开事件 删除小的div模板层
	 */
	function register() {
		document.getElementById("leftDiv").addEventListener("mousemove", mouseMove, false);
		document.getElementById("leftDiv").addEventListener("mouseout", deleteMengBan, false);
	}

	function deleteMengBan() {
		document.getElementById("mengDiv").style.display = "none";
	}

	function mouseMove() {
		moveMengBan();
		moveRightDiv();
	}

	function moveMengBan() {
		var mengBan = document.getElementById("mengDiv");
		mengBan.style.display = "block";
		var left = 0;
		var top = 0;
		if(event.target.id == "mengDiv") {
			left = event.offsetX + event.target.offsetLeft - mengBan.offsetWidth / 2;
			top = event.offsetY + event.target.offsetTop - mengBan.offsetHeight / 2;
		} else {
			left = event.offsetX - mengBan.offsetWidth / 2;
			top = event.offsetY - mengBan.offsetHeight / 2;
		}

		if((left + mengBan.offsetWidth / 2) > document.getElementById("leftDiv").offsetWidth) {
			deleteMengBan();
			return;
		} else if((top + mengBan.offsetHeight / 2) > document.getElementById("leftDiv").offsetHeight) {
			deleteMengBan();
		} else {
			mengBan.style.left = left + "px";
			mengBan.style.top = top + "px";
			mengBan.style.display = "block";
		}
	}

	function moveRightDiv() {
		var mengBan = document.getElementById("mengDiv");
		document.getElementById("rightDiv").style.visibility = "visible";
		var left = 0;
		var top = 0;
		if(event.target.id == "mengDiv") {
			left = event.offsetX + event.target.offsetLeft - mengBan.offsetWidth / 2;
			top = event.offsetY + event.target.offsetTop - mengBan.offsetHeight / 2;
		} else {
			left = event.offsetX - mengBan.offsetWidth / 2;
			top = event.offsetY - mengBan.offsetHeight / 2;
		}
		if(left < 0) {
			left = 0;
		}
		if(left > document.getElementById("leftDiv").offsetWidth - mengBan.offsetWidth) {
			left = document.getElementById("leftDiv").offsetWidth - mengBan.offsetWidth;
		}
		if(top < 0) {
			top = 0;
		}
		if(top > document.getElementById("leftDiv").offsetHeight - mengBan.offsetHeight) {
			top = document.getElementById("leftDiv").offsetHeight - mengBan.offsetHeight;
		}
		document.getElementById("rightDiv").style.backgroundPositionY = -top * 2 + "px";
		document.getElementById("rightDiv").style.backgroundPositionX = -left * 2 + "px";

	}

	/**
	 * 创建蒙版
	 */
	function createMengBan() {
		var div = document.createElement("div");
		div.id = 'mengDiv';
		div.className = "mengban";
		div.style.height = document.getElementById("leftDiv").offsetHeight / 2 + "px";
		div.style.width = document.getElementById("leftDiv").offsetWidth / 2 + "px";
		div.style.display = "none";
		document.getElementById("leftDiv").appendChild(div);
	}

}