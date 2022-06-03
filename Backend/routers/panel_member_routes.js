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

// router.post('/add_research_topic', (req, res, next) => {
//     ResearchTopic.create(req.body).then((researchTopic) => {
//         res.send(researchTopic);
//     }).catch(next);
// });
//
// let router1 = router.post('/add_supervisor', (req, res, next) => {
//     console.log(req.body)
//     supervisor.create(
//         {_id: req.body._id,name:req.body.name,address:req.body.address,email:req.body.email,password:req.body.password, interests:req.body.interests}
//     ).then((data) => {
//         res.send(data);
//     }).catch(next);
//
// });


module.exports = router;
