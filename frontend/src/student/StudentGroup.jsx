import React, {Component, useState, useEffect} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Environment} from "../../../Backend/Environment";
import 'font-awesome/css/font-awesome.min.css';

export const StudentGroups = () => {
    // let navigate = useNavigate();

    const [id, setId] = useState('');
    // const [password, setPassword] = useState('');

    const [registered, setRegistered] = useState(false);
    // const [otherUserRegistered, setOtherUserRegistered] = useState(0);
    const [newGroup, setNewGroup] = useState(false);
    const [students, setStudents] = useState([]);
    const [availableGroups, setAvailableGroups] = useState([]);
    const [filledGroups, setFilledGroups] = useState([]);
    // const [groups, setGroups] = useState([]);
    const [leader, setLeader] = useState('');

    useEffect(() => {
        AllGroups()
        CheckGroup(false)
    }, [])

    let registeredContent;
    if (registered) {
        registeredContent =
            <div>
                <span style={{paddingTop: '6px'}}>
                    <span style={{fontWeight: 'bold'}}>{JSON.parse(localStorage.getItem('user'))._id} </span>
                    is registered for a group.
                Group ID is
                    <span style={{fontWeight: 'bold'}}> {JSON.parse(localStorage.getItem('group')).groupId}</span>
                </span>
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
                        <span style={{marginRight: '30px', paddingTop: '6px'}}>Group ID</span>
                        <span>
                            <input type="text" className="form-control"
                                   value={id}
                                   onChange={e => setId(e.target.value)}/>
                        </span>
                        <button className="btn btn-warning"
                                style={{fontWeight: 'bold', marginLeft: '10px'}}
                                onClick={() => RegisterGroup(false)}>
                            Add
                        </button>
                        <button className="btn btn-warning"
                                style={{fontWeight: 'bold', marginLeft: '10px'}}
                                onClick={() => {
                                    setId('')
                                    RegisterGroup(true)
                                }}>
                            Create new group
                        </button>
                    </div>
                    <div>

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
                    <div style={{width: '100%'}}>
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
                                        <td>
                                            {
                                                (student._id == leader) ?
                                                    <span>{student.name} (Leader)</span> :
                                                    <span>{student.name}</span>
                                            }
                                        </td>
                                        <td>
                                            {
                                                (student._id == leader) ?
                                                    <div style={{fontSize: '14px'}}>
                                                        Marked as leader
                                                    </div>
                                                    :
                                                    <button className="btn btn-secondary btn-sm" onClick={() => {
                                                        // setSupervisor(supervisorObj)
                                                        markLeader(student._id)
                                                    }
                                                    }>Set as leader
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <span style={{fontWeight: 'bold'}}>Available Groups - {availableGroups.length}</span>
                {
                    availableGroups && availableGroups.map((group, key1) => {
                        return <div className="row" key={key1} style={{
                            border: '1px solid black',
                            borderRadius: '10px',
                            marginTop: '15px',
                            padding: '10px'
                        }}>
                            <div className="col-10">
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Group ID : </span>
                                    <span>{group.groupId}</span>
                                </div>
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Group Leader : </span>
                                    {
                                        (group.leader !== null) ?
                                            <span>{group.leader.name} ( {group.leader._id} )</span> :
                                            <span>No leader assigned</span>
                                    }
                                </div>
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Members : </span>
                                    {
                                        group.students.map((student, key2) => {
                                            return <span key={key2}>{student.name} ( {student._id} ) , </span>
                                        })
                                    }
                                </div>
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Members Count : </span>
                                    <span>{group.students.length}</span>
                                </div>
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Max Count : </span>
                                    <span>4</span>
                                </div>
                            </div>
                            {
                                !registered ?
                                    <div className="col-2"
                                         style={{display: 'grid', justifyContent: 'center', alignContent: 'center'}}>
                                        <i className="fa fa-pencil" style={{color: 'green'}}
                                           onClick={() => {
                                               setStudents(group.students);
                                               setId(group.groupId)
                                           }}></i>
                                    </div> :
                                    <div></div>
                            }
                        </div>
                    })
                }
            </div>
            <div style={{marginTop: '20px'}}>
                <span style={{fontWeight: 'bold'}}>Filled Groups - {filledGroups.length}</span>
                {
                    filledGroups && filledGroups.map((group, key1) => {
                        return <div className="row" key={key1} style={{
                            border: '1px solid black',
                            borderRadius: '10px',
                            marginTop: '15px',
                            padding: '10px'
                        }}>
                            <div className="col-10">
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Group ID : </span>
                                    <span>{group.groupId}</span>
                                </div>
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Group Leader : </span>
                                    {
                                        (group.leader !== null) ?
                                            <span>{group.leader.name} ( {group.leader._id} )</span> :
                                            <span>No leader assigned</span>
                                    }
                                </div>
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Members : </span>
                                    {
                                        group.students.map((student, key2) => {
                                            return <span key={key2}>{student.name} ( {student._id} ) , </span>
                                        })
                                    }
                                </div>
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Members Count : </span>
                                    <span>{group.students.length}</span>
                                </div>
                                <div>
                                    <span style={{fontWeight: 'bold'}}>Max Count : </span>
                                    <span>4</span>
                                </div>
                            </div>
                        </div>
                    })
                }
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
        fetch(Common.url + '/student/check_group/' + userId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply.length === 0) {
                    setRegistered(false)
                } else {
                    setRegistered(true)
                    setStudents(reply.students);
                    setLeader(reply.leader)
                    localStorage.setItem('group', JSON.stringify(reply))
                    console.log(reply)
                    // GetGroup();
                }
            });
    }

    function RegisterGroup(leader) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: id,
                student: JSON.parse(localStorage.getItem('user'))._id,
                leader: leader
            })
        };
        fetch(Common.url + '/student/add_group', requestOptions)
            .then(response => response.json())
            .then(reply => {
                console.log(reply)
                if (reply !== null) {
                    localStorage.setItem('group', JSON.stringify(reply))
                    CheckGroup(false)
                    AllGroups();
                }
            });
    }

    function RemoveGroup() {
        let grpLeader = false;
        if (leader == JSON.parse(localStorage.getItem('user'))._id) {
            grpLeader = true;
        }
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/student/remove_from_group/' + JSON.parse(localStorage.getItem('group')).groupId + '/' + JSON.parse(localStorage.getItem('user'))._id + '/' + grpLeader, requestOptions)
            .then(response => response.json())
            .then(reply => {
                if (reply) {
                    setRegistered(false);
                    localStorage.removeItem('group');
                    setStudents([]);
                    AllGroups();
                }
            });
    }

    function AllGroups() {
        let availableGrps = [];
        let filledGrps = [];
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/student/get_groups', requestOptions)
            .then(response => response.json())
            .then(groups => {
                // console.log(groups)
                groups.forEach(group => {
                    if (group.students.length === 4) {
                        filledGrps.push(group)
                    } else {
                        availableGrps.push(group)
                    }
                })
                setAvailableGroups(availableGrps);
                setFilledGroups(filledGrps)
            });
    }

    function markLeader(leaderId) {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/student/set_leader/' + JSON.parse(localStorage.getItem('group')).groupId + '/' + leaderId, requestOptions)
            .then(response => response.json())
            .then(reply => {
                CheckGroup(false);
                AllGroups();
            });
    }
};