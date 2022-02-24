import Joi from "joi-browser";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/authService";
import { addEmployee, createTeam } from "../services/teamServices";
import Form from "./form";
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
            await createTeam(this.state.account.teamName);
            console.log("Team Created!!!!!");
            const user = getUser();
            await addEmployee(
                {
                    Eemail: user.email_id,
                    role: "Admin",
                },
                this.state.account.teamName,
                user.email_id
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
