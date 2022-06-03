import React, {useEffect, useState} from "react";

export const EvaluatePresentation = () => {
    const [marking, setMarking] = useState(null);
    const [criteria, setCriteria] = useState("");
    const [marks, setMarks] = useState("");


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
    })

    return (
        <div className={'row'}>
            <div className={'col-6'} style={{verticalAlign: "baseline"}}>
                <div className={'col-6'} style={{fontSize: '45px', textAlign: 'center'}}>
                    Feedback
                </div>
                <div className={'col-6'}>
                    <div style={{width: '600px'}}>
                        <table className="table table-striped" style={{marginTop: '40px'}}>
                            <thead>
                            <tr>
                                <th scope="col" width="5%">#</th>
                                <th scope="col" width="20%">Group ID</th>
                                <th scope="col" width="20%">Presentation</th>
                                <th scope="col" width="20%">Feedback</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
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
