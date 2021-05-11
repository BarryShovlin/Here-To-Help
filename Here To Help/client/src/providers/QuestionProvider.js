
import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const QuestionContext = React.createContext();

export const QuestionProvider = (props) => {
    const [questions, setQuestions] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/Question";

    const getAllQuestions = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setQuestions));

    const getQuestionById = (id) =>
        getToken().then((token) =>
            fetch(`/api/Question/getById/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => res.json()))

    const getQuestionsByUserId = (id) =>
        getToken().then((token) =>
            fetch(`/api/Question/getByUserId/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => res.json())
                .then(setQuestions));





    const addQuestion = (que) => {
        return getToken().then((token) =>
            fetch("/api/Question/new", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(que)
            }).then((res) => res.json())
        )
    };

    const editQuestion = (que) =>
        getToken().then((token) =>
            fetch(`/api/Question/${que.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(que)
            })
                .then(getQuestionById(que.id)))


    const deleteQuestion = (id) =>
        getToken().then((token) =>
            fetch(`/api/Question/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        )




    return (
        <QuestionContext.Provider value={{ questions, getAllQuestions, addQuestion, getQuestionById, deleteQuestion, getQuestionsByUserId, editQuestion }}>
            {props.children}
        </QuestionContext.Provider>
    );
};
export default QuestionProvider;

