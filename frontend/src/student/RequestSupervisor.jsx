import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Environment} from "../../../Backend/Environment";

export const RequestSupervisor = () => {
    let navigate = useNavigate();

    const [supervisors, setSupervisors] = useState([]);
    // const [supervisor, setSupervisor] = useState('');
    // const [coSupervisor, setCoSupervisor] = useState('');
    // const [topicRegistered, setTopicRegistered] = useState(false);
    const [groupRegistered, setGroupRegistered] = useState(false);

    useEffect(() => {
        CheckGroup();
        GetSupervisors();
        // RequestedSupervisor()
    }, []);

    return (
        <div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                Request Supervisor & Co-Supervisor
            </div>
            <div className="col-12">
                <div style={{
                    width: '100%',
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{width: '1000px'}}>
                        {
                            (groupRegistered && supervisors !== null) ?
                                <div>
                                    {
                                        supervisors && supervisors.map(function (supervisorObj, key) {
                                            return <div className="row" key={key} style={{
                                                border: '1px solid black',
                                                borderRadius: '10px',
                                                marginTop: '15px',
                                                padding: '10px'
                                            }}>
                                                <div className="col-6">
                                                    <div>
                                                        <span style={{fontWeight: 'bold'}}>Supervisor Name : </span>
                                                        <span>{supervisorObj.name}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{fontWeight: 'bold'}}>Interests In : </span>
                                                        {
                                                            supervisorObj.interests && supervisorObj.interests.map(function (interest, key1) {
                                                                return <span key={key1}>{interest} , </span>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-6"
                                                     style={{display: 'grid', alignContent: 'center'}}>
                                                    <div style={{display: 'flex'}}>
                                                        {
                                                            supervisorObj.markedCoSuper === 0 ?
                                                                <div>
                                                                    {
                                                                        supervisorObj.markedSuper === 1 ?
                                                                            <div>
                                                                                <span style={{
                                                                                    marginRight: '10px',
                                                                                    fontSize: '14px',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                                    Supervisor is marked
                                                                                </span>
                                                                                <button
                                                                                    className="btn btn-danger btn-sm"
                                                                                    onClick={() => {
                                                                                        // setSupervisor(supervisorObj)
                                                                                        RegisterSupervisor(supervisorObj, 0, 0);
                                                                                    }
                                                                                    }>Remove the Supervisor
                                                                                </button>
                                                                            </div>
                                                                            :
                                                                            <button className="btn btn-secondary btn-sm"
                                                                                    onClick={() => {
                                                                                        // setSupervisor(supervisorObj)
                                                                                        RegisterSupervisor(supervisorObj, 0, 1);
                                                                                    }
                                                                                    }>Add as Supervisor
                                                                            </button>
                                                                    }
                                                                </div> :
                                                                <div></div>
                                                        }
                                                        {
                                                            supervisorObj.markedSuper === 0 ?
                                                                <div>
                                                                    {
                                                                        supervisorObj.markedCoSuper === 1 ?
                                                                            <div>
                                                                                <span style={{
                                                                                    marginRight: '10px',
                                                                                    fontSize: '14px',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                                    Co-Supervisor is marked
                                                                                </span>
                                                                                <button
                                                                                    className="btn btn-danger btn-sm"
                                                                                    onClick={() => {
                                                                                        // setSupervisor(supervisorObj)
                                                                                        RegisterSupervisor(supervisorObj, 1, 0);
                                                                                    }
                                                                                    }>Remove the Co-Supervisor
                                                                                </button>
                                                                            </div>
                                                                            :
                                                                            <button className="btn btn-secondary btn-sm"
                                                                                    style={{marginLeft: '10px'}}
                                                                                    onClick={() => {
                                                                                        // setCoSupervisor(supervisorObj)
                                                                                        RegisterSupervisor(supervisorObj, 1, 1);
                                                                                    }
                                                                                    }>Add as Co-Supervisor
                                                                            </button>
                                                                    }
                                                                </div> :
                                                                <div></div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div> :
                                <div></div>
                        }
                        {
                            (!groupRegistered) ?
                                <div>
                                    <div>
                                        Please register for a group before request a supervisor.
                                    </div>
                                </div> :
                                <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    function CheckGroup() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/student/check_group/' + JSON.parse(localStorage.getItem('user'))._id, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply.length === 0) {
                    setGroupRegistered(false)
                } else {
                    setGroupRegistered(true)
                }
            });
    }

    function RegisterSupervisor(supervisorObj, val, register) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: JSON.parse(localStorage.getItem('group')).groupId,
                val: val,
                supervisor: register === 1 ? supervisorObj._id : '',
                coSupervisor: register === 1 ? supervisorObj._id : ''
            })
        };
        fetch(Common.url + '/student/add_group_supervisor', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply !== null) {
                    GetSupervisors();
                    // supervisors.forEach((grpSupervisor) => {
                    //     // console.log(grpSupervisor._id)
                    //     if (reply.val === 0) {
                    //         grpSupervisor.markedSuper = 0
                    //         if (grpSupervisor._id == reply.supervisor._id) {
                    //             grpSupervisor.markedSuper = 1
                    //         }
                    //     } else {
                    //         grpSupervisor.markedCoSuper = 0
                    //         if (grpSupervisor._id == reply.coSupervisor._id) {
                    //             grpSupervisor.markedCoSuper = 1
                    //         }
                    //     }
                    // })
                    // setSupervisors(JSON.parse(JSON.stringify(supervisors)))
                }
            });
    }

    function GetSupervisors() {
        let groupId = JSON.parse(localStorage.getItem('group')) !== null ? JSON.parse(localStorage.getItem('group')).groupId : null;
        if (groupId !== null) {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            };
            fetch(Common.url + '/student/get_supervisors/' + groupId, requestOptions)
                .then(response => response.json())
                .then(supervisors => {
                    console.log(supervisors)
                    setSupervisors(supervisors)
                });
        }
    }
};