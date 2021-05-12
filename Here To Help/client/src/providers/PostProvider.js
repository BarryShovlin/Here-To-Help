import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    const getPosts = () => {
        return getToken().then((token) =>
            fetch("/api/Post", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setPosts));
    };

    const getUserPosts = () => {
        return getToken().then((token) =>
            fetch(`/api/Post/GetByUser?userId=${userProfile.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setPosts));
    };

    const getPostDetails = (postId) => {
        return getToken().then((token) =>
            fetch(`/api/Post/GetById?postId=${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then((res) => res.json())
    };

    const addPost = (post) => {
        return getToken().then((token) =>
            fetch("/api/Post", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })
        )
    };

    const deletePost = (postId) => {
        return getToken().then((token) =>
            fetch(`/api/Post/delete/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        )
    };

    const getPostsByUserSkill = (userSkillId) => {
        return getToken().then((token) =>
            fetch(`/api/Post/getByUserSkill/${userSkillId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((res) => res.json())
                .then(setPosts))
    }


    const getPostById = (postId) =>
        getToken().then((token) => fetch(`https://localhost:5001/api/Post/GetById/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then(getPosts()))



    const editPost = (post) =>
        getToken().then((token) =>
            fetch(`https://localhost:5001/api/post/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            })
                .then(getPostById(post.id)))

    const searchPost = (criterion) => {
        return fetch(`api/Post/search?q=${criterion}&sortDesc=false`)
            .then((res) => res.json())
            .then(setPosts)
            .then(console.log(posts))
    }

    return (
        <PostContext.Provider value={{ posts, getPosts, getUserPosts, getPostDetails, getPostById, getPostsByUserSkill, addPost, editPost, deletePost, searchPost }}>
            {props.children}
        </PostContext.Provider>
    );
};