import Joi from "joi-browser";
import React from "react";
import auth from "../services/authService";
import Form from "./form";
class Login extends Form {
    state = {
        account: {
            email_id: "",
            password: "",
        },
        error: {},
    };
    onSubmit = async () => {
        try {
            const { email_id, password } = this.state.account;
            await auth.login(email_id, password);
            window.location = "/home";
        } catch (ex) {
            console.log(ex.response);
            const error = { ...this.state.error };
            if (ex.response.data) error.email_id = ex.response.data;
            this.setState({ error });
        }
    };
    schema = {
        email_id: Joi.string().email().required().label("Email ID"),
        password: Joi.string().required().label("Password"),
    };
    render() {
        return (
            <div>
                <h1>LOGIN</h1>
                <form onSubmit={this.HandleSubmit}>
                    {this.renderInput("email_id", "Email ID", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderbutton("Login")}
                </form>
            </div>
        );
    }
}

export default Login;
