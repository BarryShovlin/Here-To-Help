import React, { useContext, useEffect, useState } from "react";
import { UserSkillContext } from "../../providers/UserSkillProvider";
import { Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";

export const DeleteUserSkill = () => {
    const { deleteUserSkill, getUserSkillById, userSkills } = useContext(UserSkillContext);

    const { userSkillId } = useParams();

    const history = useHistory();

    const [userSkill, setUserSkill] = useState({})

    useEffect(() => {
        getUserSkillById(userSkillId)
            .then((res) => {
                setUserSkill(res)
            })
    }, [])

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
    console.log(currentUser)
    const handleUserSkillDelete = () => {
        deleteUserSkill(userSkillId)
            .then(history.push("/"))
    }

    const handleCancel = () => {
        history.push("/")
    }

    return (
        <section>
            <div className="delete_message"> Are you sure you want to delete {userSkill.title} from your list?</div>
            <Button className="delete" onClick={handleUserSkillDelete}>Delete</Button>
            <Button className="cancel" onClick={handleCancel}>Cancel</Button>

        </section>
    )
}

export default DeleteUserSkill