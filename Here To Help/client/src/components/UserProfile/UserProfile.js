import React, { useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { useHistory } from "react-router-dom"
import { Button, Card } from "reactstrap"



export const UserProfile = ({ userProfile }) => {

    const history = useHistory();

    return (
        <Card>
            <section className="userProfile">
                <h3 className="userProfileTitle">
                    {userProfile.userName}
                </h3>
                <div className="userProfile-realname">{userProfile.name}</div>
                <Button onClick={() => {
                    history.push(`/userProfile/detail/getById/${userProfile.id}`)
                }} > View Profile
            </Button>
            </section >
        </Card>
    )
}

