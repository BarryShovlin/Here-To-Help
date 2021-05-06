import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";


export const UserSkill = ({ skill }) => {
    return (
        <>
            <Card className="m-4 category-card">
                <CardBody>
                    <p>
                        <strong>{skill.name}</strong>
                    </p>
                    <Button className="button" color="primary" size="sm" outline color="secondary">
                        <Link className=" deleteCategory" to={`/userSkill/delete/${skill.id}`} style={{ color: `#000` }} >
                            Delete
                            </Link>
                    </Button>
                </CardBody>
            </Card>

        </>

    );
};

export default UserSkill;