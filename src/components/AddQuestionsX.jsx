import React from 'react'

const AddQuestions = () => {


    return (
        <div className='add-question-component'>
            <h5>Add Questions</h5>

            {/* all questions container */}
            <div className="all-question-container">
                {/* MCQ container */}
                <div className="mcq-container question-container">
                    <h5>#MCQ</h5>
                    <div className="mcq-question d-flex align-items-center">
                        <div className="input-group w-75">
                            <label >Enter the question <span className='text-danger'>*</span></label>
                            <input type='text' name='mcq[0].question' />
                        </div>
                        <div className="input-group w-25 ps-3">
                            <label>Choose image</label>
                            <input type='file' name='mcq[0].questionImage' />
                        </div>
                    </div>

                    <div className="mcq-answer">
                        <ol>
                            <li><div className="input-group"><input name='mcq[0].option1' type='text' className='option' placeholder='Write option a' /></div></li>
                            <li><div className="input-group"><input name='mcq[0].option2' type='text' className='option' placeholder='Write option b' /></div></li>
                            <li><div className="input-group"><input name='mcq[0].option3' type='text' className='option' placeholder='Write option c' /></div></li>
                            <li><div className="input-group"><input name='mcq[0].option4' type='text' className='option' placeholder='Write option d' /></div></li>
                        </ol>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className="input-group w-50">
                            <label >Select Correct answer <span className='text-danger'>*</span></label>
                            <select name='mcq[0].correctAnswer' id="" >
                                <option value="">-- Select Correct Option --</option>
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="input-group w-25 ps-3">
                            <label >Correct mark for this MCQ <span className='text-danger'>*</span></label>
                            <input type="number" name='mcq[0].mark' />
                        </div>
                    </div>
                </div>


                {/* SAQ container */}
                <div className="saq-container question-container">
                    <h5>#SAQ</h5>
                    <div className="saq-question d-flex align-items-center">
                        <div className="input-group w-75">
                            <label >Enter the question <span className='text-danger'>*</span></label>
                            <input type='text' name='saq[0].question' />
                        </div>
                        <div className="input-group w-25 ps-3">
                            <label>Choose image</label>
                            <input type='file' name='saq[0].questionImage' />
                        </div>
                    </div>

                    <div className="saq-answer">
                        <div className="input-group">
                            <textarea name='saq[0].answer' id="" placeholder='Write your answer...'></textarea>
                        </div>
                    </div>
                </div>


                {/* MCQ container */}
                <div className="mcq-container question-container">
                    <h5>#MCQ</h5>
                    <div className="mcq-question d-flex align-items-center">
                        <div className="input-group w-75">
                            <label >Enter the question <span className='text-danger'>*</span></label>
                            <input type='text' name='mcq[1].question' />
                        </div>
                        <div className="input-group w-25 ps-3">
                            <label>Choose image</label>
                            <input type='file' name='mcq[1].questionImage' />
                        </div>
                    </div>

                    <div className="mcq-answer">
                        <ol>
                            <li><div className="input-group"><input name='mcq[1].option1' type='text' className='option' placeholder='Write option a' /></div></li>
                            <li><div className="input-group"><input name='mcq[1].option2' type='text' className='option' placeholder='Write option b' /></div></li>
                            <li><div className="input-group"><input name='mcq[1].option3' type='text' className='option' placeholder='Write option c' /></div></li>
                            <li><div className="input-group"><input name='mcq[1].option4' type='text' className='option' placeholder='Write option d' /></div></li>
                        </ol>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className="input-group w-50">
                            <label >Select Correct answer <span className='text-danger'>*</span></label>
                            <select name='mcq[1].correctAnswer' id="" >
                                <option value="">-- Select Correct Option --</option>
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="input-group w-25 ps-3">
                            <label >Correct mark for this MCQ <span className='text-danger'>*</span></label>
                            <input type="number" name='mcq[1].mark' />
                        </div>
                    </div>
                </div>







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
    )
}

export default AddQuestions