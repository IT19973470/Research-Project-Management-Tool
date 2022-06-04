import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GroupDetails} from "./GroupDetails";
import {Common} from "./../commons/Common";

export const ViewTopics = () => {

    let navigate = useNavigate();

    const [researchTopic, setResearchTopic] = useState('');
    const [groupId, setGroupId] = useState('');
    const [topic, setTopic] = useState('');
    const [accepted, setAccepted] = useState('');
    const [studentGroup, setStudentGroup] = useState('');
    const [group,showGroup]=React.useState(false)

    function getFields(student) {
        showGroup(true)
        console.log(student.groupId)
        setGroupId(student)
    }
    useEffect( () =>{
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/panel_member/viewTopics', requestOptions)
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
                            <td align={'center'}><button onClick={()=>getFields(researchTopic)}>View</button></td>
                        </tr>
                    })
                }
                </tbody>
            </table>

            { group ? <GroupDetails IdPass={groupId}/> : null }
        </div>

    );
}
