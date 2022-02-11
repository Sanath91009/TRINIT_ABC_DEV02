import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";
import AddTags from "./addTags";
import { addBug } from "../services/teamServices";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
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
            // assigned: [],
        },
        btnName: "Add Bug",
        error: {},
    };
    schema = {
        title: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Description"),
        NonVisibleRoles: Joi.array(),
        tags: Joi.array(),
    };
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
        console.log("Submitted");
        try {
            const teamName = this.props.location.state.teamName;
            await addBug(teamName, this.state.account);
            this.setState({ btnName: "Add another bug" });
            toast.success("Bug Added");
        } catch (ex) {
            console.log("error in addBugs onSubmit");
        }
    };
    HandleClick = () => {
        this.props.navigate("/viewAllBugs", {
            state: {
                teamName: this.props.location.state.teamName,
            },
        });
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
                    arr={this.state.account.tags}
                    onRemove={this.HandleRemove}
                />
                <AddTags
                    label={"Roles Which Cannot See this Bug"}
                    name={"NonVisibleRoles"}
                    onEnter={this.HandleEnter}
                    arr={this.state.account.NonVisibleRoles}
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
