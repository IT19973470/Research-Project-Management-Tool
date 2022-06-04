import React, {Component, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const SignUp = () => {
    let navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-3">
                <button onClick={()=>{
                    navigate('/register')
                }}>
                    Admin
                </button>
            </div>
            <div className="col-3">
                <button onClick={()=>{
                    navigate('/student/register_student')
                }}>
                    Student
                </button>
            </div>
            <div className="col-3">
                <button onClick={()=>{
                    navigate('/supervisor/add_supervisor')
                }}>
                    Supervisor
                </button>
            </div>
            <div className="col-3">
                <button onClick={()=>{
                    navigate('/panel_member/panel_member_register')
                }}>
                    Panel Member
                </button>
            </div>
        </div>
    );
};