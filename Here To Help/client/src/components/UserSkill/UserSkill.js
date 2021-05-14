import React from "react";
import { Card, CardBody, Button, Table } from "reactstrap";
import { Link } from "react-router-dom";


export const UserSkill = ({ skill }) => {
    return (
        <>

            <div>
                <Link className=" deleteUserSkill" to={`/userSkill/delete/${skill.id}`} style={{ color: `#000` }} >
                    {skill.name}
                </Link>
            </div>

        </>

    );
};

export default UserSkill;