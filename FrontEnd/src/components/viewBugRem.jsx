import React, { Component } from "react";

class ViewBugRem extends Component {
    getClassName(index) {
        let cn = "btn btn-sm m-1 btn-";
        const arr = [
            "primary",
            "warning",
            "success",
            "secondary",
            "danger",
            "light",
            "info",
        ];
        cn = cn + arr[index % arr.length];

        return cn;
    }
    render() {
        const { bug, admin, onEdit } = this.props;
        return (
            <div>
                <h3 style={{ display: "inline", marginRight: "10px" }}>
                    Title : {bug.title}
                </h3>
                {admin === 1 && (
                    <button
                        className="btn btn-primary"
                        style={{ float: "right", marginRight: "10px" }}
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                )}
                {bug.tags.map((tag, index) => {
                    return (
                        <button className={this.getClassName(index)} key={tag}>
                            {tag}
                        </button>
                    );
                })}

                <h2>Description</h2>
                <hr></hr>
                <p>{bug.description}</p>
            </div>
        );
    }
}

export default ViewBugRem;
