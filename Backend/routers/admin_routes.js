const express = require('express')
const router = express.Router();
const Student = require('../models/Student');
const Admin = require('../models/Admin');
let Mark = require('../models/Marking');
let Submission = require('../models/Submission')
let SupervisorTopic = require("../models/SupervisorTopic")
let Supervisor = require("../models/Supervisor")
let AddPannel = require("../models/Panel")
let studentGroup = require("../models/StudentGroup")
let researchtopics = require("../models/ResearchTopic")
const User = require('../models/User');
const panelMember = require('../models/PanelMember')

router.route("/displayUsers").get((req, res) => {
    Student.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})
router.route("/displayPanel").get((req, res) => {
    panelMember.find().then((panel) => {
        res.json(panel)
    }).catch((err) => {
        console.log(err)
    })
})
router.route("/displayAdmin").get((req, res) => {
    Admin.find().then((panel) => {
        res.json(panel)
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
    await Supervisor.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({status: "User deleted"})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error", error: err.message})
        })
})
router.route("/deletePanel/:id").delete(async (req, res) => {
    let userID = req.params.id;
    console.log(userID)
    await panelMember.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({status: "User deleted"})
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error", error: err.message})
        })
})
router.route("/deleteAdmin/:id").delete(async (req, res) => {
    let userID = req.params.id;
    console.log(userID)
    await Admin.findByIdAndDelete(userID)
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
        {_id: 'S' + Math.floor(Math.random() * 10000), interests: req.body.interests}
    ).then((data) => {
        res.send(data);
    }).catch(next);

});

let router3 = router.post('/addPannel', (req, res, next) => {
    console.log(req.body)
    AddPannel.create(
        {
            _id: 'P' + Math.floor(Math.random() * 10000),
            name: req.body.name,
            grouplist: req.body.grouplist,
            stafflist: req.body.stafflist
        }
    ).then((data) => {
        res.send(data);
    }).catch(next);

});
router.post('/admin_register', (req, res, next) => {
    console.log(req.body)
    req.body._id = req.body._id
    Admin.create(req.body).then((admin) => {
        User.create(req.body).then(() => {
            res.send(admin);
        })
    }).catch(next);
});
router.route("/updateS/:id").put(async (req, res) => {
    console.log(req.body)
    let userID = req.params.id;
    Supervisor.updateMany(
        {_id: userID},
        {name: req.body.name, address: req.body.address, email: req.body.email, $set: {interests: req.body.interests}}
    ).then((studentGroup) => {
        res.send(studentGroup);
    })

})
router.route("/updatePanel/:id").put(async (req, res) => {
    console.log(req.body)
    let userID = req.params.id;
    panelMember.updateMany(
        {_id: userID},
        {name: req.body.name, designation: req.body.designation, email: req.body.email}
    ).then((studentGroup) => {
        res.send(studentGroup);
    })

})

router.route("/updateAdmin/:id").put(async (req, res) => {
    console.log(req.body)
    let userID = req.params.id;
    Admin.updateMany(
        {_id: userID},
        {name: req.body.name, designation: req.body.designation, email: req.body.email, address: req.body.address}
    ).then((studentGroup) => {
        res.send(studentGroup);
    })

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
    Supervisor.find().then((students) => {
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
        {
            $lookup:
                {from: "studentgroups", localField: "grouplist", foreignField: "groupId", as: "Groups"},
        },
        {
            $lookup:
                {from: "panelmembers", localField: "stafflist", foreignField: "_id", as: "Staff"}
        },
        {
            $lookup:
                {from: "groupsupervisors", localField: "grouplist", foreignField: "groupId", as: "Supervisor"}
        }

    ]).then((s) => {
        res.json(s)
    })
})

router.route("/upload").post((req, res) => {
    // console.log(req.files)
    if (req.files === null) {
        // console.log(req.files)
        return res.status(401).json({msg: 'No'})
    }
    const file = req.files.file;
    console.log('C:/xampp/htdocs/NodeFile/down/'+file.name)
    file.mv('C:/xampp/htdocs/NodeFile/down/'+file.name, err => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `C:/Users/Gayan/Desktop/ds/${file.name}`})
    })

})

module.exports = router;