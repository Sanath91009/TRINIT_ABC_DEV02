import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router";
import { getRoleOfUser, getTeam } from "../services/teamServices";
import "../css/viewAllBugs.css";
import { getUser } from "./../services/authService";
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <WrappedComponent {...props} navigate={navigate} location={location} />
    );
};
class ViewAllBugs extends Component {
    state = {
        team: null,
        roleofUser: null,
        admin: 0,
    };

    HandleClick2 = () => {
        this.props.navigate("/addBugs", {
            state: {
                teamName: this.props.location.state.teamName,
            },
        });
    };
    async componentDidMount() {
        try {
            const teamName = this.props.location.state.teamName;
            const user = getUser();
            const { data: roleofUser } = await getRoleOfUser(
                teamName,
                user.email_id
            );
            if (roleofUser === "Admin") this.setState({ admin: 1 });
            const { data: team } = await getTeam(teamName);
            this.setState({ roleofUser });
            this.setState({ team });
        } catch (ex) {
            console.log("Error in view al bugs cdm");
        }
    }
    HandleClick = (index) => {
        const teamName = this.props.location.state.teamName;
        this.props.navigate("/viewBug", {
            state: {
                teamName: teamName,
                index: index,
            },
        });
    };
    render() {
        const teamName = this.props.location.state.teamName;
        if (this.state.team === null) return <div></div>;
        const team = { ...this.state.team };
        console.log(team.bugs);
        return (
            <div className="container">
                <div className="mb-4">
                    <h2 className="teamName">Team Name : {teamName}</h2>
                    <button
                        className="btn btn-primary m-2 add"
                        onClick={this.HandleClick2}
                    >
                        Add bugs
                    </button>
                </div>
                {team.bugs.map((bug, index) => {
                    if (bug == null) return;
                    const arr = bug.NonVisibleRoles;
                    let desc = bug.description;
                    return (
                        arr.find((r) => {
                            return r == this.state.roleofUser;
                        }) === undefined && (
                            <div
                                className="bug"
                                key={index}
                                onClick={() => this.HandleClick(index)}
                            >
                                <h5>Title : {bug.title}</h5>
                                {bug.tags.map((tag) => {
                                    return (
                                        <button
                                            className="btn btn-primary m-1"
                                            key={tag}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                                <p>{desc}</p>
                            </div>
                        )
                    );
                })}
            </div>
        );
    }
}

export default withRouter(ViewAllBugs);
