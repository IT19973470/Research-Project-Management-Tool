import React from "react";
import {useNavigate} from "react-router-dom";

const prefix = '/panel_member';

export const NavPanelMember = () => {
    let navigate = useNavigate();

    return(
        <div className='navS' style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px', marginTop: '0px'}}>
            <div onClick={() => {
                navigate(prefix + '/view_topics')
            }}>View Topics
            </div>
            <div onClick={() => {
                navigate(prefix + '/evaluate_presentations')
            }}>Evaluate Presentations
            </div>
            <div onClick={() => {
                navigate(prefix + '/view_feedback')
            }}>View Feedback
            </div>
        </div>
    );
}

