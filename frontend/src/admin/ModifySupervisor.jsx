import React, {Component, useEffect, useState} from 'react';
import {Common} from "./../commons/Common";
import './ModifySupervisor.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan,faPencil,faPlus} from '@fortawesome/free-solid-svg-icons'

export default function  ModifySupervisor()  {

    const [supervisor, setSupervisor] = useState(null);
    const [id, setId] =useState("");
    const [name, setName] =useState("");
    const [email, setEmail] =useState("");
    const [adress, setAddress] =useState("");


    var [array, setArray] = useState([]);
    const [data, setText]=useState("")
    useEffect (()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/admin/displaySupervisor',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                console.log(data)
                setSupervisor(data)
            });
    })

    function getFields(student) {
        console.log(student)
        setText(student)

    }
    function getTextFields(student) {
        setArray((array) => [])
        document.getElementById("selectNumber").innerHTML = "";
        var options =[]
         options = student.interests
        setId(student._id)
        setName(student.name)
        setEmail(student.email)
        setAddress(student.address)
        console.log(options[0])
        // console.log(student.interests[0][1])
        // setArray(student.interests)
        var select = document.getElementById("selectNumber");
        for(let i = 0; i < options.length; i++) {
            let opt = options[i];
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
             select.appendChild(el);
        }

    }

    const handleChange = () => {
        setArray((array) => [...array, data]);
        console.log(array)
    };

    function update(){
        const requestOptions ={
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                _id:id,
                name:name,
                email:email,
                address:adress,
                interests:array
            })
        };
        fetch(Common.url + '/admin/updateS/'+id,requestOptions)
    }
    function deleteID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        fetch(Common.url + '/admin/deleteS/'+did ,requestOptions)
    }


    {
        return <div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                Manage Supervisor
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
                                <th scope="col" width="20%">ID</th>
                                <th scope="col" width="20%">Name</th>
                                <th scope="col" width="20%">Address</th>
                                <th scope="col" width="20%">Email</th>
                                <th scope="col">Interest</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                supervisor && supervisor.map((supervisor, key) => {
                                    return <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{supervisor._id}</td>
                                        <td>{supervisor.name}</td>
                                        <td>{supervisor.address}</td>
                                        <td>{supervisor.email}</td>
                                        <td>{supervisor.interests.join(', ')}</td>
                                        <td><button onClick={()=>getTextFields(supervisor)} style={{backgroundColor: "transparent",border:"none",color:"black"}}><FontAwesomeIcon icon={faPencil} /></button></td>
                                        <td><button onClick={()=>deleteID(supervisor._id)} style={{backgroundColor: "transparent",border:"none",color:"black"}}><FontAwesomeIcon icon={faTrashCan} /></button></td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>

                        <form  align="center">
                            <div className="form-group">
                                <h1>Update users</h1>
                                <label htmlFor="na,e">Student ID:</label>
                                <input type="text" value={id} className="form-control" id="id" readOnly={true} placeholder="Enter Student ID"  onChange={(e)=>{setId(e.target.value)}}/>
                                <label htmlFor="na,e">Student Name:</label>
                                <input type="text" value={name} className="form-control" id="name"  placeholder="Enter Name"  onChange={(e)=>{setName(e.target.value)}}/>
                                <label htmlFor="na,e">Address:</label>
                                <input type="text" value={adress} className="form-control" id="address"  placeholder="Enter Address"  onChange={(e)=>{setAddress(e.target.value)}}/>
                                <label htmlFor="na,e">Email:</label>
                                <input type="text" value={email} className="form-control" id="email"  placeholder="Enter Email"  onChange={(e)=>{setEmail(e.target.value)}}/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="na,e">Interest:</label>
                                <div className="select-editable">
                                    <select id="selectNumber" onClick={(e)=>{setText(e.target.value)}}>
                                        <option>Select Interest</option>
                                        <option></option>
                                    </select>
                                    <div className="row">
                                        <div className="col-11">
                                            <input type="text" value={data} className="form-control" id="name1" placeholder="Select Interest"  onChange={(e)=>{setText(e.target.value)}}/>
                                        </div>
                                    <div className="col-1" style={{marginLeft:'450px',marginTop:'-5px'}}>
                                        <button type="button"  onClick={handleChange} className="btn btn-dark" style={{borderRadius:'20px'}}><FontAwesomeIcon icon={faPlus} /></button>
                                    </div>
                                    </div>
                                </div>
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
    }

}

