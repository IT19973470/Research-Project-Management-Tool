const express = require('express');
const router = express.Router();
const ResearchTopic = require('../models/ResearchTopic');
const StudentGroup = require('../models/StudentGroup');
const SupervisorTopic = require('../models/SupervisorTopic')
const Student = require('../models/Student');
const supervisor = require("../models/Supervisor");
const GroupSupervisor = require('../models/GroupSupervisor');
const Marking = require('../models/Marking');

// router.route("/add_supervisor").post((req,res)=>{
//     const name = req.body.name;
//     const address = req.body.address;
//     const email = req.body.email;
//     const password  = req.body.password;

//     const newSupervisor = new Supervisor({
//         name,
//         address,
//         email,
//         password
//     })

//     newSupervisor.save().then(()=>{
//         res.json("Supervisor Added")
//     }).catch((err)=>{
//         console.log(err);
//     })
// })
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

// router.route("/acceptTopic/:groupID").put(async (req, res) => {
//     console.log(req.body)
//     let groupId = req.params.groupId;
//     ResearchTopic.updateOne(
//         {groupId:groupId},
//         {$set: {accepted: true}}
//     ).then((acceptTopics) => {
//         res.send(acceptTopics);
//     })
// })


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