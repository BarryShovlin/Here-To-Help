import React, { useContext, useEffect } from "react";
import { QuestionContext } from "../../providers/QuestionProvider";
import { Link } from "react-router-dom";
import { Form, Button, Row, Container, Col } from "reactstrap";
import "./Question.css"


export const QuestionList = () => {
    const { questions, getAllQuestions } = useContext(QuestionContext);

    useEffect(() => {
        getAllQuestions();
    }, []);

    return (
        <div className="posts-container">
            <Col className="posts-header">
                <h1>All Questions</h1>
            </Col>
            <hr></hr>
            <Col>
                {questions.map((que) => (
                    <div className="post-card" key={que.id}>
                        <Link to={`/Question/getById/${que.id}`}>
                            <h3 className="posts-title">
                                {que.title}
                            </h3>
                        </Link>
                        <p className="posts--category">Prject Type: {que.skill.name}</p>
                        <p className="posts--author">Added by: {que.userProfile.userName}</p>
                        <p className="posts--date">Posted On: {que.dateCreated}</p>
                    </div>
                ))}
            </Col>
        </div>
    );
};

export default QuestionList;