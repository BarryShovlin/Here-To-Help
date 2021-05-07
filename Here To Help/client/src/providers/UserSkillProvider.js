
import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const UserSkillContext = React.createContext();

export const UserSkillProvider = (props) => {
    const [userSkills, setUserSkills] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/UserSkill";

    const getAllUserSkills = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setUserSkills));

    const getUserSkillsByUserId = (id) => {
        return getToken().then((token) =>
            fetch(`/api/userSkill/getById/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => res.json()))
    };



    const addUserSkill = (userSkill) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userSkill)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    const deleteUserSkill = (id) =>
        getToken().then((token) =>
            fetch(`/api/userSkill/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(getAllUserSkills()))




    return (
        <UserSkillContext.Provider value={{ userSkills, getAllUserSkills, addUserSkill, getUserSkillsByUserId, deleteUserSkill }}>
            {props.children}
        </UserSkillContext.Provider>
    );
};
export default UserSkillProvider;

