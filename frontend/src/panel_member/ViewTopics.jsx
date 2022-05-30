import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const ViewTopics = () => {

    let navigate = useNavigate();

    const [researchTopic, setResearchTopic] = useState('');
    const [groupId, setGroupId] = useState('');
    const [topic, setTopic] = useState('');
    const [accepted, setAccepted] = useState('');
    const [studentGroup, setStudentGroup] = useState('');


    useEffect( () =>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/panel_member/viewTopics', requestOptions)
            .then(response => { return response.json()})
            .then(data => {
                console.log(data);
                setResearchTopic(data);
            });
    });

    function viewGroupDetails(groupId){
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        };
        console.log(studentGroup);
        fetch('http://localhost:9000/rpmt/panel_member/viewGroup/'+ groupId, requestOptions)
            .then(response => {return response.json()})
            .then(data => {
                console.log(data);
                setStudentGroup(data);
                navigate('/group_details');
            })

    }

    return(
        <div style={{width: '500px'}}>
            <div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>
                View Topics
            </div>
            <table className="table table-striped" style={{marginTop: '40px'}}>
                <thead>
                <tr>
                    <th >#</th>
                    <th scope="col" width="20%">Group ID</th>
                    <th scope="col" width="20%">Topic</th>
                    <th scope="col" width="20%">Status</th>
                    <th scope="col" width="40%">View Group Details</th>
                </tr>
                </thead>
                <tbody>
                {
                    researchTopic  && researchTopic.map((researchTopic, key) => {
                        return <tr key={key}>
                            <td>{key+1}</td>
                            <td>{researchTopic.groupId}</td>
                            <td>{researchTopic.topic}</td>
                            <td>{researchTopic.accepted.toString()}</td>
                            <td><button onClick={() => viewGroupDetails(researchTopic.groupId)}>View</button></td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    );
}
