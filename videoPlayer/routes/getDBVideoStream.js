const Router = require("express").Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


// Mongo URI
const mongoURI = 'mongodb://localhost/videoPlayerdatabase';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Init gfs
let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});


// @route GET /image/:filename
// @desc Display Image
Router.get('/', (req, res) => {
    gfs.files.findOne({ filename: req.query.filename }, (err, file) => {
        // Check if file
        if (err) {
            throw err;
        }

        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Read output to browser
        console.log("found");
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});

module.exports = Router