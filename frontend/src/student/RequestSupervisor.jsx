import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const RequestSupervisor = () => {
    let navigate = useNavigate();

    const [supervisor, setSupervisor] = useState('');
    const [coSupervisor, setCoSupervisor] = useState('');
    const [topicRegistered, setTopicRegistered] = useState(false);
    const [groupRegistered, setGroupRegistered] = useState(false);

    useEffect(() => {
        RequestedSupervisor()
    }, [])

    let content;

    if (!groupRegistered) {
        content =
            <div>
                <div>
                    Please register for a group before request a supervisor.
                </div>
            </div>
    } else if (topicRegistered) {
        content =
            <div>
                Topic is {supervisor}
            </div>
    } else {
        content =
            <div>
                <div style={{display: 'flex'}}>
                    <span style={{marginRight: '30px'}}>Supervisor</span>
                    <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setSupervisor(e.target.value)}/>
                        </span>
                </div>
                <div style={{display: 'flex'}}>
                    <span style={{marginRight: '30px'}}>Co-Supervisor</span>
                    <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setCoSupervisor(e.target.value)}/>
                        </span>
                </div>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <button className="btn btn-warning"
                            style={{marginTop: '30px', fontSize: '20px', fontWeight: 'bold'}}
                            onClick={() => {
                                RegisterSupervisor()
                            }}>
                        Register
                    </button>
                </div>
            </div>
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
                    <div style={{width: '500px'}}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );

    function RequestedSupervisor() {
        console.log(JSON.parse(localStorage.getItem('group')))
        let groupId = JSON.parse(localStorage.getItem('group')) !== null ? JSON.parse(localStorage.getItem('group')).groupId : null;
        if (groupId !== null) {
            setGroupRegistered(true);
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            };
            fetch('http://localhost:9000/rpmt/student/topic_registered/' + groupId, requestOptions)
                .then(response => response.json())
                .then(reply => {
                    // console.log(reply)
                    if (reply.reply !== null) {
                        setTopicRegistered(true);
                        setSupervisor(reply.reply.topic);
                    } else {
                        setTopicRegistered(false);
                    }
                });
        } else {
            setGroupRegistered(false);
        }
    }

    function RegisterSupervisor() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: JSON.parse(localStorage.getItem('group')).groupId,
                supervisor: supervisor,
                coSupervisor: coSupervisor
            })
        };
        fetch('http://localhost:9000/rpmt/student/add_research_topic', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply !== null) {
                    setTopicRegistered(true);
                    setSupervisor(reply.topic);
                }
                // if (reply !== null && UserData.type === 'customer') {
                //     UserData.id = reply.id;
                //     navigate('/view_items');
                // } else if (reply !== null && UserData.type === 'trader') {
                //     navigate('/trader_items');
                // }
            });
    }
};