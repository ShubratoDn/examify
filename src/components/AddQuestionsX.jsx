import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const AddQuestions = () => {
    const [questionsX, setQuestions] = useState([
        {
            type: 'MCQ',
            question: '',
            questionImage: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            correctMark: 1,
        },
        {
            type: 'SAQ',
            question: '',
            questionImage: '',
            answer: '',
            correctMark: 5,
        },
    ]);

    const [mcqValue, setMcqValue] = useState('1'); // Default value for Add MCQ
    const [saqValue, setSaqValue] = useState('1'); // Default value for Add SAQ

    // const handleAddQuestion = (type) => {
    //     const newQuestions = [];
    //     const numQuestions = type === 'MCQ' ? parseInt(mcqValue, 10) : parseInt(saqValue, 10);

    //     for (let i = 0; i < numQuestions; i++) {
    //         if (i === 20) {
    //             toast.error('You can add a maximum of 20 inputs at a time', {
    //                 position: 'bottom-center',
    //                 theme: 'dark',
    //             });
    //             break;
    //         }
    //         const newQuestion = type === 'MCQ'
    //             ? {
    //                 type: 'MCQ',
    //                 question: '',
    //                 questionImage: '',
    //                 options: ['', '', '', ''],
    //                 correctAnswer: '',
    //                 correctMark: 1,
    //             }
    //             : {
    //                 type: 'SAQ',
    //                 question: '',
    //                 questionImage: '',
    //                 answer: '',
    //                 correctMark: 5,
    //             };
    //         newQuestions.push(newQuestion);
    //     }

    //     setQuestions([...questionsX, ...newQuestions]);
    // };



    const handleAddQuestion = (type) => {
        const numQuestions = type === 'MCQ' ? parseInt(mcqValue, 10) : parseInt(saqValue, 10);

        const newQuestions = Array.from({ length: numQuestions }, (_, index) => {
            return type === 'MCQ'
                ? {
                    type: 'MCQ',
                    question: '',
                    questionImage: '',
                    options: ['', '', '', ''],
                    correctAnswer: '',
                    correctMark: 1,
                }
                : {
                    type: 'SAQ',
                    question: '',
                    questionImage: '',
                    answer: '',
                    correctMark: 5,
                };
        });

        setQuestions([...questionsX, ...newQuestions]);

        formik.setValues({
            ...formik.values,
            questions: [...formik.values.questions, ...newQuestions],
        });
    };



    const handleInputChange = (questionIndex, field, value) => {
        const updatedQuestions = [...questionsX];
        updatedQuestions[questionIndex][field] = value;
        setQuestions(updatedQuestions);
    };

    // const validationSchema = Yup.object().shape({
    //     questions: Yup.array().of(
    //         Yup.object().shape({
    //             type: Yup.string().required('Type is required'),
    //             question: Yup.string()
    //                 .when('type', {
    //                     is: (val) => val === 'MCQ' || val === 'SAQ',
    //                     then: Yup.string().required('Question is required'),
    //                 }),
    //             questionImage: Yup.mixed(),
    //             options: Yup.array().of(
    //                 Yup.string()
    //                     .when('type', {
    //                         is: 'MCQ',
    //                         then: Yup.string().required('Option is required'),
    //                     })
    //             ),
    //             correctAnswer: Yup.string()
    //                 .when('type', {
    //                     is: 'MCQ',
    //                     then: Yup.string().required('Correct Answer is required'),
    //                 }),
    //             correctMark: Yup.number()
    //                 .required('Correct Mark is required')
    //                 .min(1, 'Mark cannot be less than 1'),
    //             answer: Yup.string()
    //                 .when('type', {
    //                     is: 'SAQ',
    //                     then: Yup.string()
    //                         .required('Answer is required')
    //                         .min(5, 'Answer must be at least 5 characters'),
    //                 }),
    //         })
    //     ),
    // });

    const validationSchema = Yup.object().shape({
        questions: Yup.array().of(Yup.object().shape({
            type: Yup.string().required(),
            question: Yup.string().required(),
            questionImage: Yup.mixed().optional(),
            options: Yup.array().of(Yup.string().required()),
            correctAnswer: Yup.string().required(),
            correctMark: Yup.number().required(),
        })).required(),
    });


    const formik = useFormik({
        initialValues: {
            questions: questionsX,
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            // console.log(values);
            alert("submitted")
        },
    });

    return (
        <div className="add-question-component">
            <h5>Add Questions</h5>
            <form onSubmit={formik.handleSubmit}>
                <div className="all-question-container">
                    {formik.values.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className={`question-container ${question.type.toLowerCase()}-container`}>
                            <h5>#{question.type}</h5>
                            <div className="question d-flex align-items-center">
                                <div className="input-group w-75">
                                    <label>Enter the question <span className='text-danger'>*</span></label>
                                    <input
                                        type='text'
                                        name={`questions[${questionIndex}].question`}
                                        value={question.question}
                                        onChange={(e) => handleInputChange(questionIndex, 'question', e.target.value)}
                                        className={formik.touched.questions?.[questionIndex]?.question && formik.errors.questions?.[questionIndex]?.question && 'invalid-input'}
                                    />
                                    {formik.touched.questions?.[questionIndex]?.question && formik.errors.questions?.[questionIndex]?.question && (
                                        <div className='invalid-message'>{formik.errors.questions[questionIndex].question}</div>
                                    )}
                                </div>
                                <div className="input-group w-25 ps-3">
                                    <label>Choose image</label>
                                    <input
                                        type='file'
                                        name={`questions[${questionIndex}].questionImage`}
                                    />
                                </div>
                            </div>

                            {question.type === 'MCQ' && (
                                <div className="mcq-answer">
                                    <ol>
                                        {question.options.map((option, optionIndex) => (
                                            <li key={optionIndex}>
                                                <div className="input-group">
                                                    <input
                                                        type='text'
                                                        placeholder={`Write option ${String.fromCharCode(97 + optionIndex)}`}
                                                        name={`questions[${questionIndex}].options[${optionIndex}]`}
                                                        value={option}
                                                        onChange={(e) => {
                                                            const updatedQuestions = [...questionsX];
                                                            updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
                                                            setQuestions(updatedQuestions);
                                                        }}
                                                        className={formik.touched.questions?.[questionIndex]?.options?.[optionIndex] && formik.errors.questions?.[questionIndex]?.options?.[optionIndex] && 'invalid-input'}
                                                    />
                                                </div>
                                                {formik.touched.questions?.[questionIndex]?.options?.[optionIndex] && formik.errors.questions?.[questionIndex]?.options?.[optionIndex] && (
                                                    <div className='invalid-message'>{formik.errors.questions[questionIndex].options[optionIndex]}</div>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                    <div className='d-flex align-items-center'>
                                        <div className="input-group w-50">
                                            <label>Select Correct answer <span className='text-danger'>*</span></label>
                                            <select
                                                name={`questions[${questionIndex}].correctAnswer`}
                                                value={question.correctAnswer}
                                                onChange={(e) => handleInputChange(questionIndex, 'correctAnswer', e.target.value)}
                                                className={formik.touched.questions?.[questionIndex]?.correctAnswer && formik.errors.questions?.[questionIndex]?.correctAnswer && 'invalid-input'}
                                            >
                                                <option value="">-- Select Correct Option --</option>
                                                {question.options.map((option, optionIndex) => (
                                                    <option key={optionIndex} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            {formik.touched.questions?.[questionIndex]?.correctAnswer && formik.errors.questions?.[questionIndex]?.correctAnswer && (
                                                <div className='invalid-message'>{formik.errors.questions[questionIndex].correctAnswer}</div>
                                            )}
                                        </div>
                                        <div className="input-group w-25 ps-3">
                                            <label>Correct mark for this MCQ <span className='text-danger'>*</span></label>
                                            <input
                                                type="number"
                                                name={`questions[${questionIndex}].correctMark`}
                                                value={question.correctMark}
                                                onChange={(e) => handleInputChange(questionIndex, 'correctMark', e.target.value)}
                                                className={formik.touched.questions?.[questionIndex]?.correctMark && formik.errors.questions?.[questionIndex]?.correctMark && 'invalid-input'}
                                            />
                                            {formik.touched.questions?.[questionIndex]?.correctMark && formik.errors.questions?.[questionIndex]?.correctMark && (
                                                <div className='invalid-message'>{formik.errors.questions[questionIndex].correctMark}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {question.type === 'SAQ' && (
                                <div className="saq-answer d-flex">
                                    <div className="input-group w-75">
                                        <label htmlFor="">The question's answer</label>
                                        <textarea
                                            name={`questions[${questionIndex}].answer`}
                                            placeholder='Write your answer...'
                                            value={question.answer}
                                            onChange={(e) => handleInputChange(questionIndex, 'answer', e.target.value)}
                                            className={formik.touched.questions?.[questionIndex]?.answer && formik.errors.questions?.[questionIndex]?.answer && 'invalid-input'}
                                        />
                                        {formik.touched.questions?.[questionIndex]?.answer && formik.errors.questions?.[questionIndex]?.answer && (
                                            <div className='invalid-message'>{formik.errors.questions[questionIndex].answer}</div>
                                        )}
                                    </div>
                                    <div className="input-group w-25 ps-3">
                                        <label>Correct mark for this MCQ <span className='text-danger'>*</span></label>
                                        <input
                                            type="number"
                                            name={`questions[${questionIndex}].correctMark`}
                                            value={question.correctMark}
                                            onChange={(e) => handleInputChange(questionIndex, 'correctMark', e.target.value)}
                                            className={formik.touched.questions?.[questionIndex]?.correctMark && formik.errors.questions?.[questionIndex]?.correctMark && 'invalid-input'}
                                        />
                                        {formik.touched.questions?.[questionIndex]?.correctMark && formik.errors.questions?.[questionIndex]?.correctMark && (
                                            <div className='invalid-message'>{formik.errors.questions[questionIndex].correctMark}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add button group */}
                <div className='add-button-group'>
                    <div className="input-group">
                        <label>Add MCQ</label>
                        <div className='d-flex'>
                            <input
                                type="number"
                                value={mcqValue}
                                onChange={(e) => setMcqValue(e.target.value)}
                            />
                            <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handleAddQuestion('MCQ')}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="input-group">
                        <label>Add SAQ</label>
                        <div className='d-flex'>
                            <input
                                type="number"
                                value={saqValue}
                                onChange={(e) => setSaqValue(e.target.value)}
                            />
                            <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handleAddQuestion('SAQ')}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <p className='font-12 m-0 p-0'>Total mark : <span>60</span></p>
                    </div>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddQuestions;
