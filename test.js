//const crypto = require('crypto-js');
const crypto = require('crypto');


//viarables
const algorithm = 'aes-256-ctr';
let key = "MySuperSecertKey";
key = crypto.createHash('sha256').update(key).digest('base64').substr(0,32);


const encrypt = (buffer) => {
    //Initialization Vector
    const iv= crypto.randomBytes(16);
    //Create a new Cipher using the algorithm , and IV
    const cipher= crypto.createCipheriv(algorithm,key,iv);
    //create the (encrypted) buffer
    const result = Buffer.concat([iv,cipher.update(buffer),cipher.final()]);
    return result; 
}



/*const alice = cst.createECDH('secp256k1');
alice.generateKeys();

const bob = cst.createECDH('secp256k1'); 
bob.generateKeys();

const alicepublickeybase64 = alice.getPublicKey().toString('base64');
const bobpublicekeybase64 = bob.getPublicKey().toString('base64');

const alicesharedkey = alice.computeSecret(bobpublicekeybase64,'base64','hex');
const bobsharedkey = bob.computeSecret(alicepublickeybase64,'base64','hex');

console.log(alicesharedkey ===  bobsharedkey);
console.log("Alice Shared key :",alicesharedkey);
console.log("Bob Shared key :",bobsharedkey);
*/

/*cst.randomBytes(50  
    ,(err,buf) => {
    var cry = buf.toString('hex')
    console.log(cry);
}); */