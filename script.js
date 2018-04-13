var origBoard;
var turn = 1;
const huPlayer = '0';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none"
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++){
		cells [i].innerText = '';
		cells [i].style.removeProperty('background-color');
		cells [i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	console.log(square.target.id);
	if(turn==1){
	cells[square.target.id].innerText = 'X';
	turn=2;
}
else if(turn==2){
	cells[square.target.id].innerText = 'O';
	turn=1;
}
checale();
}

function checale(){
	console.log('checando');

}