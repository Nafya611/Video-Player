//define constants
const playButton=document.getElementById('play-btn');
const player=document.querySelector('.player');
const video =document.querySelector('.video');
const ProgressRange =document.querySelector('.progress-range');
const progressBar=document.querySelector('.progress-bar');
const volumeIcon=document.getElementById('volume-icon'); 
const volumeRange=document.querySelector('.volume-range');
const volumeBar=document.querySelector('.volume-bar');
const currentTime=document.querySelector('.time-elapsed');
const duration=document.querySelector('.time-duration');
const fullscreenBtn=document.querySelector('.fullscreen');
const playingSpeed=document.querySelector('.player-speed');



//define variables
 let cur=``;



  




// Play & Pause ----------------------------------- //
function togglePlay(){

if(video.paused){
  video.play();
  playButton.setAttribute('class','fa-solid fa-stop');
   playButton.title='stop';

}else{
  video.pause();
  playButton.setAttribute('class','fas fa-play');
  playButton.title='play';
 
}

};

//on video end
video.addEventListener('ended',()=>{
  playButton.setAttribute('class','fas fa-play');
});


// Progress Bar ---------------------------------- //


//calculate display time format
function displayTime(time){
  const minutes =Math.floor(time/60);
  let  seconds=Math.floor(time%60);
  seconds=seconds>9?seconds:`0${seconds}`;
  return `${minutes}:${seconds}`;

}

//update progress bar as the video plays
function updateProgress(){
  cur=`${(video.currentTime/video.duration)*100}%`;
  progressBar.style.width=cur;
  currentTime.textContent=displayTime(video.currentTime)+'/';
  duration.textContent=displayTime(video.duration);

}
//click to seek the video
function setProgress(e){
  const newTime=e.offsetX/ProgressRange.offsetWidth;
  progressBar.style.width=`${newTime*100}%`;
  video.currentTime=newTime*video.duration;
 

}





// Volume Controls --------------------------- //
// mute and unmute sound
function toggleMute(){
   if (video.muted==false) {
     video.muted=true;
     volumeIcon.setAttribute('class','fa-solid fa-volume-xmark');
     } else
      {
       video.muted=false;
       volumeIcon.setAttribute('class','fa-solid fa-volume-high vol');

      }

     }

     //click to seek volume

     function setVolume(e){
      const vol=e.offsetX/volumeRange.offsetWidth;
      volumeBar.style.width=`${vol*100}%`;
      video.volume=Math.floor(vol*10)/10;
      if(video.volume==0){
         volumeIcon.setAttribute('class','fa-solid fa-volume-xmark');

      }else if(video.volume>0&&video.volume<=0.5){
        volumeIcon.setAttribute('class','fa-solid fa-volume-low');
        }
      else{
        volumeIcon.setAttribute('class','fa-solid fa-volume-high vol');


      }

     

     }


// Change Playback Speed -------------------- //
function setSpeed(e){
 video.playbackRate = e.target.value;
 
}




// Fullscreen ------------------------------- //
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) { /* Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { /* IE11 */
    element.msRequestFullscreen();
  }
  element.classList.add('video-fullscreen');
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(video);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}


//add Event Listeners
playButton.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
ProgressRange.addEventListener('click',setProgress);
volumeIcon.addEventListener('click',toggleMute);
volumeRange.addEventListener('click',setVolume);
playingSpeed.addEventListener('change',setSpeed);
fullscreenBtn.addEventListener('click',toggleFullscreen);