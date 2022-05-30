import React, {Component, useEffect, useState} from 'react';
import './ModifySupervisor.css';
export default function  ModifySupervisor()  {

    const [supervisor, setSupervisor] = useState(null);
    const [name, setName] =useState("");
    const [email, setEmail] =useState("");
    const [id, setId] =useState("");
    const [address, setAddress] =useState("");
    var [array, setArray] = useState([]);
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
    })

    function a(){

        var options = ["1", "2", "3", "4", "5"];

        for(var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }

    }

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
                interests:array
            })
        };
        fetch('http://localhost:9000/rpmt/admin/updateS/'+id,requestOptions)
    }
    function deleteID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        console.log(students)
        fetch('http://localhost:9000/rpmt/admin/delete/'+did ,requestOptions)
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

                                        <td><button onClick={()=>getTextFields(supervisor)} style={{backgroundColor: "transparent",border:"none",color:"black"}}>Update</button></td>
                                        <td><button onClick={a} style={{backgroundColor: "transparent",border:"none",color:"black"}}>Delete</button></td>

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
                                <div className="select-editable">
                                    <select id="selectNumber" onChange={(e)=>{setText(e.target.value)}}>
                                        <option>Select Interest</option>
                                    </select>
                                    <input type="text" value={data} className="form-control" id="name1" placeholder="Select Interest"  onChange={(e)=>{setText(e.target.value)}}/></div>
                                  <button type="button"  onClick={handleChange} className="btn btn-primary" >+</button>
                            </div>
                            <button type="button"  onClick={update} className="btn btn-primary" >Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }

}

