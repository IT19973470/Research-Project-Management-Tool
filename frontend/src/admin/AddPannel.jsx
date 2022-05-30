import React, {Component, useEffect, useState} from 'react';
import './ModifySupervisor.css';
export default function  AddPannel()  {

    const [supervisor, setSupervisor] = useState(null);
    const [name, setName] =useState("");
    const [students, setStudents] = useState(null);

    var [array1, setArray1] = useState([]);
    var [array2, setArray2] = useState([]);
    const [data, setText]=useState("")
    useEffect (()=>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/admin/displaySupervisor',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                //   console.log(data)
                setSupervisor(data)
            });

        const requestOptions1 = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/admin/displayGroups',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                // console.log(data)
                setStudents(data)
            });
    })

    function getFields(student) {
        console.log(student)
        setText(student)

    }
    function getTextFields(student) {
        var options =student._id
        // setId(student._id)
        console.log(options)
        setArray1((array1) => [...array1, student._id]);
        console.log(array1)
        // var select = document.getElementById("selectNumber");
        // for(let i = 0; i < options.length; i++) {
        //     let opt = options[i];
        //     let el = document.createElement("option");
        //     el.textContent = opt;
        //     el.value = opt;
        //     select.appendChild(el);
        // }

    }
    function getTextFieldsGroup(student) {
        setArray2((array2) => [...array2, student.groupId]);
        console.log(array2)
    }
    // const handleChange = () => {
    //     setArray((array) => [...array, data]);
    //     console.log(array)
    // };

    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:name,
                grouplist:array2,
                stafflist:array1
            })
        };
        fetch('http://localhost:9000/rpmt/admin/addPannel',requestOptions)
    }
    function deleteID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        fetch('http://localhost:9000/rpmt/admin/deleteS/'+did ,requestOptions)
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
                                <th scope="col">Interest</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                supervisor && supervisor.map((supervisor, key) => {
                                    return <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{supervisor._id}</td>
                                        <td>{supervisor.interests.join(', ')}</td>

                                        <td><button onClick={()=>getTextFields(supervisor)} style={{backgroundColor: "transparent",border:"none",color:"black"}}>Add</button></td>

                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                            <table className="table table-striped" style={{marginTop: '40px'}}>
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" width="20%">ID</th>
                                    <th scope="col">Group ID</th>
                                    <th scope="col">Student Names</th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    students && students.map((student, key) => {
                                        return <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{student._id}</td>
                                            <td>{student.groupId}</td>
                                            <td>{student.students.join(', ')}</td>
                                            <td><button onClick={()=>getTextFieldsGroup(student)} style={{backgroundColor: "transparent",border:"none",color:"black"}}>Add</button></td>

                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>

                        <form  align="center">
                            <div className="form-group">

                                <h1>Update users</h1>
                                <label htmlFor="na,e">Panel Name:</label>
                                <input type="text"  className="form-control" id="name" placeholder="Enter Panel Name"  onChange={(e)=>{setName(e.target.value)}}/>
                                <label htmlFor="na,e">Supervisor ID:</label>
                                <br/>
                                {array1.map(array1 => <span>{array1}<br/></span>)}
                                <label htmlFor="na,e">Group ID:</label>
                                <br/>
                                {array2.map(array2 => <span>{array2}<br/></span>)}
                            </div>
                            <button type="button"  onClick={add} className="btn btn-primary" >Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }

}

