import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap";
import { SkillContext } from "../../providers/SkillProvider"
import { UserSkillContext } from "../../providers/UserSkillProvider"


export const AddUserSkillForm = () => {

    const { addUserSkill, getAllUserSkills } = useContext(UserSkillContext)
    const { getAllSkills, skills } = useContext(SkillContext)
    const [userSkill, setUserSkill] = useState({
        Name: "",
        SkillId: 0,
        iUserProfileId: 0,
        IsKnown: false
    });
    const [skill] = useState({})


    useEffect(() => {
        getAllUserSkills()
            .then(getAllSkills)
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
            Name: skill.name,
            SkillId: skill.id,
            UserProfileId: currentUser.id,
            IsKnown: true
        })

    };

    return (
        <section className="post_form">
            <h2 className="post_form_header">What kind of projects can you help other users accomplish?</h2>
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
                <Link className="saveUserSkill" to={"/UserSkill"} style={{ color: `#FFF` }}>
                    Save This to your skillset
                </Link>
            </Button>

        </section>
    );
};
export default AddUserSkillForm;