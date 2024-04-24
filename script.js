
var indiceActual = new Array(1);

axios.get('https://leonardoapi.onrender.com/songs')
  .then(function (response) {
    const canciones = response.data.songs.map(song => `${song.title} - ${song.author}`);
    const listado = crearPlayList(canciones);
    document.getElementById('playList').appendChild(listado);

    var listadoMusica= document.getElementById('listadoMusica');
    listadoMusica.onclick = (e) =>{
      const itemClick = e.target;
      removeActive();
      itemClick.classList.add("active");
      reproduccionActual(itemClick.innerText);
      loadMusic(itemClick.innerText);
      player.play();
      indiceActual[0]= e.target.id;
      classIconPlay();
    };

    loadMusic(canciones[0]);
  })
  .catch(function (error) {
    console.log(error);
  });

function crearPlayList(canciones) {
  const listado = document.createElement('ol');
  listado.setAttribute("id", 'listadoMusica');
  canciones.forEach((cancion, index) => {
    const item = document.createElement('li');
    item.appendChild(document.createTextNode(cancion));
    item.setAttribute("id", index);
    listado.appendChild(item);
  });
  return listado;
}
document.getElementById('playList').appendChild(crearPlayList())

var listadoMusica= document.getElementById('listadoMusica')
listadoMusica.onclick = (e) =>{
	const itemClick = e.target
	removeActive()
	itemClick.classList.add("active");
	reproduccionActual(itemClick.innerText)
	loadMusic(itemClick.innerText)
	player.play()
	indiceActual[0]= e.target.id
	classIconPlay();

}

function classIconPlay(){
	var element = document.getElementById("iconPlay")
	element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
}

const volumen= document.getElementById("volumen")
volumen.oninput= (e) =>{
	const vol = e.target.value
	player.volume =vol
}

const updateProgress = () =>{
	if (player.currentTime >0){
		const barra = document.getElementById('progress')
		barra.value = (player.currentTime / player.duration) * 100
		
		var duracionSegundos= player.duration.toFixed(0);
		dura=secondsToString(duracionSegundos);
		var actualSegundos = player.currentTime.toFixed(0)
		actual=secondsToString(actualSegundos);
		
		duracion= actual +' / '+ dura
		document.getElementById('timer').innerText=duracion 
	}
	if (player.ended){
		nextMusic();
	} 
}

function nextMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (canciones.length == (musicaActual+1)){
		var siguiente = 0
	} else {
		var siguiente = musicaActual + 1
	}
	removeActive()
	var item=document.getElementById(siguiente)
	item.classList.add("active");
	loadMusic(canciones[siguiente]);
	player.play()
	indiceActual[0]= siguiente
	reproduccionActual(canciones[siguiente])
	classIconPlay()
}

function prevMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (musicaActual==0){
		var anterior= canciones.length - 1
	} else {
		var anterior = musicaActual - 1
	}
	removeActive()
	var item=document.getElementById(anterior)
	item.classList.add("active");
	loadMusic(canciones[anterior]);
	player.play()
	indiceActual[0]= anterior
	reproduccionActual(canciones[anterior])
	classIconPlay()
}

function removeActive(){
	var elems = document.querySelectorAll(".active");
 	 [].forEach.call(elems, function(el) {
    	el.classList.remove("active");
 	 });
 	 return elems
}

function reproduccionActual(texto){
	var nombreSinExtension = texto.replace('.mp3', '');
	document.getElementById('currentPlay').innerText = nombreSinExtension;
}

function loadMusic(ruta){
	var source = document.getElementById('source')
	var folder ="audio";
	source.src= folder+"/"+ruta
	var index= indiceActual[0]= canciones.indexOf(ruta)
	removeActive()
	var item=document.getElementById(index)
	item.classList.add("active");
	reproduccionActual(ruta)
	player.load()
}

function togglePlay() {
	var leftWheel = document.querySelector('.left');
	var rightWheel = document.querySelector('.right');
  
	if (player.paused){
	  toggleIcon();
  

	  leftWheel.classList.add('rotate');
	  rightWheel.classList.add('rotate');
  
	  return player.play();
	} else {
	  toggleIcon();
  

	  leftWheel.classList.remove('rotate');
	  rightWheel.classList.remove('rotate');
  
	  return player.pause();
	}
  }

function toggleIcon() {
   var element = document.getElementById("iconPlay");
   element.classList.toggle("fa-pause-circle");
   element.classList.toggle("fa-play-circle");
}

progress.addEventListener('click', adelantar);
function adelantar(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
	player.currentTime = scrubTime;
	sonsole.log(e);
}

function secondsToString(seconds) {
	var hour="";
	if (seconds>3600){
		hour = Math.floor(seconds / 3600);
		hour = (hour < 10)? '0' + hour : hour;
		hour+=":"
	}
   var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  var second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return hour  + minute + ':' + second;
}
loadMusic(canciones[0])

function toggleArrow() {
	var upArrow = document.getElementById("upArrow");
	var downArrow = document.getElementById("downArrow");
	
	upArrow.classList.toggle("fa-angle-up");
	upArrow.classList.toggle("fa-angle-down");
	
	downArrow.classList.toggle("fa-angle-down");
	downArrow.classList.toggle("fa-angle-up");
  }


var toggleButton = document.querySelector('#toggleButton');


var scrollPosition = 0;

toggleButton.addEventListener('click', function() {

  var playList = document.querySelector('#playList');
  
  if (playList.style.height === '270px') {

    playList.style.height = '0';

    window.scrollTo(0, scrollPosition);
  } else {
    playList.style.height = '270px';

    scrollPosition = window.pageYOffset;

    window.scrollTo(0, playList.offsetTop);

	playList.style.overflow = 'auto';
  }
  
   toggleArrow();
});