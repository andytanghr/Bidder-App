var router = require('express').Router();
var promise = require('bluebird');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}))

const db = require("../app.js").db;

const authenticateUser = require('../public/js/authenticateUser.js').authenticateUser;

router.get('/auction', authenticateUser, (req,res) => {

    // get todays date and timestamp
    let todaysDate = new Date(),
        rightNow = todaysDate.getTime(),
        openAuctions = [],
        upcomingAuctions = [];

    db.query('SELECT * FROM auctions;').then( data => {

        // separate auctions by timestamp for open vs upcoming auctions
        data.forEach( obj => {
            let startDate = obj.start_timestamp,
                startTimeStamp = startDate.getTime(),
                endDate = obj.end_timestamp,
                endTimeStamp = endDate.getTime();
            if (startTimeStamp < rightNow && endTimeStamp > rightNow) {
                openAuctions = openAuctions.concat(obj);
            } else if (startTimeStamp > rightNow) {
                upcomingAuctions = upcomingAuctions.concat(obj);
            };
        });
        
        res.render('layouts/auction', {
            'userInfo': req.session.user,
            'auctionsyo': openAuctions,
            'notyetauctions' : upcomingAuctions
        });
    }).catch( err => {
        console.log('Oh no there is an error', err)
        res.send(`Oh no there is an error ${err}`)
      })
})

router.post('/auction', authenticateUser, function(req,res) {
    // get todays date and timestamp
    let todaysDate = new Date(),
        rightNow = todaysDate.getTime(),
        openAuctions = [],
        upcomingAuctions = [];

    db.query('SELECT * FROM auctions;').then( data => {

        // separate auctions by timestamp for open vs upcoming auctions
        data.forEach( obj => {
            let startDate = obj.start_timestamp,
                startTimeStamp = startDate.getTime(),
                endDate = obj.end_timestamp,
                endTimeStamp = endDate.getTime();
            if (startTimeStamp < rightNow && endTimeStamp > rightNow) {
                openAuctions = openAuctions.concat(obj);
            } else if (startTimeStamp > rightNow) {
                upcomingAuctions = upcomingAuctions.concat(obj);
            };
        });
        
        res.render('layouts/auction', {
            'userInfo': req.session.user,
            'auctionsyo': openAuctions,
            'notyetauctions' : upcomingAuctions
        });
    }).catch( err => {
        console.log('Oh no there is an error', err)
        res.send(`Oh no there is an error ${err}`)
      })
})

module.exports = router;
