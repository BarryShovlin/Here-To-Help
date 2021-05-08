import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap";
import { QuestionContext } from "../../providers/QuestionProvider"
import { SkillContext } from "../../providers/SkillProvider"
import { UserProfileContext } from "../../providers/UserProfileProvider"


export const AddQuestionForm = () => {

    const { addQuestion, getAllQuestions } = useContext(QuestionContext)
    const { getAllSkills, skills } = useContext(SkillContext)

    const [question, setQuestion] = useState({
        title: "",
        content: "",
        userProfileId: 0,
        skillId: 0
    });

    useEffect(() => {
        getAllQuestions()
            .then(getAllSkills)
    }, [])

    const handleControlledInputChange = (event) => {
        const newQuestion = { ...question };

        newQuestion[event.target.id] = event.target.value
        setQuestion(newQuestion);
    }
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))


    const handleSaveQuestion = () => {
        addQuestion({
            title: question.title,
            content: question.content,
            userProfileId: currentUser.id,
            skillId: question.skillId,
        })
    };

    return (
        <section className="question_form">
            <h2 className="question_form_header">New Question</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={question.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea name="content" id="content" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Content" value={question.content} />
                </div>
                <div className="form-group">
                    <label htmlFor="skillId">Skill: </label>
                    <select name="skillId" id="skillId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a skill</option>
                        {skills.map(skill => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <Button color="primary" onClick={handleSaveQuestion}>
                <Link className="savePost" to={"/Posts"} style={{ color: `#FFF` }}>
                    Ask Question
                </Link>
            </Button>

        </section>
    );
};
export default AddQuestionForm;