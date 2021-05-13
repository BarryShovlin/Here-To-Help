import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "./providers/UserProfileProvider";
import "./Header.css"

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className="nav-bar-link-container" light expand="md">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <NavItem className="nav-bar-link-container">
                                <NavLink tag={RRNavLink} className="nav-link" to="/">Home</NavLink>
                                <NavLink tag={RRNavLink} className="nav-link" to="/userProfiles">User Profiles</NavLink>
                                <NavLink tag={RRNavLink} className="nav-link" to="/Skill">Learn New Skills</NavLink>
                                <NavLink tag={RRNavLink} className="nav-link" to="/Question">Help Out</NavLink>
                                <NavLink tag={RRNavLink} className="nav-link" to="/Post">All Posts</NavLink>
                                <NavLink tag={RRNavLink} className="nav-link" to="/Posts/NewPost">New Post</NavLink>
                            </NavItem>
                        }
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
