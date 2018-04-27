var TurnoActual = "X", SiguienteTurno = "O", VS_COM = 1, MasterCount=0, GanadorT=0, Victorias_X=0, Victorias_O=0, Empates=0;
var winCombos;

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
	var targete= cells[aidi.innerText];

TurnoActual="O";
SiguienteTurno="X";
	checale(aidi);
if(VS_COM==1 && MasterCount<9){
	Logica_CPU();
}
}
else if(TurnoActual=="O"){
	cells[aidi].innerText = 'O';
	var targete= cells[aidi].id;

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
	var CasillaSeleccionada=9;

	if(GanadorT==0){
	 if(MasterCount<=1){
	 	while(CasillaSeleccionada==9||CasillaSeleccionada=="X"){
		CasillaSeleccionada=cells[Math.floor(Math.random()*cells.length)].id;
	}

		SelecciondeJugada_Lista=true;
	}

else
	CasillaSeleccionada=RevisarTablero();

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

function RevisarTablero(){
		var X_EnMismaLinea=0, O_EnMismaLinea=0;
		var SelecciondeJugada_Lista=false;
		var	CasillaParaEntregar=9, Nivel_Prioridad=4, PosibleCasilla, NuevoNivel;

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
		PosibleCasilla=winCombos[i][j];
	}
		   NuevoNivel=ResolucionDeCombinaciones (X_EnMismaLinea, O_EnMismaLinea);
	       if(Nivel_Prioridad>NuevoNivel){
	         Nivel_Prioridad=NuevoNivel
	         CasillaParaEntregar=PosibleCasilla;
	       }
	   }

	}

	return CasillaParaEntregar;
}

function ResolucionDeCombinaciones (XInterna, OInterna){
	var PrioridadInterna;

	     if(XInterna==0&&OInterna==2)
	     	PrioridadInterna=1;

    else if(XInterna==2&&OInterna==0)
			PrioridadInterna=2;

	else if(XInterna==0&&OInterna==1)
			PrioridadInterna=3;

	else  
			PrioridadInterna=4;

		return PrioridadInterna;

}