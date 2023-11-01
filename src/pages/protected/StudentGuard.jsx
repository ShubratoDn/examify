import React from 'react'
import { getCurrentUserInfo } from '../../services/auth'
import { Navigate, Outlet } from 'react-router-dom';

function StudentGuard() {

    const user = getCurrentUserInfo();
    let isStudent = false;

    const hasStudentRole = user.roles.some((roleObject) => roleObject.role === "ROLE_STUDENT");
    if (hasStudentRole) {
        isStudent = true;
    } else {
        isStudent = false;
    }

    return isStudent ? <Outlet></Outlet> : <Navigate to="/ds" ></Navigate>
}

export default StudentGuard