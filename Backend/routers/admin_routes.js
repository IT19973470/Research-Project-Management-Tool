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

module.exports = router;