
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
  
const firebaseConfig = {
     apiKey: "AIzaSyCczj5kxKjN-772R0xMu_YKLUqAwXfAQ_8",
     authDomain: "pulsemusicplayer-f5273.firebaseapp.com",
     projectId: "pulsemusicplayer-f5273",
     storageBucket: "pulsemusicplayer-f5273.appspot.com",
     messagingSenderId: "980619147508",
     appId: "1:980619147508:web:df6f21012bbc6cbc4a06a1",
     measurementId: "G-1T41G0QZBS"
   };


const app=initializeApp(firebaseConfig);
const auth= getAuth();
const provider= new GoogleAuthProvider();
const logInButton= document.querySelector('#login');
const signUpButton=document.querySelector('#signup')
const signOutButton=document.querySelector('#signout');

const logInButtonMob=document.querySelector('#loginMob');
const signUpButtonMob=document.querySelector("#signupMob");
const signOutButtonMob=document.querySelector("#signoutMob");

const userNameContainerDesk=document.querySelector('#userWelcomeDesk')
const userNameContainerMob=document.querySelector('#userWelcomeMob')
const profilePic=document.querySelector('#profilePic')
console.log(logInButton,signUpButton);
let RESULT;
const userSignIn= async ()=> {
  console.log("Login clicked")
  signInWithPopup(auth,provider)
  .then((result)=>{
    console.log(result)
    console.log(result.user.displayName)
    RESULT=result;
    profilePic.setAttribute('src',result.user.photoURL)
    profilePic.style.display="flex";
    logInButton.style.display="none"
    signUpButton.style.display="none"
    signOutButton.style.display="block"
    userNameContainer.innerHTML=`Welcome ${result.user.displayName}`
    console.log(User);
  }).catch((error)=>{
    const errorCode= error.code
    const errorMessage= error.message
    console.log(errorCode," : ",errorMessage)
  })
}

const userSignOut= async ()=>{
  signOut(auth).then(()=>{
    alert("You have been signed out")
  }).catch((error)=>{
    console.log(error.message)
  })
}

onAuthStateChanged(auth, (user) =>{
  if(user){
     
    profilePic.setAttribute('src',user.photoURL)
    profilePic.style.display="flex";
    logInButton.style.display="none"
    signUpButton.style.display="none"
    signOutButton.style.display="block"
    logInButtonMob.style.display="none";
    signUpButtonMob.style.display="none"
    signOutButtonMob.style.display="flex";
    userNameContainerDesk.innerHTML=`Welcome ${user.displayName}`
   userNameContainerMob.innerHTML=`Welcome ${user.displayName}`
  }
  else{
    profilePic.style.display="none";
    logInButton.style.display="flex"
    signUpButton.style.display="flex"
    signOutButton.style.display="none"
    logInButtonMob.style.display="flex";
    signUpButtonMob.style.display="flex"
    signOutButtonMob.style.display="none";
  }
})
logInButton.addEventListener("click",userSignIn)
logInButtonMob.addEventListener("click",userSignIn);
signUpButton.addEventListener("click",userSignIn)
signUpButtonMob.addEventListener("click",userSignIn)
signOutButton.addEventListener("click",userSignOut)
signOutButtonMob.addEventListener("click",userSignOut)