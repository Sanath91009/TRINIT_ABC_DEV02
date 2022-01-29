import React, { Component } from "react";
import Form from "./form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import auth from "../services/authService";
class RegisterForm extends Form {
    state = {
        account: {
            username: "",
            password: "",
            name: "",
        },
        error: {},
    };
    schema = {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name"),
    };
    onSubmit = async () => {
        try {
            const data = await register(this.state.account);
            auth.LoginWithjwt(data.headers["x-auth-token"]);
            this.props.history.push("/movies");
        } catch (ex) {
            const error = { ...this.state.error };
            error.username = ex.response.data;
            this.setState({ error });
        }
    };
    render() {
        return (
            <div>
                <h1>Registration Form</h1>
                <form onSubmit={this.HandleSubmit}>
                    {this.renderInput("username", "Username", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderbutton("register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
