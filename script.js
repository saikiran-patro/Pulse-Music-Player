console.log("js is connected ")
let songList=[]
const playButton=document.getElementById('play');
const nextButton=document.getElementById('next');
const prevButton=document.getElementById('previous')
let currentSongIndex=0;
const getSongs = async function(){
   
    let musicPromise= await fetch("http://127.0.0.1:5500/Songs/Ytmusic/")
   
    let data= await musicPromise.text()
   
    let div= document.createElement("div")
    div.innerHTML=data;

    let music =[];
    div.querySelectorAll("a").forEach((element)=>{

       if(element.getAttribute("href").includes("mp3")){
          music.push(element.getAttribute("href"))
       }

    })
    return music;
}
function convertSecondsToMinutesSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad minutes and seconds with leading zeros if needed
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = remainingSeconds.toString().padStart(2, '0');
  if(isNaN(secondsString) || isNaN(secondsString)){return "00:00"}
  return `${minutesString}:${secondsString}`;
}

function revert(element){
  
  
  element.parentNode.querySelectorAll('.songCard').forEach((eat)=>{
    
    eat.classList.remove('backgroundWhite')
    eat.classList.remove('nowPlaying')
    eat.querySelector('.playCardButton').getElementsByTagName("img")[0].style.display="flex";
    eat.querySelector('.playing').classList.add('hide')
    eat.style.backgroundColor='black';
    eat.querySelector(".songCardDetails").classList.add('textBlue')
  

    
  })

}
function getCurrentSongIndex(){
  const animatedElements=document.querySelectorAll(".playing");
  let currentSongIndex=0;
  for(let animatedElement of animatedElements){
   
    if((animatedElement.getAttribute("class"))==="playing")
    {
       
      return currentSongIndex;
    
      
    }
    currentSongIndex++;
  }
 


}
function playMusic(event,playingSongName, mode="none",prompt="none",srcAi="none"){

  
  


  let songName=(this.querySelector("h3").textContent).trim()
  revert(this)

  this.querySelector(".songCardDetails").classList.add('textBlue');
  this.classList.add('backgroundWhite');
  this.style.borderRadius="10px"
  this.querySelector('.playing').classList.remove('hide')
  this.querySelector('.playCardButton').getElementsByTagName("img")[0].style.display="none";
  playingSongName.src="http://127.0.0.1:5500/Songs/Ytmusic/"+songName
  this.classList.add('nowPlaying')
  playingSongName.play();
  play.firstChild.setAttribute("src","./images/pause.svg")
  
  // Album Song Info
  document.querySelector('.songInfo').children[0].textContent=songName
  document.querySelector('.songInfo').children[1].textContent="Sai Kiran, 2023"

  // setting Song duration
  const startTime=document.querySelector('.startTimeInfo');
  const endTime=document.querySelector('.endTimeInfo');

  playingSongName.addEventListener('timeupdate',()=>{
    // console.log(playingSongName.currentTime)
    // console.log(convertSecondsToMinutesSeconds(playingSongName.currentTime))
    let secondsFormat=convertSecondsToMinutesSeconds(playingSongName.currentTime)
    if(Number(secondsFormat.split('.')[0].split(':')[1])<10)
    {
      secondsFormat= "00:0"+secondsFormat.split('.')[0].split(':')[1]
    }
    else{
      secondsFormat=secondsFormat.split('.')[0]
    }
    startTime.textContent=`${secondsFormat}`
    // console.log(playingSongName.duration)
    // console.log(convertSecondsToMinutesSeconds(playingSongName.duration))
    endTime.textContent=`${convertSecondsToMinutesSeconds(playingSongName.duration).split('.')[0]}`

    document.querySelector('.circle').style.left=((playingSongName.currentTime/playingSongName.duration)*100)+"%"
  })

  const seekBar=document.querySelector(".seekBar");
  const circleNob=document.querySelector('.circle')
   seekBar.addEventListener('dragover',function(e)
  {
      e.preventDefault();                
  })
  seekBar.addEventListener("click", (e) =>{
          let movePercent= (e.offsetX/e.target.getBoundingClientRect().width)*100;
          document.querySelector(".circle").style.left=movePercent+"%";
          playingSongName.currentTime=(movePercent*playingSongName.duration)/100
  })

  seekBar.addEventListener('drop',(e)=>{
    let movePercent= (e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left=movePercent+"%";
    playingSongName.currentTime=(movePercent*playingSongName.duration)/100
   
  })
  circleNob.addEventListener('dragstart',(e)=>{
    console.log("e.target",e.target)
  })
   currentSongIndex=getCurrentSongIndex();
  
}


//menu functionality 
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerMenuLeft = document.querySelector('.hamburger-menu-left')
hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  document.querySelector('.leftContainer').style.left="0%";
  
});
hamburgerMenuLeft.addEventListener('click', () => {

  hamburgerMenu.classList.toggle('active');
  document.querySelector('.leftContainer').style.left="-110%";
})

///
function stopAnimation(playingSongName){
  const animatedElements=document.querySelectorAll(".playing");
  let animatedImg;
  animatedElements.forEach((animatedElement)=>{
    //console.log(animatedElement.getAttribute("class"))
    if((animatedElement.getAttribute("class"))==="playing")
    {
      animatedImg=animatedElement.getElementsByTagName('img')[0]
     // console.log(animatedElement)
      
    }
  })
  //console.log(animatedImg)
  if(playingSongName.paused){
    playingSongName.play();
    play.firstChild.setAttribute("src","./images/pause.svg")
    animatedImg.style.setProperty('animation-play-state', 'running');
  }
  else{

    playingSongName.pause();
    play.firstChild.setAttribute("src","./images/playBlue.svg")
    animatedImg.style.setProperty('animation-play-state', 'paused');

  }

}
async function main(){

  let songs = await getSongs();
  //console.log(songs);
  let playingSongName=new Audio();
  const songFragment= document.createDocumentFragment();
  songs.forEach((song)=>{

    let songName=song.split("Ytmusic/")[1]
    songName=songName.replaceAll("%20"," ");
    let songCard=document.createElement("div");;
    songCard.classList.add("songCard");


    let songIcon=document.createElement("img");
    songIcon.setAttribute("src","./images/Music.svg");
    songIcon.setAttribute("alt","musicicon");
    songIcon.style.width="10%";


    let songCardDetails=document.createElement("div");
    songCardDetails.classList.add("songCardDetails");
    let songTitle=document.createElement("h3");
    songTitle.style.margin="0px";
    songTitle.textContent=songName;
    let songArtistandYear=document.createElement("p");
    songArtistandYear.style.margin="0px";
    songArtistandYear.textContent="Sai Kiran, 2023"
    songCardDetails.appendChild(songTitle);
    songCardDetails.appendChild(songArtistandYear);

    let playCardButton=document.createElement("div");
    playCardButton.classList.add("playCardButton");
    let playCardIcon=document.createElement("img");
    playCardIcon.setAttribute("src","./images/play.svg");
    playCardIcon.setAttribute("alt","playicon");
    playCardButton.appendChild(playCardIcon);

    let musicPlaying=document.createElement("div")
    musicPlaying.classList.add('playing');
    musicPlaying.classList.add('hide')
    let musicPlayerImg=document.createElement("img");
    musicPlayerImg.setAttribute("src","./images/playing.svg")
    musicPlaying.appendChild(musicPlayerImg)

    songCard.appendChild(songIcon);
    songCard.appendChild(songCardDetails);
    songCard.appendChild(musicPlaying);
    songCard.appendChild(playCardButton);
    
   

    // songCard.addEventListener("mouseover", function() {
    // songCard.style.backgroundColor = "#3e54ac";
    // songCard.style.color = "white";
    // });

    
    songCard.addEventListener("click", function(event){
      playMusic.bind(songCard)(event, playingSongName);
    });
  

    songFragment.appendChild(songCard);



 
  })
  let songListsContainer=document.querySelector('.songListsContainer');

  songListsContainer.appendChild(songFragment);
  
  let allSongCards=document.querySelectorAll('.songCard');
  
  // This function will be called when the music finishes playing
  
     playingSongName.onended = () => {
 
    stopAnimation(playingSongName);
  };
  

  play.addEventListener("click",()=>{
   
    stopAnimation(playingSongName)
    
  })
  prevButton.addEventListener("click",()=>{
     
    console.log(getCurrentSongIndex())
   // console.log(songList)
    let songIndex=0
   for(let songCard of allSongCards){
      if(songIndex==getCurrentSongIndex()-1){

        playMusic.bind(songCard)(event, playingSongName);
      }
      songIndex++;

   }
   
   
  })
  nextButton.addEventListener("click",()=>{
     
    let i=getCurrentSongIndex()
   // console.log(songList)
    let songIndex=0
   for(let songCard of allSongCards){
      if(songIndex===i+1){

   
        playMusic.bind(songCard)(event, playingSongName);
      }
      songIndex++;

   }
   
   
  })
  //Volume functionality
  const volumeElement=document.querySelector("#volume")
  const volumeImage=document.querySelector("#volumeImg")
  volumeElement.addEventListener('change',(e)=>{
    if(e.target.value==0){
      volumeImage.setAttribute("src","./images/volumeMute.svg")
    }
    else{
      volumeImage.setAttribute("src","./images/volume.svg")
    }
    playingSongName.volume=e.target.value/100
  })

  // Ai functionality 
  const aiContainer=document.querySelector(".aiContainer");
  const aiGenrateButton=document.querySelector("#aiGenerateButton");
  const audioPlayerContainer=document.querySelector(".audioPlayerContainer");
  const aiAudioLoading=document.querySelector("#aiLoading")
 const musicGen=async function(prompt){

   if(prompt==="") {
    alert("Enter a prompt") 
    return;
   }
  aiAudioLoading.style.display="inline-block";;
  try{
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/musicgen-small",
    {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(prompt),
    });
    const result = await response.blob();
   if(result.type==='application/json'){
    aiAudioLoading.style.display="none";
    alert("Retry with a different prompt")

   }
   else{
    const audioBuffer = result; // Assuming the response directly holds the audio byte data
    const audioBlob = new Blob([audioBuffer], { type: 'audio/wav' }); // Create a Blob object
    const audioUrl = URL.createObjectURL(audioBlob); // Create a temporary URL to access the audio data
    const audio=new Audio(audioUrl)
   
    console.log(audio)
    aiAudioLoading.style.display="none";
    audioPlayerContainer.innerHTML='';
    audioPlayerContainer.appendChild(audio);
    audio.setAttribute("controls",'');
    audio.style.margin="25px auto";
    audio.play(); // Play
  }
  }catch(e){
    alert("Error:")
    return;
  }
  
  
  
 }


  document.querySelector(".aiImage").addEventListener("click",()=>{

    aiContainer.style.display="flex"
    audioPlayerContainer.innerHTML='';
    if(!playingSongName.paused)
    {
       stopAnimation(playingSongName);
    }
  })
  document.querySelector('.aiCrossHead').addEventListener("click",()=>{
     aiContainer.style.display="none";
     audioPlayerContainer.innerHTML='';
     
    
  })
  aiGenrateButton.addEventListener("click", async ()=>{
    audioPlayerContainer.innerHTML='';
   let defaultPrompt="a chill song with influences from lofi, chillstep and downtempo"
   const prompt= document.querySelector('#aiPrompt').value;
   if(prompt.length===0)
   {
    musicGen("")
   }
   else{
    musicGen({"inputs":prompt})
   }
   
  })

   
//  audio.play()
}
main()