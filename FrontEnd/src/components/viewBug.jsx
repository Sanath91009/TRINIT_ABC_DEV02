import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import AddTags from "./addTags";
import {
    addBug,
    deleteBug,
    getRoleOfUser,
    getTeam,
    updateBug,
} from "../services/teamServices";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { getUser } from "./../services/authService";
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <WrappedComponent {...props} navigate={navigate} location={location} />
    );
};
class AddBugs extends Form {
    state = {
        account: {
            title: "",
            description: "",
            NonVisibleRoles: [],
            tags: [],
            assigned: [],
        },
        diffRoles: [],
        diffEmp: [],
        error: {},
        admin: 0,
    };
    schema = {
        title: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Description"),
        NonVisibleRoles: Joi.array(),
        tags: Joi.array(),
        assigned: Joi.array(),
    };
    async componentDidMount() {
        const teamName = this.props.location.state.teamName;
        try {
            const { data: team } = await getTeam(teamName);
            const bug = { ...team.bugs[this.props.location.state.index] };
            delete bug._id;
            console.log(bug);
            this.setState({
                account: bug,
            });
            const diffRoles = team.team_members.role.filter(
                (role, index) => team.team_members.role.indexOf(role) === index
            );
            this.setState({ diffRoles });
            this.setState({ diffEmp: team.team_members.Eemail });
        } catch (ex) {
            console.log("Error in addBugs CDM");
        }
    }

    HandleEnter = (e) => {
        if (e.key === "Enter") {
            console.log("entered", e.target.name);
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
            return index != idx;
        });
        const account = { ...this.state.account };
        account[name] = tags;
        this.setState({ account });
    };
    onSubmit = async () => {
        console.log("updated");
        try {
            const teamName = this.props.location.state.teamName;
            const idx = this.props.location.state.index;
            await updateBug(teamName, this.state.account, idx);
            toast.success("Bug Updated");
        } catch (ex) {
            console.log("error in addBugs onSubmit", ex);
        }
    };
    HandleClick = async () => {
        console.log("Deleted");
        try {
            const teamName = this.props.location.state.teamName;
            const index = this.props.location.state.index;
            await deleteBug(teamName, index);
            toast.success("Deleted Bug");
            this.props.navigate("/viewAllBugs", {
                state: {
                    teamName: teamName,
                },
            });
        } catch (ex) {
            console.log("Error in viewBug handleClick", ex);
        }
    };
    render() {
        return (
            <div>
                {this.renderInput("title", "Title")}
                {this.renderInput("description", "Description")}
                <AddTags
                    label={"Bug Tags"}
                    name={"tags"}
                    onEnter={this.HandleEnter}
                    placeholder="Enter your tags"
                    options={[]}
                    arr={this.state.account.tags}
                    onRemove={this.HandleRemove}
                />
                <AddTags
                    label={"Roles who Cannot See this Bug"}
                    name={"NonVisibleRoles"}
                    onEnter={this.HandleEnter}
                    placeholder="Enter your roles"
                    options={this.state.diffRoles}
                    arr={this.state.account.NonVisibleRoles}
                    onRemove={this.HandleRemove}
                />
                <AddTags
                    label={"To whom you want to assign this bug"}
                    name={"assigned"}
                    onEnter={this.HandleEnter}
                    placeholder="Enter your talents maild"
                    options={this.state.diffEmp}
                    arr={this.state.account.assigned}
                    onRemove={this.HandleRemove}
                />
                <button
                    className="btn btn-primary m-2"
                    onClick={this.HandleSubmit}
                >
                    Update Bug
                </button>
                <button
                    className="btn btn-danger m-2"
                    onClick={this.HandleClick}
                >
                    Remove Bug
                </button>
            </div>
        );
    }
}

export default withRouter(AddBugs);
