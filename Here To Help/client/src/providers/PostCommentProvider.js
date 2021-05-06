import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const PostCommentContext = React.createContext();

export const PostCommentProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [postComments, setPostComments] = useState([]);
    /*
        Above line: Array destructoring, useState is returning what is declared 
        in the (), so in this instance it will be returning an array with a 0 
        index and a 1 index. 0 index is the state and 1 index is the function used
        to set state
    */


    const getAllPostCommentsByPostId = (postId) => {
        return getToken().then((token) =>
            fetch(`/comments/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setComments));
    };


    const getPostCommentById = (postCommentId) => {
        return getToken().then((token) =>
            fetch(`/postComment/${postCommentId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    };



    const addPostComment = (postComment) => {
        return getToken().then((token) =>
            fetch(`/postComment/${postComment.postId}/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postComment),
            })
        )
    };



    const editPostComment = (postComment) => {
        return getToken().then((token) =>
            fetch(`/comment/${postComment.id}/edit`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postComment),
            })
        )
    };





    const deletePostComment = (postCommentId) => {
        return getToken().then((token) =>
            fetch(`/comment/delete/${postCommentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };



    return (
        <PostCommentContext.Provider value={{
            postComments, getAllPostCommentsByPostId, getPostCommentById,
            addPostComment, editPostComment, deletePostComment
        }}>
            {props.children}
        </PostCommentContext.Provider>
    );
};