import React, { Component } from "react";
import "../css/viewPost.css";
import { getUser } from "./../services/authService";
class ViewPosts extends Component {
    PrintMsgTime(timeStr) {
        const time = new Date(timeStr);
        let ans = "";
        const date = time.getDate();
        const mon = time.getMonth();
        const yr = time.getFullYear();

        if (date === "1") ans += "1st ";
        else if (date === "2") ans += "2nd ";
        else if (date === "3") ans += "3rd ";
        else if (date === "4") ans += "4rth ";
        else ans += date + "th ";

        const monarr = [
            "Jan",
            "Feb",
            "Mar",
            "April",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        ans += monarr[mon] + " ";
        ans += yr + " ";

        const hrs = time.getHours();
        const min = time.getMinutes();
        const sec = time.getSeconds();

        if (hrs < 10) ans += "0" + hrs + ":";
        else ans += hrs + ":";

        if (min < 10) ans += "0" + min + ":";
        else ans += min + ":";

        if (sec < 10) ans += "0" + sec;
        else ans += sec;
        return ans;
    }
    render() {
        const { posts, onDelete } = this.props;
        const user = getUser();
        return (
            <div className="posts">
                <h3>Comments</h3>
                <hr></hr>
                {posts.map((post) => (
                    <div className="post m-2">
                        <div className="heading">
                            <span>{post.Eemail}</span>
                            {user.email_id === post.Eemail && (
                                <button
                                    class="remove"
                                    onClick={() => onDelete(post)}
                                >
                                    -
                                </button>
                            )}

                            <span className="time">
                                {this.PrintMsgTime(post.PostedTime)}
                            </span>
                        </div>
                        <div className="message">
                            <p className="m-1">{post.msg}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ViewPosts;
