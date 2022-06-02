import React from "react";
import {useNavigate} from "react-router-dom";

const prefix = '/supervisor';

export const NavSupervisor = () => {
    let navigate = useNavigate();

    return(
        <div className='navS' style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px', marginTop: '0px'}}>
            <div onClick={() => {
                navigate(prefix + '/view_topics')
            }}>View Topics
            </div>
        </div>
    );
}

