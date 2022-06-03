import React, {useEffect, useState} from "react";

export const ViewFeedback = () => {

    const [feedback, setFeedback] = useState("");
    useEffect(() => {
        viewFeedback();
    })

    function viewFeedback() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://localhost:9000/rpmt/panel_member/viewFeedback', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setFeedback(data);
            })
        // console.log(studentGroup)
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
                            <th scope="col" width="10%">Group ID</th>
                            <th scope="col" width="10%">Presentation Mark</th>
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
                                    <td>{feedback.presentationMark}</td>
                                    <td>{feedback.presentationFeedback}</td>
                                    <td><button>Update</button></td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
        </div>
    );

}
