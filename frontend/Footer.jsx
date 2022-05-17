import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="row">
            <div className="col-12 navHeader">
                <div className="row" style={{padding: '10px'}}>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-10" style={{color: '#e0ddd8'}}>
                                <div style={{fontWeight: 'bold'}}>Contact Us</div>
                                <div style={{marginLeft: '40px', fontSize: '13px'}}>
                                    <div style={{marginTop: '10px'}}>
                                        Address&nbsp;&nbsp;|&nbsp;&nbsp;No:123, Abc Road, Colombo
                                    </div>
                                    <div style={{marginTop: '10px'}}>
                                        Email Address&nbsp;&nbsp;|&nbsp;&nbsp;abc@gmail.com
                                    </div>
                                    <div style={{marginTop: '10px'}}>
                                        Telephone&nbsp;&nbsp;|&nbsp;&nbsp;011-1234567
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div style={{fontWeight: 'bold'}}>Join Us</div>
                                <div style={{marginLeft: '40px', marginTop: '10px', fontSize: '14px'}}>
                                    Share your feedback
                                    <br/>
                                    <i className="fab fa-facebook-square"
                                       style={{fontSize: '30px', marginTop: '10px'}}></i>
                                    <i className="fab fa-instagram-square"
                                       style={{fontSize: '30px', marginTop: '10px', marginLeft: '10px'}}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer;