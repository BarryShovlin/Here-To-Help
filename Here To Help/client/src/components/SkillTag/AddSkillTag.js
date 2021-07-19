import React, { useContext, useState, useEffect } from "react";
import { SkillTagContext } from "../../providers/SkillTagProvider";
import { PostContext } from "../../providers/PostProvider"
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button } from "reactstrap"


export const SkillTagForm = () => {
    const history = useHistory();
    const { addSkillTag, skillTags, getSkillTagsByPostId } = useContext(SkillTagContext)
    const { getPostById, posts } = useContext(PostContext)
    const { postId } = useParams(); //this  HAS TO MATCH this part ":postId(\d+)" in ApplicationViews

    const [post, setPosts] = useState({})

    useEffect(() => {
        getPostById(postId)
            .then(res => setPosts(res))
    }, []);

    const userId = JSON.parse(sessionStorage.getItem("userProfile"))
    const [skillTag, setSkillTag] = useState({
        title: "",
        postId: 0,
        skillId: 0

    });

    const handleControlledInputChange = (event) => {
        const newSkillTag = { ...skillTag } // make a copy of state
        newSkillTag[event.target.id] = event.target.value
        setSkillTag(newSkillTag)
    }




    const handleClickSaveTag = () => {
        addSkillTag({
            title: skillTag.title,
            postId: post.id,
            skillid: post.skillId
        })
            //.then(getSkillTagsByPostId(post.id))
            .then(history.push(`/Post/GetById/${post.id}`))
    }




    return (
        <div className="CommentForm">
            <h2 className="CommentForm__title">New SkillTag</h2>
            <fieldset>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">title:</label>
                    <input type="text" id="title" rows="15" onChange={handleControlledInputChange}
                        required autoFocus
                        className="form-control"
                        placeholder="title"
                        value={skillTag.title} />
                </div>
            </fieldset>


            <Button className="btn btn-primary"
                onClick={handleClickSaveTag}> Add Tag
            </Button>
        </div>
    )
};

export default SkillTagForm;