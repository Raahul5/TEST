const crypt = require('crypto-js');
const fs =  require('fs');
const { json } = require('body-parser');


//const rea =  fs.createReadStream('./file.txt');

//const dat = rea.pipe(process.stdout);
 //console.log(dat);

 const read  = fs.readFileSync('./file.txt');
 //const dat =read.toString();
 //console.log(dat);
 


var ciphertext = crypt.AES.encrypt(JSON.stringify(read),'secert key').toString();

var bytes = crypt.DES.decrypt(ciphertext,'secert key');

var originaltext = bytes.toString(crypt.enc.Utf8);


console.log(ciphertext);
