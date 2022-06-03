import React, {useEffect, useState} from "react";

export const EvaluateDocument = () => {
    
    const [documentMark, setMarks] = useState("");
    const [documentFeedback, setFeedback] = useState("");

    function add(){
        const requestOptions ={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                documentationMark:documentMark,
                presentationFeedback:documentFeedback
            })
        };
        fetch('http://localhost:9000/rpmt/supervisor/evaluate_document',requestOptions)
    }

    return (
        <div className={'row'}>
            <div className={'col-6'} style={{verticalAlign: "baseline"}}>
                <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                    Group Evaluation
                </div>
                <div className={'col-6'}>
                    <div style={{width: '600px'}}>
                        <form  align="center">
                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor="na,e">Student Group:</label>*/}
                            {/*    <input type="text"  className="form-control" id="name"  placeholder="Enter name" onChange={(e)=>{setName(e.target.value)}}/>*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <label htmlFor="na,e">Document Mark:</label>
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
        </div>
    );


}
