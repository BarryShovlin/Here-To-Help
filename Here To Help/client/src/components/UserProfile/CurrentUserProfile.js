import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { UserSkillContext } from "../../providers/UserSkillProvider"
import { SkillContext } from "../../providers/SkillProvider"
import { UserSkill } from "../UserSkill/UserSkill"
import { Button, Col, Card } from "reactstrap"
import { PostContext } from "../../providers/PostProvider"
import { Post } from "../Post/Post"

export const CurrentUserProfileDetails = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext)
    const { posts, getPosts, getPostsByUserSkill } = useContext(PostContext);
    const { userSkills, getUserSkillsByUserId, getAllUserSkills } = useContext(UserSkillContext)


    const [userProfile, setUserProfile] = useState({ userProfile: {} })



    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {

        getUserProfileById(userProfileId.id)
            .then((response) => {
                setUserProfile(response)
            })
            .then(getUserSkillsByUserId(userProfileId.id))
            .then(getPostsByUserSkill(userProfileId.id))
        console.log(posts)

    }, [])

    useEffect(() => {
        getAllUserSkills()
    }, [])




    const CurrentUserSkills = userSkills.filter(s => s.userProfileId === userProfileId.id)
    const date = new Date(userProfile.dateCreated).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })

    return (

        <article>
            <section className="userProfile">
                <h3 className="userProfile__displayName">{userProfile.userName}</h3>
                <div className="userProfile__fullName">Name: {userProfile.name}</div>
                <div className="userProfile__email">Email: {userProfile.email}</div>
                <div className="userProfile__creationDate">Member Since: {date}</div>
            </section>
            <Button className="UserQuestions" color="primary" size="sm" outline color="secondary">
                <Link to={`/Question/getByUserId/${userProfileId.id}`} style={{ color: `#000` }}>My Project Questions</Link>
            </Button>
            <Button className="AskQuestion" color="primary" size="sm" outline color="secondary">
                <Link to={"/Question/new"} style={{ color: `#000` }}>Ask a New Question</Link>
            </Button>
            <Card className="UserSkills">
                <Col xs="auto">
                    <h3 className="UserSkillsHeader">Your Current Skills</h3>
                    <div className="AddSkill">
                        <Button className="AddSkillButton" color="primary" size="sm" outline color="secondary">
                            <Link className="addSkill" to={`/userSkill`} style={{ color: `#000` }} >
                                Add a new Skill
                            </Link>
                        </Button>
                    </div>
                    <div className="UserSkill_Cards">{CurrentUserSkills.map(s => {
                        if (s.isKnown === true) {
                            return UserSkill(s)
                        }
                    })}</div>
                </Col>

            </Card>
            <article className="InterestedSkills">
                <h3 className="InterestedSkillsHeader">Your Interests</h3>
                <div className="InterestedSkills_Cards">{CurrentUserSkills.map(s => {
                    if (s.isKnown === false) {
                        return UserSkill(s)
                    }
                })}</div>
            </article>
            <section className="NewPosts">
                <h1 className="News_header">New Posts for {userProfileId.userName}</h1>
                <Col>
                    {posts.map((post) => (
                        <div className="post-card" key={post.id}>
                            <Link to={`/post/GetById/${post.id}`}>
                                <h3 className="posts-title">
                                    {post.title}
                                </h3>
                            </Link>
                            <p className="posts--category">{post.skill?.name}</p>
                            <p className="posts--author">Added by: {post.userProfile?.userName}</p>
                        </div>
                    ))}
                </Col>
            </section>
        </article>

    )
}


