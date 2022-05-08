const express = require('express')
const router = express.Router();

const prefix = '/student/';

router.get(prefix + 'get', (req, res) => {
    res.send('Gt')
});

router.post(prefix + 'add', (req, res) => {
    res.send('Gt')
});

module.exports = router;