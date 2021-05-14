import React, { useContext, useEffect, useState } from "react";
import { PostCommentContext } from "../../providers/PostCommentProvider";
import { useHistory, useParams } from 'react-router-dom';
import { Button } from "reactstrap"


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
                    <div className="QueCard" key={comment.id}>
                        <div>Comment: {comment.content}</div>
                        <div>By: {comment.userProfile?.userName}</div>
                        <div>Date Created: {comment.dateCreated.toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })} </div>
                        <Button size="sm" style={{ width: "200px" }} onClick={() => {
                            history.push(`/PostComment/delete/${comment.id}`)
                        }}>Delete
                        </Button>
                    </div>
                ))}
            </div>
            <div className="back-btn">
                <Button className="back-btn" size="sm" style={{ width: "200px" }} onClick={() => {
                    history.push("/Post")
                }}>Back to Posts
            </Button>
            </div>
        </>
    );
};

export default PostCommentList;