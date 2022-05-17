import React, {Component, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Environment} from "../../../Backend/Environment";

export const StudentGroups = () => {
    let navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [registered, setRegistered] = useState(false);
    const [otherUserRegistered, setOtherUserRegistered] = useState(0);
    const [newGroup, setNewGroup] = useState(false);
    const [students, setStudents] = useState(null);

    useEffect(() => {
        CheckGroup(false)
    }, [])

    let registeredContent;
    if (registered) {
        registeredContent =
            <div>
                {JSON.parse(localStorage.getItem('user'))._id} is registered for a group.
                Group ID is {JSON.parse(localStorage.getItem('group')).groupId}
                <button className="btn btn-warning"
                        style={{fontWeight: 'bold', marginLeft: '10px'}}
                        onClick={() => RemoveGroup()}>
                    Remove from group
                </button>
            </div>
    } else if (!newGroup) {
        registeredContent =
            <div>
                <div style={{textAlign: 'center'}}>
                    <span style={{lineHeight: '2px'}}>I have not registered for a group</span>
                </div>
                <div>
                    <div style={{display: 'flex', marginTop: '20px'}}>
                        <span style={{marginRight: '30px'}}>Group ID</span>
                        <span style={{width: '100%'}}>
                            <input type="text" className="form-control"
                                   onChange={e => setId(e.target.value)}/>
                        </span>
                    </div>
                    <div>
                        <button className="btn btn-warning"
                                style={{fontWeight: 'bold', marginLeft: '10px'}}
                                onClick={() => RegisterGroup()}>
                            Add
                        </button>
                        <button className="btn btn-warning"
                                style={{marginTop: '30px', fontWeight: 'bold', marginLeft: '10px'}}
                                onClick={() => {
                                    setId('')
                                    RegisterGroup()
                                }}>
                            Create new group
                        </button>
                    </div>
                </div>
            </div>

    }

    return (
        <div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                Register Group
            </div>
            <div className="col-12">
                <div style={{
                    width: '100%',
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{width: '500px'}}>
                        {registeredContent}
                        <table className="table table-striped" style={{marginTop: '40px'}}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" width="20%">Student ID</th>
                                <th scope="col">Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                students && students.map((student, key) => {
                                    return <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{student._id}</td>
                                        <td>{student.name}</td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    function CheckGroup(searchGroup) {
        let userId;
        if (searchGroup) {
            userId = id;
        } else {
            userId = JSON.parse(localStorage.getItem('user'))._id;
        }
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Environment.url + 'student/check_group/' + userId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply.length === 0) {
                    setRegistered(false)
                } else {
                    setRegistered(true)
                    setStudents(reply.students);
                    localStorage.setItem('group', JSON.stringify(reply))
                    console.log(reply)
                    // GetGroup();
                }
            });
    }

    function RegisterGroup() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: id,
                student: JSON.parse(localStorage.getItem('user'))._id
            })
        };
        fetch('http://localhost:9000/rpmt/student/add_group', requestOptions)
            .then(response => response.json())
            .then(reply => {
                console.log(reply)
                if (reply !== null) {
                    setRegistered(true);
                    localStorage.setItem('group', JSON.stringify(reply))
                }
            });
    }

    function RemoveGroup() {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/student/remove_from_group/' + JSON.parse(localStorage.getItem('group')).groupId + '/' + JSON.parse(localStorage.getItem('user'))._id, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply) {
                    setRegistered(false)
                    localStorage.removeItem('group');
                }
            });
    }
};