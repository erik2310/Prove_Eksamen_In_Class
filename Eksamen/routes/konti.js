var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET konti page. */
router.get('/', function (req, res, next) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("bec_bank");
        dbo.collection("accounts").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            let object = {
                accounts: result
            }
            res.render('konti', object);
        });
    });
});

/* GET konti as JSON. */
router.get('/getjson', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("bec_bank");
        dbo.collection("accounts").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            let object = {
                accounts: result
            }
            res.json(object);
        });
    });
});


/* POST til at indsætte en bruger. */
router.post('/insertuser', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("bec_bank");

        var object = {
            username: req.body.username,
            password: req.body.password,
            user_type: req.body.user_type
        };

        dbo.collection("users").insertOne(object, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        res.redirect('/konti');
    });
})

/* POST til at logge ind. */
router.post('/login', function (req, res, next) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("bec_bank");
        dbo.collection("users").findOne({ username: req.body.username, password: req.body.password }, function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();

            if (result != null) {

                if (req.body.username == result.username && req.body.password == result.password) {
                    res.redirect('/konti');
                } else {
                    
                    res.redirect('/');

                }

            } else {
                
                res.redirect('/');
                
            }
        });
    });

});

module.exports = router;
