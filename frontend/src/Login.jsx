import React, {Component, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {UserData} from "./UserData.js";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="row">
        {/*<div className="row" style={{minHeight: 'calc(100vh - 325px)'}}>*/}
            {/*<div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>*/}
            {/*Research Project Management Tool*/}
            {/*</div>*/}
            <div className="col-12">
                <div style={{
                    width: '100%',

                    marginTop: '100px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{width: '500px'}}>
                        <div style={{display: 'flex'}}>
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
                            {/*<button className="btn btn-warning"*/}
                            {/*style={{*/}
                            {/*marginTop: '30px',*/}
                            {/*fontSize: '20px',*/}
                            {/*fontWeight: 'bold',*/}
                            {/*marginLeft: '30px'*/}
                            {/*}}>*/}
                            {/*Sign Up*/}
                            {/*</button>*/}
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
                password: password
            })
        };
        fetch('http://localhost:9000/rpmt/user/login', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply !== null) {
                    localStorage.setItem('user', JSON.stringify(reply));
                    navigate('/student/student_groups');
                }
            });
    }
};