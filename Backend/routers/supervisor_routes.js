const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const StudentGroup = require('../models/StudentGroup');
const SupervisorTopic = require('../models/SupervisorTopic')
const Student = require('../models/Student');
const Supervisor = require("../models/Supervisor");
const GroupSupervisor = require('../models/GroupSupervisor');
const Marking = require('../models/Marking');

router.route("/add_supervisor").post((req,res)=>{
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const password  = req.body.password;

    const newSupervisor = new Supervisor({
        name,
        address,
        email,
        password
    })

    newSupervisor.save().then(()=>{
        res.json("Supervisor Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.post('/addSupervisorTopic', (req, res, next) => {
    console.log(req.body)
    SupervisorTopic.create(
        {_id: 'S' + Math.floor(Math.random() * 10000), interests:req.body.interests}
    ).then((data) => {
        res.send(data);
    }).catch(next);

});

router.route('/viewTopics').get((req, res) => {
    ResearchTopic.find().then((topics) => {
        res.json(topics);
    }).catch(err => {
        console.log(err);
    })
});

router.route("/acceptTopic/:groupID").put(async (req, res) => {
    console.log(req.body)
    let groupId = req.params.groupId;
    ResearchTopic.updateOne(
        {groupId:groupId},
        {$set: {accepted: true}}
    ).then((acceptTopics) => {
        res.send(acceptTopics);
    })
})

router.route("/acceptGroups/:groupID").put(async (req, res) => {
    console.log(req.body)
    let groupID = req.params.groupId;
    GroupSupervisor.updateOne(
        {groupId:groupID},
        {$set: {supervisor: req.body.supervisor}}
    ).then((groupSupervisor) => {
        res.send(groupSupervisor);
    })
})

// router.route('/viewDocuments').get((req, res) => {
//     ResearchTopic.find().then((topics) => {
//         res.json(topics);
//     }).catch(err => {
//         console.log(err);
//     })
// });

router.route('/viewMarking').get((req, res) => {
    Marking.find().then((Markings) => {
        res.json(Markings);
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;