import React, { useContext, useState } from "react";
import { PostCommentContext } from "../../providers/PostCommentProvider";
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button } from "reactstrap"


export const PostCommentForm = () => {
    const history = useHistory();
    const { addPostComment, postComments } = useContext(PostCommentContext)
    const { postId } = useParams(); //this  HAS TO MATCH this part ":postId(\d+)" in ApplicationViews


    const userId = JSON.parse(sessionStorage.getItem("userProfile"))
    const [postComment, setPostComment] = useState({
        postId: 0,
        content: "",
        userProfileId: userId.id
    });

    const handleControlledInputChange = (event) => {
        const newPostComment = { ...postComment } // make a copy of state
        newPostComment[event.target.id] = event.target.value
        setPostComment(newPostComment)
    }




    const handleClickSaveComment = () => {
        addPostComment({
            postId: postId,
            content: postComment.content,
            userProfileId: userId.id
        })
    }




    return (
        <div className="CommentForm">
            <h2 className="CommentForm__title">New Comment</h2>
            <fieldset>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="text" id="content" rows="15" onChange={handleControlledInputChange}
                        required autoFocus
                        className="form-control"
                        placeholder="Content"
                        value={postComment.content} />
                </div>
            </fieldset>


            <Button className="btn btn-primary"
                onClick={handleClickSaveComment}>
                <Link to={`/Post/getById/${postId}`}>Save This Comment</Link>
            </Button>
        </div>
    )
};

export default PostCommentForm;