import React, { useContext, useEffect, useState } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { UserSkillContext } from "../../providers/UserSkillProvider"
import { UserSkill } from "../UserSkill/UserSkill"
import { Button } from "reactstrap"
import { QuestionContext } from "../../providers/QuestionProvider"

export const UserProfileDetails = () => {

    const { userProfiles, getUserProfileById } = useContext(UserProfileContext)
    const { userSkills, getUserSkillsByUserId, getAllUserSkills } = useContext(UserSkillContext);
    const { questions, getQuestionsByUserId } = useContext(QuestionContext);
    const [userProfile, setUserProfile] = useState({ userProfile: {} })
    const { userProfileId } = useParams()
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", userProfileId)
        getUserProfileById(userProfileId)
            .then((response) => {
                setUserProfile(response)
                getUserSkillsByUserId(userProfileId)
                getQuestionsByUserId(userProfileId)
                console.log(questions)
            })
    }, [])

    useEffect(() => {
        getAllUserSkills()
    }, [])

    const date = new Date(userProfile.dateCreated).toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })

    console.log(userSkills)
    return (
        <section className="userProfile">
            <h3 className="userProfile__displayName">{userProfile.userName}</h3>
            <div className="userProfile__fullName">Name: {userProfile.name}</div>
            <div className="userProfile__email">Email: {userProfile.email}</div>
            <div className="userProfile__creationDate">Member Since: {date}</div>
            <div className="ProfileUserSkills"> Can Help With:
                {userSkills.map(s => {
                if (s.isKnown === true) {
                    return <ul>
                        <li>{s.skill?.name}</li>
                    </ul>
                }
            })}
            </div>
            <div className="userProfile_Interests">
                Would Like to Learn: {userSkills.map(s => {
                if (s.isKnown === false) {
                    return <ul>
                        <li>{s.skill?.name}</li>
                    </ul>
                }
            })}
            </div>
            <div className="userProfileQuestions">
                <h3>View Their Project Questions</h3>
                {questions.map(q => {
                    //return <Button onClick={() => history.push(`/Question/GetById/${q.id}`)}>
                    //     {q.title}
                    // </Button>

                    return <ul>
                        <li><Link to={`/Question/GetById/${q.id}`}>{q.title}</Link></li>
                    </ul>

                })}
            </div>

        </section>


    )
}


