const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/rp'

const app = express();
mongoose.connect(url);

const con = mongoose.connection;
con.on('open', () => {
    console.log('DB connected');
});

app.use(express.json())

const routes = require('./routers/student_routes');
app.use('/rp', routes);

app.listen(9000, () => {
    console.log('Server started')
});