import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifySupervisor from "./ModifySupervisor";
import ModifyStudent from "./ModifyStudent";

export const ModifyUsers  = () => {

    const [showStudent, setStudent] = React.useState(true)
    const [showSupervisor, setSupervisor] = React.useState(false)
    function onChange(a) {
        console.log(a)
        if(a==="Student"){
            setStudent(true)
            setSupervisor(false)
        }
        else if(a==="Supervisor"){
            setSupervisor(true)
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
                    </select>
                   </div>


                            { showStudent ? <ModifyStudent /> : null }
                             { showSupervisor ? <ModifySupervisor /> : null }


            </div>
        )
};