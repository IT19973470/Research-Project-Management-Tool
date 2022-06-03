const express = require('express')
const upload = require('express-fileupload')
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
            getStudent(studentId).then(student => {
                    students.push(student)
                }
            )
        })
        Promise.all(studentPromises).then(() => {
            if (studentsArr !== null) {
                res.send({
                    students: students,
                    groupId: studentsArr.groupId,
                    leader: studentsArr.leader
                });
            } else {
                res.send([])
            }
        })
    }).catch(next);
});

router.get('/set_leader/:id/:leaderId', (req, res, next) => {
    StudentGroup.updateOne(
        {groupId: req.params.id},
        {leader: req.params.leaderId}
    ).then((studentsArr) => {
        res.send({reply: true})
    }).catch(next);
});

router.get('/get_groups', (req, res, next) => {
    let studentGrp = [];
    StudentGroup.find().then((studentGroupsArr) => {
        studentGroupsArr && studentGroupsArr.forEach((studentGrpObj) => {
            let students = [];
            let leader;
            studentGrpObj && studentGrpObj.students.forEach((studentId) => {
                getStudent(studentId).then(student => {
                        students.push(student)
                    }
                )
            })
            getStudent(studentGrpObj.leader).then(student => {
                leader = student;
            })
            Promise.all(studentPromises).then(() => {
                studentGrp.push({
                    groupId: studentGrpObj.groupId,
                    students: students,
                    leader: leader
                })
            })
        })
        Promise.all(studentPromises).then(() => {
            res.send(studentGrp)
        })
    }).catch(next);
});

let studentPromises = [];

function getStudent(studentId) {
    let studentPromise = new Promise(resolve => {
        Student.findOne({_id: studentId}).then((student) => {
            resolve(student);
        })
    })
    studentPromises.push(studentPromise);
    return studentPromise;
}

router.delete('/remove_from_group/:groupId/:id/:leader', (req, res, next) => {
    let body;
    if (req.params.leader) {
        body = {$pull: {'students': req.params.id}, leader: ''}
    } else {
        body = {$pull: {'students': req.params.id}}
    }
    StudentGroup.updateOne(
        {groupId: req.params.groupId}, body
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
        req.body.students = [req.body.student];
        if (req.body.leader) {
            req.body.leader = req.body.student
        }
        StudentGroup.create(req.body).then((studentGroup) => {
            res.send(req.body);
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
    StudentGroup.updateMany(
        {groupId: req.body.groupId, "topics.topicRegistered": true},
        {$set: {"topics.$.topicRegistered": false}}
    ).then(() => {
        StudentGroup.updateOne(
            {groupId: req.body.groupId},
            {
                $push: {
                    topics: req.body.topic
                }
            }
        ).then(() => {
            StudentGroup.findOne({groupId: req.body.groupId}).then((studentGrp) => {
                res.send(studentGrp.topics.reverse());
            })
        }).catch(next);
    }).catch(next);
});

router.delete('/remove_research_topic/:id', (req, res, next) => {
    StudentGroup.updateOne(
        {
            $and: [
                {groupId: req.params.id},
                {topicRegistered: true}
            ]
        },
        {topicRegistered: false}
    ).then((researchTopic) => {
        res.send({reply: true});
    }).catch(next);
});

router.get('/topic_registered/:id', (req, res, next) => {
    StudentGroup.findOne({
        groupId: req.params.id
    }).then((researchTopic) => {
        if (researchTopic !== null) {
            res.send({reply: researchTopic.topics.reverse()});
        } else {
            res.send({reply: null});
        }
    }).catch(next);
});

router.post('/add_group_supervisor', (req, res, next) => {
    StudentGroup.findOne({groupId: req.body.groupId}).then((supervisor) => {
        let body;
        if (req.body.val === 0) {
            body = {
                supervisor: {_id: req.body.supervisor}
            }
        } else {
            body = {
                coSupervisor: {_id: req.body.coSupervisor}
            }
        }
        if (supervisor !== null) {
            StudentGroup.updateOne(
                {groupId: req.body.groupId}, body
            ).then((supervisorObj) => {
                res.send({supervisor: req.body.supervisor, coSupervisor: req.body.coSupervisor, val: req.body.val});
            }).catch(next);
        } else {
            StudentGroup.create(req.body).then((groupSupervisor) => {
                res.send(groupSupervisor);
            }).catch(next);
        }
    });
});

router.post('/submit_documents', (req, res) => {
    if (req.files) {
        let file = req.files.file;
        file.mv('C:/xampp/htdocs/NodeFile/' + file.name, (err) => {
            if (err) {
                res.send(err)
            } else {
                res.send('File Uploaded');
            }
        })
    }
});

router.get('/get_supervisors/:id', (req, res, next) => {
    let supers = [
        {
            _id: 1,
            name: 'Gayan',
            interests: ['ML', 'AI']
        },
        {
            _id: 2,
            name: 'Kamal',
            interests: ['AI']
        },
        {
            _id: 3,
            name: 'Sunil',
            interests: ['Network']
        },
        {
            _id: 4,
            name: 'Amal',
            interests: ['IOT']
        }
    ];
    StudentGroup.findOne({groupId: req.params.id}).then((grpSupervisor) => {
        supers.forEach((superObj) => {
            if (grpSupervisor && grpSupervisor.supervisor._id == superObj._id) {
                superObj.markedSuper = 1
            } else {
                superObj.markedSuper = 0
            }
            if (grpSupervisor && grpSupervisor.coSupervisor._id == superObj._id) {
                superObj.markedCoSuper = 1
            } else {
                superObj.markedCoSuper = 0
            }
        })
        res.send(supers);
    })
});

module.exports = router;