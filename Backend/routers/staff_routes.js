const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');



router.post('/login', (req, res) =>{
    Staff.findOne({
        $and:[
            {$or:[{_id: req.body.email}, {email: req.body.email}]},
            {password: req.body.password}
        ]
    }).then(function (staff){
        res.send(staff)
    });
});

module.exports = router;
