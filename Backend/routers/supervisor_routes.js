const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const StudentGroup = require('../models/StudentGroup');
const SupervisorTopic = require('../models/SupervisorTopic')
const Student = require('../models/Student');
const Staff = require("../models/Staff");


let router1 = router.post('/addSupervisorTopic', (req, res, next) => {
    console.log(req.body)
    SupervisorTopic.create(
        {
            _id: 'S' + Math.floor(Math.random() * 10000), 
            interests:req.body.interests,
            name:req.body.name,
            email:req.body.email,
            address : req.body.address,
            mobile:req.body.mobile
        }
    ).then((data) => {
        res.send(data);
    }).catch(next);

});

router.post('/supervisor_register', (req, res, next) => {
    req.body._id = req.body.id;
    Staff.create(req.body).then((staff) => {
        res.send(staff);
    }).catch(next);
});

router.route('/viewTopicsbysupervisor').get((req, res) => {
    ResearchTopic.find().then((topics) => {
        res.json(topics);
    }).catch(err => {
        console.log(err);
    })
});

router.route('/viewGroupbysupervisor/:id').get(async (req, res) => {
    let groupId = req.params.id;
    await StudentGroup.find({groupId: groupId}).then((details) => {
        res.json(details)
    })

});

module.exports = router;