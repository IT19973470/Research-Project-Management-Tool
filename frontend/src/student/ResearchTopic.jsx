import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Environment} from "../../../Backend/Environment";

export const ResearchTopic = () => {
    let navigate = useNavigate();

    const [topic, setTopic] = useState('');
    const [topicRegistered, setTopicRegistered] = useState(false);
    const [topicAccepted, setTopicAccepted] = useState(false);
    const [groupRegistered, setGroupRegistered] = useState(false);

    useEffect(() => {
        CheckGroup();
    }, [])

    let content;
    let contentTopicAccepted;

    if (!groupRegistered) {
        content =
            <div>
                <div>
                    Please register for a group before select a research topic.
                </div>
            </div>
    } else if (topicRegistered) {
        content =
            <div>
                Topic is {topic}
                <button className="btn btn-warning"
                        style={{marginTop: '30px', fontSize: '20px', fontWeight: 'bold'}}
                        onClick={() => {
                            UnregisterTopic()
                        }}>
                    Unregister
                </button>
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
                    this.Trader.password = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') as string)['password'] : ''

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

    if (topicAccepted) {
        contentTopicAccepted =
            <div>
                Topic is accepted by the supervisor
            </div>
    } else {
        contentTopicAccepted =
            <div>
                Topic is not accepted
            </div>
    }

    return (
        <div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                Research Topic
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
        // let groupId = JSON.parse(localStorage.getItem('group')) !== null ? JSON.parse(localStorage.getItem('group')).groupId : null;
        // if (groupId !== null) {
            // setGroupRegistered(true);
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            };
            fetch('http://localhost:9000/rpmt/student/topic_registered/' + JSON.parse(localStorage.getItem('group')).groupId, requestOptions)
                .then(response => response.json())
                .then(reply => {
                    if (reply.reply !== null && reply.reply.registered) {
                        setTopicRegistered(true);
                        setTopic(reply.reply.topic);
                    } else {
                        setTopicRegistered(false);
                    }
                });
        // }
    }

    function UnregisterTopic() {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/student/remove_research_topic/' + JSON.parse(localStorage.getItem('group')).groupId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply) {
                    setTopicRegistered(false);
                }
                // if (reply !== null && UserData.type === 'customer') {
                //     UserData.id = reply.id;
                //     navigate('/view_items');
                // } else if (reply !== null && UserData.type === 'trader') {
                //     navigate('/trader_items');
                // }
            });
    }

    function RegisterTopic() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: JSON.parse(localStorage.getItem('group')).groupId,
                topic: topic,
                accepted: false,
                registered: true
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
                    localStorage.setItem('group', JSON.stringify(reply))
                    RegisteredForTopic()
                    // console.log(reply)
                    // GetGroup();
                }
            });
    }
};