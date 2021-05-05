import React, { useContext, useEffect } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { UserProfile } from "./UserProfile"
import { useParams } from "react-router-dom"
// import "./User.css"


export const UserProfileList = () => {

    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext)

    useEffect(() => {
        console.log("UserList: useEffect - getUsers")
        getAllUserProfiles()
    }, [])

    return (
        <div className="userProfiles">
            {console.log("UserList: Render", userProfiles)}
            <h3>User Profiles</h3>
            {
                userProfiles.map(userProfile => {
                    return <UserProfile key={userProfile.id} userProfile={userProfile} />
                })
            }
        </div>
    )
}
