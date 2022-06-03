const express = require('express')
const upload = require('express-fileupload')
const router = express.Router();
const Student = require('../models/Student');
const StudentGroup = require('../models/StudentGroup');
const GroupTopic = require('../models/GroupTopic');
const User = require('../models/User');
const FileSubmission = require('../models/FileSubmission');
const mongoose = require('mongoose');

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
    GroupTopic.updateMany(
        {groupId: req.body.groupId, topicRegistered: true},
        {$set: {topicRegistered: false, topicAccepted: 0}}
    ).then(() => {
        req.body._id = mongoose.Types.ObjectId();
        GroupTopic.create(req.body).then((topic) => {
            StudentGroup.updateOne(
                {groupId: req.body.groupId},
                {$push: {topics: req.body._id}}
            ).then(() => {
                res.send({reply: true})
            }).catch(next);
        })
    })
});

router.put('/update_research_topic/:id', (req, res, next) => {
    GroupTopic.updateOne(
        {_id: req.params.id},
        req.body
    ).then((researchTopic) => {
        res.send({reply: true});
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
    let topics = [];
    StudentGroup.findOne({
        groupId: req.params.id
    }).then((researchTopic) => {
        // if (researchTopic !== null) {
        researchTopic && researchTopic.topics.forEach(topicId => {
            getTopic(topicId).then(topic => {
                    topics.push(topic)
                }
            )
        })
        Promise.all(topicPromises).then(() => {
            if (researchTopic !== null) {
                res.send({reply: topics.reverse()});
            } else {
                res.send({reply: []});
            }
        })
        // } else {
        //     res.send({reply: null});
        // }
    }).catch(next);
});

let topicPromises = [];

function getTopic(topicId) {
    let topicPromise = new Promise(resolve => {
        GroupTopic.findOne({_id: topicId}).then((groupTopic) => {
            resolve(groupTopic)
        })
    })
    topicPromises.push(topicPromise);
    return topicPromise;
}

router.post('/add_group_supervisor', (req, res, next) => {
    StudentGroup.findOne({groupId: req.body.groupId}).then((supervisor) => {
        let body;
        if (req.body.val === 0) {
            body = {
                supervisor: {_id: req.body.supervisor, accepted: false}
            }
        } else {
            body = {
                coSupervisor: {_id: req.body.coSupervisor, accepted: false}
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

router.post('/submit_document/:submissionId/:groupId', (req, res) => {
    // console.log(req.files)
    if (req.files) {
        let file = req.files.file;
        file.mv('C:/xampp/htdocs/NodeFile/' + file.name, (err) => {
            if (err) {
                res.send(err)
            } else {
                FileSubmission.create({
                    groupId: req.params.groupId,
                    submissionId: req.params.submissionId,
                    fileName: req.files.file.name
                })
                console.log(req.params.submissionId)
                // FileSubmission.create()
                res.send({reply: true});
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

router.get('/get_upload_links', (req, res, next) => {
    let supers = [
        {
            _id: 1,
            title: 'File Upload 1',
            details: 'qwe',
            deadline: '2020-02-01',
            type: 'pdf'
        },
        {
            _id: 2,
            title: 'File Upload 2',
            details: 'qwe',
            deadline: '2020-02-02',
            type: 'pdf'
        },
        {
            _id: 3,
            title: 'File Upload 3',
            details: 'qwe',
            deadline: '2020-02-03',
            type: 'pdf'
        },
        {
            _id: 4,
            title: 'File Upload 4',
            details: 'qwe',
            deadline: '2020-02-05',
            type: 'pdf'
        }
    ];
    // StudentGroup.findOne({groupId: req.params.id}).then((grpSupervisor) => {
    //     supers.forEach((superObj) => {
    //         if (grpSupervisor && grpSupervisor.supervisor._id == superObj._id) {
    //             superObj.markedSuper = 1
    //         } else {
    //             superObj.markedSuper = 0
    //         }
    //         if (grpSupervisor && grpSupervisor.coSupervisor._id == superObj._id) {
    //             superObj.markedCoSuper = 1
    //         } else {
    //             superObj.markedCoSuper = 0
    //         }
    //     })
    res.send(supers);
    // })
});

module.exports = router;