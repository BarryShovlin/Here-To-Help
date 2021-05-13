import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../providers/QuestionProvider";
import { useParams, Link } from "react-router-dom";
import { Button, Row } from "reactstrap";
import "./Question.css"


export const QuestionDetails = () => {
    const { questions, getAllQuestions, getQuestionById } = useContext(QuestionContext);
    const [question, setQuestions] = useState({})


    let { questionId } = useParams()



    useEffect(() => {
        getQuestionById(questionId)
            .then((res) => setQuestions(res))
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
                    <Button className="viewComments">
                        <Link to={`/QuestionComment/GetByQuestionId/${question.id}`}>View Comments</Link>
                    </Button>
                    <Button className="AddComment">
                        <Link to={`/QuestionComment/create/${question.id}`}>Add Comment</Link>
                    </Button>
                    <Button className="deleteComment">
                        <Link to={`/QuestionComment/delete/${question.id}`}>DeleteComment</Link>
                    </Button>
                </div>
            </div>

        </>
    );
};

export default QuestionDetails;