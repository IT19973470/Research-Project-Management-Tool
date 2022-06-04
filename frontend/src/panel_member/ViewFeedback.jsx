import React, {useEffect, useState} from "react";
import {Common} from "./../commons/Common";

export const ViewFeedback = () => {

    const [feedback, setFeedback] = useState("");
    const [presentationMark, setMarks] = useState("");
    const [presentationFeedback, setPresentationFeedback] = useState("");
    const [groupId, setGroupId] = useState('');
    const [_evaluationId, setEvaluationId] = useState('');
    const [dbID, setDbId] = useState("");

    useEffect(() => {
        viewFeedback();
    })

    function getFields(feedback) {
        console.log(feedback)
        setDbId(feedback._id)
        setEvaluationId(feedback._evaluationId)
        setGroupId(feedback.groupId)
        setMarks(feedback.presentationMark)
        setPresentationFeedback(feedback.presentationFeedback)
    }

    function viewFeedback() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/panel_member/viewFeedback', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data);
                setFeedback(data);
            })
        // console.log(studentGroup)
    }

    function update(){
        const requestOptions ={
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                presentationMark: presentationMark,
                presentationFeedback: presentationFeedback
            })
        };
        console.log(feedback)
        fetch(Common.url + '/panel_member/updateFeedback/'+ dbID,requestOptions)
    }

    function deleteByID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        console.log(feedback)
        fetch(Common.url + '/panel_member/deleteById/'+did,requestOptions)
    }

    return(
        <div className={'row'}>
                <div style={{width: '900px'}}>
                    <div className="col-12" style={{fontSize: '45px', textAlign: 'center', width: '600px'}}>
                        View Feedback
                    </div>
                    <table className="table table-striped" style={{marginTop: '40px'}}>
                        <thead>
                        <tr>
                            <th scope="col" width="5%">#</th>
                            <th scope="col" width="10%">Evaluation ID</th>
                            <th scope="col" width="10%">Group ID</th>
                            <th scope="col" width="10%">Presentation Mark</th>
                            <th scope="col" width="10%">Feedback</th>
                            <th scope="col" width="10%">Update</th>
                            <th scope="col" width="10%">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            feedback && feedback.map((feedback, key) => {
                                return <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{feedback._evaluationId}</td>
                                    <td>{feedback.groupId}</td>
                                    <td>{feedback.presentationMark}</td>
                                    <td>{feedback.presentationFeedback}</td>
                                    <td><button onClick={()=>getFields(feedback)} >Update</button></td>
                                    <td><button onClick={()=>deleteByID(feedback._evaluationId)} >Delete</button></td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>

            <div className={'col-12'} style={{verticalAlign: "baseline"}}>
                <div style={{height: '900px'}}>
                    <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                        Update Feedback
                    </div>
                    <div className={'col-12'}>
                        <div style={{width: '600px'}}>
                            <form align="center">
                                <div className="form-group">
                                    <label htmlFor="na,e">Group ID:</label>
                                    <input type="text" value={groupId} className="form-control" id="id" readOnly={true} placeholder="Enter Group ID"
                                           onChange={(e) => {
                                               setGroupId(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Presentation Mark:</label>
                                    <input type="text" value={presentationMark} className="form-control" id="mark" placeholder="Enter Mark"
                                           onChange={(e) => {
                                               setMarks(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Feedback:</label>
                                    <input type="text" value={presentationFeedback} className="form-control" id="feedback"
                                           placeholder="Enter Feedback"
                                           onChange={(e) => {
                                               setPresentationFeedback(e.target.value)
                                           }}/>
                                </div>
                                <button type="button" onClick={update} className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );

}
