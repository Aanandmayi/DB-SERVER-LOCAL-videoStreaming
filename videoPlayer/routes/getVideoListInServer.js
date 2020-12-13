var router = require('express').Router();
var fs = require('fs')

// getting list of all the video.mp4 files in the server.
router.get('/', function (req, res) {
    console.log("request came");
    var files = fs.readdirSync("videos");
    let videoArray = []
    files.forEach(element => {
        if (element.split(".")[1] == "mp4") {
            videoArray.push(element)
        }
    });
    res.send(videoArray)
})

module.exports = router;
