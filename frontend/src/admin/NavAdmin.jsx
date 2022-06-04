import React, {Component, useState} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavAdmin.css';

export const NavAdmin = () => {
    let navigate = useNavigate();

    return (
        <div className='navS' style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px', marginTop: '0px'}}>
            <div onClick={() => {
                navigate('/modify_users')
            }}>Modify Users
            </div>
            <div onClick={() => {
                navigate('/marking')
            }}>Marking
            </div>
            <div onClick={() => {
                navigate('/submission')
            }}>Submission
            </div>
            <div onClick={() => {
                navigate('/panel')
            }}>Pannel
            </div>
            <div onClick={() => {
                navigate('/rolls')
            }}>View Rolls
            </div>
        </div>

    );
};