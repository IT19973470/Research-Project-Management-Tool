import React, {Component, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const RegisterStudent = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
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
                            <span style={{marginRight: '30px'}}>Full Name</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"/>
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <span style={{marginRight: '35px'}}>Email</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"/>
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <span style={{marginRight: '35px'}}>Address</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"/>
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <span style={{marginRight: '35px'}}>Password</span>
                            <span style={{width: '100%'}}>
                            <input type="password" className="form-control"/>
                        </span>
                        </div>
                        <div style={{width: '100%', textAlign: 'center'}}>
                            <button className="btn btn-warning"
                                    style={{marginTop: '30px', fontSize: '20px', fontWeight: 'bold'}}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function RegisterUser() {
        if (UserData.type === 'customer') {
            navigate('/customer_profile');
        } else if (UserData.type === 'trader') {
            navigate('/trader_profile');
        }
    }

    function Login() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        fetch('http://localhost:3000/cart/user/login', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply !== null && UserData.type === 'customer') {
                    UserData.id = reply.id;
                    navigate('/view_items');
                } else if (reply !== null && UserData.type === 'trader') {
                    navigate('/trader_items');
                }
            });
    }
};