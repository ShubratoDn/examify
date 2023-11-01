import React, { useState } from 'react'
import { getCurrentUserInfo } from '../../services/auth'
import { Navigate } from 'react-router-dom';

function Home() {

    const [user, setUser] = useState(getCurrentUserInfo());

    let redirect = "";

    if (user.roles[0].role === "ROLE_TEACHER"){
        redirect = "/teacher/dashboard";
    } else if (user.roles[0].role === "ROLE_STUDENT"){
        redirect = "/student/dashboard";
    }

    return <Navigate to={redirect}></Navigate>
}

export default Home