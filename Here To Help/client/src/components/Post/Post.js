import React, { useContext } from "react"
import { PostContext } from "../../providers/PostProvider"
import { Link } from "react-router-dom"



export const Post = ({ post }) => {

    return (
        <section className="post">
            <h3 className="postTitle">
                <Link to={`/post/detail/getById/${post.id}`}>
                    {post.name}
                </Link>
            </h3>
        </section>
    )
}