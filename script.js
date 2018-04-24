var TurnoActual = "X", SiguienteTurno = "O", VS_COM = 1, MasterCount=0, GanadorT=0, Victorias_X=0, Victorias_O=0, Empates=0;
var tablero, winCombos;

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
	MasterCount=0
	GanadorT=0;
	winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
tablero = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
	document.getElementById('La_Tabla').style.filter="blur(0px)";
	document.getElementById("overlay").style.display = "none";
	document.querySelector(".endgame").style.display = "none";

	for (var i = 0; i < cells.length; i++){
		cells [i].innerText = '';
		cells [i].style.removeProperty('background-color');
		cells [i].addEventListener('click', turnClick, false);
	}
	if(TurnoActual=="O" && VS_COM==1)
	Logica_CPU();
}

function turnClick(square) {
	var aidi=square.target.id;
	if(cells[aidi].innerText != 'X' && cells[aidi].innerText != 'O'){
	if(TurnoActual=="X"){
	cells[aidi].innerText = 'X';
	var targete= tablero.indexOf(aidi);
tablero[targete]="X";
TurnoActual="O";
SiguienteTurno="X";
	checale(aidi);
if(VS_COM==1 && MasterCount<9){
	Logica_CPU();
}
}
else if(TurnoActual=="O"){
	cells[aidi].innerText = 'O';
	var targete= tablero.indexOf(aidi);
tablero[targete]="O";
TurnoActual="X";
SiguienteTurno="O";
checale(aidi);
}
}
}

function checale(aidi){
	MasterCount++;

	for (var i=0; i < winCombos.length; i++){
		if(winCombos[i][0]==aidi)
			winCombos[i][0]=SiguienteTurno;
		else if(winCombos[i][1]==aidi)
			winCombos[i][1]=SiguienteTurno;
		else if(winCombos[i][2]==aidi)
			winCombos[i][2]=SiguienteTurno;
	    if(winCombos[i][0]==SiguienteTurno && winCombos[i][1]==SiguienteTurno && winCombos[i][2]==SiguienteTurno){
			GanadorT=SiguienteTurno;
		Ganador();
	}
	}
		if(MasterCount==9)
		Empate();
	console.log(cells[0].innerText);
}

function Ganador(){
	if(GanadorT=="X"){
		Victorias_X++;
	document.getElementById("scoreX").innerText=Victorias_X;
}
else{
	Victorias_O++;
	document.getElementById("scoreO").innerText=Victorias_O;
}
	document.getElementById("overlay").style.display = "block";
	document.getElementById("text").innerText="El ganador es: " + GanadorT + "!!";
	document.getElementById('La_Tabla').style.filter="blur(5px)";
}

function Empate(){
	Empates++;
	document.getElementById("empates").innerText=Empates;
	document.getElementById("overlay").style.display = "block";
	document.getElementById("text").innerText="Empate...";
	document.getElementById('La_Tabla').style.filter="blur(5px)";
}

function Logica_CPU(){
	var X_EnMismaLinea=0, O_EnMismaLinea=0;
	var SelecciondeJugada_Lista=false;
	var CasillaSeleccionada=9, CasillaParaGanar=9, CasillaParaNoPerder=9, CasillaParaSegundoCirculo=9, CasillaParaSeguirJugando=9;

	if(GanadorT==0){
	 if(MasterCount<=1){
	 	while(CasillaSeleccionada==9||CasillaSeleccionada=="X")
		CasillaSeleccionada=tablero[Math.floor(Math.random()*tablero.length)];

		SelecciondeJugada_Lista=true;
	}

	for (var i=0; i < winCombos.length; i++){
		if(SelecciondeJugada_Lista==true)
			break;
		else{
		X_EnMismaLinea=0;
		O_EnMismaLinea=0;
		for(var j=0; j< winCombos[i].length; j++ ){
			if(winCombos[i][j]=="X")
			X_EnMismaLinea++;
		else if(winCombos[i][j]=="O")
			O_EnMismaLinea++;
		else
		CasillaSeleccionada=winCombos[i][j];

	}

	       if(X_EnMismaLinea==0&&O_EnMismaLinea==2)
	      SelecciondeJugada_Lista=true;
         if(X_EnMismaLinea==2&&O_EnMismaLinea==0)
            CasillaParaNoPerder=CasillaSeleccionada;
		if(X_EnMismaLinea==0&&O_EnMismaLinea==1)
			CasillaParaSegundoCirculo=CasillaSeleccionada;
		if(X_EnMismaLinea<=1&&O_EnMismaLinea==1)
			CasillaParaSeguirJugando=CasillaSeleccionada;
	}
	}
	if(SelecciondeJugada_Lista==false){
		if(CasillaParaNoPerder<9)
			CasillaSeleccionada=CasillaParaNoPerder;
	     else if(CasillaParaSegundoCirculo<9)
			CasillaSeleccionada=CasillaParaSegundoCirculo;
		else
			CasillaSeleccionada=CasillaParaSeguirJugando;
	}

	tablero[CasillaSeleccionada]="O";
	cells[CasillaSeleccionada].innerText = 'O';
	TurnoActual="X";
SiguienteTurno="O";
	checale(CasillaSeleccionada);
}
}

function SwitchPlayers(){
	if(VS_COM==1){
	document.getElementById('VS').innerText="Player vs player";
	document.getElementById('El_Switch').innerText="Player vs CPU";
	VS_COM=0;
}
else if(VS_COM==0){
	document.getElementById('VS').innerText="Player vs CPU";
	document.getElementById('El_Switch').innerText="Player vs Player";
	VS_COM=1;
}
Victorias_X=0;
Victorias_O=0;
Empates=0;
document.getElementById("scoreX").innerText=Victorias_X;
document.getElementById("scoreO").innerText=Victorias_O;
document.getElementById("empates").innerText=Empates;
	startGame();
}