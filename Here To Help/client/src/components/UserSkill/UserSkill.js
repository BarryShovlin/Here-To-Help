import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";


export const UserSkill = ({ skill }) => {
    return (
        <>
            <ul>
                <li>
                    <strong>{skill.name}</strong>
                    <Link className=" deleteUserSkill" to={`/userSkill/delete/${skill.id}`} style={{ color: `#000` }} >
                        ](Delete)
                            </Link>
                </li>
            </ul>
        </>

    );
};

export default UserSkill;