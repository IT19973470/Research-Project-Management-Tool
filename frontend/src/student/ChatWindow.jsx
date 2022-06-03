import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Environment} from "../../../Backend/Environment";

export const ChatWindow = () => {
    let navigate = useNavigate();

    const [topic, setTopic] = useState('');
    const [topicRegistered, setTopicRegistered] = useState(false);
    const [messages, setMessages] = useState([]);
    const [groupRegistered, setGroupRegistered] = useState(false);
    const [supervisors, setSupervisors] = useState([]);
    const [supervisor, setSupervisor] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        CheckGroup()
        GetSupervisors();
    }, [])

    return (
        <div style={{width: '800px'}}>
            {
                (!groupRegistered) ?
                    <div>
                        Please register for a group before select a research topic.
                    </div>
                    :
                    <div style={{width: '100%'}}>
                        {
                            messages && messages.map(function (messageObj, key) {
                                return <div className="row" key={key}>
                                    <div className="col-6"></div>
                                    <div className="col-6" style={{
                                        border: '1px solid grey',
                                        borderRadius: '10px',
                                        marginTop: '15px',
                                        padding: '10px'
                                    }}>
                                        <div>
                                            <span>{messageObj.message}</span>
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'right'}}>
                                            <span style={{fontSize: '14px'}}>{messageObj.messageSent}</span>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                        <div className="row" style={{display: 'flex', width: '100%', marginTop: '20px'}}>
                            <div className="col-2" style={{fontWeight: 'bold'}}>Message :</div>
                            <div className="col-2" style={{fontWeight: 'bold'}}>
                                <select className="form-control" onChange={(e) => {
                                    setSupervisor(e.target.value)
                                    GetChats(e.target.value);
                                }}>
                                    {
                                        supervisors && supervisors.map(function (supervisor, key) {
                                            return <option key={key} value={supervisor._id}>{supervisor.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <textarea className="form-control" value={message} onChange={(e) => {
                                    setMessage(e.target.value)
                                }}/>
                            </div>
                            <div className="col-1">
                                <button className="btn btn-warning" style={{fontWeight: 'bold'}}
                                        onClick={() => {
                                            SendMessage()
                                        }}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );

    function SendMessage() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: JSON.parse(localStorage.getItem('group')).groupId,
                supervisorId: supervisor,
                message: message,
                messagedBy: 'group',
                messageSent: new Date().toLocaleDateString('en-CA')
            })
        };
        fetch('http://localhost:9000/rpmt/student/send_message', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply) {
                    setMessage('')
                    GetChats(supervisor);
                }
                // if (reply !== null && UserData.type === 'customer') {
                //     UserData.id = reply.id;
                //     navigate('/view_items');
                // } else if (reply !== null && UserData.type === 'trader') {
                //     navigate('/trader_items');
                // }
            });
    }

    function GetChats(supervisorId) {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/student/get_chats_group/' + JSON.parse(localStorage.getItem('group')).groupId + '/' + supervisorId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                setMessages(reply)
            });
    }

    function GetSupervisors() {
        let supervisorsObj = [];
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
                    supervisors.forEach(supervisor => {
                        if (supervisor.markedSuper || supervisor.markedCoSuper) {
                            supervisorsObj.push(supervisor)
                        }
                    })
                    setSupervisors(supervisorsObj)
                    setSupervisor(supervisorsObj[0]._id);
                    GetChats(supervisorsObj[0]._id)
                });
        }
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
                }
            });
    }
};