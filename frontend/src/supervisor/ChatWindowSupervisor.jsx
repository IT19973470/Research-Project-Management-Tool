import React, {Component, useEffect, useState, useRef} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Environment} from "../../../Backend/Environment";

export const ChatWindowSupervisor = () => {
    let navigate = useNavigate();

    const [topic, setTopic] = useState('');
    const [topicRegistered, setTopicRegistered] = useState(false);
    const [messages, setMessages] = useState([]);
    // const [groupRegistered, setGroupRegistered] = useState(false);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState('');
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState('');

    useEffect(() => {
        GetGroups();
    }, [])

    return (
        <div style={{width: '800px'}}>
            <div style={{width: '100%'}}>
                {
                    messages && messages.map(function (messageObj, key) {
                        return <div key={key}>
                            {
                                (messageObj.messagedBy === 'supervisor') ?
                                    <div className="row">
                                        <div className="col-6"></div>
                                        <div className="col-6" style={{
                                            border: '1px solid grey',
                                            borderRadius: '10px',
                                            marginTop: '15px',
                                            padding: '10px'
                                        }}>
                                            <div>
                                                <span style={{fontWeight: 'bold'}}>{messageObj.message}</span>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'right'}}>
                                                <span style={{fontSize: '12px'}}>{messageObj.messageSent}</span>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="row">
                                        <div className="col-6" style={{
                                            border: '1px solid grey',
                                            borderRadius: '10px',
                                            marginTop: '15px',
                                            padding: '10px'
                                        }}>
                                            <div>
                                                <span style={{fontWeight: 'bold'}}>{messageObj.message}</span>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'right'}}>
                                                <span style={{fontSize: '12px'}}>{messageObj.messageSent}</span>
                                            </div>
                                        </div>
                                        <div className="col-6"></div>
                                    </div>
                            }
                        </div>
                    })
                }
                <div className="row" style={{display: 'flex', width: '100%', marginTop: '20px'}}>
                    <div className="col-2" style={{fontWeight: 'bold'}}>Message :</div>
                    <div className="col-2" style={{fontWeight: 'bold'}}>
                        <select className="form-control" onChange={(e) => {
                            setGroup(e.target.value)
                            // superviso = e.target.value
                            // console.log(supervisor)
                            GetChats(e.target.value);
                        }}>
                            {
                                groups && groups.map(function (group, key) {
                                    return <option key={key} value={group.groupId}>{group.groupId}</option>
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
        </div>
    );

    function SendMessage() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: group,
                supervisorId: JSON.parse(localStorage.getItem('user'))._id,
                message: message,
                messagedBy: 'supervisor',
                messageSent: new Date().toLocaleDateString('en-CA')
            })
        };
        fetch(Common.url + '/student/send_message', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply) {
                    setMessage('')
                    // GetChats(supervisor);
                }
                // if (reply !== null && UserData.type === 'customer') {
                //     UserData.id = reply.id;
                //     navigate('/view_items');
                // } else if (reply !== null && UserData.type === 'trader') {
                //     navigate('/trader_items');
                // }
            });
    }

    // const countRef = useRef(count);
    // countRef.current = supervisor;
    // const value = useRef(0)
    // const that = this

    function GetChats(groupId) {
        clearInterval(timer);
        setTimer(setInterval(() => {
                //     console.log(supervisorId)
                // console.log(timer)
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                fetch(Common.url + '/student/get_chats_group/' + groupId + '/' + JSON.parse(localStorage.getItem('user'))._id, requestOptions)
                    .then(response => response.json())
                    .then(reply => {
                        setMessages(reply)
                    });
            }, 1000)
        )
    }

    function GetGroups() {
        let groupsObj = [];
        let userId = JSON.parse(localStorage.getItem('user')) !== null ? JSON.parse(localStorage.getItem('user'))._id : null;
        if (userId !== null) {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            };
            fetch(Common.url + '/supervisor/get_groups/' + userId, requestOptions)
                .then(response => response.json())
                .then(groups => {
                    console.log(groups)
                    groups.forEach(group => {
                        //     if (supervisor.markedSuper || supervisor.markedCoSuper) {
                        groupsObj.push(group)
                        //     }
                    })
                    setGroups(groupsObj)
                    // console.log(supervisorsObj[0])
                    setGroup(groupsObj[0].groupId);
                    // superviso = supervisorsObj[0]._id
                    // console.log(supervisorsObj[0]._id)
                    GetChats(groupsObj[0].groupId);
                    // GetChats(supervisorsObj[0].groupId)
                });
        }
    }
};