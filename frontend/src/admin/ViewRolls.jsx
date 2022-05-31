import React, {Component, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifyStudent from "./ModifyStudent";

export default function ViewRolls(){

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
        fetch('http://localhost:9000/rpmt/admin/viewRoles',requestOptions)
            .then(response=>{ return response.json()})
            .then(data=>{
                 console.log(data[3].Groups[1].students)
                console.log(data)
                setStudents(data)
            });
    },[])

    function getFields(student) {

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
        fetch('http://localhost:9000/rpmt/admin/update/'+id,requestOptions)
    }
    function deleteID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        console.log(students)
        fetch('http://localhost:9000/rpmt/admin/delete/'+did,requestOptions)
    }

    return(<div className="row">
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                View Rolls
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
                                <th scope="col" width="20%">ID</th>
                                <th scope="col">Panel name</th>
                                <th scope="col">Student Groups</th>
                                <th scope="col">Staff Details</th>

                            </tr>
                            </thead>
                        <tbody>
                            {
                                students && students.map((student, key) => {
                                    return(

                                        <tr key={key}>
                                            <td>{student._id}</td>
                                            <td>{student.name}</td>
                                            <td>
                                            {
                                                student.Groups && student.Groups.map((s, key) => {
                                                    return(

                                                        <span>({s.groupId}:{s.students.join(', ')})</span>

                                                    )
                                                })
                                            }
                                            </td>
                                            <td>
                                                {
                                                    student.Staff &&  student.Staff.map((staff, key) => {
                                                        return(

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