import React, { Component } from "react";
import { Link } from "react-router-dom";
class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Hi {this.props.user.username}!!</h1>
                <div className="d-flex flex-column bd-highlight mb-3">
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-primary">
                            <Link
                                to="/getTeams"
                                style={{
                                    color: "white",
                                    textDecoration: "None",
                                }}
                            >
                                View My teams
                            </Link>
                        </button>
                    </div>
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-primary">
                            <Link
                                to="/createNewTeam"
                                style={{
                                    color: "white",
                                    textDecoration: "None",
                                }}
                            >
                                create new team
                            </Link>
                        </button>
                    </div>
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-primary">
                            <Link
                                to="/pendingInvitations"
                                style={{
                                    color: "white",
                                    textDecoration: "None",
                                }}
                            >
                                Check Invitations
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
