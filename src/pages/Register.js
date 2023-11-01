import React, { useEffect, useState } from 'react'
import logo from "../assets/img/logo.png"
import { useFormik } from 'formik'
import * as YUP from 'yup'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { userSignUp } from '../services/userServices'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            role: "",
            image: "",
            about: "",
            password: "",
            confirmPassword: ""

        },
        validationSchema: YUP.object({
            name: YUP.string()
                .required("Name is required")
                .min(3, "Name should be at least 3 characters"),
            email: YUP.string()
                .required("Email is required")
                .email("Invalid email format"),
            role: YUP.string()
                .required("Role is required")
                .test('validRole', 'Role must be "Teacher" or "Student"', (value) => {
                    return ['teacher', 'student'].includes(value.toLowerCase());
                }),
            password: YUP.string()
                .required("Password is required")
                .min(4, "Password should be at least 4 characters"),
            confirmPassword: YUP.string()
                .required("Confirm your password")
                .oneOf([YUP.ref("password"), null], "Passwords must match"),
            about: YUP.string()
                .notRequired() // Make the field optional
                .min(10, "About should be at least 10 characters"),
            image: YUP.mixed()
                .required("Image is required")
                .test('fileSize', 'File size is too large. Maximum size is 5MB', (value) => {
                    return value ? value.size <= 5000000 : true;
                })
                .test('fileType', 'Invalid file type. Supported formats: JPEG, PNG, GIF', (value) => {
                    return value ? ['image/jpeg', 'image/png', 'image/gif'].includes(value.type) : true;
                })


        }),
        onSubmit: (values, { resetForm }) => {
            console.log("Form submitted")
            setLoading(true);

            userSignUp(values)
                .then(resp=>{
                    //success register
                    
                    toast.success('🦄Register Success!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                    resetForm({ values: "" })

                    navigate("/login")
                })
                .catch(err=>{
                    console.log(err)
                    if (err.code === 'ERR_NETWORK') {
                        // handle connection refused error
                        console.log('Connection refused error');
                        toast.error('Network error!! Failed to connect with server. \n Contact with Shubrato', {
                            position: "bottom-center",
                            theme: "dark",
                        });

                        return;
                    }

                    console.log(err)
                    let keys = Object.keys(err.response.data)
                    console.log(err.response.data[keys])

                    toast.error(err.response.data[keys], {
                        position: "bottom-center",
                        theme: "dark",
                    });
                })
                .finally(()=>{                    
                    //eta kaj korbei
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                })


        }
    })

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            formik.setFieldValue(e.target.name, e.target.files[0]);
        } else {
            formik.handleChange(e);
        }
        //                                    [] eta diye bujhay j Name field ta bar bar change hobe      
        formik.setTouched({ ...formik.touched, [e.target.name]: true });
    }


    //1 key press Slow kaj kortechilo tai
    // UseEffect to manually trigger the validation after the user enters a new value
    useEffect(() => {
        if (Object.keys(formik.touched).length > 0) {
            formik.validateForm();
        }
    }, [formik.touched]);




    return (
        <div className='registerPage'>
            <div className="register-body border col-lg-4 m-auto mx-auto rounded-3 p-3">
                <img src={logo} alt="Logo" className='loginpage-logo' />
                <p>Register to Examify</p>
                <form onSubmit={formik.handleSubmit} className='position-relative'>
                    {/* loader */}
                    {isLoading ? <div className="loading"></div>  : <div></div>}
                    <div className="input-group">
                        <label htmlFor="fullname">Your full name <span className='text-danger'>*</span></label>
                        <input id='fullname' name='name' value={formik.values.name} onChange={handleChange} type="text" className={formik.touched.name && formik.errors.name && "invalid-input"} />
                        {formik.touched.name && formik.errors.name && <div className='invalid-message'>{formik.errors.name}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Email address <span className='text-danger'>*</span></label>
                        <input id='username' type="email" name='email' onChange={handleChange} value={formik.values.email} className={formik.touched.email && formik.errors.email && "invalid-input"} />
                        {formik.touched.email && formik.errors.email && <div className='invalid-message'>{formik.errors.email}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Select your role <span className='text-danger'>*</span></label>
                        <select name="role" id="role" value={formik.values.role} onChange={handleChange} className={formik.touched.role && formik.errors.role && "invalid-input"}>
                            <option value="">--Select Role--</option>
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                        </select>
                        {formik.touched.role && formik.errors.role && <div className='invalid-message'>{formik.errors.role}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Your image <span className='text-danger'>*</span></label>
                        {/* value={formik.values.image} */}
                        <input type="file" name='image' id='image' onChange={handleChange} className={formik.touched.image && formik.errors.image && "invalid-input"} />
                        {formik.touched.image && formik.errors.image && <div className='invalid-message'>{formik.errors.image}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="about">About yourself <span className='text-muted'>(optional)</span></label>
                        <textarea name="about" value={formik.values.about} onChange={handleChange} id="about" className={formik.touched.about && formik.errors.about && "invalid-input"}></textarea>
                        {formik.touched.about && formik.errors.about && <div className='invalid-message'>{formik.errors.about}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password <span className='text-danger'>*</span></label>
                        <input type="password" name='password' value={formik.values.password} onChange={handleChange} id='password' className={formik.touched.password && formik.errors.password && "invalid-input"} />
                        {formik.touched.password && formik.errors.password && <div className='invalid-message'>{formik.errors.password}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="cpassword">Confirm password <span className='text-danger'>*</span></label>
                        <input type="password" name='confirmPassword' value={formik.values.confirmPassword} onChange={handleChange} id='cpassword' className={formik.touched.confirmPassword && formik.errors.confirmPassword && "invalid-input"} />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className='invalid-message'>{formik.errors.confirmPassword}</div>}
                    </div>

                    <input type="submit" value="Register" className='btn btn-sm btn-success w-100 my-4' />
                </form>


                <div className='form-extra'>
                    <p>Already have an account? <Link className='text-decoration-none' to={"/login"}>Sign in here</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Register