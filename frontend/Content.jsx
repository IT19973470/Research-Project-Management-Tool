import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavStudent} from "./src/student/NavStudent";
import {App} from "./app";
import {NavAdmin} from "./src/admin/NavAdmin";
import {NavPanelMember} from "./src/panel_member/NavPanelMember";
import {NavSupervisor} from "./src/supervisor/NavSupervisor";

export const Content = () => {
    let navigate = useNavigate();

    let content;

    // useEffect(() => {
    if (localStorage.getItem('user') !== null) {
        if (JSON.parse(localStorage.getItem('user')).userType === 'student') {
            content =
                <div style={{display: 'flex'}}>
                    <div style={{width: '250px'}}>
                        <NavStudent/>
                    </div>
                    <div style={{marginLeft: '200px'}}>
                        <App/>
                    </div>
                </div>
        } else if (JSON.parse(localStorage.getItem('user')).userType === 'admin') {
            content =
                <div style={{display: 'flex'}}>
                    <div style={{width: '250px'}}>
                        <NavAdmin/>
                    </div>
                    <div style={{marginLeft: '200px'}}>
                        <App/>
                    </div>
                </div>
        } else if (JSON.parse(localStorage.getItem('user')).userType === 'supervisor') {
            content =
                <div style={{display: 'flex'}}>
                    <div style={{width: '250px'}}>
                        <NavSupervisor/>
                    </div>
                    <div style={{marginLeft: '200px'}}>
                        <App/>
                    </div>
                </div>
        } else if (JSON.parse(localStorage.getItem('user')).userType === 'panel') {
            content =
                <div style={{display: 'flex'}}>
                    <div style={{width: '250px'}}>
                        <NavPanelMember/>
                    </div>
                    <div style={{marginLeft: '200px'}}>
                        <App/>
                    </div>
                </div>
        }
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