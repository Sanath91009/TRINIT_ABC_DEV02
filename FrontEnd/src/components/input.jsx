import React from "react";

class Input extends React.Component {
    render() {
        const { name, label, onChange, value, error, type } = this.props;
        return (
            <div className="form-group mb-2">
                <label htmlFor={name}>{label}</label>
                <input
                    value={value}
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    className="form-control"
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    }
}

export default Input;
