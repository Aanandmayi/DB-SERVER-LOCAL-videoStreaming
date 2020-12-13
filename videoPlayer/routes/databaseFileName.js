var MongoClient = require('mongodb').MongoClient;
const Router = require("express").Router();

// Mongo URI
const url = "mongodb://localhost:27017/";

Router.get('/', (req, res) => {

    // logic can be written for search term for the database here but we are not implementing it now
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("videoPlayerdatabase");
        dbo.collection("uploads.files").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result)
            db.close();
        });
    });
});

module.exports = Router