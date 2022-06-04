import React, {useEffect, useState} from "react";
import GroupDetails from "./GroupDetails";
import {Common} from "./../commons/Common";

export const EvaluatePresentation = () => {
    const [marking, setMarking] = useState(null);
    const [presentationMark, setMarks] = useState("");
    const [presentationFeedback, setPresentationFeedback] = useState("");
    const [groupId, setGroupId] = useState('');
    const [studentGroup, setStudentGroup] = useState('');

    // const [id, setGroupId] = useState('');
    // const [students, setStudents] = useState(null);

    // function getFields(student) {
    //     console.log(student.groupId)
    //     setGroupId(student)
    // }

    useEffect(() => {
        viewGroupDetails();
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/panel_member/viewMarking', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data)
                setMarking(data);
            });
    });

    function add() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: groupId,
                presentationMark: presentationMark,
                presentationFeedback: presentationFeedback
            })
        };
        fetch(Common.url + '/panel_member/addPresentationMarking', requestOptions)
    }

    function viewGroupDetails() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/panel_member/viewGroup', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setStudentGroup(data);
            })
        // console.log(studentGroup)
    }



    return (
        <div className={'row'}>
            <div className={'col-6'} style={{verticalAlign: "baseline"}}>
                <div style={{height: '400px'}}>
                    <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                        Feedback
                    </div>
                    <div className={'col-6'}>
                        <div style={{width: '500px'}}>
                            <form align="center">
                                <div className="form-group">
                                    <label htmlFor="na,e">Group ID:</label>
                                    <input type="text" className="form-control" id="mark" placeholder="Enter Group ID"
                                           onChange={(e) => {
                                               setGroupId(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Presentation Mark:</label>
                                    <input type="text" className="form-control" id="mark" placeholder="Enter Mark"
                                           onChange={(e) => {
                                               setMarks(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Feedback:</label>
                                    <input type="text" className="form-control" id="feedback"
                                           placeholder="Enter Feedback"
                                           onChange={(e) => {
                                               setPresentationFeedback(e.target.value)
                                           }}/>
                                </div>

                                <button type="button" onClick={add} className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

            <div className={'col-6'}>
                <div style={{height: '400px'}}>
                    <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                        Marking
                    </div>
                    <div className={'col-6'}>
                        <div style={{width: '500px'}}>
                            <table className="table table-striped" style={{marginTop: '40px'}}>
                                <thead>
                                <tr>
                                    <th scope="col" width="5%">#</th>
                                    <th scope="col" width="10%">Criteria</th>
                                    <th scope="col" width="10%">Mark Distribution</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    marking && marking.map((marking, key) => {
                                        return <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{marking.criteria}</td>
                                            <td>{marking.marks}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>


            </div>
            <div>
                <div style={{width: '900px'}}>
                    <div className="col-12" style={{fontSize: '45px', textAlign: 'center', width: '900px'}}>
                        View Presentations
                    </div>
                    <table className="table table-striped" style={{marginTop: '40px'}}>
                        <thead>
                        <tr>
                            <th scope="col" width="5%">#</th>
                            <th scope="col" width="20%">Group ID</th>
                            <th scope="col" width="20%">Members</th>
                            <th scope="col" width="20%">Presentation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            studentGroup && studentGroup.map((studentGroup, key) => {
                                return <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{studentGroup.groupId}</td>
                                    <td><span>{studentGroup.students.join(', ')}</span></td>
                                    <td><a href='https://1drv.ms/u/s!Am_XwB2RHl51nCV08Brchj-LZRHr?e=kMhc31'
                                           download>Click to download</a></td>

                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );


}
