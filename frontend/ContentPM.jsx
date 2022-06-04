import React from "react";
import {useNavigate} from "react-router-dom";
import {App} from "./app";
import {NavPanelMember} from "./src/panel_member/NavPanelMember";

export const ContentPM = () => {
    let navigate = useNavigate();
    let content;

    if(localStorage.getItem('user') !== null){
        content =
            <div style={{display: 'flex'}}>
                <div style={{width: '250px'}}>
                    <NavPanelMember/>
                </div>
                <div style={{marginLeft: '200px'}}>
                    <App/>
                </div>
            </div>
    }else {
        content = <App/>
    }

    return(
        <div>
            {content}
        </div>
    );

}
