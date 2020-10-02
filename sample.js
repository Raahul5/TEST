const cr = require('crypto-js');
 const algorithm = 'aes-256-cbc';
 var password = cr.randomBytes(32);
 var iv = cr.randomBytes(16);

 function encrypt(buffer){
     
     var cipher = cr.createCipheriv(algorithm,Buffer.from(password),iv)
     var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
     return encrypt;
 }

 function decrypt (buffer){
     var  decipher = cr.createDecipheriv(algorithm,Buffer.from(password),iv)
     var dec = Buffer.concat([decipher.update(buffer),decipher.final()]);
     return dec;
 }

 var encrypted = encrypt(Buffer.from("Hello World","utf8"))
 console.log(decrypt(encrypted).toString('utf8'));