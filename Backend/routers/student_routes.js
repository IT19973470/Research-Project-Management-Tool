const express = require('express')
const router = express.Router();
const Student = require('../models/Student');
const StudentGroup = require('../models/StudentGroup');
const User = require('../models/User');
const ResearchTopic = require('../models/ResearchTopic');

router.get('/check_group/:id', (req, res, next) => {
    let students = [];
    StudentGroup.findOne({
        students: req.params.id
    }).then((studentsArr) => {
        studentsArr && studentsArr.students.forEach((studentId) => {
            Student.findOne({_id: studentId}).then((student) => {
                // console.log(student)
                students.push(student)
                if (students.length === studentsArr.students.length) {
                    res.send({students: students, groupId: studentsArr.groupId});
                }
            })
        })
    }).catch(next);
});

router.delete('/remove_from_group/:groupId/:id', (req, res, next) => {
    StudentGroup.updateOne(
        {groupId: req.params.groupId},
        {$pull: {'students': req.params.id}}
    ).then((studentsArr) => {
        res.send({reply: true});
    }).catch(next);
});

router.post('/student_register', (req, res, next) => {
    req.body._id = req.body.id
    Student.create(req.body).then((student) => {
        User.create(req.body).then(() => {
            res.send(student);
        })
    }).catch(next);
});

router.post('/add_group', (req, res, next) => {
    if (req.body.groupId === '') {
        req.body.groupId = 'G' + Math.floor(Math.random() * 10000);
        req.body.students = [req.body.student]
        StudentGroup.create(req.body).then((studentGroup) => {
            res.send(studentGroup);
        }).catch(next);
    } else {
        StudentGroup.updateOne(
            {groupId: req.body.groupId},
            {$push: {students: req.body.student}}
        ).then((studentGroup) => {
            res.send(studentGroup);
        }).catch(next);
    }
});

router.post('/add_research_topic', (req, res, next) => {
    ResearchTopic.create(req.body).then((researchTopic) => {
        res.send(researchTopic);
    }).catch(next);
});

router.get('/topic_registered/:id', (req, res, next) => {
    ResearchTopic.findOne({groupId: req.params.id}).then((researchTopic) => {
        if (researchTopic !== null) {
            res.send({reply: researchTopic});
        } else {
            res.send({reply: null});
        }
    }).catch(next);
});

module.exports = router;