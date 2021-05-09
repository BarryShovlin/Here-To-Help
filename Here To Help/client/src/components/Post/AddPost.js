import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider"
import { SkillContext } from "../../providers/SkillProvider"
import "./Posts.css"


export const AddPostForm = () => {

    const { addPost, getPosts } = useContext(PostContext)
    const { getAllSkills, skills } = useContext(SkillContext)

    const [post, setPost] = useState({
        title: "",
        Url: "",
        content: "",
        DateCreated: "",
        UserProfileId: 0,
        SkillId: 0
    });

    useEffect(() => {
        getPosts()
            .then(getAllSkills)
    }, [])

    const handleControlledInputChange = (event) => {
        const newPost = { ...post };

        newPost[event.target.id] = event.target.value
        setPost(newPost);
    }

    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile"))

    const handleSavePost = () => {
        addPost({
            title: post.title,
            url: post.url,
            content: post.content,
            createDateTime: new Date(),
            UserProfileId: userProfileId.id,
            SkillId: post.skillId,
        })
        // .then(getPosts);
    };

    return (
        <section className="post_form">
            <h2 className="post_form_header">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={post.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="imageLocation">Url:</label>
                    <input
                        type="text" id="url" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Url" value={post.url} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea name="content" id="content" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Content" value={post.content} />
                </div>
                <div className="form-group">
                    <label htmlFor="SkillId">Skill: </label>
                    <select name="skillId" id="skillId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a category</option>
                        {skills.map(skill => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <Button color="primary" onClick={handleSavePost}>
                <Link className="savePost" to={"/Posts"} style={{ color: `#FFF` }}>
                    Save Post
                </Link>
            </Button>

        </section>
    );
};
export default AddPostForm;