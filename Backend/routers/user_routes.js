const express = require('express')
const router = express.Router();
const User = require('../models/User');

router.post('/login', (req, res, next) => {
    User.findOne({
        $and: [
            {$or: [{_id: req.body.email}, {email: req.body.email}]},
            {password: req.body.password}, {userType: req.body.userType}
        ]
    }).then(function (user) {
        res.send(user);
    }).catch(next);
});

module.exports = router;