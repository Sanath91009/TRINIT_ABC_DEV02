import React, { Component } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <WrappedComponent {...props} navigate={navigate} location={location} />
    );
};
class TeamProfile extends Component {
    HandleClick1 = () => {
        this.props.navigate("/addTeamMembers", {
            state: {
                teamName: this.props.location.state.team.teamName,
            },
        });
    };
    HandleClick2 = () => {
        this.props.navigate("/addBugs", {
            state: {
                teamName: this.props.location.state.team.teamName,
            },
        });
    };
    render() {
        const team = this.props.location.state.team;
        return (
            <div>
                <h1>Team Name : {team.teamName}</h1>

                <h3>Employees</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee Mail Id</th>
                            <th>Employee Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.team_members.Eemail.map((email) => {
                            return (
                                <tr>
                                    <td>{email}</td>
                                    <td>
                                        {
                                            team.team_members.role[
                                                team.team_members.Eemail.indexOf(
                                                    email
                                                )
                                            ]
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button
                    className="btn btn-primary m-2"
                    onClick={this.HandleClick1}
                >
                    Add Employees
                </button>
                <button
                    className="btn btn-primary m-2"
                    onClick={this.HandleClick2}
                >
                    Add bugs
                </button>
            </div>
        );
    }
}

export default withRouter(TeamProfile);
