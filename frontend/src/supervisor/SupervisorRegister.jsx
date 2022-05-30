import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const SupervisorRegister = () => {

    const [interests, setTitle] =useState("");
    const [array, setArray] = useState([]);
    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id:'',
                interests:array
            })
        };

       fetch('http://localhost:9000/rpmt/admin/addSupervisorTopic',requestOptions)
    }
    const handleChange = () => {
        console.log(interests)
        setArray((array) => [...array, interests]);
    };

    return (

        <div>
            <form  align="center">
                <div className="form-group">
                    <h1>Add Supervisor</h1>
                    <label htmlFor="na,e">Name:</label>
                    <input type="text"  className="form-control" id="name"  placeholder="Enter submission title"/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Interests:</label>
                    <input type="text"  className="form-control" id="name" placeholder="Enter Submission details"  onChange={(e)=>{setTitle(e.target.value)}}/>
                    <div>
                       {array.map(array => <span>{array}<br/></span>)}
                    </div>
                    <button type="button" onClick={handleChange}  className="btn btn-primary" >Add Interest</button>
                </div>

                <button type="button" onClick={add}  className="btn btn-primary" >Add</button>
            </form>

        </div>
    );
};