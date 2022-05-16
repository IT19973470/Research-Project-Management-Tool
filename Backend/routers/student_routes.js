const express = require('express')
const router = express.Router();
const Student = require('../models/Student');

const prefix = '/student/';

router.get(prefix + 'get', (req, res) => {
    res.send('Gt')
});

router.post(prefix + 'register', (req, res, next) => {
    req.body._id = req.body.id
    Student.create(req.body).then(function (student) {
        res.send(student);
    }).catch(next);
});

module.exports = router;