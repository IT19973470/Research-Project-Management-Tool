import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
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
                                    <button className="btn btn-success btn-sm"
                                            style={{fontWeight: 'bold', marginBottom: '10px'}}
                                            onClick={() => {
                                                download(linkObj.fileNameTemp)
                                            }}>
                                        Download Template
                                    </button>
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
                                    <div className="row" style={{marginTop: '10px'}}>
                                        <div className="col-12">
                                            {
                                                linkObj.markedUpload ?
                                                    <span>
                                                        <div style={{
                                                            fontWeight: 'bold',
                                                            color: 'green'
                                                        }}>File is uploaded</div>
                                                    <div>
                                                        <span style={{fontWeight: 'bold'}}>File : </span>
                                                        <span>{linkObj.fileName}</span>
                                                    </div>
                                                    </span> :
                                                    <span></span>
                                            }
                                        </div>
                                        <div className="col-12" style={{textAlign: 'right'}}>
                                            <button className="btn btn-warning btn-sm" style={{fontWeight: 'bold'}}
                                                    onClick={() => {
                                                        upload(linkObj._id)
                                                    }}>
                                                Upload
                                            </button>
                                            {
                                                linkObj.markedUpload ?
                                                    <button className="btn btn-danger btn-sm"
                                                            style={{fontWeight: 'bold', marginLeft: '10px'}}
                                                            onClick={() => {
                                                                removeFile(linkObj._id)
                                                            }}>
                                                        Delete
                                                    </button> :
                                                    <span></span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    );

    let fileE;

    function setFileTarget(e) {
        // console.log(e.target.files[0].name)
        fileE = e;
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    function upload(submissionId) {
        let formData = new FormData();
        formData.append('file', file)
        fetch(Common.url + '/student/submit_document/' + submissionId + '/' + JSON.parse(localStorage.getItem('group')).groupId, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(reply => {
                fileE.target.value = null
                GetLinks();
            }).catch((error) => {
            // console.error('Error:', error);
        });

        // }
    }

    function download(fileName) {
        window.location.href = Common.url + '/student/download_file/' + fileName
    }

    function removeFile(submissionId) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/student/remove_file/' + submissionId + '/' + JSON.parse(localStorage.getItem('group')).groupId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply) {
                    GetLinks();
                }
                // if (reply !== null && UserData.type === 'customer') {
                //     UserData.id = reply.id;
                //     navigate('/view_items');
                // } else if (reply !== null && UserData.type === 'trader') {
                //     navigate('/trader_items');
                // }
            });
    }

    function GetLinks() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/student/get_upload_links/' + JSON.parse(localStorage.getItem('group')).groupId, requestOptions)
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
        fetch(Common.url + '/student/check_group/' + JSON.parse(localStorage.getItem('user'))._id, requestOptions)
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