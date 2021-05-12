import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const QuestionCommentContext = React.createContext();

export const QuestionCommentProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [questionComments, setQuestionComments] = useState([]);


    const getQuestionCommentsByQuestionId = (questionId) => {
        getToken().then((token) =>
            fetch(`/api/QuestionComment/getByQuestionId/${questionId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setQuestionComments));
    };


    const getQuestionCommentById = (questionCommentId) => {
        return getToken().then((token) =>
            fetch(`/api/QuestionComment/getById/${questionCommentId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    };



    const addQuestionComment = (questionComment) => {
        return getToken().then((token) =>
            fetch(`/api/QuestionComment/create/${questionComment.postId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(questionComment),
            })
        )
    };



    const editQuestionComment = (queComment) => {
        return getToken().then((token) =>
            fetch(`api/PostComment/${queComment.id}/edit`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(queComment),
            })
        )
    };





    const deleteQuestionComment = (questionId) => {
        return getToken().then((token) =>
            fetch(`/api/QuestionComment/delete/${questionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };



    return (
        <QuestionCommentContext.Provider value={{
            questionComments, getQuestionCommentsByQuestionId, getQuestionCommentById,
            addQuestionComment, editQuestionComment, deleteQuestionComment
        }}>
            {props.children}
        </QuestionCommentContext.Provider>
    );
};