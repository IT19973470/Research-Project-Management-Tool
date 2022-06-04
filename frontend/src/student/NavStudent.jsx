import React, {Component, useState} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavStudent.css';

const prefix = '/student'

export const NavStudent = () => {
    let navigate = useNavigate();

    return (
        <div className='navS' style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px', marginTop: '0px'}}>
            <div onClick={() => {
                navigate(prefix + '/student_groups')
            }}>Register Group
            </div>
            <div onClick={() => {
                navigate(prefix + '/request_supervisor')
            }}>Request Supervisor
            </div>
            <div onClick={() => {
                navigate(prefix + '/research_topic')
            }}>Research Topic
            </div>
            <div onClick={() => {
                navigate(prefix + '/submit_documents')
            }}>Submit Documents
            </div>
            <div onClick={() => {
                navigate(prefix + '/chat')
            }}>Chat
            </div>
        </div>
    );
};