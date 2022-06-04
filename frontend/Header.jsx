import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Header.css';
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faBars,faInfo} from '@fortawesome/free-solid-svg-icons'
export const Header = () => {
    let navigate = useNavigate();
    return (

        <div className="row">
                {/*<div className="col-12 navHeader2">*/}
                    {/*<div className="row" style={{padding: '5px'}}>*/}
                        {/*<div className="row" style={{*/}
                            {/*fontWeight: 'bold',*/}
                            {/*fontSize: '10px',*/}
                            {/*marginLeft: '20px',*/}
                            {/*color: '#e0ddd8',*/}
                            {/*textAlign: 'center'*/}
                        {/*}}>*/}
                            {/*<div className="col-3" >Research Project Management Tool</div>*/}
                            {/*<div className="col-3"><FontAwesomeIcon icon={faHome} /><br/> Home</div>*/}
                            {/*<div className="col-3"> <FontAwesomeIcon icon={faBars} /><br/>Menu</div>*/}
                            {/*<div className="col-3"> <FontAwesomeIcon icon={faInfo} /><br/>Info</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

            <div className="col-12 navHeader">
                <div className="row" style={{padding: '10px'}}>
                    <div className="col-8" style={{display: 'flex'}}>
                        <div style={{marginTop: '20px'}}>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    marginLeft: '20px',
                                    color: '#e0ddd8',
                                    textAlign: 'center'
                                }}>
                                Research Project Management Tool
                            </div>
                            {/*<div*/}
                            {/*style={{fontWeight: 'normal', marginLeft: '20px', fontSize: '20px', color: '#e0ddd8'}}>*/}
                            {/*Login*/}
                            {/*</div>*/}
                        </div>
                        {/*<div style={{marginLeft: '80px', marginTop: '22px', color: '#e0ddd8', fontSize: '20px'}}>*/}
                            {/*<span*/}
                                {/*style={{border: '2px solid #e0ddd8', padding: '5px 10px', borderRadius: '10px'}}>*/}
                                    {/*Login*/}
                            {/*</span>*/}
                        {/*</div>*/}
                    </div>
                    <div className="col-4" style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div style={{marginTop: '14px'}}>
                            <div
                                style={{
                                    paddingRight: '5px',
                                    paddingTop: '5px',
                                    fontWeight: 'bold',
                                    color: '#794903',
                                    fontSize: '16px'
                                }}>
                            </div>
                            <div
                                className="alignLeft"
                                style={{
                                    paddingRight: '5px',
                                    paddingTop: '5px',
                                    fontWeight: 'bold',
                                    color: '#b6effb',
                                    fontSize: '16px'
                                }}
                                onClick={() => {
                                    navigate('/sign_up');
                                }}>
                                Create Account |
                            </div>

                            <div
                                className="alignLeft"
                                style={{
                                    paddingTop: '5px',
                                    paddingRight: '10px',
                                    fontWeight: 'bold',
                                    color: '#b6effb',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    navigate('/');
                                    localStorage.clear()
                                }}>
                                Logout
                            </div>
                            <div className="alignLeft" style={{marginLeft: '10px'}}>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

// export default Header;