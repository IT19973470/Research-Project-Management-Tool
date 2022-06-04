const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const url = 'mongodb://localhost/rpmt'
const fileUpload = require('express-fileupload')

const app = express();
app.use(cors())
mongoose.connect(url);

const con = mongoose.connection;
con.on('open', () => {
    console.log('DB connected');
});

app.use(express.json());
app.use(fileUpload());
app.use('/rpmt/user', require('./routers/user_routes'));
app.use('/rpmt/student', require('./routers/student_routes'));
app.use('/rpmt/admin', require('./routers/admin_routes'));

app.listen(9000, () => {
    console.log('Server started')
});