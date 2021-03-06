import React, { useContext, useState } from "react";
import { QuestionCommentContext } from "../../providers/QuestionCommentProvider";
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button } from "reactstrap"


export const QuestionCommentForm = () => {
    const { addQuestionComment, questionComments } = useContext(QuestionCommentContext)
    const { questionId } = useParams(); //this  HAS TO MATCH this part ":postId(\d+)" in ApplicationViews


    const userId = JSON.parse(sessionStorage.getItem("userProfile"))
    const [questionComment, setQuestionComment] = useState({
        questionId: 0,
        content: "",
        userProfileId: userId.id
    });

    const handleControlledInputChange = (event) => {
        const newQuestionComment = { ...questionComment } // make a copy of state
        newQuestionComment[event.target.id] = event.target.value
        setQuestionComment(newQuestionComment)
    }




    const handleClickSaveComment = () => {
        addQuestionComment({
            questionId: questionId,
            content: questionComment.content,
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
                        value={questionComment.content} />
                </div>
            </fieldset>


            <Button className="btn btn-primary"
                onClick={handleClickSaveComment}>
                <Link to={`/Question/getById/${questionId}`}>Save This Comment</Link>
            </Button>
        </div>
    )
};

export default QuestionCommentForm;