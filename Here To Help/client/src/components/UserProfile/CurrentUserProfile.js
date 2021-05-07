import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { UserSkillContext } from "../../providers/UserSkillProvider"
import { SkillContext } from "../../providers/SkillProvider"
import { UserSkill } from "../UserSkill/UserSkill"
import { Button } from "reactstrap"
import { PostContext } from "../../providers/PostProvider"

export const CurrentUserProfileDetails = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext)
    const { posts, getPosts } = useContext(PostContext);
    const { userSkills, getUserSkillsByUserId, getAllUserSkills } = useContext(UserSkillContext)


    const [userProfile, setUserProfile] = useState({ userProfile: {} })



    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {

        getUserProfileById(userProfileId.id)
            .then((response) => {
                setUserProfile(response)
            })
            .then(getUserSkillsByUserId(userProfileId.id))
    }, [])

    useEffect(() => {
        getAllUserSkills()
            .then(getPosts())
    }, [])

    const CurrentUserSkills = userSkills.filter(s => s.userProfileId === userProfileId.id)
    const date = new Date(userProfile.dateCreated).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
    const userSkillPosts = posts.map(p => {
        return CurrentUserSkills.filter(s => s.SkillId === p.SKillId)
    })

    return (

        <article>
            <section className="userProfile">
                <h3 className="userProfile__displayName">{userProfile.userName}</h3>
                <div className="userProfile__fullName">Name: {userProfile.name}</div>
                <div className="userProfile__email">Email: {userProfile.email}</div>
                <div className="userProfile__creationDate">Member Since: {date}</div>
            </section>
            <article className="UserSkills">
                <h3 className="UserSkillsHeader">Skills You Have</h3>
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

            </article>
            <article className="InterestedSkills">
                <h3 className="InterestedSkillsHeader">Your Interests</h3>
                <div className="InterestedSkills_Cards">{CurrentUserSkills.map(s => {
                    if (s.isKnown === false) {
                        return UserSkill(s)
                    }
                })}</div>
            </article>
            <section className="NewPosts">
                <h1 className="News_header">New Posts for {userProfile.userName}</h1>
                <div className="UserInterestPosts">{userSkillPosts.map()}</div>

            </section>
        </article>

    )
}


