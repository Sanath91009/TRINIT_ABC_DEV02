import React, { Component } from "react";
import Form from "./form";
import { addEmployee } from "../services/teamServices";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getUser } from "../services/authService";
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            location={location}
            navigate={navigate}
            params={params}
        />
    );
};
class AddTeamMembers extends Form {
    state = {
        account: {
            Eemail: "",
            role: "",
        },
        btnName: "Send Invitation",
        visible: "False",
        error: {},
    };
    schema = {
        role: Joi.string().required().label("Role"),
        Eemail: Joi.string().email().required().label("Email ID"),
    };
    onSubmit = async () => {
        try {
            const user = getUser();
            const data = await addEmployee(
                this.state.account,
                this.props.params.teamName,
                user.email_id
            );
            toast.success("Invitation Sent !!");
            this.setState({ btnName: "Send Another Invitation" });
            this.setState({ visible: "True" });
        } catch (ex) {
            if (ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        }
    };
    HandleClick = () => {
        this.props.navigate(`/team/${this.props.params.teamName}/addBugs`);
    };
    render() {
        return (
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
                                {this.state.btnName}
                            </button>
                        </div>
                    </div>
                </form>
                {this.state.visible === "True" ? (
                    <button
                        className="btn btn-primary m-2"
                        onClick={this.HandleClick}
                        style={{ width: "82%" }}
                    >
                        Add bugs
                    </button>
                ) : (
                    <span></span>
                )}
            </div>
        );
    }
}

export default withRouter(AddTeamMembers);
