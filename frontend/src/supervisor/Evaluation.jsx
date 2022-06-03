import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export const Evaluation = () => {
    const [submission, setSumbission] = useState(null);
    const [title, setTitle] =useState("");
    const [details, setDetails] =useState("");
    const [deadline, setDeadline] =useState("");
    const [type, setType] =useState("");

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

    

    return (
    <div>
    {

        // <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
        //         View Marking
        //     </div>



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
                        <div className="col-3" style={{paddingTop: '22px',width: '200px',height: '70px'}}>
                        <a href='https://1drv.ms/u/s!Am_XwB2RHl51nCV08Brchj-LZRHr?e=kMhc31' download>Click to download</a>
                            </div>
                    </div>
                </div>
            </div>)

        })

        
    }

</div>
    );
};