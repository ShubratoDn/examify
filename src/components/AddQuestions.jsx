import React, { useState } from 'react';
import { toast } from 'react-toastify'

const AddQuestions = () => {

    const [questions, setQuestions] = useState([
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

    const handleAddQuestion = (type) => {
        const newQuestions = [];
        const numQuestions = type === 'MCQ' ? parseInt(mcqValue, 10) : parseInt(saqValue, 10);

        for (let i = 0; i < numQuestions; i++) {
            if(i === 20){
                // handle connection refused error
                toast.error('You can add maximum 20 inputs at a time', {
                    position: "bottom-center",
                    theme: "dark",
                });
                break;
            }
            const newQuestion = type === 'MCQ'
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
            newQuestions.push(newQuestion);
        }

        setQuestions([...questions, ...newQuestions]);
    };


    const handleInputChange = (questionIndex, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex][field] = value;
        setQuestions(updatedQuestions);
    };

    return (
        <div className='add-question-component'>
            <h5>Add Questions</h5>

            {/* Question containers */}
            <div className="all-question-container">
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className={`question-container ${question.type.toLowerCase()}-container`}>
                        <h5>#{question.type}</h5>
                        <div className="question d-flex align-items-center">
                            <div className="input-group w-75">
                                <label>Enter the question <span className='text-danger'>*</span></label>
                                <input
                                    type='text'
                                    name={`${question.type.toLowerCase()}[${questionIndex}].question`}
                                    value={question.question}
                                    onChange={(e) => handleInputChange(questionIndex, 'question', e.target.value)}
                                />
                            </div>
                            <div className="input-group w-25 ps-3">
                                <label>Choose image</label>
                                <input
                                    type='file'
                                    name={`${question.type.toLowerCase()}[${questionIndex}].questionImage`}
                                />
                            </div>
                        </div>

                        {question.type === 'MCQ' && (
                            <div className="mcq-answer">
                                <ol>
                                    { question.options.map((option, optionIndex) => (
                                        <li key={optionIndex}>
                                            <div className="input-group">
                                                <input
                                                    type='text'
                                                    className='option'
                                                    placeholder={`Write option ${String.fromCharCode(97 + optionIndex)}`}
                                                    name={`${question.type.toLowerCase()}[${questionIndex}].options[${optionIndex}]`}
                                                    value={option}
                                                    // onChange={(e) => handleInputChange(questionIndex, 'options', e.target.value)}
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...questions];
                                                        updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
                                                        setQuestions(updatedQuestions);
                                                    }}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                <div className='d-flex align-items-center'>
                                    <div className="input-group w-50">
                                        <label>Select Correct answer <span className='text-danger'>*</span></label>
                                        <select
                                            name={`${question.type.toLowerCase()}[${questionIndex}].correctAnswer`}
                                            value={question.correctAnswer}
                                            onChange={(e) => handleInputChange(questionIndex, 'correctAnswer', e.target.value)}
                                        >
                                            <option value="">-- Select Correct Option --</option>
                                            {question.options.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group w-25 ps-3">
                                        <label>Correct mark for this MCQ <span className='text-danger'>*</span></label>
                                        <input
                                            type="number"
                                            name={`${question.type.toLowerCase()}[${questionIndex}].correctMark`}
                                            value={question.correctMark}
                                            onChange={(e) => handleInputChange(questionIndex, 'correctMark', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {question.type === 'SAQ' && (
                            <div className="saq-answer d-flex">
                                <div className="input-group w-75">
                                    <label htmlFor="">The question's answer</label>
                                    <textarea
                                        name={`${question.type.toLowerCase()}[${questionIndex}].answer`}
                                        placeholder='Write your answer...'
                                        value={question.answer}
                                        onChange={(e) => handleInputChange(questionIndex, 'answer', e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="input-group w-25 ps-3">
                                    <label>Correct mark for this MCQ <span className='text-danger'>*</span></label>
                                    <input
                                        type="number"
                                        name={`${question.type.toLowerCase()}[${questionIndex}].correctMark`}
                                        value={question.correctMark}
                                        onChange={(e) => handleInputChange(questionIndex, 'correctMark', e.target.value)}
                                    />
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
        </div>
    );
};

export default AddQuestions;
