import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifySupervisor from "./ModifySupervisor";
import ModifyStudent from "./ModifyStudent";
import ModifyPanel from "./ModifyPanel";
import ModifyAdmin from "./ModifyAdmin";

export const ModifyUsers  = () => {

    const [showStudent, setStudent] = React.useState(true)
    const [showSupervisor, setSupervisor] = React.useState(false)
    const [showPanel, setPanel] = React.useState(false)
    const [showAdmin, setAdmin] = React.useState(false)
    function onChange(a) {
        console.log(a)
        if(a==="Student"){
            setStudent(true)
            setSupervisor(false)
            setPanel(false)
            setAdmin(false)
        }
        else if(a==="Supervisor"){
            setSupervisor(true)
            setStudent(false)
            setPanel(false)
            setAdmin(false)
        }
        else if(a==="Panel"){
            setPanel(true)
            setSupervisor(false)
            setStudent(false)
            setAdmin(false)
        }
        else if(a==="Admin"){
            setAdmin(true)
            setPanel(false)
            setSupervisor(false)
            setStudent(false)
        }

    }


    return(
            <div className="row">
                <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                    Manage Users
                </div>
                <div className="col-12" style={{fontSize: '25px', textAlign: 'center'}}>
                    <select onChange={(e)=>{onChange(e.target.value)}}>>
                        <option>Student</option>
                        <option>Supervisor</option>
                        <option>Panel</option>
                        <option>Admin</option>
                    </select>
                   </div>


                            { showStudent ? <ModifyStudent /> : null }
                             { showSupervisor ? <ModifySupervisor /> : null }
                            { showPanel ? <ModifyPanel /> : null }
                            { showAdmin ? <ModifyAdmin /> : null }


            </div>
        )
};