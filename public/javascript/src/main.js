//simply put, each column (an array of information) of text is constantly getting letters added and removed from it 

var options = {
	matrixLetters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'],
	textSize: 30,

	fps: 20
};

var numColumns = Math.ceil(window.innerWidth / options.textSize) * 2, //multiply by two to fill the other half of the page
	columnData = [],
	ctx = canvasInit();

for (var i = 0; i < numColumns; i++) {
	//init the xposition of each column
	if (typeof columnData[i - 1] === 'undefined') {
		var xPos = 0;
	} else {
		var xPos = (columnData[i - 1].xPos + options.textSize / 2); //divide by two since we doubled it above. this pushes the columns closer together (to be honest, I don't know why...)
	}

	//have a random starting position so they don't fall at the same time
	var yPos = randomInt(0, 200);

	columnData[i] = {
		xPos: xPos, //x position of the column
		yPos: yPos, //y position of the last character
		charData: [], //character and character position. is generated later with addCharToColumn()
		hasEnded: false
	};
}

setInterval(draw, 1000 / options.fps);

function canvasInit() {
	var ctx = document.getElementById('matrix-rain').getContext('2d', 'matrix');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.font = options.textSize + "px  matrix-font";
	return ctx;
}

function draw() {
	//fill background for fade effect
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	//fill for text
	ctx.fillStyle = "lime";

	for (var i = 0; i < columnData.length; i++) {
		//add a random letter to the bottom of each column if it hasn't ended yet
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

		//once ia column has ended, start remove the first letter
		if (columnData[i].hasEnded) {
			columnData[i].charData.shift();
			
			if (columnData[i].charData.length === 0) {
				//when the column has nothing left, reset hasEnded and reset the yPos
				columnData[i].hasEnded = false;
				columnData[i].yPos = randomInt(0, 200);
			}
		}
	}
}

//add a character to the end of a cloumn
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