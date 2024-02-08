
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import main from "./AesEncry/encrypt.js"


const  Auth= async ()=>{

  const encryptObj=await main()
  const firebaseConfig = {

    apiKey: CryptoJS.AES.decrypt(encryptObj.fireBaseKey,encryptObj.cipher).toString(CryptoJS.enc.Utf8),
    authDomain: CryptoJS.AES.decrypt(encryptObj.fireBaseAuthDomain,encryptObj.cipher).toString(CryptoJS.enc.Utf8),
    projectId: CryptoJS.AES.decrypt(encryptObj.fireBaseProjectId,encryptObj.cipher).toString(CryptoJS.enc.Utf8),
    storageBucket: CryptoJS.AES.decrypt(encryptObj.fireBaseStorageBucket,encryptObj.cipher).toString(CryptoJS.enc.Utf8),
    messagingSenderId:CryptoJS.AES.decrypt(encryptObj.fireBaseMessagingSenderId,encryptObj.cipher).toString(CryptoJS.enc.Utf8) ,
    appId: CryptoJS.AES.decrypt(encryptObj.fireBaseAppId,encryptObj.cipher).toString(CryptoJS.enc.Utf8),
    measurementId:CryptoJS.AES.decrypt(encryptObj.fireBaseMeasurementId,encryptObj.cipher).toString(CryptoJS.enc.Utf8)
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
const userSignIn= async ()=> {
 console.log("Login clicked")
 signInWithPopup(auth,provider)
 .then((result)=>{
   
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
  
 })
}

const userSignOut= async ()=>{
 signOut(auth).then(()=>{
   alert("You have been signed out")
 }).catch((error)=>{
   
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
   userNameContainerDesk.innerHTML=``
   userNameContainerMob.innerHTML=``
 }
})
logInButton.addEventListener("click",userSignIn)
logInButtonMob.addEventListener("click",userSignIn);
signUpButton.addEventListener("click",userSignIn)
signUpButtonMob.addEventListener("click",userSignIn)
signOutButton.addEventListener("click",userSignOut)
signOutButtonMob.addEventListener("click",userSignOut)


  
}

Auth()