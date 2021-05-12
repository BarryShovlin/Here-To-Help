import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Row, Container, Col } from "reactstrap";
import "./Posts.css"
import { SearchPosts } from "./SearchPost"


export const SearchPostList = () => {
    const { posts, getPosts, searchPost } = useContext(PostContext);
    const criterion = useParams()

    useEffect(() => {
        searchPost(criterion);
    }, []);

    return (
        <section>
            <div className="posts-container">
                <Col className="posts-header">
                    <h1>Search Results</h1>
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
                            <p className="posts--author">Added by: {post.userProfile?.userName}</p>
                        </div>
                    ))}
                </Col>
            </div>
        </section>
    );
};

export default SearchPostList;