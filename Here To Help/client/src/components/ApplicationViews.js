import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Hello from "../Hello"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { UserProfileList } from "../components/UserProfile/UserProfileList"
import { UserProfileDetails } from "../components/UserProfile/UserProfileDetails"
import { UserProfileProvider } from "../providers/UserProfileProvider"
import { CurrentUserProfileDetails } from "../components/UserProfile/CurrentUserProfile"
import { SkillProvider } from "../providers/SkillProvider"
import { UserSkillProvider } from "../providers/UserSkillProvider"
import { AddUserSkillForm } from "./UserSkill/AddUserSkillForm"
import { PostList } from "./Post/PostList"
import { PostDetails } from "./Post/PostDetails"
import { AddPostForm } from "./Post/AddPost"
import { DeletePost } from "./Post/DeletePost"
import { PostProvider } from "../providers/PostProvider";
import { QuestionProvider } from "../providers/QuestionProvider"
import { QuestionList } from "../components/Question/QuestionList"
import { QuestionDetails } from "../components/Question/QuestionDetails"
import { UserQuestionList } from "../components/Question/UserQuestionList"
import { EditQuestion } from "./Question/EditQuestion";
import { DeleteQuestion } from "./Question/DeleteQuestion"
import { AddQuestionForm } from "./Question/AddQuestion"
import UserSkillSelect from "./UserSkill/UserSkillSelect";
import DeleteUserSkill from "./UserSkill/DeleteUserSkill";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    <UserSkillProvider>
                        <PostProvider>
                            {isLoggedIn ? <CurrentUserProfileDetails /> : <Redirect to="/login" />}
                        </PostProvider>
                    </UserSkillProvider>

                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
                <UserProfileProvider>
                    <Route exact path="/userProfiles">
                        <UserProfileList />
                    </Route>
                    <UserSkillProvider>
                        <Route exact path="/userProfile/detail/getById/:userProfileId(\d+)">
                            <UserProfileDetails />
                        </Route>
                    </UserSkillProvider>
                </UserProfileProvider>

            </Switch>

            <SkillProvider>
                <UserSkillProvider>
                    <Route exact path="/UserSkill">
                        <AddUserSkillForm />
                    </Route>
                    <Route exact path="/userSkill/delete/:userSkillId(\d+)">
                        {isLoggedIn ? <DeleteUserSkill /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/Skill">
                        {isLoggedIn ? <UserSkillSelect /> : <Redirect to="/login" />}
                    </Route>
                </UserSkillProvider>
            </SkillProvider>

            <PostProvider>
                <SkillProvider>
                    <Route exact path="/Post">
                        {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                    </Route>

                    <Route exact path="/Post/GetById/:postId(\d+)">
                        <PostDetails />
                    </Route>

                    <Route exact path="/Posts/NewPost">
                        <AddPostForm />
                    </Route>
                    <Route exact path="/post/delete/:postId(\d+)">
                        {isLoggedIn ? <DeletePost /> : <Redirect to="/login" />}
                    </Route>

                </SkillProvider>
            </PostProvider>


            <QuestionProvider>
                <SkillProvider>
                    <Route exact path="/Question">
                        {isLoggedIn ? <QuestionList /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/Question/getById/:questionId(\d+)">
                        <QuestionDetails />
                    </Route>
                    <Route exact path="/Question/getByUserId/:questionId(\d+)">
                        {isLoggedIn ? <UserQuestionList /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/Question/:questionId(\d+)">
                        {isLoggedIn ? <EditQuestion /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/Question/delete/:questionId(\d+)">
                        {isLoggedIn ? <DeleteQuestion /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/Question/new">
                        {isLoggedIn ? <AddQuestionForm /> : <Redirect to="/" />}
                    </Route>
                </SkillProvider>
            </QuestionProvider>

        </main>
    )
};