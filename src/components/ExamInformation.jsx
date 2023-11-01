import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userImageDemo from "../assets/img/user.png"


const ExamInformation = ({ examInformationSubmit, handelExamInformationSubmit }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            description: '',
            type: '',
            selectedStudents: [], // To store selected students
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
            // Handle form submission here
            handelExamInformationSubmit(true);
        },
    });



    useEffect(() => {
        if (examInformationSubmit != 1) {
            // formik.handleSubmit();
            handelExamInformationSubmit(true);
        }
    }, [examInformationSubmit])



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
                <div className='border p-3' id='select-student'>
                    <p>Select Students</p>
                    <div className="input-group">
                        <input type="search" id="search_student" placeholder='Search student by name or id' />
                    </div>
                    <div id='search-student-list' className='row'>
                        <div className="student-search-result col-lg-4 ">
                            <input type="checkbox" name="selectedStudents" id="10" value="10" />
                            <label htmlFor="10"> <img src={userImageDemo} alt="" /> Shubrato Debnah</label>
                        </div>
                        {/* ... (other student options) ... */}
                    </div>
                    {formik.touched.selectedStudents && formik.errors.selectedStudents && (
                        <div className='invalid-message'>{formik.errors.selectedStudents}</div>
                    )}
                </div>
            )}
        </form>
    );
}

export default ExamInformation;
