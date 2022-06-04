import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifyStudent from "./ModifyStudent";
import {faTrashCan,faPencil,faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ModifyPanel(){

    const [students, setStudents] = useState(null);
    const [name, setName] =useState("");
    const [email, setEmail] =useState("");
    const [id, setId] =useState("");
    const [designation, setDesignation] =useState("");

    useEffect (()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/admin/displayPanel',requestOptions)
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
        setDesignation(student.designation)
    }
    function update(){
        const requestOptions ={
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id:id,
                name:name,
                email:email,
                designation:designation
            })
        };
        console.log(students)
        fetch(Common.url + '/admin/updatePanel/'+id,requestOptions)
    }
    function deleteID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        console.log(students)
        fetch(Common.url + '/admin/deletePanel/'+did,requestOptions)
    }

    return(<div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                Manage Panel Member
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
                                <th scope="col" width="20%">Panel ID</th>
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
                                        <td>{student.designation}</td>
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
                                <label htmlFor="na,e">Panel ID:</label>
                                <input type="text" value={id} className="form-control" id="name" readOnly={true} placeholder="Enter Panel Member ID"  onChange={(e)=>{setId(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="na,e">Panel Member Name:</label>
                                <input type="text" value={name} className="form-control" id="name" placeholder="Enter Panel Member name"  onChange={(e)=>{setName(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="na,e">Email:</label>
                                <input type="text" value={email} className="form-control" id="age" placeholder="Enter Panel Member email"  onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="na,e">Address:</label>
                                <input type="text" value={designation} className="form-control" id="age" placeholder="Enter Panel Member address"  onChange={(e)=>{setDesignation(e.target.value)}}/>
                            </div>
                            <br/>
                            <button type="button"  onClick={update} className="btn btn-primary" >Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}