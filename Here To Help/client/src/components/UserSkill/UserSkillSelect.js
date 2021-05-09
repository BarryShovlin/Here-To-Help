import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap";
import { SkillContext } from "../../providers/SkillProvider"
import { UserSkillContext } from "../../providers/UserSkillProvider"


export const UserSkillSelect = () => {

    const { addUserSkill, getAllUserSkills } = useContext(UserSkillContext)
    const { getAllSkills, skills } = useContext(SkillContext)
    const [userSkill, setUserSkill] = useState({
        skillId: 0,
        userProfileId: 0,
        isKnown: false
    });
    const [skill] = useState({})


    useEffect(() => {
        getAllUserSkills()
            .then(getAllSkills)
        console.log(skill)
    }, [])

    console.log(skill)

    const handleControlledInputChange = (event) => {
        const newUserSkill = { ...userSkill };

        newUserSkill[event.target.id] = event.target.value
        setUserSkill(newUserSkill);
    }

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    const handleSaveUserSkill = () => {
        addUserSkill({
            skillId: userSkill.skillId,
            userProfileId: currentUser.id,
            isKnown: false
        })


    };

    return (
        <section className="post_form">
            <h2 className="post_form_header">What Are You Interested In Learning More About?</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillId">Skill: </label>
                    <select name="skillId" id="skillId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a Skill</option>
                        {skills.map(skill => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <Button color="primary" onClick={handleSaveUserSkill}>
                <Link className="saveUserSkill" to={"/"} style={{ color: `#FFF` }}>
                    Save and return to your profile page
                </Link>
            </Button>
            <Button color="primary" onClick={handleSaveUserSkill}>
                <Link className="saveUserSkill" to={"/Skill"} style={{ color: `#FFF` }}>
                    Save and add another interest
                </Link>
            </Button>

        </section>
    );
};
export default UserSkillSelect;