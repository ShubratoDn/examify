import React, { useEffect, useState } from 'react'
import { doLogout, isUserLoggedIn } from '../../services/auth';
import { Navigate } from 'react-router-dom';


import { toast } from 'react-toastify'

const Logout = () => {
    useEffect(() => {
        doLogout();
        // toast.success("Logged out successfully!", {
        //     position: "bottom-center",
        //     theme: "dark",
        // });
    }, []);

    return <Navigate to={"/login"}></Navigate>;
}

export default Logout