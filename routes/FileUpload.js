const express = require("express");
const router= express.Router();

//write controllers here
const {localFileUpload,imageUpload, videoUpload,imgreducer}= require("../controllers/fileupload");

router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imgreducer",imgreducer);
module.exports= router;