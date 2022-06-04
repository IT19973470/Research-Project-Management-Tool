import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifyStudent from "./ModifyStudent";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan,faPencil} from '@fortawesome/free-solid-svg-icons'

export default function ModifyStudent(){

    const [students, setStudents] = useState(null);
    const [name, setName] =useState("");
    const [email, setEmail] =useState("");
    const [id, setId] =useState("");
    const [address, setAddress] =useState("");

    useEffect (()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/admin/displayUsers',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                // console.log(data)
                setStudents(data)
            });
    })

    function getFields(student) {
        console.log(student)
        setId(student._id)
        setName(student.name)
        setEmail(student.email)
        setAddress(student.address)
    }
    function update(){
        const requestOptions ={
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id:id,
                name:name,
                email:email,
                address:address
            })
        };
        console.log(students)
        fetch(Common.url + '/admin/update/'+id,requestOptions)
    }
    function deleteID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        console.log(students)
        fetch(Common.url + '/admin/delete/'+did,requestOptions)
    }

    return(<div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                Manage Student
            </div>
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
                                <th scope="col">#</th>
                                <th scope="col" width="20%">Student ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                students && students.map((student, key) => {
                                    return <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{student._id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.address}</td>
                                        <td><button onClick={()=>getFields(student)} style={{backgroundColor: "transparent",border:"none",color:"black"}}><FontAwesomeIcon icon={faPencil} /></button></td>
                                        <td><button onClick={()=>deleteID(student._id)} style={{backgroundColor: "transparent",border:"none",color:"black"}}><FontAwesomeIcon icon={faTrashCan} /></button></td>

                                    </tr>
                                })
                            }
                            </tbody>
                        </table>

                        <form  align="center">
                            <div className="form-group">
                                <h1>Update users</h1>
                                <label htmlFor="na,e">Student ID:</label>
                                <input type="text" value={id} className="form-control" id="name" readOnly={true} placeholder="Enter Student ID"  onChange={(e)=>{setId(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="na,e">Student Name:</label>
                                <input type="text" value={name} className="form-control" id="name" placeholder="Enter Student name"  onChange={(e)=>{setName(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="na,e">Email:</label>
                                <input type="text" value={email} className="form-control" id="age" placeholder="Enter Student email"  onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="na,e">Address:</label>
                                <input type="text" value={address} className="form-control" id="age" placeholder="Enter Student address"  onChange={(e)=>{setAddress(e.target.value)}}/>
                            </div>
                            <br/>
                            <button type="button"  onClick={update} className="btn btn-primary" >Update</button>
                            <br/>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}