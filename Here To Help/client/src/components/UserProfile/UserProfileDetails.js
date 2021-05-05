import React, { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider"

export const UserProfileDetails = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext)
    const [userProfile, setUserProfile] = useState({ userProfile: {} })
    const { userProfileId } = useParams()

    useEffect(() => {
        console.log("useEffect", userProfileId)
        getUserProfileById(userProfileId)
            .then((response) => {
                setUserProfile(response)
            })
    }, [])




    console.log(userProfile)
    return (
        <section className="userProfile">
            <h3 className="userProfile__displayName">{userProfile.userName}</h3>
            <div className="userProfile__fullName">Name: {userProfile.name}</div>
            <div className="userProfile__email">Email: {userProfile.email}</div>
            <div className="userProfile__creationDate">Profile Creation Date: {userProfile.createDateTime}</div>
        </section>

    )
}


