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
const User = require("../models/User");

let router1 = router.post('/add_supervisor', (req, res, next) => {
    console.log(req.body)
    supervisor.create(
        {
            _id: req.body._id,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password: req.body.password,
            interests: req.body.interests
        }
    ).then((data) => {
        User.create(req.body).then(() => {
            res.send(data);
        })
        // res.send(data);
    }).catch(next);

});

router.route('/viewTopics').get((req, res) => {
    ResearchTopic.find().then((topics) => {
        res.json(topics);
    }).catch(err => {
        console.log(err);
    })
});

router.route('/get_groups/:id').get((req, res) => {
    StudentGroup.find({
            $or: [{'supervisor._id': req.params.id}, {'coSupervisor._id': req.params.id}]
        }
    ).then((groups) => {
        // console.log(groups)
        res.json(groups);
    }).catch(err => {
        console.log(err);
    })
})
;

router.route("/acceptTopic/:id").put(async (req, res) => {
    let _id = req.params.id;
    const {accepted} = req.body;
    const updateTopic = {
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

router.route('/viewGroup').get(async (req, res) => {
    await StudentGroup.find().then((details) => {
        res.json(details)
    })

});

router.route('/viewMarking').get((req, res) => {
    Mark.find().then((marking) => {
        res.json(marking);
    }).catch(err => {
        console.log(err)
    });
});

router.route('/viewFeedback').get((req, res) => {
    DocumentEvaluation.find().then((feedback) => {
        res.json(feedback);
    }).catch(err => {
        console.log(err)
    });
});

router.route("/updateFeedback/:id").put(async (req, res) => {
    let id = req.params.id;
    const {groupId, documentMark, documentFeedback} = req.body;
    const updateFeedback = {
        groupId,
        documentMark,
        documentFeedback
    }
    const update = await DocumentEvaluation.findByIdAndUpdate(id, updateFeedback)
        .then((feedback) => {
            res.status(200).send({status: "Feedback updated", feedback: feedback})
        }).catch((err) => {
            res.status(500).send({status: "Error", error: err.message})
        })

});

router.route("/deleteById/:id").delete(async (req, res) => {
    let id = req.params.id;
    await DocumentEvaluation.findOneAndDelete(id)
        .then(() => {
            res.status(200).send({status: "Feedback deleted"})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error", error: err.message})
        })
});

module.exports = router;