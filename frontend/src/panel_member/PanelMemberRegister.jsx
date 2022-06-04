import React, {Component, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";

export const PanelMemberRegister = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [_id, setId] = useState("");
    const [designation, setDesignation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id:_id,
                name:name,
                designation:designation,
                email:email,
                password:password,
                userType: 'panel'
            })
        };

        fetch(Common.url + '/panel_member/panelMemberRegister',requestOptions).then(()=>{
            navigate('/');
        })
    }

    return(
        <div>
            <form  align="center">
                <div className="form-group">
                    <br></br>
                    <h1>Add Panel Member</h1>
                    <label htmlFor="na,e">ID:</label>
                    <input type="text"  className="form-control" id="id"  placeholder="Enter Id" onChange={(e)=>{setId(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Name:</label>
                    <input type="text"  className="form-control" id="name"  placeholder="Enter name" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Address</label>
                    <input type="text"  className="form-control" id="designation"  placeholder="Enter address" onChange={(e)=>{setDesignation(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Email:</label>
                    <input type="text"  className="form-control" id="email"  placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Password:</label>
                    <input type="password"  className="form-control" id="password"  placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <br></br>

                <button type="button" onClick={add}  className="btn btn-primary" >Submit</button>
            </form>
        </div>
    );
}
