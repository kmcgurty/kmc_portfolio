var options = {
	matrixLetters: ['ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ'],
	textSize: 25,
	fps: 20
};

var numColumns = window.innerWidth / options.textSize * 2, //multiply by two because the characters are half the normal size
	columnData = [],
	ctx = canvasInit();

for (var i = 0; i < numColumns; i++) {
	if (typeof columnData[i - 1] === 'undefined') {
		var xPos = 0;
	} else {
		var xPos = (columnData[i - 1].xPos + options.textSize / 2);
	}

	var yPos = -randomInt(window.innerHeight, 0);

	columnData[i] = {
		xPos: xPos,
		yPos: yPos
	};

	console.log(columnData[i].xPos)
}

setInterval(draw, 1000 / options.fps);

function canvasInit() {
	var ctx = document.getElementById('matrix-rain').getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.font = options.textSize + "px  serif";
	return ctx;
}

function draw() {
	//fill background for fade effect
	ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	//fill for text
	ctx.fillStyle = "#00FF00";

	for (var i = 0; i < columnData.length; i++) {
		ctx.fillText(getRandomChar(), columnData[i].xPos, columnData[i].yPos);
		columnData[i].yPos += options.textSize;

		if (columnData[i].yPos >= window.innerHeight) {
			columnData[i].yPos = -randomInt(window.innerHeight, 0);
		}
	}
}

function getRandomChar() {
	return options.matrixLetters[randomInt(0, options.matrixLetters.length)]
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}