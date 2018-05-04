var CurrentTurn = 'X'; 
var NextTurn = 'O'; 
var VsCOM = true;
var TurnsCounter = 0;
var Winner = "Still no one";
var XVictories = 0;
var OVictories = 0;
var TiesCounter = 0;
var winCombos = [];

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
	VariableInitiator();
	PrepareBoard();

	if (CurrentTurn === 'O' && (VsCOM)){
		CPUsLogic();
	}
};

function turnClick(square) {
	var SelectedCell = square.target.id;
	if (cells[SelectedCell].innerText !== 'X' && cells[SelectedCell].innerText !== 'O'){
		if (CurrentTurn === 'X'){
			SetX(SelectedCell);
			CheckForWinner(SelectedCell);
			if (VsCOM === true && TurnsCounter<9){
				CPUsLogic();
			}
		} else if (CurrentTurn === 'O'){
				SetO(SelectedCell);
				CheckForWinner(SelectedCell);
		}
	}
};

function SetX(xCell){
  cells[xCell].innerText = 'X';
	var targete = cells[xCell.innerText];

	CurrentTurn = 'O';
	NextTurn = 'X';
};

function SetO(oCell){
	cells[oCell].innerText = 'O';
	var targete = cells[oCell].id;

	CurrentTurn = 'X';
	NextTurn = 'O';
};

function CheckForWinner(SelectedCell){
	TurnsCounter++;

	for (var i = 0; i < winCombos.length; i++){
		if (winCombos[i][0] === SelectedCell){
			winCombos[i][0] = NextTurn;
		} else if (winCombos[i][1] === SelectedCell){
			winCombos[i][1] = NextTurn;
		} else if (winCombos[i][2] === SelectedCell){
			winCombos[i][2] = NextTurn;
		}
	    if (winCombos[i][0] === NextTurn && winCombos[i][1] === NextTurn && winCombos[i][2] === NextTurn){
			Winner = NextTurn;
			SomebodyWon();
		}
	}

	if (TurnsCounter === 9){
		ItsATie();
	}
};

function VariableInitiator(){
	TurnsCounter = 0;
	Winner = "Still no one";
	winCombos = [
	['0', '1', '2'],
	['3', '4', '5'],
	['6', '7', '8'],
	['0', '3', '6'],
	['1', '4', '7'],
	['2', '5', '8'],
	['0', '4', '8'],
	['2', '4', '6']
]
};

function PrepareBoard(){
	document.getElementById('Table').style.filter = 'blur(0px)';
	document.getElementById('Overlay').style.display = 'none';
	document.querySelector('.endgame').style.display = 'none';

	for (var i = 0; i < cells.length; i++){
		cells [i].innerText = '';
		cells [i].style.removeProperty('background-color');
		cells [i].addEventListener('click', turnClick, false);
	}
};

function SomebodyWon(){
	if (Winner === 'X'){
		XVictories++;
		document.getElementById('scoreX').innerText = XVictories;
	} else {
		OVictories++;
		document.getElementById('scoreO').innerText = OVictories;
	}
	document.getElementById('Overlay').style.display = 'block';
	document.getElementById('text').innerText = 'The winner is: ' + Winner + '!!';
	document.getElementById('Table').style.filter = 'blur(5px)';
};

function ItsATie(){
	TiesCounter++;
	document.getElementById('TiesID').innerText = TiesCounter;
	document.getElementById('Overlay').style.display = 'block';
	document.getElementById('text').innerText = 'Empate...';
	document.getElementById('Table').style.filter = 'blur(5px)';
};

function CPUsLogic(){
	var ChoosenCell = 9;

	if (Winner === "Still no one"){
		if (TurnsCounter <= 1){
	 		while (ChoosenCell === 9 || cells[ChoosenCell].innerText === 'X'){
				ChoosenCell = cells[Math.floor(Math.random() * cells.length)].id;
			}

			PlayReady = true;
		} else {
			ChoosenCell=CheckBoard();
		}
	
		cells[ChoosenCell].innerText = 'O';
		CurrentTurn = 'X';
		NextTurn = 'O';
		CheckForWinner(ChoosenCell);
	}
};

function GameMode(){
	if (VsCOM){
		document.getElementById('VS').innerText = 'Player vs Player';
		document.getElementById('Switch').innerText = 'Player vs CPU';
		VsCOM = false;
	} else if (!(VsCOM)){
		document.getElementById('VS').innerText = 'Player vs CPU';
		document.getElementById('Switch').innerText = 'Player vs Player';
		VsCOM = true;
	}
	XVictories = 0;
	OVictories = 0;
	TiesCounter = 0;
	document.getElementById('scoreX').innerText = XVictories;
	document.getElementById('scoreO').innerText = OVictories;
	document.getElementById('TiesID').innerText = TiesCounter;
	startGame();
};

function CheckBoard(){
	var XAtSameLine = 0;
	var OAtSameLine = 0;
	var PlayReady = false;
	var	CelltoReturn = 9;
	var PriorityLevel = 4;
	var PossibleCell = 9;
	var NewLevel = 0;

	for (var i = 0; i < winCombos.length; i++){
		if (PlayReady){
			break;
		} else {
			XAtSameLine = 0;
			OAtSameLine = 0;

		for (var j = 0; j < winCombos[i].length; j++ ){
			if (winCombos[i][j] === 'X'){
				XAtSameLine++;
			} else if (winCombos[i][j] === 'O'){
				OAtSameLine++;
			} else {
				PossibleCell = winCombos[i][j];
			}
	}
		   NewLevel = CombosResolution (XAtSameLine, OAtSameLine);
	       if (PriorityLevel >= NewLevel){
	        	 PriorityLevel = NewLevel
	        	 CelltoReturn = PossibleCell;
	       }
	   }
	}
	return CelltoReturn;
};

function CombosResolution (InternX, InternO){
	var InternPriority = 0;

	if (InternX === 0 && InternO === 2){
	    InternPriority = 1;
	} else if (InternX === 2 && InternO === 0){
		InternPriority = 2;
	} else if (InternX === 0 && InternO === 1){
		InternPriority = 3;
	} else {  
		InternPriority = 4;
	}

	return InternPriority;

};
