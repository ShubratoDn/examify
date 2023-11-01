import React from 'react';

const AddQuestions = () => {
    const [questions, setQuestions] = React.useState([
        {
            question: 'Enter the question',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: '',
            correctMark: 0,
        },
    ]);

    const handleClickAddMcq = () => {
        const newQuestion = {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            correctMark: 0,
        };
        setQuestions([...questions, newQuestion]);
    };

    return (
        <div className="add-question-component">
            <h5>Add Questions</h5>

            <button onClick={handleClickAddMcq}>Add MCQ</button>

            {/* MCQ container */}
            {questions.map((question, questionIndex) => (
                <div className="mcq-container" key={questionIndex}>
                    <div className="mcq-question d-flex align-items-center">
                        <div className="input-group w-75">
                            <label>Enter the question <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[questionIndex].question = e.target.value;
                                    setQuestions(updatedQuestions);
                                }}
                            />
                        </div>
                        <div className="input-group w-25">
                            <label>Choose image</label>
                            <input type="file" />
                        </div>
                    </div>

                    {/* MCQ answer */}
                    <div className="mcq-answer">
                        <ol>
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex}>
                                    <input
                                        type="text"
                                        className="option"
                                        placeholder={`Write option ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) => {
                                            const updatedQuestions = [...questions];
                                            updatedQuestions[questionIndex].options[optionIndex] =
                                                e.target.value;
                                            setQuestions(updatedQuestions);
                                        }}
                                    />
                                </li>
                            ))}
                        </ol>

                        <div className="d-flex align-items-center">
                            <div className="input-group w-50">
                                <label>Select Correct answer <span className="text-danger">*</span></label>
                                <select
                                    name="correct_answer"
                                    id=""
                                    value={question.correctAnswer}
                                    onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[questionIndex].correctAnswer =
                                            e.target.value;
                                        setQuestions(updatedQuestions);
                                    }}
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
                                <label>Correct mark for this MCQ <span className="text-danger">*</span></label>
                                <input
                                    type="number"
                                    name=""
                                    id=""
                                    value={question.correctMark}
                                    onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[questionIndex].correctMark =
                                            e.target.value;
                                        setQuestions(updatedQuestions);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddQuestions;
