
// Use async/await for proper fetching and usage
let encryptObj;
async function getEncyptedKeys(){

    const keyJson= await fetch('/AesEncry/encrypt.json')
    const keyObject= await keyJson.json()
    const Cipkey=keyObject.cipher
    const encryptObject={}
    for(let key in keyObject){
        if(key!=="cipher"){
           const res= await encrypt(keyObject[key],Cipkey)
           encryptObject[key]=res;
        }
    }
   encryptObject['cipher']=Cipkey;
    return encryptObject


}

async function encrypt(message,cipherKey){



const encryptKey = CryptoJS.AES.encrypt(message, cipherKey).toString();
//const decryptedMessage = CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);


  return encryptKey;

}
async function main(){

    const encryptedObject=await getEncyptedKeys()
    
    
    
  return encryptedObject;
}
main()


export default main;
//encrypt()