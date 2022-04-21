import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function Login() {
    return (
        <div className="row">
            {/*<div className="col-12" style={{fontSize: '45px', textAlign: 'center'}}>*/}
                {/*Research Project Management Tool*/}
            {/*</div>*/}
            <div className="col-12">
                <div style={{
                    width: '100%',
                    height: '50px',
                    marginTop: '100px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{width: '500px'}}>
                        <div style={{display: 'flex'}}>
                            <span style={{marginRight: '30px'}}>Username</span>
                            <span style={{width: '100%'}}>
                            <input type="text" className="form-control"/>
                        </span>
                        </div>
                        <div style={{display: 'flex', marginTop: '15px'}}>
                            <span style={{marginRight: '35px'}}>Password</span>
                            <span style={{width: '100%'}}>
                            <input type="password" className="form-control"/>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;