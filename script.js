var origBoard;
var turn = "X", nexT = "O";
var tablero = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
const huPlayer = 'O';
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

/*var casillas = [
{numero:0, activo:0}
]*/

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	//origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++){
		cells [i].innerText = '';
		cells [i].style.removeProperty('background-color');
		cells [i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if(cells[square.target.id].innerText != 'X' && cells[square.target.id].innerText != 'O'){
	if(turn=="X"){
	cells[square.target.id].innerText = 'X';
	var targete= tablero.indexOf(square.target.id);
tablero[targete]="X";
turn="O";
nexT="X";
}
else if(turn=="O"){
	cells[square.target.id].innerText = 'O';
	var targete= tablero.indexOf(square.target.id);
tablero[targete]="O";
turn="X";
nexT="O";
}

console.log("aqui esta el tablero" + tablero);
checale(square, turn);
}
}

function checale(square, turn){
	for (var i=0; i < winCombos.length; i++){
		if(winCombos[i][0]==square.target.id)
			winCombos[i][0]=nexT;
		else if(winCombos[i][1]==square.target.id)
			winCombos[i][1]=nexT;
		else if(winCombos[i][2]==square.target.id)
			winCombos[i][2]=nexT;
		if(winCombos[i][0]==nexT && winCombos[i][1]==nexT && winCombos[i][2]==nexT )
		Ganador();
	}
	console.log(winCombos);
}

function Ganador(){
	alert("El ganador es: " + nexT + "!!");

}