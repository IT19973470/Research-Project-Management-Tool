const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const url = 'mongodb://localhost/rpmt'

var fileUpload =require('express-fileupload')
const app = express();
app.use(cors())
mongoose.connect(url);

const con = mongoose.connection;
con.on('open', () => {
    console.log('DB connected');
});

app.use(express.json());
app.use('/rpmt/user', require('./routers/user_routes'));
app.use('/rpmt/student', require('./routers/student_routes'));
app.use('/rpmt/admin', require('./routers/admin_routes'));
app.use('/rpmt/panel_member', require('./routers/panel_member_routes'));


app.use(fileUpload())
app.post("/upload",(req,res)=>{
    if(req.files===null){
        console.log(req.files)
        return res.status(401).json({msg:'No'})
    }
    const file=req.files.file;
    file.mv(`C:/Users/Gayan/OneDrive/AF/${file.name}`,err=>{
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
        res.json({fileName:file.name,filePath:`C:/Users/Gayan/Desktop/ds/${file.name}`})
    })

})


app.listen(9000, () => {
    console.log('Server started')
});
