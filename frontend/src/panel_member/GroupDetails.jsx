import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function GroupDetails (groupId)  {
    let navigate = useNavigate();
    //console.log(groupId)
    let [studentGroup, setStudentGroup] = useState('');
    useEffect(() => {
         viewGroupDetails();
    },)
    // studentGroup.groupId = this.props.groupId;

    function viewGroupDetails(){
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/panel_member/viewGroup/'+groupId.IdPass.groupId, requestOptions)
            .then(response => {return response.json()})
            .then(data => {
               // console.log(data[0]);
                setStudentGroup(data);
            })
        console.log(studentGroup)

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
                                <td>{groupId.IdPass.topic}</td>
                                <td><span>{studentGroup.students.join(', ')}</span></td>
                                <td><button>Go</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}
