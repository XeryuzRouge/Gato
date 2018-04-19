var turn = "X", nexT = "O", CPU = 1, MasterCount=0;
var tablero = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
var JugadaPrincipal = ["0", "2", "6", "8"];
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
	document.querySelector(".endgame").style.display = "none";
	for (var i = 0; i < cells.length; i++){
		cells [i].innerText = '';
		cells [i].style.removeProperty('background-color');
		cells [i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	var aidi=square.target.id;
	if(cells[aidi].innerText != 'X' && cells[aidi].innerText != 'O'){
	if(turn=="X"){
	cells[aidi].innerText = 'X';
	var targete= tablero.indexOf(aidi);
tablero[targete]="X";
turn="O";
nexT="X";
if(CPU==1)
	checale(aidi, turn);
	Automata();
}
else if(turn=="O"){
	cells[aidi].innerText = 'O';
	var targete= tablero.indexOf(aidi);
tablero[targete]="O";
turn="X";
nexT="O";
checale(aidi, turn);
}
}
}

function checale(aidi, turn){
	MasterCount++;
	for (var i=0; i < winCombos.length; i++){
		if(winCombos[i][0]==aidi)
			winCombos[i][0]=nexT;
		else if(winCombos[i][1]==aidi)
			winCombos[i][1]=nexT;
		else if(winCombos[i][2]==aidi)
			winCombos[i][2]=nexT;
		if(winCombos[i][0]==nexT && winCombos[i][1]==nexT && winCombos[i][2]==nexT )
		Ganador();
	}
	console.log("MasterCount: " + MasterCount);
}

function Ganador(){
	alert("El ganador es: " + nexT + "!!");

}

function Automata(){
	var Xcount=0;
	var Ocount=0;
	var fuera=0;
	var IDD=9, IDD2=9, IDD3=9, IDD4=9;
	if(tablero[4]==4){
		IDD=4;
		fuera=1;
	}
	else if(MasterCount==1){
		IDD=JugadaPrincipal[Math.floor(Math.random()*JugadaPrincipal.length)];
		fuera=1;
	}
	else
	for (var i=0; i < winCombos.length; i++){
		if(fuera==1)
			break;
		else{
		Xcount=0;
		Ocount=0;
		for(var t=0; t< winCombos[i].length; t++ ){
			if(winCombos[i][t]=="X")
			Xcount++;
		else if(winCombos[i][t]=="O")
			Ocount++;
		else
		IDD=winCombos[i][t];

		console.log(winCombos[i] + " | " + winCombos[i][t] + " | " +Xcount + " | " + Ocount);

	}//for interno

	       if(Xcount==0&&Ocount==2)
	      fuera=1;
         if(Xcount==2&&Ocount==0)
            IDD2=IDD;
		if(Xcount==0&&Ocount==1)
			IDD3=IDD;
		if(Xcount<=1&&Ocount==1)
			IDD4=IDD;
	}//el break
	}//for externo
	console.log("el console" + IDD + " countX " + Xcount);
	if(fuera==0){
		if(IDD2<9)
			IDD=IDD2;
	     else if(IDD3<9)
			IDD=IDD3;
		else
			IDD=IDD4;
	}
console.log(IDD);
	tablero[IDD]="O";
	cells[IDD].innerText = 'O';
	turn="X";
nexT="O";
	checale(IDD, turn);
}