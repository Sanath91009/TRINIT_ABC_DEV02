import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import { createTeam } from "../services/teamServices";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/authService";
import { addEmployee } from "../services/teamServices";
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
};
class CreateNewTeam extends Form {
    state = {
        account: {
            teamName: "",
        },

        error: {},
    };
    schema = {
        teamName: Joi.string().required().label("Team Name"),
    };

    onSubmit = async () => {
        try {
            const data = await createTeam(this.state.account.teamName);
            console.log("Team Created!!!!!");
            const user = getUser();
            const resp = await addEmployee(
                {
                    Eemail: user.email_id,
                    role: "Admin",
                },
                this.state.account.teamName
            );
            this.props.navigate(
                `/team/${this.state.account.teamName}/addEmployee`
            );
        } catch (ex) {
            console.log(ex.response);
        }
    };
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.HandleSubmit}>
                    {this.renderInput("teamName", "Team Name")}
                    <button className="btn btn-secondary m-1">Next</button>
                </form>
            </React.Fragment>
        );
    }
}

export default withRouter(CreateNewTeam);
