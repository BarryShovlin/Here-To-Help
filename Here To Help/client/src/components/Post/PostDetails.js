import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button, Row } from "reactstrap";
import "./Posts.css"


export const PostDetails = () => {
    const { posts, getPostById } = useContext(PostContext);


    let { postId } = useParams()
    const history = useHistory();
    const [post, setPost] = useState({})

    console.log(posts[0]?.imageLocation)

    useEffect(() => {
        getPostById(postId)
            .then((res) => {
                setPost(res)
            })
    }, []);


    return (
        <>
            <div className="post-details-container">
                <div key={post.id}>
                    <h1 className="posts-title">
                        {post.title}
                    </h1>
                    <p className="post-details">Published on {post.DateCreated}</p>
                    <p className="post-details">Published by {post.userProfile?.userName}</p>
                    <img src={post.Url} alt="No image available"></img>
                    <p className="postContent">{post.content}</p>
                </div>
            </div>
            <button onClick={() => {
                history.push(`/comments/${postId}`)
            }}>View Comments</button>
            <button onClick={() => {
                history.push(`/comment/${postId}/create`)
            }}>Add A Comment</button>
        </>
    );
};

export default PostDetails;