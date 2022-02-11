import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router";
import { getTeam } from "../services/teamServices";
import "../css/viewAllBugs.css";
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
    };
    async componentDidMount() {
        const teamName = this.props.location.state.teamName;
        const { data: team } = await getTeam(teamName);
        this.setState({ team });
    }

    render() {
        const teamName = this.props.location.state.teamName;
        if (this.state.team === null) return <div></div>;
        const team = { ...this.state.team };
        console.log(team.bugs);
        return (
            <div className="container">
                <h2>Team Name : {teamName}</h2>
                {team.bugs.map((bug, index) => {
                    return (
                        <div className="bug" key={index}>
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
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default withRouter(ViewAllBugs);
