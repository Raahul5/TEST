const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const bodyParser = require('body-parser');
const crypto = require('crypto-js');
const crpty = require('crypto');




const app = express();
app.use(express.json());
app.use(bodyParser.json());

const port = 8000;

app.listen(port, () => {
  console.log("server started on " + port);
});

//MONGOURI
const mongoURI = "mongodb://localhost:27017/test";

//  MONGO connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//init gfs
/* let gfs;
 conn.once('open', () => {
   //init gfs stream
  gfs  = Grid(conn.db,mongoose.mongo);
  gfs.collection('uploads');
 })

// Storage
 const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({
    storage
  });*/
var storage = multer.diskStorage({
  destination:(req,res,cb)=>{
    cb(null,'./uploads/');
  },
  filename:(req,file,cb)=>{
    crpty.randomBytes(16, (err, buf) => { 
      if (err) {
        return cb(err);
      }
       cb(null,buf.toString("hex") + path.extname(file.originalname));
   /* var datetimestamp = Date.now();
    cb(null,file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]); */
  });
}
});

 var upload =multer({
   storage: storage
 }).array('file', 4);

 
 app.post("/upload",(req,res)=>{
    //variables
const algorithm = 'aes-256-ctr';
let key = "MySuperSecertKey";
key = crypto.createHash('sha256').update(key).digest('base64').substr(0,32);

const encrypt = (upload) => {
    //Initialization Vector
    const iv= crypto.randomBytes(16);
    //Create a new Cipher using the algorithm , and IV
    const cipher= crypto.createCipheriv(algorithm,key,iv);
    //create the (encrypted) buffer
    const result = Buffer.concat([iv,cipher.update(upload),cipher.final()]);
    return result; 
  }
 });
    
  