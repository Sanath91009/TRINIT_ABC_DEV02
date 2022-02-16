import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import AddTags from "./addTags";
import { addBug, getTeam } from "../services/teamServices";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return (
        <WrappedComponent
            {...props}
            navigate={navigate}
            location={location}
            params={params}
        />
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
        btnName: "Add Bug",
        diffRoles: [],
        diffEmp: [],
        error: {},
    };
    schema = {
        title: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Description"),
        NonVisibleRoles: Joi.array(),
        tags: Joi.array(),
        assigned: Joi.array(),
    };
    async componentDidMount() {
        const teamName = this.props.params.teamName;
        try {
            const { data: team } = await getTeam(teamName);
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
    onSubmit = async () => {
        console.log("Submitted");
        try {
            const teamName = this.props.params.teamName;
            await addBug(teamName, this.state.account);
            this.setState({ btnName: "Add another bug" });
            toast.success("Bug Added");
        } catch (ex) {
            console.log("error in addBugs onSubmit");
        }
    };
    HandleClick = () => {
        this.props.navigate(`/team/${this.props.params.teamName}/Bugs`);
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
                    placeholder="Enter roles"
                    onEnter={this.HandleEnter}
                    options={this.state.diffRoles}
                    arr={this.state.account.NonVisibleRoles}
                    onRemove={this.HandleRemove}
                />
                <AddTags
                    label={"To whom you want to assign this bug"}
                    name={"assigned"}
                    placeholder="Enter your talents mailid"
                    onEnter={this.HandleEnter}
                    options={this.state.diffEmp}
                    arr={this.state.account.assigned}
                    onRemove={this.HandleRemove}
                />
                <button
                    className="btn btn-primary m-2"
                    onClick={this.HandleSubmit}
                >
                    {this.state.btnName}
                </button>
                {this.state.btnName === "Add another bug" && (
                    <button
                        className="btn btn-primary m-2"
                        onClick={this.HandleClick}
                    >
                        View All Bugs
                    </button>
                )}
            </div>
        );
    }
}

export default withRouter(AddBugs);
