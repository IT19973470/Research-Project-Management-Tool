import React from "react";
import {useNavigate} from "react-router-dom";
import {Common} from "./../commons/Common";

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
            }}>View Presentation Feedback
            </div>
            <div onClick={() => {
                navigate(prefix + '/view_topic_feedback')
            }}>View Topic Feedback
            </div>
            <div onClick={() => {
                navigate(prefix + '/panel_member_register')
            }}>Panel Member Register
            </div>
        </div>
    );
}

