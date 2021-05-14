import React, { useContext, useEffect } from "react";
import { QuestionContext } from "../../providers/QuestionProvider";
import { Link } from "react-router-dom";
import { Form, Button, Row, Container, Col } from "reactstrap";
import "./Question.css"


export const UserQuestionList = () => {
    const { questions, getAllQuestions, getQuestionsByUserId } = useContext(QuestionContext);



    useEffect(() => {
        getAllQuestions();
    }, []);

    console.log(questions)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))

    return (
        <div className="posts-container">
            <Col className="posts-header">
                <h1>My Project Questions</h1>
                <Button id="button" className="AskQuestion" size="sm" style={{ color: "#b7813e" }}>
                    <Link to={"/Question/new"} style={{ color: `#f9f5ed` }}>Ask a New Question</Link>
                </Button>
            </Col>
            <hr></hr>
            <Col>
                {questions.map((que) => {
                    if (que.userProfileId === userProfile.id) {
                        return <div className="post-card" key={que.id}>
                            <Link to={`/Question/getById/${que.id}`}>
                                <h3 className="posts-title">
                                    {que.title}
                                </h3>
                            </Link>
                            <p className="posts--category">Project Type: {que.skill.name}</p>
                            <p className="posts--date">Date Posted: {que.dateCreated}</p>
                            <p className="posts--author">Added by: {que.userProfile.userName}</p>
                            <Button id="button" className="QuestionEditBtn" size="sm" style={{ color: "#b7813e" }}>
                                <Link to={`/Question/${que.id}`} style={{ color: `#f9f5ed` }}>Edit Your Question</Link>
                            </Button>
                            <Button id="button" className="QuestionDeleteBtn" size="sm" style={{ color: "#b7813e" }}>
                                <Link to={`/Question/delete/${que.id}`} style={{ color: `#f9f5ed` }}> Remove This Question</Link>
                            </Button>
                        </div>
                    }
                })}
            </Col>
        </div>
    );
};

export default UserQuestionList;