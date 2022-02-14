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
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <WrappedComponent {...props} navigate={navigate} location={location} />
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
            const teamName = this.props.location.state.teamName;
            const idx = this.props.location.state.index;
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
            if (roleofUser === "Admin") this.setState({ admin: 1 });
        } catch (ex) {
            console.log("Error in view al bugs cdm");
        }
    }
    HandleChange = async () => {
        try {
            const teamName = this.props.location.state.teamName;
            const idx = this.props.location.state.index;
            const { data: team } = await getTeam(teamName);
            const account = { ...this.state.account };
            account.posts = team.bugs[idx].posts;
            this.setState({ account });
        } catch (ex) {
            console.log("error in viewbuf handle change");
        }
    };
    DeleteComment = async (post) => {
        try {
            const { teamName, index } = this.props.location.state;
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
            const teamName = this.props.location.state.teamName;
            const idx = this.props.location.state.index;
            const { data: team } = await getTeam(teamName);
            let account = { ...this.state.account };
            account = team.bugs[idx];
            this.setState({ account });
            this.setState({ admin: 1 });
        } catch (ex) {
            console.log("handle update error ", ex);
        }
    };
    render() {
        const { teamName, index } = this.props.location.state;
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
