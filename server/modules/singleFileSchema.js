const mongoose = require('mongoose');

const singleFIleSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    date: String,
    time: String
}, { timestamps: true });

const SingleFile = mongoose.model('SingleFIle', singleFIleSchema);

module.exports = { singleFIleSchema, SingleFile };