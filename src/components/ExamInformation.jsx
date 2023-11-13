import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify'
import * as Yup from 'yup';
import userImageDemo from "../assets/img/user.png"
import { addExamInformation } from '../services/examServices';
import { useNavigate } from 'react-router-dom';
import { getStudentsByName } from '../services/userService';
import { BASE_URL } from '../utils/constants';


const ExamInformation = ({ examInformationSubmit, handelExamInformationSubmit }) => {

    const navigate = useNavigate();

    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [examInfo, setExamInfo] = useState(null);
    

    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            description: '',
            type: '',
            selectedStudents: studentList, // To store selected students
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required')
                .min(3, 'Title should be at least 3 characters'),
            category: Yup.string()
                .required('Category is required'),
            description: Yup.string()
                .notRequired()
                .min(10, 'Description should be at least 10 characters'),
            type: Yup.string()
                .required('Exam type is required'),
            selectedStudents: Yup.array()
                .when('type', {
                    is: 'Specified',
                    then: Yup.array()
                        .required('At least one student must be selected')
                        .min(1, 'At least one student must be selected'),
                }),
        }),
        onSubmit: (values) => {
            addExamInformation(values).then((resp) => {                
                setExamInfo(resp.data);
                handelExamInformationSubmit(true);
                toast.success('Exam information added successfully', {
                    position: "bottom-center",
                    theme: "dark",
                });


            }).catch(err => {
                //if user's token is expired
                if (err.response.data.errorType === "TokenExpired") {
                    toast.error('Your token has been expired! Please, login again.', {
                        position: "bottom-center",
                        theme: "dark",
                        autoClose: 5000
                    });

                    navigate("/logout")
                    return;
                }

                if (err.response.data.messageType === "type"){
                    toast.error(err.response.data.message, {
                        position: "bottom-center",
                        theme: "dark",
                    });
                }
            })
        },
    });

    useEffect(() => {
        if (examInformationSubmit !== 1) {
            formik.handleSubmit();
        }
    }, [examInformationSubmit])


    //1 key press Slow kaj kortechilo tai
    useEffect(() => {
        if (Object.keys(formik.touched).length > 0) {
            formik.validateForm();
        }
    }, [formik.touched]);




    //search input text
    const [searchInput, setSearchInput] = useState("");
    const handleSearchTextChange = async (e) => {
        setSearchInput(e.target.value);
        getStudentsByName(e.target.value)
            .then(resp => {
                setStudentList(resp.data);
            })
            .catch((err) => {
                console.error(err)
            });

    };

    // change starts
    const handleCheckboxChange = (student) => {
        const selectedStudents = formik.values.selectedStudents.includes(student)
            ? formik.values.selectedStudents.filter((s) => s.id !== student.id)
            : [...formik.values.selectedStudents, student];

        formik.setFieldValue('selectedStudents', selectedStudents);
    };


    const renderSelectedStudents = () => {
        return formik.values.selectedStudents.map((student) => (
            <div key={student.id} className="selected-student student-search-result col-lg-4">
                <input
                    type="checkbox"
                    id={`SELECTED_${student.id}`}
                    checked={true}
                    onChange={() => handleCheckboxChange(student)}
                />
                <label htmlFor={`SELECTED_${student.id}`}>
                    {' '}
                    <img src={BASE_URL + "UserImages/" + student.image} alt="" /> {student.name}
                </label>
            </div>
        ));
    };



    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="input-group">
                <label htmlFor="title">Exam title here <span className='text-danger'>*</span></label>
                <input
                    id='title'
                    name='title'
                    type='text'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className={formik.touched.title && formik.errors.title && 'invalid-input'}
                />
                {formik.touched.title && formik.errors.title && (
                    <div className='invalid-message'>{formik.errors.title}</div>
                )}
            </div>
            <div className="input-group">
                <label htmlFor="category">Exam category <span className='text-danger'>*</span></label>
                <input
                    autoComplete='off'
                    id='category'
                    name='category'
                    type='text'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    className={formik.touched.category && formik.errors.category && 'invalid-input'}
                />
                {formik.touched.category && formik.errors.category && (
                    <div className='invalid-message'>{formik.errors.category}</div>
                )}
            </div>
            <div className="input-group">
                <label htmlFor="description">Describe the exam <span className='text-muted'>(optional)</span></label>
                <textarea
                    name='description'
                    id='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className={formik.touched.description && formik.errors.description && 'invalid-input'}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                    <div className='invalid-message'>{formik.errors.description}</div>
                )}
            </div>
            <div className="input-group">
                <label htmlFor="type">Exam type <span className='text-danger'>*</span></label>
                <select
                    name='type'
                    id='type'
                    value={formik.values.type}
                    onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldValue('selectedStudents', []); // Reset selected students when changing the type
                    }}
                    className={formik.touched.type && formik.errors.type && 'invalid-input'}
                >
                    <option value="">--Select Exam Type--</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="specified">Specified</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                    <div className='invalid-message'>{formik.errors.type}</div>
                )}
            </div>

            {/* Only display select-student container if type is 'Specified' */}
            {formik.values.type === 'specified' && (
                <div className="border p-3" id="select-student">
                    <p>Select Students</p>
                    <div className="input-group">
                        <input
                            autoComplete='off'
                            type="search"
                            id="search_student"
                            placeholder="Search student by name or id"
                            value={searchInput}
                            onChange={handleSearchTextChange}
                        />
                    </div>
                    <div id="search-student-list" className="row">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            studentList.map((student) => (
                                <div key={student.id} className="student-search-result col-lg-4">
                                    <input
                                        type="checkbox"
                                        id={student.id}
                                        checked={formik.values.selectedStudents.some((s) => s.id === student.id)}
                                        onChange={() => handleCheckboxChange(student)}
                                    />
                                    <label htmlFor={student.id}>
                                        {' '}
                                        <img src={BASE_URL + "UserImages/" + student.image} alt="" /> {student.name}
                                    </label>
                                </div>
                            ))
                        )}
                    </div>
                    {formik.touched.selectedStudents && formik.errors.selectedStudents && (
                        <div className="invalid-message">{formik.errors.selectedStudents}</div>
                    )}

                    {/* Display selected students */}
                    <div id="selected-students">
                        <p className='fw-bolder'>Selected students:</p> <br></br>
                        <div className="row">
                            {renderSelectedStudents()}
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}

export default ExamInformation;
