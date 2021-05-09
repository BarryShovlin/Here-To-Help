import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "reactstrap";
import { QuestionContext } from "../../providers/QuestionProvider"
import { SkillContext } from "../../providers/SkillProvider"

export const EditQuestion = () => {
    const { editQuestion, getQuestionById, questions } = useContext(QuestionContext);
    const { getAllSkills, skills } = useContext(SkillContext);

    const { questionId } = useParams();

    const [question, setQuestion] = useState({});
    const [skill, setSkills] = useState({});

    useEffect(() => {
        getQuestionById(questionId)
            .then((res) => setQuestion(res))
            .then(getAllSkills)
    }, [])

    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

    const handleControlledInputChange = (event) => {
        const freshQuestion = { ...question };

        freshQuestion[event.target.id] = event.target.value
        setQuestion(freshQuestion);
    }


    const handleSave = () => {
        editQuestion({
            id: question.id,
            title: question.title,
            content: question.content,
            skillId: question.skillId,
        })
    };

    return (
        <section className="post_form">
            <h2 className="post_form_header">Edit</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={question.title} value={question.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea name="content" id="content" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder={question.content} value={question.content} />
                </div>
                <div className="form-group">
                    <label htmlFor="skillId">Skill: </label>
                    <select name="skillId" id="skillId" className="form-control" placeholder={skill.name} onChange={handleControlledInputChange}>
                        <option value="0">Select a skill</option>
                        {skills.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <Button color="primary" onClick={handleSave}>
                <Link className="saveQuestion" to={`/Question/GetById/${question.id}`} style={{ color: `#FFF` }}>
                    Save Post
                </Link>
            </Button>
            <Button color="primary">
                <Link to={`/Question/getByUserId/${currentUser.id}`} style={{ color: `#FFF` }}>Cancel</Link>
            </Button>

        </section>
    );
}
