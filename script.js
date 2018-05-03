var TurnoActual = 'X'; 
var SiguienteTurno = 'O'; 
var VsCOM = true;
var ContadorDeTurnos = 0;
var GanadorT = 0;
var VictoriasX = 0;
var VictoriasO = 0;
var Empates = 0;
var winCombos = [];

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
	IniciadorDeVariables();
	PrepararTablero();

	if (TurnoActual === 'O' && (VsCOM)){
		LogicaCPU();
	}
};

function turnClick(square) {
	var aidi = square.target.id;
	if (cells[aidi].innerText !== 'X' && cells[aidi].innerText !== 'O'){
		if (TurnoActual === 'X'){
			DibujaX(aidi);
			VerSiHayGanador(aidi);
			if (VsCOM === true && ContadorDeTurnos<9){
				LogicaCPU();
			}
		} else if (TurnoActual === 'O'){
			DibujaO(aidi);
			VerSiHayGanador(aidi);
		}
	}
};

function DibujaX(aidiEnX){
    cells[aidiEnX].innerText = 'X';
	var targete = cells[aidiEnX.innerText];

	TurnoActual = 'O';
	SiguienteTurno = 'X';
};

function DibujaO(aidiEnO){
	cells[aidiEnO].innerText = 'O';
	var targete = cells[aidiEnO].id;

	TurnoActual = 'X';
	SiguienteTurno = 'O';
};

function VerSiHayGanador(aidi){
	ContadorDeTurnos++;

	for (var i = 0; i < winCombos.length; i++){
		if (winCombos[i][0] === aidi){
			winCombos[i][0] = SiguienteTurno;
		} else if (winCombos[i][1] === aidi){
			winCombos[i][1] = SiguienteTurno;
		} else if (winCombos[i][2] === aidi){
			winCombos[i][2] = SiguienteTurno;
		}
	    if (winCombos[i][0] === SiguienteTurno && winCombos[i][1] === SiguienteTurno && winCombos[i][2] === SiguienteTurno){
			GanadorT = SiguienteTurno;
			Ganador();
		}
	}

	if (ContadorDeTurnos === 9){
		Empate();
	}
};

function IniciadorDeVariables(){
	ContadorDeTurnos = 0;
	GanadorT = 0;
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

function PrepararTablero(){
	document.getElementById('La_Tabla').style.filter = 'blur(0px)';
	document.getElementById('overlay').style.display = 'none';
	document.querySelector('.endgame').style.display = 'none';

	for (var i = 0; i < cells.length; i++){
		cells [i].innerText = '';
		cells [i].style.removeProperty('background-color');
		cells [i].addEventListener('click', turnClick, false);
	}
};

function Ganador(){
	if (GanadorT === 'X'){
		VictoriasX++;
		document.getElementById('scoreX').innerText = VictoriasX;
	} else {
		VictoriasO++;
		document.getElementById('scoreO').innerText = VictoriasO;
	}
	document.getElementById('overlay').style.display = 'block';
	document.getElementById('text').innerText = 'El ganador es: ' + GanadorT + '!!';
	document.getElementById('La_Tabla').style.filter = 'blur(5px)';
};

function Empate(){
	Empates++;
	document.getElementById('empates').innerText = Empates;
	document.getElementById('overlay').style.display = 'block';
	document.getElementById('text').innerText = 'Empate...';
	document.getElementById('La_Tabla').style.filter = 'blur(5px)';
};

function LogicaCPU(){
	var CasillaSeleccionada = 9;

	if (GanadorT === 0){
		if (ContadorDeTurnos <= 1){
	 		while (CasillaSeleccionada === 9 || cells[CasillaSeleccionada].innerText === 'X'){
				CasillaSeleccionada = cells[Math.floor(Math.random() * cells.length)].id;
			}

			SelecciondeJugadaLista = true;
		} else {
			CasillaSeleccionada=RevisarTablero();
		}
	
		cells[CasillaSeleccionada].innerText = 'O';
		TurnoActual = 'X';
		SiguienteTurno = 'O';
		VerSiHayGanador(CasillaSeleccionada);
	}
};

function SwitchPlayers(){
	if (VsCOM){
		document.getElementById('VS').innerText = 'Player vs player';
		document.getElementById('El_Switch').innerText = 'Player vs CPU';
		VsCOM = false;
	} else if (!(VsCOM)){
		document.getElementById('VS').innerText = 'Player vs CPU';
		document.getElementById('El_Switch').innerText = 'Player vs Player';
		VsCOM = true;
	}
	VictoriasX = 0;
	VictoriasO = 0;
	Empates = 0;
	document.getElementById('scoreX').innerText = VictoriasX;
	document.getElementById('scoreO').innerText = VictoriasO;
	document.getElementById('empates').innerText = Empates;
	startGame();
};

function RevisarTablero(){
	var XEnMismaLinea = 0;
	var OEnMismaLinea = 0;
	var SelecciondeJugadaLista = false;
	var	CasillaParaEntregar = 9;
	var NivelPrioridad = 4;
	var PosibleCasilla = 9;
	var NuevoNivel = 0;

	for (var i = 0; i < winCombos.length; i++){
		if (SelecciondeJugadaLista){
			break;
		} else {
			XEnMismaLinea = 0;
			OEnMismaLinea = 0;

		for (var j = 0; j < winCombos[i].length; j++ ){
			if (winCombos[i][j] === 'X'){
				XEnMismaLinea++;
			} else if (winCombos[i][j] === 'O'){
				OEnMismaLinea++;
			} else {
				PosibleCasilla = winCombos[i][j];
			}
	}
		   NuevoNivel = ResolucionDeCombinaciones (XEnMismaLinea, OEnMismaLinea);
	       if (NivelPrioridad >= NuevoNivel){
	        	 NivelPrioridad = NuevoNivel
	        	 CasillaParaEntregar = PosibleCasilla;
	       }
	   }
	}
	return CasillaParaEntregar;
};

function ResolucionDeCombinaciones (XInterna, OInterna){
	var PrioridadInterna = 0;

	if (XInterna === 0 && OInterna === 2){
	    PrioridadInterna = 1;
	} else if (XInterna === 2 && OInterna === 0){
		PrioridadInterna = 2;
	} else if (XInterna === 0 && OInterna === 1){
		PrioridadInterna = 3;
	} else {  
		PrioridadInterna = 4;
	}

	return PrioridadInterna;

};
