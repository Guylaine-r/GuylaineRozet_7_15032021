const multer = require('multer');

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'media');
    },
    filename: (request, file, callback) => {
        let name = file.originalname.split(' ').join('_');
        let extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage : storage}).single('media');