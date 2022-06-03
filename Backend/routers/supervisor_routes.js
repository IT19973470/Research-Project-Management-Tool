const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const StudentGroup = require('../models/StudentGroup');
const SupervisorTopic = require('../models/SupervisorTopic')
const Student = require('../models/Student');
const supervisor = require("../models/Supervisor");
const GroupSupervisor = require('../models/GroupSupervisor');
const Marking = require('../models/Marking');
const DocumentEvaluation = require('../models/DocumentationEvaluation');

let router1 = router.post('/add_supervisor', (req, res, next) => {
    console.log(req.body)
    supervisor.create(
        {_id: req.body._id,name:req.body.name,address:req.body.address,email:req.body.email,password:req.body.password, interests:req.body.interests}
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

router.route("/acceptTopic/:id").put(async (req, res) => {
    let _id = req.params.id;
    const {accepted} = req.body;
    const updateTopic= {
        accepted 
    }
    const update = await ResearchTopic.findByIdAndUpdate(_id, updateTopic)
    .then((user) => {
        res.status(200).send({status: "Topic updated"})
    }).catch((err) => {
        res.status(500).send({status: "Error", error: err.message})
    })

})

router.post('/evaluate_document', (req, res, next) => {
    console.log(req.body)
    req.body._evaluationId = 'P' + Math.floor(Math.random() * 10000);
    DocumentEvaluation.create(req.body).then((data) => {
        res.send(data);
    }).catch(next);

});

router.route('/viewMarking').get((req, res) => {
    Marking.find().then((Markings) => {
        res.json(Markings);
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;