const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const GroupSupervisor = require('../models/GroupSupervisor');
const CoSupervisorTopic = require('../models/CoSupervisorTopic');
const Marking = require('../models/Marking');

let router1 = router.post('/addCoSupervisorTopic', (req, res, next) => {
    console.log(req.body)
    CoSupervisorTopic.create(
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
        {$set: {coSupervisor: req.body.coSupervisor}}
    ).then((groupCoSupervisor) => {
        res.send(groupCoSupervisor);
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