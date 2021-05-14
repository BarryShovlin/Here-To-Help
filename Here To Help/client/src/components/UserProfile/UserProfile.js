import React, { useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { useHistory } from "react-router-dom"
import { Button, Card } from "reactstrap"



export const UserProfile = ({ userProfile }) => {

    const history = useHistory();

    return (
        <Card style={{ width: 250 }}>
            <section id="up_card" className="userProfile">
                <h3 className="userProfileTitle">
                    {userProfile.userName}
                </h3>
                <div className="userProfile-realname">{userProfile.name}</div>
                <Button size="sm" className="view_btn" onClick={() => {
                    history.push(`/userProfile/detail/getById/${userProfile.id}`)
                }} > View Profile
            </Button>
            </section >
        </Card>
    )
}

