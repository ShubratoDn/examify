import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TeacherDashboard from '../dashboard/TeacherDashboard';


import ExamInformation from '../../../components/ExamInformation';
import { useState } from 'react';
import AddQuestions from '../../../components/AddQuestions';
import { Navigate } from 'react-router-dom';
import ExamSchedule from '../../../components/ExamSchedule';

const steps = ['Exam information', 'Add Questions', 'Exam schedule'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

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




    // custom codes
    const [examInformationSubmit, setExamInformationSubmit] = useState(1);
    const handelExamInformationSubmit = (data) => {
        if (data === true) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    }


    const [addQuestionSubmit, setAddQuestionSubmit] = useState(1);
    const handleAddQuestionSubmit = (data) => {
        if (data === true) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    }


    const[addExamScheduleSubmit, setExamScheduleSubmit]  = useState(1);
    const handleExamScheduleSubmit = (data) =>{
        if(data === true){
            alert("Exam added")
        }
    }










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
                            <ExamInformation
                                examInformationSubmit={examInformationSubmit}
                                handelExamInformationSubmit={handelExamInformationSubmit}
                            />
                        )}



                        {/* Render input fields for the first step */}
                        {activeStep === 1 && (
                            // ====================================
                            // ADD QUESTION TAB
                            // ====================================
                            <AddQuestions
                                addQuestionSubmit={addQuestionSubmit}
                                handleAddQuestionSubmit={handleAddQuestionSubmit}
                            />
                        )}

                        {activeStep === 2 && (
                            <ExamSchedule
                                addExamScheduleSubmit={addExamScheduleSubmit}
                                handleExamScheduleSubmit={handleExamScheduleSubmit}
                            />
                        )}

                        <React.Fragment>
                            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                {(() => {
                                    switch (activeStep) {
                                        case 0:
                                            return (
                                                <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            );
                                        case 1:
                                            return (
                                                <Button
                                                    color="inherit"
                                                    sx={{ mr: 1 }}
                                                    onClick={() => { setActiveStep(0); setExamInformationSubmit(1) }}
                                                >
                                                    Back
                                                </Button>
                                            );
                                        case 2:
                                            return (
                                                <Button
                                                    color="inherit"
                                                    sx={{ mr: 1 }}
                                                    onClick={() => { setActiveStep(1); setAddQuestionSubmit(1) }}
                                                >
                                                    Back
                                                </Button>
                                            );
                                        default:
                                            return (<Navigate to={"/"}/>)
                                    }
                                })()}
                                {/* <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button> */}
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}

                                {/* Button mapping */}
                                {(() => {
                                    switch (activeStep) {
                                        case 0:
                                            return (
                                                <Button onClick={() => { setExamInformationSubmit(prev => prev + 1) }}>
                                                    Next
                                                </Button>
                                            );
                                        case 1:
                                            return (
                                                <Button onClick={() => { setAddQuestionSubmit(prev => prev + 1) }}>
                                                    {/* <Button onClick={() => { handleAddQuestionSubmit(true) }}> */}
                                                    Next
                                                </Button>
                                            );
                                        case 2:
                                            return (
                                                <Button onClick={ ()=>{setExamScheduleSubmit(prev=> prev+1)} }>
                                                    Complete
                                                </Button>
                                            );
                                        default:
                                            alert("error")
                                            return (
                                                <Button onClick={handleNext}>
                                                    Complete
                                                </Button>
                                            );
                                    }
                                })()}
                            </Box>
                        </React.Fragment>
                    </>




                </Box>
            </div>
        </TeacherDashboard>
    );
}
