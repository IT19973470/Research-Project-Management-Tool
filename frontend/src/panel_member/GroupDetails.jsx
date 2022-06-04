import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Common} from "./../commons/Common";

// export default function GroupDetails(groupId) {
export const GroupDetails = () => {
    let navigate = useNavigate();
    //console.log(groupId)
    let [studentGroup, setStudentGroup] = useState('');
    const [suggestions, setSuggestions] = useState("");
    const [topicFeedback, setTopicFeedback] = useState("");
    const [groupID, setGroupId] = useState('');

    useEffect(() => {
        viewGroupDetails();
    },)

    // studentGroup.groupId = this.props.groupId;
    function viewFeedback() {
        navigate('/panel_member/view_topic_feedback');
    }

    function viewGroupDetails() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/panel_member/viewGroup/' + groupId.IdPass.groupId, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data[0]);
                setStudentGroup(data);
            })
        console.log(studentGroup)

    }

    function add() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                groupId: groupID,
                suggestions: suggestions,
                topicFeedback: topicFeedback
            })
        };
        fetch(Common.url + '/panel_member/addTopicFeedback', requestOptions)
    }

    return (
        <div style={{width: '650px'}}>
            <div className={'row'}>
                <div className={'col-12'} style={{fontSize: '45px', textAlign: 'center'}}>
                    Group Details
                </div>
                <table className={'table table-striped'} style={{marginTop: '40px'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th scope={'col'} width={'20%'}>Group ID</th>
                        <th scope={'col'} width={'30%'}>Research Topic</th>
                        <th scope={'col'} width={'30%'}>Members</th>
                        <th scope={'col'} width={'30%'}>View Feedback</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        studentGroup && studentGroup.map((studentGroup, key) => {
                            return <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{studentGroup.groupId}</td>
                                <td>{groupId.IdPass.topic}</td>
                                <td><span>{studentGroup.students.join(', ')}</span></td>
                                <td>
                                    <button onClick={() => viewFeedback()}>Go</button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
            <hr/>
            <div className={'row'}>
                <div style={{height: '400px'}}>
                    <div className={'col-12'} style={{fontSize: '20px', textAlign: 'center'}}>
                        Add Feedback
                    </div>
                    <hr/>
                    <div className={'col-12'}>
                        <div style={{width: '00px'}}>
                            <form align="center" style={{width: '650px'}}>
                                <div className="form-group">
                                    <label htmlFor="na,e">Group ID:</label>
                                    <input type="text" className="form-control" id="id" placeholder="Enter Group ID"
                                           onChange={(e) => {
                                               setGroupId(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Suggestions:</label>
                                    <input type="text" className="form-control" id="suggestions"
                                           placeholder="Enter Suggestions"
                                           onChange={(e) => {
                                               setSuggestions(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Feedback:</label>
                                    <input type="text" className="form-control" id="feedback"
                                           placeholder="Enter Feedback"
                                           onChange={(e) => {
                                               setTopicFeedback(e.target.value)
                                           }}/>
                                </div>

                                <button type="button" onClick={add} className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
