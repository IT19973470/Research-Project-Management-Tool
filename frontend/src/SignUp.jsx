import React, {Component, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const SignUp = () => {
    let navigate = useNavigate();

    return (
        <div style={{marginTop:'50px'}}>
            <div className="row" style={{minHeight: 'calc(100vh - 220px)'}}>
                <div className="col-3" style={{textAlign: 'center'}}>
                    <button className="btn btn-warning"
                            style={{fontSize: '20px'}}
                            onClick={() => {
                                navigate('/register')
                            }}>
                        Admin
                    </button>
                </div>
                <div className="col-3" style={{textAlign: 'center'}}>
                    <button className="btn btn-warning"
                            style={{fontSize: '20px'}} onClick={() => {
                        navigate('/student/register_student')
                    }}>
                        Student
                    </button>
                </div>
                <div className="col-3" style={{textAlign: 'center'}}>
                    <button className="btn btn-warning"
                            style={{fontSize: '20px'}} onClick={() => {
                        navigate('/supervisor/add_supervisor')
                    }}>
                        Supervisor
                    </button>
                </div>
                <div className="col-3" style={{textAlign: 'center'}}>
                    <button className="btn btn-warning"
                            style={{fontSize: '20px'}} onClick={() => {
                        navigate('/panel_member/panel_member_register')
                    }}>
                        Panel Member
                    </button>
                </div>
            </div>
        </div>
    );
};