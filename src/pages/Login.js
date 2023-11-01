import React, { useEffect, useState } from 'react'
import logo from "../assets/img/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as YUP from 'yup'
import { userLogin } from '../services/userServices';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { doLogin } from '../services/auth';

export default function Login() {

    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: YUP.object({
            username: YUP.string().required("Enter your user name").min(4, "Minimum 4 character"),
            password: YUP.string().required("Enter password please").min(4, "Minimum 4 character")
        }),
        onSubmit: (values, { resetForm }) => {

            setLoading(true);

            userLogin(values)
                .then((respData) => {
                    //after logged in success full
                    doLogin(respData, () => {
                        console.log("Logged in successfully ");
                        navigate("/")
                    })

                    setLoading(false);
                    toast.success("Logged In!")
                    resetForm({ values: "" });
                })
                .catch((err) => {
                    if (err.code === 'ERR_NETWORK') {
                        // handle connection refused error
                        toast.error('Network error!! Conenction hoise na', {
                            position: "bottom-center",
                            theme: "dark",
                        });
                        return;
                    }


                    toast.error(err.response.data.message, {
                        position: "bottom-center",
                        theme: "dark",
                    });
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000)
                })

        }
    })


    useEffect(() => {
        if (Object.keys(formik.touched).length > 0) {
            formik.validateForm();
        }
    }, [formik.touched]);



    const handleChange = (e) => {
        formik.handleChange(e);
        formik.setTouched({ ...formik.touched, [e.target.name]: true });
    }


    return (
        <div className='login-page' id='login-page'>
            <div className='login-body border p-3 col-lg-3 mx-auto rounded-3'>
                <img src={logo} alt="Logo" className='loginpage-logo' />
                <p>Signin to Examify</p>
                <form action="#" className='position-relative' onSubmit={formik.handleSubmit}>
                    {isLoading ? <div className="loading"></div> : <div></div>}
                    <div className='input-group'>
                        <label htmlFor="username">Username or email address</label>
                        <input id='username' name='username' value={formik.values.username} onChange={handleChange} type="text" className={formik.touched.username && formik.errors.username && "invalid-input"} />
                        {formik.touched.username && formik.errors.username && <div className='invalid-message'>{formik.errors.username}</div>}

                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' value={formik.values.password} onChange={handleChange} id='password' className={formik.touched.password && formik.errors.password && "invalid-input"} />
                        {formik.touched.password && formik.errors.password && <div className='invalid-message'>{formik.errors.password}</div>}
                    </div>
                    <a href="#" className='text-small'>Forgot Password?</a>
                    <input type="submit" value="Sign in" className='btn btn-sm btn-success w-100 mt-4' />
                </form>

                <div className='form-extra'>
                    <p>New in Examify? <Link to={"/register"} className='text-decoration-none'>Create an account</Link></p>
                </div>
            </div>
        </div>
    )
}
