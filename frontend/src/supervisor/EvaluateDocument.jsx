import React, {useEffect, useState} from "react";

export const EvaluateDocument = () => {
    
    const [documentMark, setMarks] = useState("");
    const [documentFeedback, setDocumentFeedback] = useState("");
    const [groupId, setGroupId] = useState('');
    const [feedback, setFeedback] = useState('');
    const [_evaluationId, setEvaluationId] = useState('');
    
    useEffect(() => {
        viewFeedback();
    })

    function getFields(feedback) {
        console.log(feedback)
        setEvaluationId(feedback._evaluationId)
        setGroupId(feedback.groupId)
        setMarks(feedback.documentMark)
        setDocumentFeedback(feedback.documentFeedback)
    }

    function viewFeedback() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/supervisor/viewFeedback', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
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
        fetch('http://localhost:9000/rpmt/supervisor/evaluate_document',requestOptions)
    }

    function update(){
        const requestOptions ={
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                groupId: groupId,
                documentMark: documentMark,
                documentFeedback: documentFeedback
            })
        };
        console.log(feedback)
        fetch('http://localhost:9000/rpmt/supervisor/updateFeedback/'+ _evaluationId,requestOptions)
    }

    function deleteByID(did){
        const requestOptions ={
            method:'DELETE',
            headers:{'Content-Type':'application/json'},
        };
        console.log(feedback)
        fetch('http://localhost:9000/rpmt/supervisor/deleteById/'+did,requestOptions)
    }

    return (
        <div className={'row'}>
            <div className={'row'}>
            <div className={'col-6'} style={{verticalAlign: "baseline"}}>
                <div style={{height: '400px'}}>
                    <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                        Add Feedback
                    </div>
                    <div className={'col-6'}>
                        <div style={{width: '600px'}}>
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

                                <button type="button" onClick={add} className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

            <div className={'col-6'} style={{verticalAlign: "baseline"}}>
                <div style={{height: '400px'}}>
                    <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                        Update Feedback
                    </div>
                    <div className={'col-6'}>
                        <div style={{width: '600px'}}>
                            <form align="center">
                                <div className="form-group">
                                    <label htmlFor="na,e">Group ID:</label>
                                    <input type="text" className="form-control" value={groupId} id="groupID" placeholder="Enter Group ID"
                                           onChange={(e) => {
                                               setGroupId(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Document Mark:</label>
                                    <input type="text" className="form-control" id="mark1" value={documentMark} placeholder="Enter Mark"
                                           onChange={(e) => {
                                               setMarks(e.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="na,e">Feedback:</label>
                                    <input type="text" className="form-control" id="feedback1" value={documentFeedback}
                                           placeholder="Enter Feedback"
                                           onChange={(e) => {
                                            setDocumentFeedback(e.target.value)
                                           }}/>
                                </div>

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
            <th scope="col" width="10%">Update</th>
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
