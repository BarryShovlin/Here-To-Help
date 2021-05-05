import React, { useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { Link } from "react-router-dom"



export const UserProfile = ({ userProfile }) => {

    return (
        <section className="userProfile">
            <h3 className="userProfileTitle">
                <Link to={`/userProfile/detail/getById/${userProfile.id}`}>
                    {userProfile.userName}
                </Link>
            </h3>
        </section>
    )
}