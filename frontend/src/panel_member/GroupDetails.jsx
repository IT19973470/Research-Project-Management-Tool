import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const GroupDetails = () => {
    let navigate = useNavigate();

    const [studentGroup, setStudentGroup] = useState('');

    useEffect(() => {
        viewGroupDetails(studentGroup);
    })
    let groupId = studentGroup.groupId;

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
                navigate('/panel_member/group_details');
            })

    }

    return(
        <div style={{width: '650px'}}>
            <div className={'col-12'} style={{fontSize:'45px', textAlign:'center'}}>
                Group Details
            </div>
            <table className={'table table-striped'} style={{marginTop: '40px'}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th scope={'col'} width={'20%'}>Group ID</th>
                    <th scope={'col'} width={'30%'}>Research Topic</th>
                    <th scope={'col'} width={'30%'}>Group Leader</th>
                    <th scope={'col'} width={'30%'}>Members</th>
                    <th scope={'col'} width={'30%'}>Feedback</th>
                </tr>
                </thead>
                <tbody>
                    {
                        studentGroup && studentGroup.map((studentGroup, key) => {
                            return <tr key={key}>
                                <td>{key+1}</td>
                                <td>{studentGroup.groupId}</td>
                                <td>{studentGroup.topic}</td>
                                <td>{studentGroup.students}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}
