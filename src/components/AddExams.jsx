import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TeacherDashboard from '../dashboard/TeacherDashboard';

import userImageDemo from "../../../assets/img/user.png"
import ExamInformation from '../../../components/ExamInformation';
import { useRef } from 'react';
import { useState } from 'react';

const steps = ['Exam information', 'Add Questions', 'Exam schedule'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [formValues, setFormValues] = React.useState({}); // Store form values

    const [examInformationSubmit, setExamInformationSubmit] = useState(1);


    const examInformationRef = useRef();
    const callChildValidation = () => {
        // examInformationRef.current.validateForm();
        setExamInformationSubmit(prevActiveStep=> prevActiveStep + 1)
    }

    const handleValidation = () => {
        alert();
        // Handle any additional actions or state updates if needed
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const isStepOptional = (step) => {
        return step === -1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <TeacherDashboard>
            <div className="component-container">
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step className='my-5' key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <>
                        {/* Render input fields for the first step */}
                        {activeStep === 0 && (
                            // ====================================
                            // EXAM INFORMATION TAB
                            // ====================================
                            <div>
                                

                                <div>
                                    <button onClick={callChildValidation}>Validate in Child</button>
                                    <ExamInformation
                                        initialValues={formValues}
                                        submit={examInformationSubmit}
                                        setFormValues={(values) => setFormValues(values)}
                                        handleValidation={handleValidation}
                                        ref={examInformationRef}
                                    />
                                </div>





                                <div className="input-group">
                                    <label htmlFor="title">Exam title here <span className='text-danger'>*</span></label>
                                    <input id='title' name='title' type='text' />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="category">Exam category <span className='text-danger'>*</span></label>
                                    <input id='category' name='category' type='text' />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="description">Describe the exam <span className='text-muted'>(optional)</span></label>
                                    <textarea name="description" id="description"></textarea>

                                </div>
                                <div className="input-group">
                                    <label htmlFor="type">Exam type <span className='text-danger'>*</span></label>
                                    <select name="type" id="type">
                                        <option value="">--Select Exam Type--</option>
                                        <option value="public">Public</option>
                                        <option value="public">Private</option>
                                        <option value="public">Specified</option>
                                    </select>
                                </div>

                                {/* Student search */}
                                <div className='border p-3'>
                                    <p>Select Students</p>
                                    <div className="input-group">
                                        <input type="search" id="search_student" placeholder='Search student by name or id' />
                                    </div>
                                    <div id='search-student-list' className='row'>
                                        <div className="student-search-result col-lg-4 ">
                                            <input type="checkbox" name="studentList[]" id="10" />
                                            <label htmlFor="10"> <img src={userImageDemo} alt="" /> Shubrato Debnah</label>
                                        </div>
                                        <div className="student-search-result col-lg-4 ">
                                            <input type="checkbox" name="studentList[]" id="11" />
                                            <label htmlFor="11"> <img src={userImageDemo} alt="" /> Akash Barman</label>
                                        </div>
                                        <div className="student-search-result col-lg-4 ">
                                            <input type="checkbox" name="studentList[]" id="12" />
                                            <label htmlFor="12"> <img src={userImageDemo} alt="" /> Sourav Rathore</label>
                                        </div>
                                        <div className="student-search-result col-lg-4 ">
                                            <input type="checkbox" name="studentList[]" id="13" />
                                            <label htmlFor="13"> <img src={userImageDemo} alt="" /> Bikram Shen</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}



                        {/* Render input fields for the first step */}
                        {activeStep === 1 && (
                            <div className='add-question-component'>
                                <h5>Add Questions</h5>

                                {/* all questions container */}
                                <div className="all-question-container">


                                </div>


                                {/* add button group */}
                                <div className='add-button-group'>
                                    <div className="input-group">
                                        <label htmlFor="addMcq">Add MCQ</label>
                                        <div className='d-flex'>
                                            <input type="text" />
                                            <button className="btn btn-sm btn-outline-success">Add</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="input-group">
                                        <label htmlFor="addMcq">Add SAQ</label>
                                        <div className='d-flex'>
                                            <input type="text" />
                                            <button className="btn btn-sm btn-outline-success">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeStep === 2 && (
                            <div>
                                This is the schedule page
                            </div>
                        )}

                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}

                                {
                                    activeStep === steps.length - 1 ? <input type='submit' value={"Add exam"} /> : (
                                        <Button onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? "" : 'Next'}
                                        </Button>)
                                }
                            </Box>
                        </React.Fragment>
                    </>




                </Box>
            </div>
        </TeacherDashboard>
    );
}
