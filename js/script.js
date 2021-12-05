const container = document.querySelector('.container');
const board = document.querySelector('.board');
const clearButton = document.querySelector('.clear-btn');
const colorBtn = document.querySelector('.colors-btn');
const randomColorsBtn = document.querySelector('.random-colors-btn');
const toBlackBtn = document.querySelector('.to-black-btn');
const toWhiteBtn = document.querySelector('.to-white-btn');

let randomColors = false;
let toBlackColors = false;
let toWhiteColors = false;

clearButton.addEventListener('click', () => {	
	clearBoard();
	let square = addCells();	
	
	drawCells(square);
	
	
	paint();
	
});



function SetColor() {		

	colorBtn.addEventListener('click', () => {
		randomColors = false;
		toBlackColors = false;
		toWhiteColors = false;
	});

	randomColorsBtn.addEventListener('click', ()=> {
		randomColors = true;
		toBlackColors = false;
		toWhiteColors = false;
	});

	toBlackBtn.addEventListener('click', () => {
		randomColors = false;
		toBlackColors = true;
		toWhiteColors = false;
	});

	toWhiteBtn.addEventListener('click', () => {
		randomColors = false;
		toBlackColors = false;
		toWhiteColors = true;
	});	

	
	if (randomColors) {
		let red = Math.floor(Math.random() * 255);
		let green = Math.floor(Math.random() * 255);
		let blue = Math.floor(Math.random() * 255);	
		
		return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
	}

	if (toBlackColors) {
		colorBtn.value = LightenDarkenColor(colorBtn.value, -1);
		return colorBtn.value;
	}
	if (toWhiteColors) {
		colorBtn.value = LightenDarkenColor(colorBtn.value, 1);		
		return colorBtn.value;
	}
	
	return colorBtn.value;
}




function paint(color) {
	let cells = document.querySelectorAll('.cell');

	cells.forEach((cell) => {
		cell.addEventListener('mouseover', () => {
			let color = SetColor();				
			cell.style.background = color;						
		});	
	});
}

function clearBoard () {
	let rows = document.querySelectorAll('.row');
	if (rows.length != 0) {
		for (let i = 0; i < rows.length; i++) {
			board.removeChild(rows[i]);
		}		
	}	
}

function addCells() {
	let square = prompt('Cols and Rows', 10);
	while (square > 100 || square < 10) {
		alert('cells is [10..100]');
		square = prompt('Cols and Rows', 10);
	}
	return square;
}

function drawCells(square) {
	let board = document.querySelector('.board');
	for (let i = 0; i < square; i++) {
		let row = document.createElement('div');
		row.classList.add('row');
		board.appendChild(row);
		for (let j = 0; j < square; j++) {
			let cell = document.createElement('div');
			cell.classList.add('cell');
			 if (square > 60) {
			 	cell.style.width =  5 + 'px';
			 	cell.style.height =  5 + 'px';
			 } else if (square > 40) {
			 	cell.style.width =  10 + 'px';
			 	cell.style.height =  10 + 'px';
			} else if (square > 20) {
			 	cell.style.width =  15 + 'px';
			 	cell.style.height =  15 + 'px';
			 } else {
			 	cell.style.width =  20 + 'px';
			 	cell.style.height =  20 + 'px';
			 }

			row.appendChild(cell);
		}
	}
}

function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}