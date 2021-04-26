const jobState = {
	write_flag: 0, // 0 미작성중 , 1 작성중
};

const dataLoad = (data) => {
	const content_right = document.querySelector(".content_right");
	content_right.innerHTML = "";
	const canvas = document.createElement("canvas");
	content_right.append(canvas);
	canvas.classList.add("writeCanvas");
	// canvas.style.width = `${content_right.getBoundingClientRect().width}px`;
	// canvas.style.height = `${content_right.getBoundingClientRect().height}px`;
	canvas.width = `${content_right.getBoundingClientRect().width}`;
	canvas.height = `${content_right.getBoundingClientRect().height}`;

	//
	canvas.onclick = (e) => {
		console.log(jobState.write_flag);
		if (jobState.write_flag == 1) return;
		console.log(e.offsetX);
		console.log(e.offsetY);

		createMenu(content_right, e.offsetX, e.offsetY);
	};
};

const deleteMenu = () => {
	if (document.querySelector(".canvas_menu")) {
		const parent = document.querySelector(".content_right");
		parent.removeChild(document.querySelector(".canvas_menu"));
	}
};

const createMenu = (parent, posX, posY) => {
	// 기존 메뉴 지우기
	deleteMenu();

	const div = document.createElement("div");
	div.style.position = "absolute";
	div.style.top = 0;
	div.style.left = 0;
	div.classList.add("canvas_menu");
	const canvas_menu_tag = `
			<div class="closeBtn">
				<img src="../images/cancel.png" alt="메뉴닫기">
			</div>
			<div>
				<h2>해당 좌표에 글쓰기</h2>
			</div>
			<div class="menu_button">
				<div class="textWrap" onclick="writeText(${posX},${posY});">
					<div><img src='../images/pencil.png' alt='글쓰기'></div>
					<div class="text">글쓰기</div>
				</div>
				<div class="pictureWrap">
					<div><img src='../images/picture.png' alt='글쓰기'></div>
					<div class="text">사진등록</div>
				</div>            
			</div>
    `;

	div.innerHTML = canvas_menu_tag;
	parent.append(div);

	const innerDiv = document.querySelector(".canvas_menu");
	innerDiv.style.left = `${posX}px`;
	innerDiv.style.top = `${posY}px`;

	const closeBtn = document.querySelector(".closeBtn");
	closeBtn.addEventListener("click", () => {
		deleteMenu();
	});
};

const writeText = (posX, posY) => {
	deleteMenu();
	addInput(posX, posY);
};

const inputReg = (posX, posY) => {
	console.log("e-keycode", event.keyCode);
	console.log("posX", posX);
	console.log("posY", posY);
	if (e.keyCode == 13) {
		const content_right = document.querySelector(".content_right");
	}
	console.log(1);
};

const addInput = (posX, posY) => {
	const parent = document.querySelector(".content_right");
	const canvas = document.querySelector(".writeCanvas");

	const canvas_input_tag = `
			<div class="borderBox"></div>
			<div class="title">
				글쓰기
				<div class="closeBtn">
					<img src="./images/cancel.png" />
				</div>                        
			</div>                 
			<div class="write_input_option">
				<select name="fontFamily">
					<option selectec>KyoboHand</option>
				</select>&nbsp;
				<select name="fontSize">
					<option>18</option>
					<option>16</option>
					<option>14</option>
					<option selectec>12</option>
					<option>10</option>
					<option>8</option>
				</select>            
			</div>                
			<input type="text" class="write_input" />
		`;

	const div = document.createElement("div");
	div.classList.add("write_input_div");
	div.style.left = `${posX}px`;
	div.style.top = `${posY}px`;
	div.innerHTML = canvas_input_tag;
	parent.append(div);

	const closeBtn = document.querySelector(".closeBtn");
	closeBtn.addEventListener("click", () => {
		if (document.querySelector(".write_input_div")) {
			parent.removeChild(document.querySelector(".write_input_div"));
			jobState.write_flag = 0;
		}
	});

	const input = document.querySelector(".write_input");
	input.focus();
	jobState.write_flag = 1;
	input.addEventListener("keydown", (e) => {
		if (e.code == "Enter" || e.code == "NumpadEnter") {
			//바로 캔버스에 그려서 표시해보자
			const childs = parent.childNodes;
			const ctx = canvas.getContext("2d");
			const fontString = document.querySelector("select[name=fontSize]").value + 'px ' + document.querySelector("select[name=fontFamily]").value
			console.log(fontString);
			ctx.font = fontString;
			ctx.fillText(input.value, parseInt(posX), parseInt(posY));
			if (document.querySelector(".write_input_div")) {
				parent.removeChild(document.querySelector(".write_input_div"));
			}
			jobState.write_flag = 0;
		}
	});
};

const openCover = () => {
	document.querySelector(".coverBoxWrap").classList.add("open");
};

const pageRightToLeft = () => {
	const selPage = document.querySelector(".rightPage");
	selPage.innerHTML = "";
	const newPage = document.createElement("div");
	newPage.style.position = "absolute";
	newPage.style.top = 0;
	newPage.style.left = 0;
	newPage.style.zIndex = 100;
	newPage.style.width = "100%";
	newPage.style.height = "100%";
	newPage.style.transformOrigin = "0%";
	newPage.style.border = "1px solid #eee";
	newPage.style.background = "#efefef";

	newPage.style.animation = "open 1.5s linear 1s 1 forwards alternate";
	selPage.append(newPage);

	newPage.addEventListener("animationend", () => {
		console.log(1);
		newPage.style.zIndex = 0;
	});
};

const pageLeftToRight = () => {
	const SelPage = document.querySelector(".leftPage");
	SelPage.innerHTML = "";
	const newPage = document.createElement("div");
	newPage.style.position = "absolute";
	newPage.style.top = 0;
	newPage.style.left = 0;
	newPage.style.zIndex = 100;
	newPage.style.width = "100%";
	newPage.style.height = "100%";
	newPage.style.transformOrigin = "100%";
	newPage.style.border = "1px solid #eee";
	newPage.style.background = "#efefef";

	newPage.style.animation = "open2 1.5s linear 1s 1 forwards alternate";
	SelPage.append(newPage);

	newPage.addEventListener("animationend", () => {
		console.log(1);
		newPage.style.zIndex = 0;
	});
};

const openPage = () => {
	// 앞페이지인지 뒷페이지인지 구분한다!?
	pageRightToLeft();
};

document.querySelector(".profile").addEventListener("click", () => {
	openCover();
});

document.querySelector(".todo").addEventListener("click", () => {
	openPage();
});

document.querySelector(".memo").addEventListener("click", () => {
	pageLeftToRight();
});

document.querySelector(".backPage").addEventListener(
	"animationend",
	() => {
		// 책이 열리면!
		document.querySelector(".contentBoxWrap").style.display = "block";

		// 데이터를 불러온다!!
		dataLoad("1");
	},
	false
);
