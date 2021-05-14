import React, { useContext, useEffect, useState } from "react";
import { QuestionCommentContext } from "../../providers/QuestionCommentProvider";
import { useHistory, useParams } from 'react-router-dom';
import "./QuestionComments.css"
import { Button, Col, Card, Table } from "reactstrap"


export const QuestionCommentList = () => {
    const history = useHistory();
    const { questionId } = useParams();
    const { questionComments, getQuestionCommentsByQuestionId } = useContext(QuestionCommentContext);
    /* 
        Above: Object destructoring, is in {} because is pulling out specific properties 
        from CommentContext in CommentProvider. If go look at bottom of CommentProvider
         will see the value ={{}} section. Those {} correspond to the {} above
    */
    useEffect(() => {
        getQuestionCommentsByQuestionId(questionId)
    }, []);


    return (
        <>
            <div>
                {questionComments.map((comment) => (
                    <div className="QueCard" key={comment.id}>
                        <div>"{comment.content}"</div>
                        <div>By: {comment.userProfile?.userName}</div>
                        <div>Date Created: {comment.dateCreated.toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })} </div>
                        <Button size="sm" style={{ width: "100px" }} onClick={() => {
                            history.push(`/QuestionComment/delete/${comment.id}`)
                        }}>Delete
                        </Button>
                    </div>
                ))}
                <div className="back-btn">
                    <Button size="sm" style={{ width: "200px" }} onClick={() => {
                        history.push("/Question")
                    }}>Back to Questions
            </Button>
                </div>
            </div>

        </>
    );
};

export default QuestionCommentList;