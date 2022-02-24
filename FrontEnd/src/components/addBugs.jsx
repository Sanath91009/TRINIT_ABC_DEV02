import Joi from "joi-browser";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addBug, getTeam } from "../services/teamServices";
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
    async componentDidMount() {
        const teamName = this.props.params.teamName;
        try {
            const { data: team } = await getTeam(teamName);
            let diffRoles = [];
            for (let i = 0; i < team.team_members.length; i++) {
                diffRoles = diffRoles.concat(team.team_members[i].role);
            }
            const diffEmp = team.team_members.map((mem) => {
                return mem.Eemail;
            });
            this.setState({ diffRoles });
            this.setState({ diffEmp });
        } catch (ex) {}
    }

    onSubmit = async () => {
        try {
            const teamName = this.props.params.teamName;
            await addBug(teamName, this.state.account);
            this.setState({ btnName: "Add another bug" });
            toast.success("Bug Added");
        } catch (ex) {}
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
