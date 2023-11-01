import React from 'react'
import { getCurrentUserInfo } from '../../services/auth'
import { Navigate, Outlet } from 'react-router-dom';

function TeacherGuard() {

    const user = getCurrentUserInfo();
    let isTeacher = false;

    const hasTeacherRole = user.roles.some((roleObject) => roleObject.role === "ROLE_TEACHER");
    if (hasTeacherRole) {
        isTeacher = true;
    } else {
        isTeacher = false;
    }

    return isTeacher ? <Outlet></Outlet> : <Navigate to="/you-are-not-a-teacher" ></Navigate>
}

export default TeacherGuard