const fs= require('fs');
const crypto = require('crypto');
const path = require('path');
const {Transform} = require('stream');




class AppendIV extends Transform {
    constructor(iv,opts){
        super(opts);
        this.iv=iv;
        this.appended=false;
    }
    _transform (chunk,encoding,cb){
        if(!this.appended){
            this.push(this.iv);
            this.appended=true;
        }
        this.push(chunk);
        cd();
    }
} 


/*const key = crypto.randomBytes(32);
const hash = crypto.createHash('sha256');
hash.update('mysupercoolpass123');
key = hash.digest(); */


function getCipherKey(password){
    return crypto.createHash('sha256').update(password).digest();
}

function encryption(file,password){
    const iv = crypto.randomBytes(16);
    const key = getCipherKey(password);
    const readStream = fs.createReadStream(file);
    const cipher = crypto.createCipheriv('aes-256',key,iv);
    const fileobj = new Transform(iv);
    const writeStream = fs.createWriteStream(path.join(file + ".enc"));

    readStream
    .pipe(cipher)
    .pipe(fileobj)
    .pipe(writeStream);
}

encryption({
    file:'./file.txt',password:'raahul'
});

