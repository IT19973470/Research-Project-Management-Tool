import React, {useEffect, useState} from "react";
import {Common} from "./../commons/Common";

export const EvaluateDocument = () => {
    
    const [documentMark, setMarks] = useState("");
    const [documentFeedback, setDocumentFeedback] = useState("");
    const [groupId, setGroupId] = useState('');
    const [feedback, setFeedback] = useState('');
    const [_evaluationId, setEvaluationId] = useState('');
    const [dbID, setDbId] = useState("");
    const [groupIdU, setgroupIDU] = useState('');
    const [feedbackU, setFeedbackU] = useState('');
    const [markU, setmarkU] = useState(''); 
    
    useEffect(() => {
        viewFeedback();
    })

    function getFields(feedback) {

         console.log(feedback)
        setDbId(feedback._id)
        setEvaluationId(feedback._evaluationId)
        setgroupIDU(feedback.groupId)
        setmarkU(feedback.documentMark)
        setFeedbackU(feedback.documentFeedback)
    }

    function viewFeedback() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(Common.url + '/supervisor/viewFeedback', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
               // console.log(data);
                setFeedback(data);
            })
        // console.log(studentGroup)
    }

    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                groupId: groupId,
                documentMark:documentMark,
                documentFeedback:documentFeedback
            })
        };
        fetch(Common.url + '/supervisor/evaluate_document',requestOptions)
    }

    function update(){
        console.log(dbID)
        console.log(groupIdU)
        const requestOptions ={
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                groupId: groupIdU,
                documentMark: markU,
                documentFeedback: feedbackU
            })
        };
        // console.log(feedback)
        fetch(Common.url + '/supervisor/updateFeedback/'+ dbID,requestOptions)
    }

    function deleteByID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        // console.log(feedback)
        fetch(Common.url + '/supervisor/deleteById/'+did,requestOptions)
    }

    return (
        <div className={'row'}>
            <div className={'row'}>
            <div className={'col-6'} style={{verticalAlign: "baseline"}}>
                <div style={{height: '400px'}}>
                    <h1>
                        Add Feedback
                    </h1>
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
                                    <label htmlFor="na,e">Document Mark:</label>
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
                                            setDocumentFeedback(e.target.value)
                                           }}/>
                                </div>
                                <br></br>

                                <button type="button" onClick={add} className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

            <div className={'col-6'} style={{verticalAlign: "baseline"}}>
                <div style={{height: '400px'}}>
                    <h1>
                        Update Feedback
                    </h1>
                    <div className={'col-6'}>
                        <div style={{width: '500px'}}>
                            <form align="center">
                                <div className="form-group">
                                    <label htmlFor="na,e">Group ID:</label>
                                    <input type="text" className="form-control" value={groupIdU} id="groupID" placeholder="Enter Group ID"
                                           onChange={(e) => {
                                               setgroupIDU(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Document Mark:</label>
                                    <input type="text" className="form-control" id="mark1" value={markU} placeholder="Enter Mark"
                                           onChange={(e) => {
                                               setmarkU(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Feedback:</label>
                                    <input type="text" className="form-control" id="feedback1" value={feedbackU}
                                           placeholder="Enter Feedback"
                                           onChange={(e) => {
                                            setFeedbackU(e.target.value)
                                           }}/>
                                </div>
                                <br></br>
                                <button type="button" onClick={update} className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
            </div>
 
<div className={'row'}>
 <div style={{width: '900px'}}>
    <h1>View Feedback</h1>
    <table className="table table-striped" style={{marginTop: '40px'}}>
        <thead>
        <tr>
            <th scope="col" width="5%">#</th>
            <th scope="col" width="10%">Group ID</th>
            <th scope="col" width="10%">Document Mark</th>
            <th scope="col" width="10%">Feedback</th>
            <th scope="col" width="10%">Delete</th>
        </tr>
        </thead>
        <tbody>
        {
            feedback && feedback.map((feedback, key) => {
                return <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{feedback.groupId}</td>
                    <td>{feedback.documentMark}</td>
                    <td>{feedback.documentFeedback}</td>
                    <td><button onClick={()=>getFields(feedback)} >Update</button></td>
                    <td><button onClick={()=>deleteByID(feedback._evaluationId)} >Delete</button></td>
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
