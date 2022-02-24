import React, { Component } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { getUser } from "./../services/authService";
import {
    DeleteEmployee,
    getRoleOfUser,
    getTeam,
} from "../services/teamServices";
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
class TeamProfile extends Component {
    state = {
        viewDelete: 0,
        team: null,
    };
    async componentDidMount() {
        try {
            const user = await getUser();
            const teamName = this.props.params.teamName;
            const { data: role } = await getRoleOfUser(teamName, user.email_id);
            console.log("role : ", role);
            if (role.find((r) => r === "Admin")) {
                this.setState({ viewDelete: 1 });
            }
            const { data: team } = await getTeam(teamName);
            this.setState({ team });
            console.log(team);
        } catch (ex) {
            console.log("Error in team profile cdm", ex, this.props.params);
        }
    }

    HandleClick1 = () => {
        const teamName = this.props.params.teamName;
        this.props.navigate(`/team/${teamName}/addEmployee`);
    };
    HandleClick2 = () => {
        this.props.navigate(`/team/${this.props.params.teamName}/addBugs`);
    };
    HandleClick3 = () => {
        this.props.navigate(`/team/${this.props.params.teamName}/Bugs`);
    };
    HandleDelete = async (email) => {
        try {
            const teamName = this.props.params.teamName;
            console.log("Handle Delete : ", teamName, email);
            await DeleteEmployee(teamName, email);
            const { data: team } = await getTeam(teamName);
            this.setState({ team });
        } catch (ex) {
            console.log("Delete error", ex);
        }
    };
    HandleUpdate = (email) => {
        this.props.navigate(
            `/team/${this.props.params.teamName}/EditEmployee`,
            {
                state: {
                    teamName: this.props.params.teamName,
                    Eemail: email,
                },
            }
        );
    };
    render() {
        if (this.state.team === null) return <div></div>;
        const teamz = { ...this.state.team };
        console.log(teamz);
        return (
            <div>
                <h1>Team Name : {teamz.teamName}</h1>

                <h3>Employees</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Employee Mail Id</th>
                            <th>Employee Role</th>
                            {this.state.viewDelete === 1 && (
                                <React.Fragment>
                                    <th></th>
                                    <th></th>
                                </React.Fragment>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {teamz.team_members.map((mem) => {
                            return (
                                <tr
                                    style={{ cursor: "pointer" }}
                                    key={mem.Eemail}
                                >
                                    <td>{mem.Eemail}</td>
                                    <td>{mem.role.toString()}</td>
                                    {this.state.viewDelete === 1 && (
                                        <React.Fragment>
                                            <td>
                                                <button
                                                    className="btn btn-info"
                                                    onClick={() =>
                                                        this.HandleUpdate(
                                                            mem.Eemail
                                                        )
                                                    }
                                                >
                                                    Update Info
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        this.HandleDelete(
                                                            mem.Eemail
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </React.Fragment>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {this.state.viewDelete === 1 && (
                    <React.Fragment>
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
                        <br></br>
                    </React.Fragment>
                )}
                <button
                    className="btn btn-primary m-2"
                    onClick={this.HandleClick3}
                >
                    View All Bugs
                </button>
            </div>
        );
    }
}

export default withRouter(TeamProfile);
