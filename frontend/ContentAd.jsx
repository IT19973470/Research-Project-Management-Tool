import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavStudent} from "./src/student/NavStudent";
import {App} from "./app";
import {NavAdmin} from "./src/admin/NavAdmin";

export const ContentAd = () => {
    let navigate = useNavigate();

    let content;

    // useEffect(() => {
    if (localStorage.getItem('user') !== null) {
        content =
            <div style={{display: 'flex'}}>
                <div style={{width: '250px'}}>
                    <NavAdmin/>
                </div>
                <div style={{marginLeft: '200px'}}>
                    <App/>
                </div>
            </div>
    } else {
        content = <App/>
    }
    // }, [])

    return (
        <div>
            {content}
        </div>
    );
};