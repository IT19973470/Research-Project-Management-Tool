import React from 'react';
import {Common} from "./../commons/Common";
// import ProtoTypes from 'prop-types'

const Progress =({percentage})=>{
    return(
        <div className='progress'>
            <div className='progress-bar progress-bar-striped bg-success'
                 role="progressbar"
                 style={{width:`${percentage}%`}}>
                {percentage}%
            </div>
        </div>
    )
}
// Progress.ProtoTypes={
//     percentage:ProtoTypes.number.isRequired
// }
export default Progress