const router = require('express').Router();
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');


// Mongo URI
const mongoURI = 'mongodb://localhost/videoPlayerdatabase';

// Create mongo connection

// create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });


// @route POST /upload
// @desc  Uploads file to DB
router.post('/', upload.single('file'), (req, res) => {
    res.redirect('/');
});

module.exports = router;