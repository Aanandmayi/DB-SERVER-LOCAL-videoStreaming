var router = require('express').Router();
var fs = require('fs')

router.get("/", function (req, res) {
    const range = req.headers.range;
    const videoFile = req.query.search;

    console.log(videoFile + " was requested");
    if (!range) {
        res.status(400).send("range header not available");
    }
    const videoLocalPath = "videos/" + videoFile;
    const videoSize = fs.statSync(videoLocalPath).size;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const selectedvideo = fs.createReadStream(videoLocalPath, { start, end });

    selectedvideo.pipe(res);
});

module.exports = router;