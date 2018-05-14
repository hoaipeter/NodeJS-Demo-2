var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

//POST to Add User
router.post('/adduser', function (req, res) {
    var db = req.db
    var collect = db.get('userlist')
    collect.insert(req.body, function (err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

//DELETE User
router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var collect = db.get('userlist')
    var userID = req.params.id

    collect.remove({ '_id': userID }, function (err) {
        res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err });
    })
})

module.exports = router;
