import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import { createTeam } from "../services/teamServices";
import { useLocation, useNavigate } from "react-router-dom";
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
            this.props.navigate("/addTeamMembers", {
                state: {
                    teamName: this.state.account.teamName,
                },
            });
        } catch (ex) {
            console.log(ex);
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
