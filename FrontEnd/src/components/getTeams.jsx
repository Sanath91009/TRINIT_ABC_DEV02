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
        const user = getUser();
        this.setState({ user });
        const { data } = await getAllTeams(user.email_id);
        this.setState({ teams: data });
    }
    HandleClick(team) {
        this.props.navigate("/TeamProfile", {
            state: {
                team: team,
            },
        });
    }
    render() {
        return (
            <div>
                <h1>Hi {this.state.user.username} !!</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Your Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map((team) => {
                            console.log(team.team_members);
                            console.log(team.team_members.Eemail);
                            return (
                                <tr
                                    key={team.teamName}
                                    onClick={() => this.HandleClick(team)}
                                >
                                    <td key={team.teamName}>{team.teamName}</td>
                                    {team.team_members.Eemail.map((email) => {
                                        return (
                                            email ===
                                                this.state.user.email_id && (
                                                <td key={team.teamName}>
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
