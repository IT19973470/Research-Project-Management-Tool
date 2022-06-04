import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Marking = () => {
    const [marking, setMarking] = useState(null);

    const [criteria, setCriteria] =useState("");
    const [marks, setMarks] =useState("");


    useEffect (()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/admin/displayMarking',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                 console.log(data)
                setMarking(data)
            });
    })
    function getFields(student) {
        console.log(student)
        // setId(student._id)
        // setName(student.name)
        // setEmail(student.email)
        // setAddress(student.address)
    }
    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id:"",
                criteria:criteria,
                marks:marks,
            })
        };
        console.log(criteria)
        console.log(marks)
        fetch(Common.url + '/admin/add',requestOptions)
    }
    function deleteID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        console.log(marks)
        fetch(Common.url + '/admin/deleteMarking/'+did,requestOptions)
    }
    return(
        <div className="row" align="center">
            <form  align="center">
                <div className="form-group">
                    <h1>Add marking</h1>
                    <label htmlFor="na,e">Criteria:</label>
                    <input type="text"  className="form-control" id="name"  placeholder="Enter Criteria"  onChange={(e)=>{setCriteria(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="na,e">Marks:</label>
                    <input type="text"  className="form-control" id="marks" placeholder="Enter Marking"  onChange={(e)=>{setMarks(e.target.value)}}/>
                </div>
                <br/>
                <button type="button"  onClick={add} className="btn btn-primary" >Add</button>
                <br/>
            </form>
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                View Marking
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
                                <th >#</th>
                                <th scope="col" width="20%">Criteria</th>
                                <th scope="col">Mark Distribution</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                marking && marking.map((marking, key) => {
                                    return <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{marking.criteria}</td>
                                        <td>{marking.marks}</td>
                                        <td><button onClick={()=>deleteID(marking._id)} style={{backgroundColor: "transparent",border:"none",color:"black"}}>Delete</button></td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};
