import React, {useEffect, useState} from "react";

export const EvaluatePresentation = () => {
    const [marking, setMarking] = useState(null);
    const [criteria, setCriteria] = useState("");
    const [_evaluationId, setId] = useState("");
    const [presentationMark, setMarks] = useState("");
    const [presentationFeedback, setFeedback] = useState("");



    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/panel_member/viewMarking', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                setMarking(data);
            });
    });

    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                presentationMark:presentationMark,
                presentationFeedback:presentationFeedback
            })
        };
        fetch('http://localhost:9000/rpmt/panel_member/addPresentationMarking',requestOptions)
    }

    return (
        <div className={'row'}>
            <div className={'col-6'} style={{verticalAlign: "baseline"}}>
                <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                    Feedback
                </div>
                <div className={'col-6'}>
                    <div style={{width: '600px'}}>
                        <form  align="center">
                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor="na,e">Student Group:</label>*/}
                            {/*    <input type="text"  className="form-control" id="name"  placeholder="Enter name" onChange={(e)=>{setName(e.target.value)}}/>*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <label htmlFor="na,e">Presentation Mark:</label>
                                <input type="text"  className="form-control" id="mark"  placeholder="Enter Mark" onChange={(e)=>{setMarks(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="na,e">Feedback:</label>
                                <input type="text"  className="form-control" id="feedback"  placeholder="Enter Feedback" onChange={(e)=>{setFeedback(e.target.value)}}/>
                            </div>

                            <button type="button" onClick={add}  className="btn btn-primary" >Add</button>
                        </form>
                    </div>

                </div>

            </div>

            <div className={'col-6'}>
                <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                    Marking
                </div>
                <div className={'col-6'}>
                    <div style={{width: '600px'}}>
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
    );


}
