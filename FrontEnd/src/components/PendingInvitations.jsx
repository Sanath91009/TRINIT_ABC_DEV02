import React, { Component } from "react";
import { getUser } from "../services/authService";
import {
    acceptInvitations,
    getInvitations,
    rejectInvitations,
} from "../services/teamServices";
import "../css/pendingInvitations.css";
class PendingInvitations extends Component {
    state = {
        invitations: [],
    };
    async componentDidMount() {
        try {
            const user = getUser();
            const { data: invitations } = await getInvitations(user.email_id);
            this.setState({ invitations });
        } catch (ex) {}
    }
    HandleYes = async (invt) => {
        try {
            await acceptInvitations(invt.teamName, invt._id);
            const user = getUser();
            const { data: invitations } = await getInvitations(user.email_id);
            this.setState({ invitations });
        } catch (ex) {}
    };
    HandleNo = async (invt) => {
        try {
            await rejectInvitations(invt._id);
            const user = getUser();
            const { data: invitations } = await getInvitations(user.email_id);
            this.setState({ invitations });
        } catch (ex) {}
    };
    render() {
        const invitations = [...this.state.invitations];
        return (
            <div className="container">
                {invitations.map((invt) => (
                    <div className="invitation" key={invt._id}>
                        <h3>{invt.teamName}</h3>
                        <button
                            className="no"
                            onClick={() => this.HandleNo(invt)}
                        >
                            <i className="fa fa-close"></i>
                        </button>
                        <button className="yes">
                            <i
                                className="fa fa-check"
                                onClick={() => this.HandleYes(invt)}
                            ></i>
                        </button>
                        <p>From : {invt.from}</p>
                        <p>Role : {invt.role.toString()}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default PendingInvitations;
