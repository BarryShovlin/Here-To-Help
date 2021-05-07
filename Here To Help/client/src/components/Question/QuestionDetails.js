import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../providers/QuestionProvider";
import { useParams } from "react-router-dom";
import { Button, Row } from "reactstrap";
import "./Question.css"


export const QuestionDetails = () => {
    const { questions, getQuestionById } = useContext(QuestionContext);


    let { questionId } = useParams()
    const [question, setQuestion] = useState({})



    useEffect(() => {
        getQuestionById(questionId)
            .then((res) => {
                setQuestion(res)
            })
    }, []);

    console.log(question)


    return (
        <>
            <div className="question-details-container">
                <div key={question.id}>
                    <h1 className="question-title">
                        {question.title}
                    </h1>
                    <p className="post-details">Asked on: {question.dateCreated}</p>
                    <p className="post-details">Asked by: {question.userProfile?.userName}</p>
                    <p className="postContent">{question.content}</p>
                </div>
            </div>
        </>
    );
};

export default QuestionDetails;