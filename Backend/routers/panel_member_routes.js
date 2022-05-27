const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');

router.route('/viewTopics').get((req, res) => {
    ResearchTopic.find().then((topics) => {
        res.json(topics);
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;
