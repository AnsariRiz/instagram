const express = require('express');
const multer = require('multer');

const Fileupload = multer({
    storage: multer.diskStorage({
        destination:function(req, file, cb)
        {
            cb(null, './uploads');
        },
        filename: function(req, file, cb){
            cb(null, file.fieldname + "-" + Date.now());
        }
    })
}).single("file");

module.exports = Fileupload;