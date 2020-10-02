const fs= require('fs');
const crypto = require('crypto');
const path = require('path');
const aes = 'aes-256-cbc';

const read  = fs.readFileSync('./sample.jpg');
 const dat =read.toString();
 

function getCipherKey(password){
    return crypto.createHash('sha256').update(password).digest();
}

function encryption(text,password){
    const iv = crypto.randomBytes(16);
    const key = getCipherKey(password);
    let cipher = crypto.createCipheriv('aes-256-cbc',key,iv);
    let encrpted = cipher.update(text);
    encrpted = Buffer.concat([encrpted,cipher.final()]);
    return {iv : iv.toString('hex'),encryptedData: encrpted.toString('hex')};
}

var str = encryption(
    dat,'raahul'
);
 console.log(str);