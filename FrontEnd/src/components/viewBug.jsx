import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router";
import ViewBugAdmin from "./viewBugAdmin";
import ViewBugRem from "./viewBugRem";
import ViewPosts from "./viewPosts";
import WritePost from "./WritePost";
import { getRoleOfUser, getTeam } from "../services/teamServices";
import { getUser } from "../services/authService";
import { deletePost } from "../services/teamServices";
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
class ViewBug extends Component {
    state = {
        account: {
            title: "",
            description: "",
            NonVisibleRoles: [],
            tags: [],
            assigned: [],
            posts: [],
        },
        admin: 0,
    };
    async componentDidMount() {
        try {
            const teamName = this.props.params.teamName;
            const idx = this.props.params.index;
            const { data: team } = await getTeam(teamName);
            const bug = { ...team.bugs[idx] };
            delete bug._id;
            this.setState({
                account: bug,
            });

            const user = getUser();
            const { data: roleofUser } = await getRoleOfUser(
                teamName,
                user.email_id
            );

            if (roleofUser.findIndex((r) => r === "Admin") !== -1)
                this.setState({ admin: 1 });
        } catch (ex) {}
    }
    HandleChange = async () => {
        try {
            const teamName = this.props.params.teamName;
            const idx = this.props.params.index;
            const { data: team } = await getTeam(teamName);
            const account = { ...this.state.account };
            account.posts = team.bugs[idx].posts;
            this.setState({ account });
        } catch (ex) {}
    };
    DeleteComment = async (post) => {
        try {
            const { teamName, index } = this.props.params;
            await deletePost(teamName, index, post);
            toast.success("Comment Deleted");
            const { data: team } = await getTeam(teamName);
            let account = { ...this.state.account };
            account.posts = team.bugs[index].posts;
            this.setState({ account });
        } catch (ex) {}
    };
    handleEdit = () => {
        this.setState({ admin: 2 });
    };
    handleUpdate = async () => {
        try {
            const teamName = this.props.params.teamName;
            const idx = this.props.params.index;
            const { data: team } = await getTeam(teamName);
            let account = { ...this.state.account };
            account = team.bugs[idx];
            this.setState({ account });
            this.setState({ admin: 1 });
        } catch (ex) {}
    };
    render() {
        const { teamName, index } = this.props.params;
        return (
            <div>
                {this.state.admin === 2 ? (
                    <ViewBugAdmin
                        teamName={teamName}
                        bugidx={index}
                        onUpdate={this.handleUpdate}
                    />
                ) : (
                    <ViewBugRem
                        bug={this.state.account}
                        admin={this.state.admin}
                        onEdit={this.handleEdit}
                    />
                )}
                <WritePost
                    teamName={teamName}
                    bugidx={index}
                    onChange={this.HandleChange}
                />
                <ViewPosts
                    posts={this.state.account.posts}
                    onDelete={this.DeleteComment}
                    admin={this.state.admin}
                />
            </div>
        );
    }
}

export default withRouter(ViewBug);
