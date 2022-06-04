import React from "react";
import {useNavigate} from "react-router-dom";
import {App} from "./app";
import {NavSupervisor} from "./src/supervisor/NavSupervisor";
import 'bootstrap/dist/css/bootstrap.min.css';

export const ContentSup = () => {
    let navigate = useNavigate();
    let content;

    if(localStorage.getItem('user') !== null){
        content =
            <div style={{display: 'flex'}}>
                <div style={{width: '250px'}}>
                    <NavSupervisor/>
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
