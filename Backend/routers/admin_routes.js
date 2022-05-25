const express = require('express')
const router = express.Router();
const Student = require('../models/Student');

router.route("/displayUsers").get((req,res)=>{
    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/update/:id").put(async(req,res)=>{
    let userID=req.params.id;
    const {_id,name,email,address}=req.body;
    const updateStudent={
        _id,
        name,
        email,
        address
    }
    const  update =await Student.findByIdAndUpdate(userID, updateStudent)
        .then((user)=>{
            res.status(200).send({status:"User updated",user:user})
        }).catch((err)=>{
            res.status(500).send({status:"Error",error:err.message})
        })

})

module.exports = router;