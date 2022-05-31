const express = require('express')
const upload = require('express-fileupload')
const router = express.Router();
const Student = require('../models/Student');
const StudentGroup = require('../models/StudentGroup');
const User = require('../models/User');
const ResearchTopic = require('../models/ResearchTopic');
const GroupSupervisor = require('../models/GroupSupervisor');

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

router.delete('/remove_research_topic/:id', (req, res, next) => {
    ResearchTopic.updateOne(
        {
            $and: [
                {groupId: req.params.id},
                {registered: true}
            ]
        },
        {registered: false}
    ).then((researchTopic) => {
        res.send({reply: true});
    }).catch(next);
});

router.get('/topic_registered/:id', (req, res, next) => {
    ResearchTopic.findOne({
        $and: [
            {groupId: req.params.id},
            {registered: true}
        ]
    }).then((researchTopic) => {
        if (researchTopic !== null) {
            res.send({reply: researchTopic});
        } else {
            res.send({reply: null});
        }
    }).catch(next);
});

router.post('/add_group_supervisor', (req, res, next) => {
    GroupSupervisor.findOne({groupId: req.body.groupId}).then((supervisor) => {
        let body;
        if (req.body.val === 0) {
            body = {
                supervisor: req.body.supervisor
            }
        } else {
            body = {
                coSupervisor: req.body.coSupervisor
            }
        }
        if (supervisor !== null) {
            GroupSupervisor.updateOne(
                {groupId: req.body.groupId}, body
            ).then((supervisorObj) => {
                res.send({supervisor: req.body.supervisor, coSupervisor: req.body.coSupervisor, val: req.body.val});
            }).catch(next);
        } else {
            GroupSupervisor.create(req.body).then((groupSupervisor) => {
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
            interests: 'ML'
        },
        {
            _id: 2,
            name: 'Kamal',
            interests: 'AI'
        },
        {
            _id: 3,
            name: 'Sunil',
            interests: 'Network'
        },
        {
            _id: 4,
            name: 'Amal',
            interests: 'IOT'
        }
    ];
    GroupSupervisor.findOne({groupId: req.params.id}).then((grpSupervisor) => {
        if(grpSupervisor!==null) {
            supers.forEach((superObj) => {
                if (grpSupervisor.supervisor == superObj._id) {
                    superObj.markedSuper = true
                } else {
                    superObj.markedSuper = false
                }
                if (grpSupervisor.coSupervisor == superObj._id) {
                    superObj.markedCoSuper = true
                } else {
                    superObj.markedCoSuper = false
                }
            })
        }
        res.send(supers);
    })
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

module.exports = router;