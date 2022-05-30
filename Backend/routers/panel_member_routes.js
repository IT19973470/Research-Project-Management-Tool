const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const StudentGroup = require('../models/StudentGroup');
const Student = require('../models/Student');

router.route('/viewTopics').get((req, res) => {
    ResearchTopic.find().then((topics) => {
        res.json(topics);
    }).catch(err => {
        console.log(err);
    })
});

router.route('/viewGroup/:id').get(async (req, res) => {
    let students = [];
    let groupId = req.params.id;
    await StudentGroup.find(({_id: groupId})).then((details) => {
        res.json(details)
    })

});

module.exports = router;
