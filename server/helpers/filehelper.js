'use strict';

const multer = require('multer');

const storage = multer.diskStorage({
    // papka yaratish
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    // yaratilgan faylga nom berish
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

// Qaysi fayllarni yuklash va qaysi birini o'tkazib yuborish kerakligini boshqarish funktsiyasi
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'audio/mp4' || file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/ogg' || file.mimetype === 'audio/mp3') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = { upload };