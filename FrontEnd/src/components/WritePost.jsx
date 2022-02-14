import React, { Component } from "react";
import { getUser } from "../services/authService";
import { addPost, getRoleOfUser } from "../services/teamServices";
import { toast } from "react-toastify";
class WritePost extends Component {
    state = {
        msg: "",
    };
    HandleChange = (e) => {
        this.setState({ msg: e.currentTarget.value });
    };
    HandleClick = async (e) => {
        e.preventDefault();
        try {
            const user = getUser();
            const teamName = this.props.teamName;
            const bugidx = this.props.bugidx;
            const { data: role } = await getRoleOfUser(teamName, user.email_id);
            const post = {
                msg: this.state.msg,
                Eemail: user.email_id,
                role: role,
                PostedTime: Date(),
            };
            await addPost(teamName, post, bugidx);
            console.log(post);
            this.setState({ msg: "" });
            toast.success("Posted!!!");
            this.props.onChange();
        } catch (ex) {
            console.log("Error while posting : ", ex);
        }
    };
    render() {
        return (
            <div>
                <h3>Write Comment</h3>
                <hr></hr>
                <form onSubmit={(e) => this.HandleClick(e)}>
                    <textarea
                        value={this.state.msg}
                        className="m-2"
                        onChange={this.HandleChange}
                        style={{
                            width: "500px",
                            height: "150px",
                            display: "block",
                        }}
                    ></textarea>
                    <button className="btn btn-primary m-2 mb-5">Post</button>
                </form>
            </div>
        );
    }
}

export default WritePost;
