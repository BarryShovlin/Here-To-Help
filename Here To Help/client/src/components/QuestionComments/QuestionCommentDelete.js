import React, { useContext, useEffect, useState } from "react";
import { QuestionCommentContext } from "../../providers/QuestionCommentProvider";
import { useHistory, useParams, Link } from 'react-router-dom';


export const QuestionCommentDeleteForm = () => {
    const history = useHistory();
    const { questionCommentId } = useParams();
    const { getQuestionCommentById, deleteQuestionComment } = useContext(QuestionCommentContext);
    const [questionComment, setQuestionComment] = useState({});
    const userId = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        getQuestionCommentById(questionCommentId)
            .then((resp) => setQuestionComment(resp))
    }, []);

    console.log(questionComment)

    const handleDelete = () => {
        if (questionComment.userProfileId === userId.id) {
            deleteQuestionComment(questionComment.id)
        } else {
            window.alert("You may only remove comments you have submitted")
        }
    }


    return (
        <>
            <h1> Delete </h1>
            <h3>Are you sure you wish to delete this comment?</h3>
            <div>Content: {questionComment.content}</div>
            <button onClick={handleDelete}>
                <Link to={`/QuestionComment/GetByQuestionId/${questionComment.questionId}`}>Delete</Link>
            </button>
            <button onClick={() => {
                history.push(`/QuestionComment/GetByQuestionId/${questionComment.postId}`)
            }}>Cancel</button>
        </>
    );
};


export default QuestionCommentDeleteForm;