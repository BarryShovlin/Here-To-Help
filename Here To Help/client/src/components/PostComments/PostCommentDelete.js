import React, { useContext, useEffect, useState } from "react";
import { PostCommentContext } from "../../providers/PostCommentProvider";
import { useHistory, useParams, Link } from 'react-router-dom';


const PostCommentDeleteForm = () => {
    const history = useHistory();
    const { postCommentId } = useParams();
    const { getPostCommentById, deletePostComment } = useContext(PostCommentContext);
    const [postComment, setPostComment] = useState({});
    const userId = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        getPostCommentById(postCommentId)
            .then((resp) => setPostComment(resp))
    }, []);


    const handleDelete = () => {
        if (postComment.userProfileId === userId.id) {
            deletePostComment(postComment.id)
        } else {
            window.alert("You may only remove comments you have submitted")
        }
    }


    return (
        <>
            <h1> Delete </h1>
            <h3>Are you sure you wish to delete this comment?</h3>
            <div>Content: {postComment.content}</div>
            <button onClick={handleDelete}>
                <Link to={`/PostComment/GetByPostId/${postComment.postId}`}>Delete</Link>
            </button>
            <button onClick={() => {
                history.push(`/PostComment/GetByPostId/${postComment.postId}`)
            }}>Cancel</button>
        </>
    );
};


export default PostCommentDeleteForm;