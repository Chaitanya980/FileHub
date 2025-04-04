const mongoose= require("mongoose");
const nodemailer = require("nodemailer");

const FileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    imageURL:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },

});

//post middleware mongo db
FileSchema.post("save",async function(doc){
    try{
        console.log("Entry saved in db",doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD,
            },
        });
        //send email
        let info = await transporter.sendMail({
            from:`File upload`,
            to:doc.email,
            subject:`File uploaded on CLoudinary`,
            html:`<h2> Upload</h2> <p> File Uploaded Successfully </p>`,
        })
        console.log("Information",info);
    }
    catch(error){
        console.error(error);
    }
})
const File = mongoose.model("File",FileSchema);
module.exports= File;