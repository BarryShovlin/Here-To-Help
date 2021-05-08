import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "../../providers/QuestionProvider";
import { Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";

export const DeleteQuestion = () => {
    const { deleteQuestion, getQuestionById, questions, getQuestionsByUserId } = useContext(QuestionContext);

    const { questionId } = useParams();

    const history = useHistory();

    const [question, setQuestion] = useState({})

    useEffect(() => {
        getQuestionById(questionId)
            .then((res) => {
                setQuestion(res)
            })
    }, [])

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
    console.log(currentUser)
    const handleQuestionDelete = () => {
        deleteQuestion(questionId)
            .then(getQuestionsByUserId)
            .then(history.push(`Question/getByUserId/${currentUser.id}`))
    }

    const handleCancel = () => {
        history.push(`Question/getByUserId/${currentUser.id}`)
    }

    return (
        <section>
            <div className="delete_message"> Are you sure you want to delete {question.title}?</div>
            <Button className="delete" onClick={handleQuestionDelete}>Delete</Button>
            <Button className="cancel" onClick={handleCancel}>Cancel</Button>

        </section>
    )
}

export default DeleteQuestion