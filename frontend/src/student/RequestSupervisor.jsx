import React, {Component, useEffect, useState} from 'react';
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
                                            return <div key={key} style={{
                                                border: '1px solid black',
                                                borderRadius: '10px',
                                                marginTop: '15px',
                                                padding: '10px'
                                            }}>
                                                <div>
                                                    {
                                                        supervisorObj.interests && supervisorObj.interests.map(function (interest, key1) {
                                                            return <div key={key1}>{interest}</div>
                                                        })
                                                    }
                                                </div>
                                                <div>{supervisorObj.name}</div>
                                                <div>
                                                    {
                                                        supervisorObj.markedSuper ?
                                                            <div>
                                                                Marked
                                                            </div>
                                                            :
                                                            <button onClick={() => {
                                                                // setSupervisor(supervisorObj)
                                                                RegisterSupervisor(supervisorObj, 0);
                                                            }
                                                            }>Add as Supervisor
                                                            </button>
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        supervisorObj.markedCoSuper ?
                                                            <div>
                                                                Marked
                                                            </div>
                                                            :
                                                            <button onClick={() => {
                                                                // setCoSupervisor(supervisorObj)
                                                                RegisterSupervisor(supervisorObj, 1);
                                                            }
                                                            }>Add as Co-Supervisor
                                                            </button>
                                                    }
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
        fetch(Environment.url + 'student/check_group/' + JSON.parse(localStorage.getItem('user'))._id, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply.length === 0) {
                    setGroupRegistered(false)
                } else {
                    setGroupRegistered(true)
                }
            });
    }

    function RegisterSupervisor(supervisorObj, val) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: JSON.parse(localStorage.getItem('group')).groupId,
                val: val,
                supervisor: val === 0 ? supervisorObj._id : '',
                coSupervisor: val === 1 ? supervisorObj._id : ''
            })
        };
        fetch('http://localhost:9000/rpmt/student/add_group_supervisor', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply !== null) {
                    supervisors.forEach((grpSupervisor) => {
                        // console.log(grpSupervisor._id)
                        if (reply.val === 0) {
                            grpSupervisor.markedSuper = false
                            if (grpSupervisor._id == reply.supervisor) {
                                grpSupervisor.markedSuper = true
                            }
                        } else {
                            grpSupervisor.markedCoSuper = false
                            if (grpSupervisor._id == reply.coSupervisor) {
                                grpSupervisor.markedCoSuper = true
                            }
                        }
                    })
                    setSupervisors(JSON.parse(JSON.stringify(supervisors)))
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
            fetch('http://localhost:9000/rpmt/student/get_supervisors/' + groupId, requestOptions)
                .then(response => response.json())
                .then(supervisors => {
                    console.log(supervisors)
                    setSupervisors(supervisors)
                });
        }
    }
};