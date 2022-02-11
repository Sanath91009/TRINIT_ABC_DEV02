import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router";
import Joi from "joi-browser";
import Form from "./form";
import { getRoleOfUser, getTeam, editEmployee } from "../services/teamServices";
import { toast } from "react-toastify";
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <WrappedComponent {...props} navigate={navigate} location={location} />
    );
};
class EditEmployee extends Form {
    state = {
        account: {
            Eemail: "",
            role: "",
        },
        idx: 0,
        error: {},
    };
    schema = {
        role: Joi.string().required().label("Role"),
        Eemail: Joi.string().email().required().label("Email ID"),
    };
    async componentDidMount() {
        try {
            const teamName = this.props.location.state.teamName;
            const Eemail = this.props.location.state.Eemail;
            const { data: role } = await getRoleOfUser(teamName, Eemail);
            const { data: team } = await getTeam(teamName);
            const idx = team.team_members.Eemail.indexOf(Eemail);
            this.setState({ idx });
            this.setState({ account: { Eemail, role } });
        } catch (ex) {
            console.log("Error at Edit employee cdm ", ex);
        }
    }
    onSubmit = async () => {
        try {
            const teamName = this.props.location.state.teamName;
            const Eemail = this.state.account.Eemail;
            const role = this.state.account.role;
            await editEmployee(this.state.idx, teamName, Eemail, role);
            toast.success("Updated Sucessfully");
        } catch (ex) {
            console.log("Error at onSubmit Edit Employee");
        }
    };
    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.HandleSubmit}>
                        <h4>Employee's Details</h4>
                        <div className="container m-0">
                            <div className="row">
                                <div className="col">
                                    {this.renderInput(
                                        "Eemail",
                                        "Employee email",
                                        "email"
                                    )}
                                </div>
                                <div className="col">
                                    {this.renderInput("role", "Role")}
                                </div>
                                <button className="btn btn-primary m-2">
                                    Update Info
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(EditEmployee);
