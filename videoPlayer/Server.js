const express = require("express");
const bodyParser = require("body-parser");

//Configuration files
const config = require("./confg")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html")
})

//including the routes files
const getVideoListInServer = require("./routes/getVideoListInServer")
const streamLocalVideo = require("./routes/streamLocalVideo")
const uploadToMongoDB = require("./routes/uploadToMongoDB")
const getDBVideoStream = require("./routes/getDBVideoStream")
const databaseFileName = require("./routes/databaseFileName")

//calling the routes files
app.use("/getVideoListInServer", getVideoListInServer)
app.use("/streamLocalVideo", streamLocalVideo)
app.use("/upload", uploadToMongoDB)
app.use("/getDBVideoStream", getDBVideoStream)
app.use("/databaseFileName", databaseFileName)

app.listen(config.port, () => {
    console.log("listening on port 3000");
})