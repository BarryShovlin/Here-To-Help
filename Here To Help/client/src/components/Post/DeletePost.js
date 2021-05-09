import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";

export const DeletePost = () => {
    const { deletePost, getPostById, posts, getPosts } = useContext(PostContext);

    const { postId } = useParams();

    const history = useHistory();

    const [post, setPost] = useState({})

    useEffect(() => {
        getPostById(postId)
            .then((res) => {
                setPost(res)
            })
    }, [])

    const handlePostDelete = () => {
        deletePost(postId)
            .then(getPosts)
            .then(history.push("/Post"))
    }
    console.log(post)

    const handleCancel = () => {
        history.push("/Post")
    }

    return (
        <section>
            <div className="delete_message"> Are you sure you want to delete {post.title}?</div>
            <Button className="delete" onClick={handlePostDelete}>Delete</Button>
            <Button className="cancel" onClick={handleCancel}>Cancel</Button>

        </section>
    )
}

export default DeletePost