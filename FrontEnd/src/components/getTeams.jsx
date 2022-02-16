import React, { Component } from "react";
import { getUser } from "../services/authService";
import { getAllTeams } from "../services/teamServices";
import { useNavigate } from "react-router";
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
};
class GetTeams extends Component {
    state = {
        user: {},
        teams: [],
    };
    async componentDidMount() {
        const user = await getUser();
        this.setState({ user });
        const { data } = await getAllTeams(user.email_id);
        this.setState({ teams: data });
    }
    HandleClick(team) {
        const teamName = team.teamName;
        this.props.navigate(`/team/${teamName}`);
    }
    render() {
        return (
            <div>
                <h1>Hi {this.state.user.username} !!</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Your Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map((team) => {
                            return (
                                <tr
                                    style={{ cursor: "pointer" }}
                                    key={team._id}
                                    onClick={() => this.HandleClick(team)}
                                >
                                    <td>{team.teamName}</td>
                                    {team.team_members.Eemail.map((email) => {
                                        return (
                                            email ===
                                                this.state.user.email_id && (
                                                <td key={email}>
                                                    {
                                                        team.team_members.role[
                                                            team.team_members.Eemail.indexOf(
                                                                email
                                                            )
                                                        ]
                                                    }
                                                </td>
                                            )
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(GetTeams);
