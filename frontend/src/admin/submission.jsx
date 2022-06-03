import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavAdmin.css';
import axios from "axios";
export const Submission = () => {
    const [submission, setSumbission] = useState(null);
    const [title, setTitle] =useState("");
    const [details, setDetails] =useState("");
    const [deadline, setDeadline] =useState("");
    const [type, setType] =useState("");
    const [file, setFile] =useState('');

    useEffect (()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/admin/displaySubmission',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                // console.log(data)
                setSumbission(data)
            });
    })
    const onChange =e=>{
        console.log(file)
        setFile(e.target.files[0])
    }
    const onsubmit =async e=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file)
        try{
            const res =await axios.post('http://localhost:9000/upload',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
            });
        }catch(err){

        }
    }


    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id:"",
                title:title,
                details:details,
                deadline:deadline,
                type:type
            })
        };
        console.log(deadline)
        fetch('http://localhost:9000/rpmt/admin/addMarking',requestOptions)
    }

    return (
<div>
    {
        submission && submission.map((submission, key) => {
            return(<div style={{border: '3px solid #aaaaaa',borderRadius:' 10px',marginRight: '10px',marginTop:'10px'}}>
                <div style={{margin: '10px',display: 'flex'}}>
                    <div className="row" style={{width: '110%'}}>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                            <span style={{fontWeight: 'bold',}}>Title :</span>
                            <span style={{marginleft: '10px'}}>{submission.title}</span>
                        </div>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                            <span style={{fontWeight: 'bold'}}>Description :</span>
                            <span style={{marginleft: '10px'}}>{submission.details}</span>
                        </div>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                            <span style={{fontWeight: 'bold'}}>Deadline :</span>
                            <span style={{marginLeft: '10px'}}>{submission.deadline}</span>
                        </div>
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                            <span style={{fontWeight: 'bold'}}>Type :</span>
                            <span style={{marginLeft: '10px'}}>{submission.type}</span>
                        </div>
                    </div>
                </div>
            </div>)

        })
    }
    <form  align="center">
    <div className="form-group">
        <h1>Add submission</h1>
        <label htmlFor="na,e">Title:</label>
        <input type="text"  className="form-control" id="name"  placeholder="Enter submission title"  onChange={(e)=>{setTitle(e.target.value)}}/>
    </div>
    <div className="form-group">
        <label htmlFor="na,e">Submission details:</label>
        <input type="text"  className="form-control" id="name" placeholder="Enter Submission details"  onChange={(e)=>{setDetails(e.target.value)}}/>
    </div>
    <div className="form-group">
        <label htmlFor="na,e">Deadline:</label>
        <input type="date"  className="form-control" id="age" placeholder="Enter Date"  onChange={(e)=>{setDeadline(e.target.value)}}/>
    </div>
        <div className="form-group">
            <label htmlFor="na,e">Type:</label>
           <select  className="form-control" onChange={(e)=>{setType(e.target.value)}} >
               <option></option>
               <option value="docs">Docs</option>
               <option value="Pdf">Pdf</option>
               <option value="txt">Text</option>

           </select>
        </div>

</form>

    <form onSubmit={onsubmit}>
        <div className="form-group">
            <label htmlFor="na,e">File:</label>
            <input type="file"  className="form-control" id="age" placeholder="Enter Date" onChange={onChange}/>
        </div>
        <input type="submit" value="upload"/>
    </form>
    <button type="button" onClick={add}  className="btn btn-primary" >Add</button>
</div>
    );
};