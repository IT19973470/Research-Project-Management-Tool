import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const AddSupervisorTopic = () => {

    const [name, setName] = useState("");
    const [_id, setId] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [interests, setTitle] =useState("");
    const [array, setArray] = useState([]);

    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id:_id,
                name:name,
                address:address,
                email:email,
                password:pass,
                interests:array
            })
        };

       fetch('http://localhost:9000/rpmt/supervisor/add_supervisor',requestOptions)
    }
    const handleChange = () => {
        console.log(interests)
        setArray((array) => [...array, interests]);
    };

    return (

        <div>
            <form  align="center">
            <div className="form-group">
                    <h1>Add Supervisor Topic</h1>
                    <label htmlFor="na,e">ID:</label>
                    <input type="text"  className="form-control" id="id"  placeholder="Enter Id" onChange={(e)=>{setId(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Name:</label>
                    <input type="text"  className="form-control" id="name"  placeholder="Enter name" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Address</label>
                    <input type="text"  className="form-control" id="address"  placeholder="Enter address" onChange={(e)=>{setAddress(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Email:</label>
                    <input type="text"  className="form-control" id="email"  placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Password:</label>
                    <input type="password"  className="form-control" id="password"  placeholder="Enter password" onChange={(e)=>{setPass(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Interests:</label>
                    <input type="text"  className="form-control" id="name" placeholder="Enter interests"  onChange={(e)=>{setTitle(e.target.value)}}/>
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