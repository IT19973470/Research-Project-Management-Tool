import React, {Component, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {UserData} from "./UserData.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Common} from "./commons/Common";

export const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');

    return (
        <div className="row" style={{minHeight:'calc(100vh - 220px)'}}>
            {/*<div className="row" style={{minHeight: 'calc(100vh - 325px)'}}>*/}
            {/*<div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>*/}
            {/*Research Project Management Tool*/}
            {/*</div>*/}
            <div className="col-12">
                <div style={{
                    width: '100%',
                    minWidth:'100vh',
                    marginTop: '100px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{width: '600px'}}>
                        <div style={{display: 'flex'}}>
                            <span style={{marginRight: '30px'}}>Type</span>
                            <span style={{width: '100%'}}>
                            <select className="form-control" onChange={(e) => {
                                setUserType(e.target.value)
                            }}>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                                <option value="supervisor">Supervisor</option>
                                <option value="panel">Panel Member</option>
                            </select>
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <span style={{marginRight: '30px'}}>Username</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setEmail(e.target.value)}/>
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
                                        Login()
                                    }}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function Login() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                userType: userType
            })
        };
        fetch(Common.url + '/user/login', requestOptions)
            .then(response => response.json())
            .then(user => {
                if (user !== null) {
                    localStorage.setItem('user', JSON.stringify(user));
                    if (user.userType === 'student') {
                        navigate('/student/student_groups');
                    } else if (user.userType === 'admin') {
                        navigate('/modify_users');
                    } else if (user.userType === 'supervisor') {
                        navigate('/supervisor/view_topics');
                    } else if (user.userType === 'panel') {
                        navigate('/panel_member/view_topics');
                    }
                }
            });
    }
};