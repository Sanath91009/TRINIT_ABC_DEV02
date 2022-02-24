import Joi from "joi-browser";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addEmployee } from "../services/teamServices";
import Form from "./form";
import AddTags from "./addTags";
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
            role: [],
        },
        btnName: "Send Invitation",
        visible: "False",
        error: {},
    };
    schema = {
        role: Joi.array().required().label("Role"),
        Eemail: Joi.string().email().required().label("Email ID"),
    };
    onSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = getUser();
            await addEmployee(
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
    HandleEnter = (e) => {
        if (e.key === "Enter") {
            const tags = [...this.state.account[e.target.name], e.target.value];
            const account = { ...this.state.account };
            e.target.value = "";
            account[e.target.name] = tags;
            this.setState({ account });
        }
    };
    HandleRemove = (name, idx) => {
        let tags = [...this.state.account[name]];
        tags = tags.filter((tag, index) => {
            return index !== idx;
        });
        const account = { ...this.state.account };
        account[name] = tags;
        this.setState({ account });
    };
    render() {
        return (
            <div>
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
                        <AddTags
                            label={"Roles"}
                            name={"role"}
                            placeholder="Enter your Roles"
                            onEnter={this.HandleEnter}
                            options={[]}
                            arr={this.state.account.role}
                            onRemove={this.HandleRemove}
                        />
                        <button
                            className="btn btn-primary m-2"
                            onClick={this.HandleSubmit}
                        >
                            {this.state.btnName}
                        </button>
                    </div>
                </div>
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
