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

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    <UserSkillProvider>
                        {isLoggedIn ? <CurrentUserProfileDetails /> : <Redirect to="/login" />}
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
                </UserSkillProvider>
            </SkillProvider>


        </main>
    )
};