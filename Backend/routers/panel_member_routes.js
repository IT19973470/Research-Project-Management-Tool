const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const StudentGroup = require('../models/StudentGroup');
const Mark = require('../models/Marking');
const Student = require('../models/Student');
const Staff = require("../models/Staff");
const Submission = require("../models/Submission");
const PresentationEvaluation = require("../models/PresentationEvaluation");

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

router.route('/viewGroup').get(async (req, res) => {
    // let groupId = req.params.id;
    await StudentGroup.find().then((details) => {
        res.json(details)
    })

});

router.route('/viewMarking').get((req,res) => {
    Mark.find().then((marking) => {
        res.json(marking);
    }).catch(err => {
        console.log(err)
    });
});

router.post('/addPresentationMarking', (req, res, next) => {
        console.log(req.body)
        req.body._evaluationId = 'P' + Math.floor(Math.random() * 10000);
        PresentationEvaluation.create(req.body).then((data) => {
            res.send(data);
        }).catch(next);

});

router.route('/viewFeedback').get((req,res) => {
    PresentationEvaluation.find().then((feedback) => {
        res.json(feedback);
    }).catch(err => {
        console.log(err)
    });
});


module.exports = router;
