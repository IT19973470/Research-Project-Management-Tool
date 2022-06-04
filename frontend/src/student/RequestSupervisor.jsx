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
    }, [])

    let content;

    if (!groupRegistered) {
        content =
            <div>
                <div>
                    Please register for a group before request a supervisor.
                </div>
            </div>
        // } else if (topicRegistered) {
        //     content =
        //         <div>
        //             Topic is {supervisor}
        //         </div>
        // } else {
        //     content =
        //         <div>
        //             <div style={{display: 'flex'}}>
        //                 <span style={{marginRight: '30px'}}>Supervisor</span>
        //                 <span style={{width: '100%'}}>
        //                         <input type="text" className="form-control"
        //                                onChange={e => setSupervisor(e.target.value)}/>
        //                     </span>
        //             </div>
        //             <div style={{display: 'flex'}}>
        //                 <span style={{marginRight: '30px'}}>Co-Supervisor</span>
        //                 <span style={{width: '100%'}}>
        //                         <input type="text" className="form-control"
        //                                onChange={e => setCoSupervisor(e.target.value)}/>
        //                     </span>
        //             </div>
        //             <div style={{width: '100%', textAlign: 'center'}}>
        //                 <button className="btn btn-warning"
        //                         style={{marginTop: '30px', fontSize: '20px', fontWeight: 'bold'}}
        //                         onClick={() => {
        //                             RegisterSupervisor()
        //                         }}>
        //                     Register
        //                 </button>
        //             </div>
        //         </div>
    }

    let supervisorsList = [];

    const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        padding: '15px'
    };

    if (groupRegistered && supervisors !== null) {
        supervisorsList =
            <div>
                <table style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th>Topic</th>
                        <th>Supervisor</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        supervisors && supervisors.map(function (supervisorObj, key) {
                            return <tr key={key}>
                                <td style={tableStyle}>{supervisorObj.interests}</td>
                                <td style={tableStyle}>{supervisorObj.name}</td>
                                <td style={tableStyle}>
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
                                </td>
                                <td style={tableStyle}>
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
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
    }


    // function RequestedSupervisor() {
    //     let groupId = JSON.parse(localStorage.getItem('group')) !== null ? JSON.parse(localStorage.getItem('group')).groupId : null;
    //     if (groupId !== null) {
    //         setGroupRegistered(true);
    //         const requestOptions = {
    //             method: 'GET',
    //             headers: {'Content-Type': 'application/json'}
    //         };
    //         fetch('http://localhost:9000/rpmt/student/topic_registered/' + groupId, requestOptions)
    //             .then(response => response.json())
    //             .then(reply => {
    //                 // console.log(reply)
    //                 if (reply.reply !== null) {
    //                     setTopicRegistered(true);
    //                     setSupervisor(reply.reply.topic);
    //                 } else {
    //                     setTopicRegistered(false);
    //                 }
    //             });
    //     } else {
    //         setGroupRegistered(false);
    //     }
    // }

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
                console.log(reply)
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
                    setSupervisors(supervisors)
                });
        }
    }

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
                        {supervisorsList}
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};