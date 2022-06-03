import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Environment} from "../../../Backend/Environment";

export const SubmitDocuments = () => {
    let navigate = useNavigate();

    const [topic, setTopic] = useState('');
    const [topicRegistered, setTopicRegistered] = useState(false);
    const [links, setLinks] = useState([]);
    const [groupRegistered, setGroupRegistered] = useState(false);
    const [file, setFile] = useState('');
    const [fname, setFileName] = useState('');

    useEffect(() => {
        CheckGroup()
        GetLinks()
    }, [])

    return (
        <div>
            {
                (!groupRegistered) ?
                    <div>
                        Please register for a group before select a research topic.
                    </div>
                    :
                    <div>
                        {
                            links && links.map(function (linkObj, key) {
                                return <div key={key} style={{
                                    border: '1px solid black',
                                    borderRadius: '10px',
                                    marginTop: '15px',
                                    padding: '10px'
                                }}>
                                    <div>
                                        <span style={{fontWeight: 'bold'}}>Title : </span>
                                        <span>{linkObj.title}</span>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <div style={{fontWeight: 'bold', marginRight: '10px'}}>
                                            Details :
                                        </div>
                                        <div
                                            style={{whiteSpace: 'pre-wrap'}}>{linkObj.details}</div>
                                    </div>
                                    <div>
                                        <span style={{fontWeight: 'bold'}}>Type : </span>
                                        <span>{linkObj.type}</span>
                                    </div>
                                    <div>
                                        <span style={{fontWeight: 'bold'}}>Deadline : </span>
                                        <span>{linkObj.deadline}</span>
                                    </div>
                                    <div>
                                        <input type="file" onChange={(e) => {
                                            setFileTarget(e)
                                        }}/>
                                    </div>
                                    <div style={{textAlign: 'right'}}>
                                        <button className="btn btn-warning btn-sm" style={{fontWeight: 'bold'}}
                                                onClick={() => {
                                                    upload(linkObj._id)
                                                }}>
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    );

    function setFileTarget(e) {
        // console.log(e.target.files[0].name)
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    function upload(submissionId) {
        // const onsubmit =async e=>{
        //     e.preventDefault();
        // console.log(file)
        let formData = new FormData();
        formData.append('file', file)
        fetch('http://localhost:9000/rpmt/student/submit_document/' + submissionId + '/' + JSON.parse(localStorage.getItem('group')).groupId, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(reply => {
                console.log(reply)
            }).catch((error) => {
            console.error('Error:', error);
        });

        // }
    }

    function GetLinks() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/student/get_upload_links', requestOptions)
            .then(response => response.json())
            .then(reply => {
                setLinks(reply)
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
                }
            });
    }
};