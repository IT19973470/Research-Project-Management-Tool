const express = require('express')
const router = express.Router();
const Student = require('../models/Student');
const StudentGroup = require('../models/StudentGroup');
const User = require('../models/User');

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
                    res.send(students);
                }
            })
        })
    }).catch(next);
});

// router.get('/get_group/:id', (req, res, next) => {
//     let students = [];
//     StudentGroup.find({
//         students: req.params.id
//     }).then((studentsArr) => {
//         new Promise(() => {
//             studentsArr[0].students.forEach((student) => {
//                 console.log(student)
//                 Student.find({_id: student}).then((student) => {
//                     students.push(student)
//                 })
//             })
//         }).then(() => {
//             res.send(students);
//             // console.log(students)
//         })
//     }).catch(next);
// });

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

module.exports = router;