import React, { useContext, useEffect, useState } from "react";
import { QuestionCommentContext } from "../../providers/QuestionCommentProvider";
import { useHistory, useParams } from 'react-router-dom';


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
                    <div key={comment.id}>
                        <div> Question Title: {comment.question?.title}</div>
                        <div>Comment: {comment.content}</div>
                        <div>By: {comment.userProfile?.userName}</div>
                        <div>Date Created: {comment.dateCreated.toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })} </div>
                        <button onClick={() => {
                            history.push(`/QuestionComment/delete/${comment.id}`)
                        }}>Delete
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => {
                history.push("/Question")
            }}>Back to Questions
            </button>
        </>
    );
};

export default QuestionCommentList;