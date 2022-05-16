import React, {Component, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const StudentGroups = () => {
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
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{width: '500px'}}>
                        <div style={{textAlign: 'center'}}>
                            <span style={{lineHeight: '2px'}}>I have not registered for a group</span>
                            <button className="btn btn-warning"
                                    style={{marginTop: '30px', fontWeight: 'bold', marginLeft: '10px'}}>
                                Create new group
                            </button>
                        </div>
                        <div style={{display: 'flex', marginTop: '20px'}}>
                            <span style={{marginRight: '30px'}}>Student ID</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"/>
                        </span>
                            <button className="btn btn-warning"
                                    style={{fontWeight: 'bold', marginLeft: '10px'}}>
                                Search
                            </button>
                        </div>
                        <div>IT19973470 is registered for a group</div>
                        <button className="btn btn-warning"
                                style={{fontWeight: 'bold', marginLeft: '10px'}}>
                            Add
                        </button>
                        <table className="table table-striped" style={{marginTop: '40px'}}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" width="20%">Student ID</th>
                                <th scope="col">Name</th>
                                <th scope="col" width="5%" style={{textAlign: 'center'}}>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                            </tr>
                            </tbody>
                        </table>
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