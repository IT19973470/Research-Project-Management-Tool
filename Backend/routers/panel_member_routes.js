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
    let groupId = req.params.groupId;
    await StudentGroup.findOne((groupId)).then((details)=>{res.json(details)})
        // .then((studentArray) => {
        //     studentArray && studentArray.students.forEach((studentId) =>{
        //         Student.find().then((students) => {res.json(students)})
        //     })
        // })
        // .then(() => {
        //     res.status(200).send(req.body.toString())
        // }).catch(err => {
        //     res.status(500).send({status: 'Error', error:err.message})
        // })
});

module.exports = router;
