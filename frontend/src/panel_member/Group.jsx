import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import GroupDetails from "./GroupDetails";
import ViewTopics from "./ViewTopics";

export const Group = (getpost) => {
    let navigate = useNavigate();

    const [studentGroup, setStudentGroup] = React.useState(true)
    const {post}=getpost;

    return(
        <div>
            { studentGroup ? <ViewTopics /> : null }

    </div>

    );
}
