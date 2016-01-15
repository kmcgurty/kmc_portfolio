//simply put, each column of text is constantly getting letters added to it. once it is randomly 

var options = {
	matrixLetters: ['ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ'],
	textSize: 30,

	fps: 25
};

var numColumns = Math.ceil(window.innerWidth / options.textSize * 2), //multiply by two because the characters are half the normal size
	columnData = [],
	ctx = canvasInit();

for (var i = 0; i < numColumns; i++) {
	if (typeof columnData[i - 1] === 'undefined') {
		var xPos = 0;
	} else {
		var xPos = (columnData[i - 1].xPos + options.textSize / 2);
	}

	//have a random starting position so they don't fall at the same time
	//var yPos = -randomInt(0, window.innerHeight);

	var yPos = randomInt(0, 200);

	columnData[i] = {
		xPos: xPos, //x position of the column
		yPos: yPos, //y position of the last character
		charData: [], //character and character position
		hasEnded: false
	};
}

setInterval(draw, 1000 / options.fps);

function canvasInit() {
	var ctx = document.getElementById('matrix-rain').getContext('2d', 'matrix');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.font = options.textSize + "px  serif";
	//ctx.shadowColor = "lime";
	//ctx.shadowBlur = 20;
	return ctx;
}

function draw() {
	//fill background for fade effect
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	//fill for text
	ctx.fillStyle = "lime";

	for (var i = 0; i < columnData.length; i++) {
		if (!columnData[i].hasEnded) {
			addCharToColumn(i);
		}

		for (var j = 0; j < columnData[i].charData.length; j++) {
			//color the last character white, otherwise color it green
			if (j == columnData[i].charData.length - 1) {
				ctx.fillStyle = "white";
			} else {
				ctx.fillStyle = "lime";
			}
			ctx.fillText(columnData[i].charData[j].character, columnData[i].xPos, columnData[i].charData[j].charPosition);
		}

		columnData[i].yPos += options.textSize;

		var chanceOfReset = randomInt(0, 100);
		//% of change it has to reset once it reaches a certain distance of the page
		if (chanceOfReset < 5 && columnData[i].yPos > (window.innerHeight / 2) ||
			chanceOfReset < 20 && columnData[i].yPos > (window.innerHeight / 1.5)) {

			columnData[i].hasEnded = true;
		}

		//reset y position once the column has ended (decided randomly above)
		if (columnData[i].hasEnded) {
			var removedData = columnData[i].charData.shift() === 'undefined';
			if (columnData[i].charData.length === 0) {
				columnData[i].hasEnded = false;
				columnData[i].yPos = randomInt(0, 200);
			}
		}
	}
}


function addCharToColumn(column, reset) {
	var character = getRandomChar(),
		charPosition,
		lastChar = columnData[column].charData.length - 1;

	if (typeof columnData[column].charData[lastChar - 1] === 'undefined') {
		charPosition = columnData[column].yPos;
	} else {
		charPosition = columnData[column].charData[lastChar].charPosition + options.textSize;
	}

	columnData[column].charData.push({
		character: character,
		charPosition: charPosition
	});
}


function getRandomChar() {
	return options.matrixLetters[randomInt(0, options.matrixLetters.length)];
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}