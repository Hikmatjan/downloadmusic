const express = require('express');
const { upload } = require('../helpers/filehelper');
const mongoose = require('mongoose');
const { singleFIleSchema, SingleFile } = require('../modules/singleFileSchema');

const router = express.Router();

router.get('/getAllSingleFiles', async (req, res) => {
    const data = await SingleFile.find();
    res.send(data);
});

router.post('/singleFile', upload.single('file'), async (req, res, next) => {
    try {
        let date = new Date();
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 3),
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        });
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/deleteSingleFile/:id', async (req, res) => {
    const result = await SingleFile.findByIdAndRemove({ _id: req.params.id });
    res.send("The file was successfully deleted");
})

// file o'lchamini aniq qilib chiqarish
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}

module.exports = router;