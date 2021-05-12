import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SkillTagContext = React.createContext();

export const SkillTagProvider = (props) => {
    const [skillTags, setSkillTags] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllSkillTags = () => {
        return getToken().then((token) =>
            fetch("/api/SkillTag", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setSkillTags));
    };

    const getSkillTagById = (skillTagId) => {
        return getToken().then((token) =>
            fetch(`/api/SkillTag/GetById/${skillTagId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))

    };
    const getSkillTagsByPostId = (postId) => {
        return getToken().then((token) =>
            fetch(`/api/SkillTag/GetByPostId/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setSkillTags));
    };

    const addSkillTag = (tag) => {
        return getToken().then((token) =>
            fetch(`/api/SkillTag/create/${tag.id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            })
        )
    };


    const deleteSkillTag = tagId => {
        return getToken().then((token) =>
            fetch(`/api/SkillTag/delete/${tagId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(getAllSkillTags))
    };


    return (
        < SkillTagContext.Provider value={{ skillTags, getAllSkillTags, getSkillTagById, getSkillTagsByPostId, addSkillTag, deleteSkillTag }}>
            {props.children}
        </SkillTagContext.Provider >
    );
};

export default SkillTagProvider;