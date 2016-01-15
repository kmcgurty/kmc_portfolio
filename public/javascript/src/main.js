var options = {
	matrixLetters: ['ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ'],
	textSize: 25,
	minTrailLength: 5,
	maxTrailLength: 25,
	fps: 30
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

	var yPos = -randomInt(0, window.innerHeight);
	//var yPos = 50;

	columnData[i] = {
		xPos: xPos, //x position of the character train
		yPos: yPos, //y position of the character train
		charData: [], //character and character position
		hasEnded: false
	};
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
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	//fill for text
	ctx.fillStyle = "lime";

	for (var i = 0; i < columnData.length; i++) {
		if(!columnData[i].hasEnded){
			addCharToColumn(i);
		}

		for (var j = 0; j < columnData[i].charData.length; j++) {
			ctx.fillText(columnData[i].charData[j].character, columnData[i].xPos, columnData[i].charData[j].charPosition);
		}

		columnData[i].yPos += options.textSize;

		var chanceOfReset = randomInt(0, 100);
		//20% chance of resetting if farther than half the page height
		if (chanceOfReset < 10 && columnData[i].yPos > (window.innerHeight / 2.5) ||
			chanceOfReset < 40 && columnData[i].yPos > (window.innerHeight / 1.5)) {
			
			columnData[i].hasEnded = true;
		}

		//reset a to a random distance once it reaches the bottom
		if (columnData[i].hasEnded) {
			var removedData = columnData[i].charData.shift() === 'undefined';
			if(columnData[i].charData.length === 0){
				columnData[i].hasEnded = false;
				columnData[i].yPos = -randomInt(0, window.innerHeight);
			}
		}
	}
}


function addCharToColumn(column, reset){
	var character = getRandomChar(),
		charPosition,
		lastChar = columnData[column].charData.length - 1;

	//columnData[column].charData[lastChar]

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