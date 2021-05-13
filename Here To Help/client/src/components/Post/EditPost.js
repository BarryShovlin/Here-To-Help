import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider"
import { SkillContext } from "../../providers/SkillProvider"

export const EditPost = () => {
    const { editPost, getPostById, posts } = useContext(PostContext);
    const { getAllSkills, skills } = useContext(SkillContext);

    const { postId } = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        getPostById(postId)
            .then((res) => setPost(res))

            .then(getAllSkills)
    }, [])

    console.log(post, "post")


    const handleControlledInputChange = (event) => {
        const freshPost = { ...post };

        freshPost[event.target.id] = event.target.value
        setPost(freshPost);
    }


    const handleSave = () => {
        editPost({
            id: post.id,
            title: post.title,
            url: post.url,
            content: post.content,
            userProfileId: post.userProfileId,
            skillId: post.skillId
        })
            .then(getPostById(post.id))
    };

    return (
        <section className="post_form">
            <h2 className="post_form_header">Edit</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={post.title} value={post.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="url">Url:</label>
                    <textarea name="url" id="url" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={post.url} value={post.url} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea name="content" id="content" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={post.content} value={post.content} />
                </div>
                <div className="form-group">
                    <label htmlFor="skillId">Skill: </label>
                    <select name="skillId" id="skillId" className="form-control" onChange={handleControlledInputChange}>
                        <option value={post.Skill?.id}>{post.skill?.name}</option>
                        {skills.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <Button color="primary" onClick={handleSave}>
                <Link className="savePost" to={`/Post/GetById/${post.id}`} style={{ color: `#FFF` }}>
                    Save Post
                </Link>
            </Button>
            <Button color="primary">
                <Link to={"/Post"} style={{ color: `#FFF` }}>Cancel</Link>
            </Button>

        </section>
    );
}
