import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavAdmin.css';
import axios from "axios";
import Progress from "./progress"
import {faInfo, faUpload, faCloudUpload} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Common} from "./../commons/Common";

export const Submission = () => {
    const [submission, setSumbission] = useState(null);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [deadline, setDeadline] = useState("");
    const [type, setType] = useState("");
    const [file, setFile] = useState('');
    const [fname, setFileName] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState("")

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/admin/displaySubmission', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data)
                setSumbission(data)
            });
    })
    const onChange = e => {
        console.log(e.target.files[0].name)
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }
    // const onsubmit =async e=>{
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file',file)
    //     try{
    //         const res =await axios.post('http://localhost:9000/upload',formData,{
    //             headers:{
    //                 'Content-Type':'multipart/form-data'
    //             },
    //         });
    //     }catch(err){
    //
    //     }
    //
    //
    // }

    // const onsubmit =async e=>{
    //     e.preventDefault();
    //     var formData = new FormData();
    //     formData.append('file',file)
    //     try {
    //         const requestOptions1 = await fetch('http://localhost:9000/upload',{
    //             method:'POST',
    //             body:formData
    //         });
    //
    //     }catch (e){}
    //
    // }

    const onsubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file)
        try {
            const res = await axios.post(Common.url + '/admin/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: ProgressEvent => {
                    setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))
                    setTimeout(() => setUploadPercentage(0), 1000)
                }
            });

        } catch (err) {
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
                type:type,
                fileNameTemp:fname
            })
        };
        console.log(deadline)
        fetch(Common.url + '/admin/addMarking', requestOptions)
    }

    return (
        <div>
            {
                submission && submission.map((submission, key) => {
                    return (<div style={{
                        border: '3px solid #aaaaaa',
                        borderRadius: ' 10px',
                        marginRight: '10px',
                        marginTop: '10px'
                    }}>
                        <div style={{margin: '10px', display: 'flex'}}>
                            <div className="row" style={{width: '110%'}}>
                                <div className="col-3" style={{paddingTop: '22px', width: '200px', height: '70px'}}>
                                    <span style={{fontWeight: 'bold',}}>Title :</span>
                                    <span style={{marginleft: '10px'}}>{submission.title}</span>
                                </div>
                                <div className="col-3" style={{paddingTop: '22px', width: '200px', height: '70px'}}>
                                    <span style={{fontWeight: 'bold'}}>Description :</span>
                                    <span style={{marginleft: '10px'}}>{submission.details}</span>
                                </div>
                                <div className="col-3" style={{paddingTop: '22px', width: '200px', height: '70px'}}>
                                    <span style={{fontWeight: 'bold'}}>Deadline :</span>
                                    <span style={{marginLeft: '10px'}}>{submission.deadline}</span>
                                </div>
                                <div className="col-3" style={{paddingTop: '22px', width: '200px', height: '70px'}}>
                                    <span style={{fontWeight: 'bold'}}>Type :</span>
                                    <span style={{marginLeft: '10px'}}>{submission.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>)

                })
            }
            <form align="center">
                <div className="form-group">
                    <h1>Add submission</h1>
                    <label htmlFor="na,e">Title:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter submission title"
                           onChange={(e) => {
                               setTitle(e.target.value)
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Submission details:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Submission details"
                           onChange={(e) => {
                               setDetails(e.target.value)
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Deadline:</label>
                    <input type="date" className="form-control" id="age" placeholder="Enter Date" onChange={(e) => {
                        setDeadline(e.target.value)
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Type:</label>
                    <select className="form-control" onChange={(e) => {
                        setType(e.target.value)
                    }}>
                        <option></option>
                        <option value="docs">Docs</option>
                        <option value="Pdf">Pdf</option>
                        <option value="txt">Text</option>

                    </select>
                </div>

            </form>

            <form onSubmit={onsubmit} align="center">
                <label htmlFor="na,e">File:</label>
                <div className="form-group row">
                    <div className="col-11">
                        <input type="file" className="form-control" id="age" placeholder="Enter Date"
                               onChange={onChange}/>
                        <Progress percentage={uploadPercentage}/>
                    </div>
                    <div className="col-1">
                        <button type="button" align="center" onClick={onsubmit} className="btn"><FontAwesomeIcon
                            icon={faCloudUpload}/></button>
                    </div>
                </div>

                <br/>


                <br/>
                <br/>
                <button type="button" align="center" onClick={add} className="btn btn-primary">Submit</button>
                <br/>
                <br/>
            </form>


        </div>
    );
};