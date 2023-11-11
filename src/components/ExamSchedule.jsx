import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as YUP from 'yup';

const ExamSchedule = ({ addExamScheduleSubmit, handleExamScheduleSubmit }) => {
    const formik = useFormik({
        initialValues: {
            examDuration: '',
            examStartTime: '',
        },
        validationSchema: YUP.object({

            examDuration: YUP.number()
                .required('Exam Duration is required')
                .integer('Exam Duration must be an integer')
                .min(5, 'Exam Duration must be at least 5 minutes'),
            examStartTime: YUP.string()
                .required('Exam Start Time is required')
                .test('futureTime', 'Exam Start Time must be in the future', (value) => {
                    const selectedTime = new Date(value).getTime();
                    const currentTime = new Date().getTime();
                    return selectedTime > currentTime;
                }),
        }),
        onSubmit: (values) => {
            // Handle form submission here

            handleExamScheduleSubmit(true);
            console.log('Form submitted with values:', values);
        },
    });


    useEffect(() => {
        if (addExamScheduleSubmit != 1) {
            formik.handleSubmit();
        }
    }, [addExamScheduleSubmit])



    return (
        <div className="exam-schedule-page-container">
            <h1>Schedule the Exam</h1>

            <form onSubmit={formik.handleSubmit}>
                <div className="input-group">
                    <label htmlFor="examDuration">Exam duration <span className='text-danger'>(in minute)</span></label>
                    <div className="d-flex">
                        <input
                            type="number"
                            id="examDuration"
                            name="examDuration"
                            value={formik.values.examDuration}
                            onChange={formik.handleChange}
                            className={formik.touched.examDuration && formik.errors.examDuration && 'invalid-input'}
                        />
                        <div class="input-group-append">
                            <span class="input-group-text pe-5" id="basic-addon2">minute &nbsp;</span>
                        </div>
                    </div>
                    {formik.touched.examDuration && formik.errors.examDuration && (
                        <div className="invalid-message">{formik.errors.examDuration}</div>
                    )}
                </div>

                <div className="input-group">
                    <label htmlFor="examStartTime">Exam Start Time <span className='text-danger'>*</span></label>
                    <input
                        type="datetime-local"
                        id="examStartTime"
                        name="examStartTime"
                        value={formik.values.examStartTime}
                        onChange={formik.handleChange}
                        className={formik.touched.examStartTime && formik.errors.examStartTime && 'invalid-input'}
                    />
                    {formik.touched.examStartTime && formik.errors.examStartTime && (
                        <div className="invalid-message">{formik.errors.examStartTime}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-success mt-3">Schedule Exam</button>
            </form>
        </div>
    );
};

export default ExamSchedule;
