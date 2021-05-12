
import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const SkillContext = React.createContext();

export const SkillProvider = (props) => {
    const [skills, setSkills] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/Skill";

    const getAllSkills = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setSkills));

    const getSkillById = (id) =>
        getToken().then((token) =>
            fetch(`/api/skill/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => res.json()))



    const addSkill = (skill) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(skill)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    const deleteSkill = (id) =>
        getToken().then((token) =>
            fetch(`/api/skill/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(getAllSkills()))




    return (
        <SkillContext.Provider value={{ skills, getAllSkills, addSkill, getSkillById, deleteSkill }}>
            {props.children}
        </SkillContext.Provider>
    );
};
export default SkillProvider;

