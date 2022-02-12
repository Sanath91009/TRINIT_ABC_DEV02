import React, { Component } from "react";
import "../css/addTags.css";
class AddTags extends Component {
    render() {
        const { arr, onEnter, onRemove, name, options, placeholder } =
            this.props;
        return (
            <div className="mb-2">
                <label className="mb-1">{this.props.label}</label>
                <input
                    className="form-control mb-2 "
                    placeholder={placeholder}
                    name={name}
                    list={name}
                    onKeyUp={onEnter}
                />
                <datalist id={name}>
                    {options.map((val) => (
                        <option value={val} key={val} />
                    ))}
                </datalist>
                {arr.map((tag, index) => (
                    <div className="tags" key={index}>
                        <span>{tag}</span>
                        <i
                            className="fa fa-window-close"
                            style={{ cursor: "pointer" }}
                            onClick={() => onRemove(name, index)}
                        ></i>
                    </div>
                ))}
            </div>
        );
    }
}

export default AddTags;
