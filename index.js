
const express = require("express");
require("dotenv").config();
const app = express();


const PORT = process.env.PORT || 4143;

app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir : '/tmp/'
}));

const db= require("./config/database").connect();

//conenct to cloud 
const cloudinary= require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//route definition 
const Upload = require("./routes/fileupload");


//mount on user 
app.use("/api/v1/upload",Upload);

//activate server
app.listen(PORT,() => {
    console.log(`App is listening at  ${PORT}`);

})