import Joi from "joi-browser";
import React from "react";
import auth from "../services/authService";
import { register } from "../services/userService";
import Form from "./form";
class RegisterForm extends Form {
    state = {
        account: {
            username: "",
            password: "",
            email_id: "",
        },
        error: {},
    };
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        email_id: Joi.string().email().required().label("Email ID"),
    };
    onSubmit = async () => {
        try {
            const data = await register(this.state.account);
            auth.LoginWithjwt(data.headers["x-auth-token"]);
            window.location = "/home";
        } catch (ex) {
            const error = { ...this.state.error };
            if (ex.reponse.data) error.username = ex.response.data;
            this.setState({ error });
        }
    };
    render() {
        return (
            <div>
                <h1>Registration Form</h1>
                <form onSubmit={this.HandleSubmit}>
                    {this.renderInput("email_id", "Email ID", "email")}
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderbutton("register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
