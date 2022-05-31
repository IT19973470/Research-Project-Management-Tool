const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const StudentGroup = require('../models/StudentGroup');
const Student = require('../models/Student');
const Staff = require("../models/Staff");

router.post('/staff_register', (req, res, next) => {
    req.body._id = req.body.id;
    Staff.create(req.body).then((staff) => {
        res.send(staff);
    }).catch(next);
});

router.route('/viewTopics').get((req, res) => {
    ResearchTopic.find().then((topics) => {
        res.json(topics);
    }).catch(err => {
        console.log(err);
    })
});

router.route('/viewGroup/:id').get(async (req, res) => {
    let groupId = req.params.id;
    await StudentGroup.find({groupId: groupId}).then((details) => {
        res.json(details)
    })

});

module.exports = router;
