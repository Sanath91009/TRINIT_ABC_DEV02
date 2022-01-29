import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
class Login extends Form {
    state = {
        account: {
            username: "",
            password: "",
        },
        error: {},
    };
    onSubmit = async () => {
        try {
            const { username, password } = this.state.account;
            await auth.login(username, password);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {
            console.log(ex.response);
            const error = { ...this.state.error };
            error.username = ex.response.data;
            this.setState({ error });
        }
    };
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };
    render() {
        if (auth.getCurrentUser()) return <Redirect to="/" />;
        return (
            <div>
                <h1>LOGIN</h1>
                <form onSubmit={this.HandleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderbutton("Login")}
                </form>
            </div>
        );
    }
}

export default Login;
