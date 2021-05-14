import React, { useContext, useEffect, useState } from "react";
import { SkillTagContext } from "../../providers/SkillTagProvider";
import { PostContext } from "../../providers/PostProvider"
import { useHistory, useParams, Link } from 'react-router-dom';


export const SkillTagDeleteForm = () => {
    const history = useHistory();
    const { skillTagId } = useParams();
    const { getSkillTagById, deleteSkillTag } = useContext(SkillTagContext);
    const [skillTag, setSkillTags] = useState({});
    const userId = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        getSkillTagById(skillTagId)
            .then((resp) => setSkillTags(resp))

    }, []);



    const handleDelete = () => {
        deleteSkillTag(skillTagId)
            .then(history.push(`/Post/GetById/${skillTag.postId}`))
    }


    return (
        <>
            <h1> Delete </h1>
            <h3>Delete {skillTag.title}?</h3>
            <button onClick={handleDelete}>Delete
            </button>
            <button onClick={() => {
                history.push(`/Post/GetById/${skillTag.postId}`)
            }}>Cancel</button>
        </>
    );
};


export default SkillTagDeleteForm;