
let songList=[]
let allFolders=[]
const playButton=document.getElementById('play');
const nextButton=document.getElementById('next');
const prevButton=document.getElementById('previous')
let openFolder='Ytmusic'
let GlobalPlayingSongSrc='';
let currentSongIndex=0;
let initalLoad=true;
function getSongFolderMap(){
   
  let folderMap = {};
  function getSongFolderRef(){
    return folderMap;
  }
  return getSongFolderRef;

}
const getSongs = async function(folder){
   
    let musicPromise= await fetch(`http://127.0.0.1:5500/Songs/${folder}/`)
   
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
  seconds= parseInt(seconds.toFixed(2));
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
function playMusic(playingSongName,folder){

  initalLoad=false
   
 //setting album image
 
   document.querySelector('.mediaAlbumImage').querySelector('img').setAttribute("src",`./Songs/${openFolder}/cover.jpg`)
 //setting animation of current playing song

  let songName=(this.querySelector("h3").textContent).trim()
  revert(this)
  GlobalPlayingSongSrc=this;
  this.querySelector(".songCardDetails").classList.add('textBlue');
  this.classList.add('backgroundWhite');
  this.style.borderRadius="10px"
  this.querySelector('.playing').classList.remove('hide')
  this.querySelector('.playCardButton').getElementsByTagName("img")[0].style.display="none";
  playingSongName.src=`http://127.0.0.1:5500/Songs/${folder}/`+songName
  this.classList.add('nowPlaying')
  playingSongName.play();
  console.log(play)
  play.querySelector('img').setAttribute("src","./images/pause.svg")
  
  // Album Song Info
  document.querySelector('.songInfo').children[0].textContent=songName
  document.querySelector('.songInfo').children[1].textContent="Sai Kiran, 2023"

  // setting Song duration
  const startTime=document.querySelector('.startTimeInfo');
  const endTime=document.querySelector('.endTimeInfo');

  playingSongName.addEventListener('timeupdate',()=>{

    let secondsFormat=convertSecondsToMinutesSeconds(playingSongName.currentTime)
   
    startTime.textContent=`${secondsFormat}`
   
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

  })
   currentSongIndex=getCurrentSongIndex();
  
}
function currentPlay(card){

  card.querySelector(".songCardDetails").classList.add('textBlue');
 card.classList.add('backgroundWhite');
  card.style.borderRadius="10px"
  card.querySelector('.playing').classList.remove('hide')
 card.querySelector('.playCardButton').getElementsByTagName("img")[0].style.display="none";
//  playingSongName.src=`http://127.0.0.1:5500/Songs/${folder}/`+songName
  card.classList.add('nowPlaying')
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
   
    if((animatedElement.getAttribute("class"))==="playing")
    {
      animatedImg=animatedElement.getElementsByTagName('img')[0]
   
      
    }
  })
  
  if(playingSongName.paused){
    playingSongName.play();
    play.querySelector('img').setAttribute("src","./images/pause.svg")
    animatedImg.style.setProperty('animation-play-state', 'running');
  }
  else{

    playingSongName.pause();
    play.querySelector('img').setAttribute("src","./images/playBlue.svg")
    animatedImg.style.setProperty('animation-play-state', 'paused');

  }

}

// function for load albums
function lowerCaseName(songName){
  let lowercaseSongName = "";
  
  for (let i = 0; i < songName.length; i++) {
    

    
    lowercaseSongName += songName[i].toLowerCase();
    
    
    
  }
  return lowercaseSongName;
}
async function displayAlbums(playingSongName){
  const playListContainer= document.querySelector(".playlistContainer");
  const AlbumJson= await fetch('http://127.0.0.1:5500/Songs/');
  const albumJ= await AlbumJson.text();
  let div= document.createElement("div")
  div.innerHTML=albumJ;
  let anchors=div.querySelectorAll('a');
  for(let i=0; i<anchors.length; i++){
    let href=anchors[i].getAttribute("href");
    
    if(href.includes("/Songs/")){
       let folderName=href.split("/")[2];
       allFolders.push(folderName);
       const folderJson= await fetch(`http://127.0.0.1:5500/Songs/${folderName}/info.json`);
       let folderResponse= await folderJson.json();
       //console.log(JSON.parse(folderResponse.songList))
      // songList=[...songList,...JSON.parse(folderResponse.songList)]
       //console.log(songList)
       playListContainer.innerHTML+= ` <div class="card" data-folder="${folderName}">
       <div class="albumImage">
           <img src="./Songs/${folderName}/cover.jpg" alt="img">
           <div class="playButton">
               <img src="images/play.svg" alt="">
           </div>
       </div>
       <div class="albumDetails">
           <h2>${folderResponse.title}</h2>
           <p>${folderResponse.description}</p>
           <p>${folderResponse.year}</p>
       </div>


   </div>`
     
    }
  }
  
  
  document.querySelectorAll('.card').forEach( (card)=>{

    card.addEventListener("click", async(event)=>{
      
      openFolder=event.currentTarget.dataset.folder
      displayAlbumSongs(playingSongName,event.currentTarget.dataset.folder);
    
    })

   
  })


    // load all songs from folders for seach 
  let folderMap=getSongFolderMap()();

   
  for(let folderName of allFolders){
      
     let songs=await getSongs(folderName);
     songs.forEach((song)=>{

      let songName=song.split(`${folderName}/`)[1]
      songName=songName.replaceAll("%20"," ");
     
      songName=lowerCaseName(songName)
      console.log(songName)
      songList.push(songName.trim());
      folderMap[songName] = folderName;
     })

  }
  console.log(folderMap)

    function getfolderMapSongs(){
      return folderMap;
    }
 
    return getfolderMapSongs;

 

}

function loadMusicRotation(){
  
  document.querySelectorAll('.songCard').forEach((card)=>{
    if(GlobalPlayingSongSrc!==''){
     
    if(card.querySelector('.songCardDetails').querySelector('h3').textContent=== GlobalPlayingSongSrc.querySelector(".songCardDetails").querySelector('h3').textContent){
     
      currentPlay(card);
    }
    
  }
  })
}
async function displayAlbumSongs(playingSongName,folder){
  let songs = await getSongs(folder);
  console.log("Songs---------------------->")
  console.log(songs)
  const songFragment= document.createDocumentFragment();
  songs.forEach((song)=>{
 console.log("adfa sdfa d f")
    let songName=song.split(`${folder}/`)[1]
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
      playMusic.bind(songCard)(playingSongName,folder);
    });
  

   
    songFragment.appendChild(songCard);
 
  })
  
  let songListsContainer=document.querySelector('.songListsContainer');
  songListsContainer.innerHTML=''
  songListsContainer.appendChild(songFragment);
  loadMusicRotation()
  currentSongIndex=getCurrentSongIndex();
}


async function searchLoad(playingSongName,mapFolderRef,searchValue){
  searchValue=lowerCaseName(searchValue);
  
  const searchResultContainer= document.querySelector('.searchResultsContainer');
  let searchFlag=false;
  searchResultContainer.innerHTML=''
   songList.forEach((song)=>{

    if(song.startsWith(searchValue) && searchValue!=''){
      searchFlag=true;
      
      searchResultContainer.innerHTML+=`<div class="searchResultCard" data-folder=${mapFolderRef()[song]}>
      ${song}
      <img src="./images/play.svg" alt="playicon"style="width: 30px; margin-right: 10px"/>
    </div>`
      
    }
   })
   
   
   if(!searchFlag){
    searchResultContainer.innerHTML=`<div class="searchResultCard">
    No Results Found
    <img src="./images/play.svg" alt="playicon"style="width: 30px; margin-right: 10px;display:none;"/>
  </div>`
   }
   if(searchValue===''){
      searchResultContainer.innerHTML='';
      
   }
   let selectedSong='';
   const searchResultCard=document.querySelectorAll('.searchResultCard')
   searchResultCard.forEach((card)=>{
    card.addEventListener("click", async(event)=>{
      
      openFolder=event.currentTarget.dataset.folder
      searchResultContainer.innerHTML='';
      document.querySelector('#searchBox').value='';
      selectedSong=card.textContent.trim();

      displayAlbumSongs(playingSongName,event.currentTarget.dataset.folder);
      setTimeout(()=>applySearch(selectedSong,playingSongName,openFolder),1000)
      
    })

   })

   


   
   

  // console.log(allFolders)

}
function applySearch(searchSongValue,playingSongName,openFolder){
  const songCards=document.querySelectorAll('.songCard');
  songCards.forEach((card)=>{
    console.log("searched Song Value",searchSongValue)
    let cardValue=lowerCaseName(card.querySelector('.songCardDetails').firstElementChild.textContent)
    if(cardValue===searchSongValue){
      playMusic.bind(card)(playingSongName,openFolder);
    }
  })
}
async function main(){

 
  document.querySelector('.mediaAlbumImage').querySelector('img').setAttribute("src",`./Songs/${openFolder}/cover.jpg`)
  
  
  let playingSongName=new Audio();
 
  // load the playlist in the intial run of the App
  displayAlbumSongs(playingSongName,"Ytmusic");
  
  
 
  
  // This function will be called when the music finishes playing
  
     playingSongName.onended = () => {
 
    stopAnimation(playingSongName);
  };
  

  play.addEventListener("click",()=>{
   
    if(initalLoad)
    {
     
      playMusic.bind(document.querySelectorAll('.songCard')[0])(playingSongName,openFolder);
   
    }
    else{
    stopAnimation(playingSongName)
  }
  })
  prevButton.addEventListener("click",()=>{
     
   
    let allSongCards=document.querySelectorAll('.songCard');
    let songIndex=0
   for(let songCard of allSongCards){
      if(songIndex==getCurrentSongIndex()-1){

        playMusic.bind(songCard)(playingSongName,openFolder);
      }
      songIndex++;

   }
   
   
  })
  nextButton.addEventListener("click",()=>{
     
    let i=getCurrentSongIndex()
  
   let allSongCards=document.querySelectorAll('.songCard');
    let songIndex=0
   for(let songCard of allSongCards){
      if(songIndex===i+1){

   
        playMusic.bind(songCard)(playingSongName,openFolder);
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
   
  //  Load Albums and get ref of foldermap
    let getRefFolderMap=await displayAlbums(playingSongName);
  
    document.querySelector('#searchBox').addEventListener('keyup',(event)=>{searchLoad(playingSongName,getRefFolderMap,event.target.value)})
     
   // click on Album to load songs list

  

 
 
   
//  audio.play()
}
main()