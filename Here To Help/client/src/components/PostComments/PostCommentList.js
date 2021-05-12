import React, { useContext, useEffect, useState } from "react";
import { PostCommentContext } from "../../providers/PostCommentProvider";
import { useHistory, useParams } from 'react-router-dom';


export const PostCommentList = () => {
    const history = useHistory();
    const { postId } = useParams();
    const { postComments, getPostCommentsByPostId } = useContext(PostCommentContext);
    /* 
        Above: Object destructoring, is in {} because is pulling out specific properties 
        from CommentContext in CommentProvider. If go look at bottom of CommentProvider
         will see the value ={{}} section. Those {} correspond to the {} above
    */
    useEffect(() => {
        getPostCommentsByPostId(postId)
    }, []);


    return (
        <>
            <div>
                {postComments.map((comment) => (
                    <div key={comment.id}>
                        <div>Comment: {comment.content}</div>
                        <div>By: {comment.userProfile?.userName}</div>
                        <div>Date Created: {comment.dateCreated.toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })} </div>
                        <button onClick={() => {
                            history.push(`/PostComment/delete/${comment.id}`)
                        }}>Delete
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={() => {
                history.push("/Post")
            }}>Back to Posts
            </button>
        </>
    );
};

export default PostCommentList;