import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { UserSkillContext } from "../../providers/UserSkillProvider"
import { SkillContext } from "../../providers/SkillProvider"
import { UserSkill } from "../UserSkill/UserSkill"

export const CurrentUserProfileDetails = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext)

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
    }, [])

    const CurrentUserSkills = userSkills.filter(s => s.userProfileId === userProfileId.id)

    return (
        <article>
            <section className="userProfile">
                <h3 className="userProfile__displayName">{userProfile.userName}</h3>
                <div className="userProfile__fullName">Name: {userProfile.name}</div>
                <div className="userProfile__email">Email: {userProfile.email}</div>
                <div className="userProfile__creationDate">Member Since: {userProfile.dateCreated}</div>
            </section>
            <article className="UserSkills">
                <h3 className="UserSkills">Skills You Have</h3>
                <div className="UserSkill_Cards">{CurrentUserSkills.map(s => {
                    return UserSkill(s)
                })}</div>

            </article>
            <section className="NewPosts">
                <h1 className="News_header">New Posts for {userProfile.userName}</h1>

            </section>
        </article>

    )
}


