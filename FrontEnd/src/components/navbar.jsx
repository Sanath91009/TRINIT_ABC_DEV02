import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Vidly
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link active"
                                aria-current="page"
                                to="/movies"
                            >
                                Movies
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">
                                Customers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rentals">
                                Rentals
                            </NavLink>
                        </li>
                        {props.user ? (
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">
                                        {props.user.name}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/logout">
                                        logout
                                    </NavLink>
                                </li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/register"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
