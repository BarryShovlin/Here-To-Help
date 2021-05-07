import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";
import { Form, Button, Row, Container, Col } from "reactstrap";
import "./Posts.css"


export const PostList = () => {
    const { posts, getPosts } = useContext(PostContext);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="posts-container">
            <Col className="posts-header">
                <h1>All Posts</h1>
            </Col>
            <hr></hr>
            <Col>
                {posts.map((post) => (
                    <div className="post-card" key={post.id}>
                        <Link to={`/post/GetById/${post.id}`}>
                            <h3 className="posts-title">
                                {post.title}
                            </h3>
                        </Link>
                        <p className="posts--category">{post.skill.name}</p>
                        <p className="posts--author">Added by: {post.userProfile.userName}</p>
                    </div>
                ))}
            </Col>
        </div>
    );
};

export default PostList;