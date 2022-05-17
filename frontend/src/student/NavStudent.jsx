import React, {Component, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavStudent.css';

export const NavStudent = () => {
    let navigate = useNavigate();

    return (
        <div className='navS' style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px', marginTop: '0px'}}>
            <div onClick={() => {
                navigate('/student_groups')
            }}>Register Group
            </div>
            <div onClick={() => {
                navigate('/research_topic')
            }}>Research Topic
            </div>
        </div>
    );
};