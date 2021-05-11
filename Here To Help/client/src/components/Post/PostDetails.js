import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Row } from "reactstrap";
import "./Posts.css"


export const PostDetails = () => {
    const { posts, getPostById } = useContext(PostContext);


    let { postId } = useParams()
    const history = useHistory();
    const [post, setPost] = useState({})

    useEffect(() => {
        getPostById(postId)
            .then((res) => {
                setPost(res)
            })
    }, []);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    const date = new Date(post.dateCreated).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })




    return (
        <>
            <div className="post-details-container">
                <div key={post.id}>
                    <h1 className="posts-title">
                        {post.title}
                    </h1>
                    <p className="post-details">Published on {date}</p>
                    <p className="post-details">Published by {post.userProfile?.userName}</p>
                    <p className="postContent">{post.content}</p>
                    <a target="_blank" href={`${post.url}`}>Check Out The Link</a>
                </div>
            </div>
            <Button color="secondary" size="sm" onClick={() => {
                history.push(`/comments/${postId}`)
            }}>View Comments</Button>
            <Button color="secondary" size="sm" onClick={() => {
                history.push(`/comment/${postId}/create`)
            }}>Add A Comment</Button>
            <Button class="deleteBtn" color="secondary" size="sm" onClick={() => {
                if (currentUser.id === post.userProfileId) {
                    history.push(`/post/delete/${post.id}`)
                } else {
                    window.alert("You may only delete posts you have created")
                }
            }
            }> Delete This Post
            </Button>
            <Button class="editBtn" color="secondary" size="sm" onClick={() => {
                if (currentUser.id === post.userProfileId) {
                    history.push(`/Post/${post.id}`)
                } else {
                    window.alert("You may only make edits to posts you have created")
                }
            }
            }> Edit This Post
            </Button>

        </>
    );
};

export default PostDetails;