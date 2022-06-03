const express = require('express')
const router = express.Router();
const Student = require('../models/Student');
let Mark = require('../models/Marking');
let Submission = require('../models/Submission')
let SupervisorTopic = require("../models/SupervisorTopic")
let AddPannel =require("../models/Panel")
let studentGroup=require("../models/StudentGroup")
let researchtopics=require("../models/ResearchTopic")



router.route("/displayUsers").get((req, res) => {
    Student.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})
router.route("/update/:id").put(async (req, res) => {
    let userID = req.params.id;
    const {_id, name, email, address} = req.body;
    const updateStudent = {
        _id,
        name,
        email,
        address
    }
    const update = await Student.findByIdAndUpdate(userID, updateStudent)
        .then((user) => {
            res.status(200).send({status: "User updated", user: user})
        }).catch((err) => {
            res.status(500).send({status: "Error", error: err.message})
        })

})


router.route("/delete/:id").delete(async (req, res) => {
    let userID = req.params.id;
    await Student.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({status: "User deleted"})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error", error: err.message})
        })
})
router.route("/deleteS/:id").delete(async (req, res) => {
    let userID = req.params.id;
    console.log(userID)
    await SupervisorTopic.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({status: "User deleted"})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error", error: err.message})
        })
})
router.route("/deleteMarking/:id").delete(async (req, res) => {
    let markingID = req.params.id;
    await Mark.findByIdAndDelete(markingID)
        .then(() => {
            res.status(200).send({status: "Marking deleted"})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error", error: err.message})
        })
})

// router.route("/add").post((req,res)=>{
//     console.log(req)
//     const _id=req.body._id;
//     const criteria=req.body.criteria;
//     const marks=req.body.marks;
//
//     const newMark =new Mark({
//         _id,
//         criteria,
//         marks
//     });
//     newMark.save().then((mark)=>{
//         res.json("Student added")
//     }).catch((err)=>{
//       console.log(err)
//     })
// })

let router1 = router.post('/add', (req, res, next) => {
    if (req.body._id === '') {
        console.log(req.body)
        req.body._id = 'M' + Math.floor(Math.random() * 10000);
        Mark.create(req.body).then((data) => {
            res.send(data);
        }).catch(next);
    }
});

router.post('/addMarking', (req, res, next) => {
    if (req.body._id === '') {
        console.log(req.body)
        req.body._id = 'S' + Math.floor(Math.random() * 10000);
        Submission.create(req.body).then((data) => {
            res.send(data);
        }).catch(next);
    }
});

let router2 = router.post('/addSupervisorTopic', (req, res, next) => {
    console.log(req.body)
    SupervisorTopic.create(
        {_id: 'S' + Math.floor(Math.random() * 10000), interests:req.body.interests}
    ).then((data) => {
        res.send(data);
    }).catch(next);

});

let router3 = router.post('/addPannel', (req, res, next) => {
    console.log(req.body)
    AddPannel.create(
        {_id: 'P' + Math.floor(Math.random() * 10000), name:req.body.name,grouplist:req.body.grouplist,stafflist:req.body.stafflist}
    ).then((data) => {
        res.send(data);
    }).catch(next);

});

router.route("/updateS/:id").put(async (req, res) => {
    console.log(req.body)
    let userID = req.params.id;
    SupervisorTopic.updateMany(
        {_id:userID},
        {$set: {interests: req.body.interests}}
    ).then((studentGroup) => {
        res.send(studentGroup);
    })

    // router.route("/deleteSupervisor/:id").delete(async (req, res) => {
    //     let markingID = req.params.id;
    //     console.log(markingID)
    //     await SupervisorTopic.findByIdAndDelete(markingID)
    //         .then(() => {
    //             res.status(200).send({status: "Marking deleted"})
    //         }).catch((err) => {
    //             console.log(err.message);
    //             res.status(500).send({status: "Error", error: err.message})
    //         })
    // })

    // const update = await Student.findByIdAndUpdate(userID, updateStudent)
    //     .then((user) => {
    //         res.status(200).send({status: "User updated", user: user})
    //     }).catch((err) => {
    //         res.status(500).send({status: "Error", error: err.message})
    //     })

})
router.route("/displayMarking").get((req, res) => {
    Mark.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})

router.route("/displaySubmission").get((req, res) => {
    Submission.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})
router.route("/displaySupervisor").get((req, res) => {
    SupervisorTopic.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})
router.route("/displayGroups").get((req, res) => {
    studentGroup.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})


router.route("/viewRoles").get((req, res) => {
    AddPannel.aggregate([
        {$lookup:
            {from:"studentgroups",localField:"grouplist",foreignField:"groupId",as:"Groups"},
        },
        {$lookup:
                {from:"supervisortopics",localField:"stafflist",foreignField:"_id",as:"Staff"}
        },
        {$lookup:
                {from:"groupsupervisors",localField:"grouplist",foreignField:"groupId",as:"Supervisor"}
        }

    ]).then((s)=>{
        res.json(s)
    })
})

module.exports = router;