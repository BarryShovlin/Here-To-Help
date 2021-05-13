import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
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
import { EditPost } from "./Post/EditPost"
import { QuestionProvider } from "../providers/QuestionProvider"
import { QuestionList } from "../components/Question/QuestionList"
import { QuestionDetails } from "../components/Question/QuestionDetails"
import { UserQuestionList } from "../components/Question/UserQuestionList"
import { EditQuestion } from "./Question/EditQuestion";
import { DeleteQuestion } from "./Question/DeleteQuestion"
import { AddQuestionForm } from "./Question/AddQuestion"
import UserSkillSelect from "./UserSkill/UserSkillSelect";
import DeleteUserSkill from "./UserSkill/DeleteUserSkill";
import { PostCommentProvider } from "../providers/PostCommentProvider"
import { PostCommentList } from "./PostComments/PostCommentList"
import { PostCommentForm } from "./PostComments/PostCommentForm"
import PostCommentDeleteForm from "./PostComments/PostCommentDelete";
import { QuestionCommentProvider } from "../providers/QuestionCommentProvider"
import { QuestionCommentList } from "./QuestionComments/QuestionCommentList"
import { QuestionCommentForm } from "./QuestionComments/QuestionCommentForm"
import { QuestionCommentDeleteForm } from "./QuestionComments/QuestionCommentDelete"
import { SkillTagProvider } from "../providers/SkillTagProvider"
import { SkillTagForm } from "./SkillTag/AddSkillTag"
import { SkillTagDeleteForm } from "./SkillTag/DeleteSkillTag"
import { SearchPostList } from "./Post/SearchPostList"



export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <SkillProvider>
                    <UserSkillProvider>
                        <PostProvider>
                            <QuestionProvider>
                                <QuestionCommentProvider>
                                    <PostCommentProvider>
                                        <SkillTagProvider>

                                            <Route path="/" exact>
                                                {isLoggedIn ? <CurrentUserProfileDetails /> : <Redirect to="/login" />}
                                            </Route>

                                            <Route path="/login">
                                                <Login />
                                            </Route>

                                            <Route path="/register">
                                                <Register />
                                            </Route>

                                            <Route exact path="/userProfiles">
                                                {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/userProfile/detail/getById/:userProfileId(\d+)">
                                                {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login" />}
                                            </Route>

                                            <Route exact path="/UserSkill">
                                                <AddUserSkillForm />
                                            </Route>
                                            <Route exact path="/userSkill/delete/:userSkillId(\d+)">
                                                {isLoggedIn ? <DeleteUserSkill /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/Skill">
                                                {isLoggedIn ? <UserSkillSelect /> : <Redirect to="/login" />}
                                            </Route>

                                            <Route exact path="/Post">
                                                {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                                            </Route>

                                            <Route exact path="/Post/GetById/:postId(\d+)">
                                                <PostDetails />
                                            </Route>
                                            <Route exact path="/Post/:postId(\d+)">
                                                {isLoggedIn ? <EditPost /> : <Redirect to="/login" />}
                                            </Route>

                                            <Route exact path="/Posts/NewPost">
                                                <AddPostForm />
                                            </Route>
                                            <Route exact path="/post/delete/:postId(\d+)">
                                                {isLoggedIn ? <DeletePost /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/PostComment/getByPostId/:postId(\d+)">
                                                {isLoggedIn ? <PostCommentList /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/PostComment/create/:postId(\d+)">
                                                {isLoggedIn ? <PostCommentForm /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/PostComment/delete/:postCommentId(\d+)">
                                                {isLoggedIn ? <PostCommentDeleteForm /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/SkillTag/create/:postId(\d+)">
                                                {isLoggedIn ? <SkillTagForm /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/SkillTag/delete/:skillTagId(\d+)">
                                                {isLoggedIn ? <SkillTagDeleteForm /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/Post/search?q=:criterion(\d+)">
                                                {isLoggedIn ? <SearchPostList /> : <Redirect to="/login" />}
                                            </Route>

                                            <Route exact path="/Question">
                                                {isLoggedIn ? <QuestionList /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/Question/getById/:questionId(\d+)">
                                                {isLoggedIn ? <QuestionDetails /> : <Redirect to="login" />}
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
                                            <Route exact path="/QuestionComment/getByQuestionId/:questionId(\d+)">
                                                {isLoggedIn ? <QuestionCommentList /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/QuestionComment/create/:questionId(\d+)">
                                                {isLoggedIn ? <QuestionCommentForm /> : <Redirect to="/login" />}
                                            </Route>
                                            <Route exact path="/QuestionComment/delete/:questionCommentId(\d+)">
                                                {isLoggedIn ? <QuestionCommentDeleteForm /> : <Redirect to="/login" />}
                                            </Route>
                                        </SkillTagProvider>
                                    </PostCommentProvider>
                                </QuestionCommentProvider>
                            </QuestionProvider>
                        </PostProvider>
                    </UserSkillProvider>
                </SkillProvider>
            </Switch>
        </main>
    )
};