const File = require("../models/file");
//instance for cloudinary
const cloudinary = require("cloudinary").v2;

//local upload handler function
exports.localFileUpload = async(req,res)=>{
    try{
        //fetch the files
        // "file " is key were we post data in postman 
        const file= req.files.file;
        console.log("Files are ", file);

        //server path were we store that file 
        //__dirname is to show in which dir we are 
        
        let path = __dirname + "/files/" + Date.now() +`.${file.name.split('.')[1]}`;
        console.log("Path :",path);
        // moves  uploaded file to 'path'
        file.mv(path,(err) =>{
            console.log(err);
        });
        res.json({
            sucess:true,
            message:"Local File Upload Success",
        });
    }
    catch(error){
        console.log("Could not upload file ");
        console.log(error);

    }

}// includes is used to determine whether our file supports the fi;e type
function isFileTypeSupported(types, supportedTypes){
    return supportedTypes.includes(types);
}

async function uploadFiletoCloudinary(file,folder,quality){
    const options = {folder};
    options.resource_type= "auto";
   return await cloudinary.uploader.upload(file.tempFilePath,options);
   if(quality){
    options.quality = quality;
   }


}
//image upload handler
exports.imageUpload = async(req,res) =>{
    try{
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        //file fetch
        const file = req.files.imageFile;
        console.log(file);

        //Validation file.name.split('.')[1] this functions is used to: split the file name basis on dot and get the first index 
        const supportedTypes = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase(); //convert the filetype to lower case
        console.log("File Type",fileType);

        //file folder not supported
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported",

            })
        }
         //file folder supported , now upload to cloudinary
         const response = await uploadFiletoCloudinary(file,"FileUpload");
         console.log(response);
         //save to db
         const fileData = await File.create({
            name,
            tags,
            email,
            imageURL: response.secure_url,
            //secure_url is present when you print the response when file stored on cloudinary
         })
        res.json({
            success:true,
            imageURL: response.secure_url,
            message:"Image uploaded Successfully",
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something wrong",

        })

    }

}

exports.videoUpload= async(req,res)=>{
    try{
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        
        const file = req.files.videoFile;
        const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
        if (file.size > maxSize) {
            return res.status(400).json({
                success: false,
                message: "File size exceeds 5 MB limit",
            });
        }
        
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type",fileType);


        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported",

            })
        }
        //file folder supported , now upload to cloudinary
        const response = await uploadFiletoCloudinary(file,"FileUpload");
        console.log(response);
        //save to db
        const fileData = await File.create({
           name,
           tags,
           email,
           imageURL: response.secure_url,
          
        })
       res.json({
           success:true,
           imageURL: response.secure_url,
           message:"Video uploaded Successfully",
       })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something wrong",

        })

    }
    

}
// reduce the size of img and upload to cloudinary
exports.imgreducer= async(req,res)=>{
    try{
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        
        const supportedTypes = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase(); //convert the filetype to lower case
        console.log("File Type",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported",

            })
        }
         
         const response = await uploadFiletoCloudinary(file,"FileUpload",30);
         console.log(response);
         //save to db
         const fileData = await File.create({
            name,
            tags,
            email,
            imageURL: response.secure_url,
            //secure_url is present when you print the response when file stored on cloudinary
         })
        res.json({
            success:true,
            imageURL: response.secure_url,
            message:"Image uploaded Successfully",
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something wrong",

        })


    }
}