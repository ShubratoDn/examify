import React, { useState } from 'react';

import { isUserLoggedIn } from '../../services/auth';
import { Navigate, Outlet } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useMountedEffect } from '../../components/useMountedEffect';

function ProtectedGate() {

    const isLoggedIn = isUserLoggedIn();

    // const checkLoginStatus = () => {
    //     if (!isLoggedIn) {
    //         toast.error("You need to logged in first", {
    //             position: "bottom-center",
    //             theme: "dark",
    //         });
    //     }
    // };

    // useMountedEffect(checkLoginStatus());

    return isLoggedIn ? <Outlet></Outlet> : <Navigate to={"/login"}></Navigate>;
}

export default ProtectedGate
