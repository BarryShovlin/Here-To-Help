import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Hello from "../Hello"
import { UserProfileContext } from "../providers/UserProfileProvider"

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

            </Switch>

        </main>
    )
};