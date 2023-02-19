const play = document.querySelector('.play');
const song = document.querySelector('.song');
const track = document.querySelector('.range');
const cover = document.querySelector('.cover');
const length = document.querySelector('.length');
const indi = document.querySelector('.indi');

let durationSec , durationMin;
let currentSec , currentMin;

song.onloadeddata = ()=> {
   //song duration in secend 
   durationSec = parseInt(song.duration % 60);
   //song duration in minutes
   durationMin = parseInt(song.duration / 60);
   //set range max value to song duration
   track.max = Math.floor(song.duration);
   durationMin = durationMin < 10 ? '0' + durationMin : durationMin;
   durationSec = durationSec < 10 ? '0' + durationSec : durationSec;
   //set song lenght
   length.children[1].innerText = `${durationMin}:${durationSec}`;
   
   update();
}

//Play and pause buttons
play.addEventListener('click',laod);
function laod(){
  //checking...
  if(play.classList.contains('bi-play')){
     play.classList.remove('bi-play');
     play.classList.add('bi-pause');
     song.play();
     cover.classList.add('coverpic');
     indi.innerText = 'Playing';
   }else {
     play.classList.add('bi-play');
     play.classList.remove('bi-pause');
     song.pause();
     cover.classList.remove('coverpic');
     indi.innerText = 'Pause';
   };
 }

//when song forword
track.addEventListener('input',(e)=> {
   //set song currentTime to range value
   song.currentTime = e.target.value;
   song.play();
   indi.innerText = 'Playing';
   play.classList.add('bi-play');
     setTimeout(() => {
       play.classList.remove('bi-play');
       play.classList.add('bi-pause');
     },100);
  
   update();
});

//Update time and track
function update(){
   track.value = song.currentTime;
   //set minutes and secends
   currentSec = parseInt(song.currentTime % 60);
   currentMin = parseInt(song.currentTime / 60);
  
   currentSec = currentSec < 10 ? '0' + currentSec : currentSec;
   currentMin = currentMin < 10 ? '0' + currentMin : currentMin;
   //Update minutes and secends
   length.children[0].innerText = `${currentMin}:${currentSec}`;
   
   if(song.currentTime === song.duration){
     cover.classList.remove('coverpic');
     indi.innerText = 'Music';
     play.classList.remove('bi-pause');
     play.classList.add('bi-play');
   }
}
setInterval(update,999);

//Darkmood toggle
const main = document.querySelector('.main');
const mood = document.querySelector('.darkmood');
mood.addEventListener('click',()=> {
  main.classList.toggle('active');
  
  if (mood.classList.contains('bi-moon')) {
    mood.classList.remove('bi-moon');
    mood.classList.add('bi-brightness-high');
    mood.style.justifyContent = 'right';
  }else {
    mood.classList.remove('bi-brightness-high');
    mood.classList.add('bi-moon');
    mood.style.justifyContent = 'left';
  };
},false);
/*
Using Previos and Next btns for skip 10s...
*/
const forword = document.querySelector('.forword');
const backword = document.querySelector('.backword');
//ForWord
forword.addEventListener('click',()=>{
  song.currentTime += 10;
  update();
});
//BackWord
backword.addEventListener('click', () => {
  song.currentTime -= 10;
  update();
});

//kshapi