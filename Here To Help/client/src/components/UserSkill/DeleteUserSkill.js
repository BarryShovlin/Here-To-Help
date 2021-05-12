import React, { useContext, useEffect, useState } from "react";
import { UserSkillContext } from "../../providers/UserSkillProvider";
import { Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";

export const DeleteUserSkill = () => {
    const { deleteUserSkill, getAllUserSkills, getUserSkillById, userSkills } = useContext(UserSkillContext);

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
        deleteUserSkill(userSkill.id)
            .then(getAllUserSkills())
            .then(history.push("/"))
    }

    const handleCancel = () => {
        history.push("/")
    }

    console.log(userSkill)

    return (
        <section>
            <div className="delete_message"> Are you sure you want to delete {userSkill.skill?.name} from your list?</div>
            <Button className="delete" onClick={handleUserSkillDelete}>Delete</Button>
            <Button className="cancel" onClick={handleCancel}>Cancel</Button>

        </section>
    )
}

export default DeleteUserSkill