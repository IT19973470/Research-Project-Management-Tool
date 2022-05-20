import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const RequestSupervisor = () => {
    let navigate = useNavigate();

    const [topic, setTopic] = useState('');
    const [topicRegistered, setTopicRegistered] = useState(false);

    useEffect(() => {
        RegisteredForTopic()
    }, [])

    let content;

    if (topicRegistered) {
        content =
            <div>
                Topic is {topic}
            </div>
    } else {
        content =
            <div>
                <div style={{display: 'flex'}}>
                    <span style={{marginRight: '30px'}}>Description</span>
                    <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setTopic(e.target.value)}/>
                        </span>
                </div>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <button className="btn btn-warning"
                            style={{marginTop: '30px', fontSize: '20px', fontWeight: 'bold'}}
                            onClick={() => {
                                RegisterTopic()
                            }}>
                        Register
                    </button>
                </div>
            </div>
    }

    return (
        <div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                Request Supervisor
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

    function RegisteredForTopic() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/student/topic_registered/' + JSON.parse(localStorage.getItem('group')).groupId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                console.log(reply)
                if (reply.reply !== null) {
                    setTopicRegistered(true);
                    setTopic(reply.reply.topic);
                } else {
                    setTopicRegistered(false);
                }
            });
    }

    function RegisterTopic() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: JSON.parse(localStorage.getItem('group')).groupId,
                topic: topic
            })
        };
        fetch('http://localhost:9000/rpmt/student/add_research_topic', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply !== null) {
                    setTopicRegistered(true);
                    setTopic(reply.topic);
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