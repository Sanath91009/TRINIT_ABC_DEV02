import Joi from "joi-browser";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteBug, getTeam, updateBug } from "../services/teamServices";
import AddTags from "./addTags";
import Form from "./form";
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
class ViewBugAdmin extends Form {
    state = {
        account: {
            title: "",
            description: "",
            NonVisibleRoles: [],
            tags: [],
            assigned: [],
            posts: [],
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
        posts: Joi.array(),
    };
    async componentDidMount() {
        const { teamName, bugidx } = this.props;
        try {
            const { data: team } = await getTeam(teamName);
            const bug = { ...team.bugs[bugidx] };
            delete bug._id;
            this.setState({
                account: bug,
            });
            const diffRoles = team.team_members.role.filter(
                (role, index) => team.team_members.role.indexOf(role) === index
            );
            this.setState({ diffRoles });
            this.setState({ diffEmp: team.team_members.Eemail });
        } catch (ex) {}
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
        try {
            const teamName = this.props.params.teamName;
            const idx = this.props.params.index;
            await updateBug(teamName, this.state.account, idx);
            toast.success("Bug Updated");
            this.props.onUpdate();
        } catch (ex) {}
    };
    HandleClick = async () => {
        try {
            const { teamName, bugidx } = this.props;
            await deleteBug(teamName, bugidx);
            toast.success("Deleted Bug");
            this.props.navigate(`/team/${this.props.params.teamName}/Bugs`);
        } catch (ex) {}
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

export default withRouter(ViewBugAdmin);
