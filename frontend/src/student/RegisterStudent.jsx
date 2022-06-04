import React, {Component, useState} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const RegisterStudent = () => {
    let navigate = useNavigate();

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                Register Student
            </div>
            <div className="col-12">
                <div style={{
                    width: '100%',
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{width: '500px'}}>
                        <div style={{display: 'flex'}}>
                            <span style={{marginRight: '30px'}}>Student ID</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setId(e.target.value)}/>
                        </span>
                        </div>
                        <div style={{display: 'flex'}}>
                            <span style={{marginRight: '30px'}}>Full Name</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setName(e.target.value)}/>
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <span style={{marginRight: '35px'}}>Email</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setEmail(e.target.value)}/>
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <span style={{marginRight: '35px'}}>Address</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setAddress(e.target.value)}/>
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <span style={{marginRight: '35px'}}>Password</span>
                            <span style={{width: '100%'}}>
                            <input type="password" className="form-control"
                                   onChange={e => setPassword(e.target.value)}/>
                        </span>
                        </div>
                        <div style={{width: '100%', textAlign: 'center'}}>
                            <button className="btn btn-warning"
                                    style={{marginTop: '30px', fontSize: '20px', fontWeight: 'bold'}}
                                    onClick={() => {
                                        RegisterStudent()
                                    }}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function RegisterStudent() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                name: name,
                email: email,
                address: address,
                password: password,
                userType: 'student'
            })
        };
        fetch(Common.url + '/student/student_register', requestOptions)
            .then(response => response.json())
            .then(reply => {
                // console.log(reply);
                // if (reply !== null && UserData.type === 'customer') {
                //     UserData.id = reply.id;
                    navigate('/');
                // } else if (reply !== null && UserData.type === 'trader') {
                //     navigate('/trader_items');
                // }
            });
    }
};