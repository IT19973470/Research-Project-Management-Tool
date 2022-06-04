import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/fontawesome.css'
import 'font-awesome/css/font-awesome.min.css';
import {Environment} from "../../../Backend/Environment";

export const ResearchTopic = () => {
    let navigate = useNavigate();

    const [topicId, setTopicId] = useState('');
    const [topic, setTopic] = useState('');
    const [topicDesc, setTopicDesc] = useState('');
    const [topicAccepted, setTopicAccepted] = useState(false);
    const [topics, setTopics] = useState([]);
    const [groupRegistered, setGroupRegistered] = useState(false);
    const [openForUpdate, setOpenForUpdate] = useState(false);

    useEffect(() => {
        CheckGroup();
    }, [])

    let content;
    let contentTopicAccepted;

    // if (!groupRegistered) {
    //     content =
    //         <div>
    //             <div>
    //                 Please register for a group before select a research topic.
    //             </div>
    //         </div>
    // } else {
    //     content =
    //
    // }

    // if (topicAccepted) {
    //     contentTopicAccepted =
    //         <div>
    //             Topic is accepted by the supervisor
    //         </div>
    // } else {
    //     contentTopicAccepted =
    //         <div>
    //             Topic is not accepted
    //         </div>
    // }

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
                    <div style={{width: '800px'}}>
                        {
                            groupRegistered ?
                                <div>
                                    <div style={{display: 'flex'}}>
                                        <div style={{width: '100%'}}>
                                            <span style={{marginRight: '30px'}}>Topic</span>
                                            <span style={{width: '100%'}}>
                                                <input type="text" className="form-control" value={topic}
                                                       onChange={e => setTopic(e.target.value)}/>
                                            </span>
                                            <span style={{marginRight: '30px'}}>Description</span>
                                            <span style={{width: '100%'}}>
                                                <textarea className="form-control" value={topicDesc}
                                                          onChange={e => setTopicDesc(e.target.value)}/>
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{width: '100%', textAlign: 'center'}}>
                                        {
                                            !openForUpdate ?
                                                <button className="btn btn-warning"
                                                        style={{
                                                            marginTop: '30px',
                                                            fontSize: '20px',
                                                            fontWeight: 'bold'
                                                        }}
                                                        onClick={() => {
                                                            RegisterTopic()
                                                        }}>
                                                    Register
                                                </button> :
                                                < button className="btn btn-warning"
                                                         style={{
                                                             marginTop: '30px',
                                                             fontSize: '20px',
                                                             fontWeight: 'bold'
                                                         }}
                                                         onClick={() => {
                                                             UpdateTopic()
                                                         }}>
                                                    Update
                                                </button>
                                        }
                                    </div>
                                    <div>
                                        {
                                            topics && topics.map(function (topicObj, key) {
                                                return <div className="row" key={key} style={{
                                                    border: '1px solid black',
                                                    borderRadius: '10px',
                                                    marginTop: '15px',
                                                    padding: '10px'
                                                }}>
                                                    <div className="col-10">
                                                        <div>
                                                            <span style={{fontWeight: 'bold'}}>Topic : </span>
                                                            <span>{topicObj.topic}</span>
                                                        </div>
                                                        <div style={{display: 'flex'}}>
                                                            <div style={{fontWeight: 'bold', marginRight: '10px'}}>Topic
                                                                Description :
                                                            </div>
                                                            <div
                                                                style={{whiteSpace: 'pre-wrap'}}>{topicObj.topicDescription}</div>
                                                        </div>
                                                        <div>
                                                            <span style={{fontWeight: 'bold'}}>Topic is finalized by the group : </span>
                                                            {
                                                                (topicObj.topicRegistered) ?
                                                                    <i className="fa fa-check"
                                                                       style={{color: 'green'}}></i> :
                                                                    <i className="fa fa-times"
                                                                       style={{color: 'red'}}></i>
                                                            }
                                                        </div>
                                                        <div>
                                                            <span style={{fontWeight: 'bold'}}>Topic is accepted by the panel : </span>
                                                            {
                                                                (topicObj.topicAccepted === 0) ?
                                                                    <i className="fa fa-times"
                                                                       style={{color: 'red'}}></i> :
                                                                    (topicObj.topicAccepted === 1) ?
                                                                        <span>Pending</span> :
                                                                        <i className="fa fa-check"
                                                                           style={{color: 'green'}}></i>
                                                            }
                                                        </div>
                                                        <div>
                                                            <span style={{fontWeight: 'bold'}}>Added on : </span>
                                                            <span>{topicObj.topicAdded}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-2"
                                                         style={{
                                                             display: 'grid',
                                                             justifyContent: 'center',
                                                             alignContent: 'center'
                                                         }}>
                                                        {
                                                            (topicObj.topicRegistered) ?
                                                                <i className="fa fa-pencil"
                                                                   style={{color: 'green'}}
                                                                   onClick={() => {
                                                                       setOpenForUpdate(true);
                                                                       setTopicId(topicObj._id)
                                                                       setTopic(topicObj.topic);
                                                                       setTopicDesc(topicObj.topicDescription)
                                                                   }}></i> :
                                                                <span></span>
                                                        }
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div> :
                                <div>
                                    <div>
                                        Please register for a group before select a research topic.
                                    </div>
                                </div>
                        }
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
        fetch(Common.url + '/student/topic_registered/' + JSON.parse(localStorage.getItem('group')).groupId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply.reply !== null) {
                    setTopics(reply.reply);
                    console.log(reply.reply)
                    // setTopic(reply.reply.topic);
                } else {
                    // setTopicRegistered(false);
                }
            });
        // }
    }

    function UpdateTopic() {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                topic: topic,
                topicDescription: topicDesc,
            })
        };
        fetch(Common.url + '/student/update_research_topic/' + topicId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply) {
                    RegisteredForTopic()
                    setOpenForUpdate(false);
                    setTopic('')
                    setTopicDesc('')
                }
                // if (reply !== null && UserData.type === 'customer') {
                //     UserData.id = reply.id;
                //     navigate('/view_items');
                // } else if (reply !== null && UserData.type === 'trader') {
                //     navigate('/trader_items');
                // }
            });
    }

    // function UnregisterTopic() {
    //     const requestOptions = {
    //         method: 'DELETE',
    //         headers: {'Content-Type': 'application/json'}
    //     };
    //     fetch(Common.url + '/student/remove_research_topic/' + JSON.parse(localStorage.getItem('group')).groupId, requestOptions)
    //         .then(response => response.json())
    //         .then(reply => {
    //             if (reply) {
    //                 // setTopicRegistered(false);
    //             }
    //             // if (reply !== null && UserData.type === 'customer') {
    //             //     UserData.id = reply.id;
    //             //     navigate('/view_items');
    //             // } else if (reply !== null && UserData.type === 'trader') {
    //             //     navigate('/trader_items');
    //             // }
    //         });
    // }

    function RegisterTopic() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: JSON.parse(localStorage.getItem('group')).groupId,
                topic: topic,
                topicAccepted: 1,
                topicRegistered: true,
                topicDescription: topicDesc,
                topicAdded: new Date().toLocaleDateString('en-CA')
            })
        };
        fetch(Common.url + '/student/add_research_topic', requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply !== null) {
                    // setTopicRegistered(true);
                    RegisteredForTopic()
                    // setTopics(topics => [...topics, reply.topic]);
                    // console.log(reply)
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
        fetch(Common.url + '/student/check_group/' + JSON.parse(localStorage.getItem('user'))._id, requestOptions)
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