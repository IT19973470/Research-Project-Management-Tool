import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewRolls() {

    const [students, setStudents] = useState(null);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        fetch(Common.url + '/admin/viewRoles',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                 //console.log(data[3].Groups[1].students)
                console.log(data)
                setStudents(data)
            });
    }, [])

    return (<div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                View Rolls
            </div>
            {
                students && students.map((student, key) => {
                    return (

                        <div className="card" style={{
                            backgroundColor: 'rgba(10, 69, 79, 0.5)',
                            boxShadow: '0 5px 30px black',
                            margin: 'auto',
                            width: ' 40%',
                            padding: '10px',
                            marginTop: '50px'
                        }}>
                            <div className="item-body" style={{margin: 'auto', width: ' 60%', padding: '10px'}}>
                                <h5 className="item-title"
                                    style={{color: 'white', margin: 'auto', width: ' 60%', padding: '10px'}}>Panel
                                    ID</h5>
                                <h6 className="item-title"
                                    style={{margin: 'auto', width: ' 60%', padding: '10px'}}>
                                    ({student._id})
                                </h6>
                                <h5 className="item-title"
                                    style={{color: 'white', margin: 'auto', width: ' 60%', padding: '10px'}}>Panel
                                    Name</h5>
                                <h6 className="item-title"
                                    style={{margin: 'auto', width: ' 60%', padding: '10px'}}>
                                    ({student.name})
                                </h6>
                                <h5 className="item-title"
                                    style={{color: 'white', margin: 'auto', width: ' 60%', padding: '10px'}}>Panel
                                    Staff</h5>
                                {
                                    student.Staff && student.Staff.map((staff, key) => {
                                        return (
                                            <h6 style={{
                                                margin: 'auto',
                                                width: ' 60%',
                                                padding: '10px'
                                            }}>({staff._id})</h6>
                                        )
                                    })
                                }
                                <h5 className="item-title"
                                    style={{color: 'white', margin: 'auto', width: ' 60%', padding: '10px'}}>Student
                                    Groups</h5>
                                {
                                    student.Groups && student.Groups.map((s, key) => {
                                        return (
                                            <h6 style={{margin: 'auto', width: ' 60%', padding: '10px'}}>
                                                <span> Group:({s.groupId})</span><br/><span> Students:({s.students.join(', ')})</span>
                                            </h6>
                                        )
                                    })
                                }
                                <h5 className="item-title"
                                    style={{
                                        color: 'white',
                                        margin: 'auto',
                                        width: ' 60%',
                                        padding: '10px'
                                    }}>Supervisor</h5>
                                {
                                    student.Supervisor && student.Supervisor.map((su, key) => {
                                        return (
                                            <h6 style={{margin: 'auto', width: ' 60%', padding: '10px'}}>
                                                <span> ({su.supervisor}):</span><span> {su.groupId}</span></h6>
                                        )
                                    })
                                }
                                <h5 className="item-title"
                                    style={{
                                        color: 'white',
                                        margin: 'auto',
                                        width: ' 60%',
                                        padding: '10px'
                                    }}>Co-Supervisor</h5>
                                {
                                    student.Supervisor && student.Supervisor.map((su, key) => {
                                        return (
                                            <h6 style={{margin: 'auto', width: ' 60%', padding: '10px'}}>
                                                <span> ({su.coSupervisor}):</span><span> {su.groupId}</span></h6>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })

            }
            <div className="col-12">
                <div style={{
                    width: '100%',
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{width: '500px'}}>

                        <table className="table table-striped" style={{marginTop: '40px'}}>
                            <thead>
                            <tr>
                                <th scope="col" width="20%">ID</th>
                                <th scope="col">Panel name</th>
                                <th scope="col">Student Groups</th>
                                <th scope="col">Staff Details</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                students && students.map((student, key) => {
                                    return (

                                        <tr key={key}>
                                            <td>{student._id}</td>
                                            <td>{student.name}</td>
                                            <td>
                                                {
                                                    student.Groups && student.Groups.map((s, key) => {
                                                        return (

                                                            <span>({s.groupId}:{s.students.join(', ')})</span>

                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    student.Staff && student.Staff.map((staff, key) => {
                                                        return (

                                                            <span>{staff._id},</span>

                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    )
                                })

                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}