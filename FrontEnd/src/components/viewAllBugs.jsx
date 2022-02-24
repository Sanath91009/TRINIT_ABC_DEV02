import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import "../css/viewAllBugs.css";
import { getRoleOfUser, getTeam } from "../services/teamServices";
import { getUser } from "./../services/authService";
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
class ViewAllBugs extends Component {
    state = {
        team: null,
        roleofUser: null,
        admin: 0,
    };

    HandleClick2 = () => {
        this.props.navigate(`/team/${this.props.params.teamName}/addBugs`);
    };
    async componentDidMount() {
        try {
            const teamName = this.props.params.teamName;
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
            console.log("Error in view all bugs cdm");
        }
    }
    HandleClick = (index) => {
        const teamName = this.props.params.teamName;
        this.props.navigate(`/team/${teamName}/Bug/${index}`);
    };
    render() {
        const teamName = this.props.params.teamName;
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
                    if (bug === null) return null;
                    const arr = bug.NonVisibleRoles;
                    let desc = bug.description;
                    return (
                        arr.find((r) => {
                            return r === this.state.roleofUser;
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
