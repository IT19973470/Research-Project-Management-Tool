import React, {useEffect, useState} from "react";
import {Common} from "./../commons/Common";
import {useNavigate} from "react-router-dom";


export const ViewTopicSup = () => {

    let navigate = useNavigate();

    const [researchTopic, setResearchTopic] = useState('');
    const [groupId, setGroupId] = useState('');
    const [topic, setTopic] = useState('');
    const [accepted, setAccepted] = useState('');
    const [studentGroup, setStudentGroup] = useState('');

    
    function update(id,value){
        var users = JSON.parse(localStorage.getItem('user'))
        var x=users._id
       
        console.log(x)
        var x=localStorage.getItem('user');

        const requestOptions ={
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                accepted:value,
            })
        };
        fetch(Common.url + '/supervisor/acceptTopic/'+id,requestOptions)

         
        console.log(x)
        var x=localStorage.getItem('user');

        const requestOptions2 ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                supervisor:users._id
            })
        };
        fetch(Common.url + '/supervisor/acceptTopic/'+id,requestOptions2)
    }

   

    useEffect( () =>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/supervisor/viewTopics', requestOptions)
            .then(response => { return response.json()})
            .then(data => {
                // console.log(data);
                setResearchTopic(data);
            });
    },[]);

    function viewGroupDetails(){
                navigate('/panel_member/group_details');
    }

    return(
        <div style={{width: '500px'}}>
            <br></br>
            <h1>Topics</h1>
            <table className="table table-striped" style={{marginTop: '40px'}}>
                <thead>
                <tr>
                    <th >#</th>
                    <th scope="col" width="20%">Group ID</th>
                    <th scope="col" width="20%">Topic</th>
                    <th scope="col" width="20%">Accept</th>
                    <th scope="col" width="40%">Reject</th>
                </tr>
                </thead>
                <tbody>
                {
                    researchTopic  && researchTopic.map((researchTopic, key) => {
                        return <tr key={key}>
                            <td>{key+1}</td>
                            <td>{researchTopic.groupId}</td>
                            <td>{researchTopic.topic}</td>
                            <td><button onClick={()=>update(researchTopic._id,"true")}>Accept</button></td>
                            <td><button onClick={()=>update(researchTopic._id,"false")}>Reject</button></td>
                        </tr>
                    })
                }
                </tbody>
            </table>
           
        </div>

    );
}
