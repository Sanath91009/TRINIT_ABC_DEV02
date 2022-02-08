import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
class Form extends React.Component {
    validate = () => {
        const results = Joi.validate(this.state.account, this.schema, {
            abortEarly: false,
        });
        if (!results.error) return null;
        const error = {};
        for (let item of results.error.details) {
            error[item.path[0]] = item.message;
        }
        return error;
    };
    validateProperty = (e) => {
        const { name, value } = e.currentTarget;
        const obj = {
            [name]: value,
        };
        const subschema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, subschema, { abortEarly: false });
        return error ? error.details[0].message : null;
    };
    handleChange = (e) => {
        const errors = { ...this.state.error };
        const newerror = this.validateProperty(e);
        if (newerror) errors[e.currentTarget.name] = newerror;
        else delete errors[e.currentTarget.name];

        const account = { ...this.state.account };
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ account, error: errors });
    };
    HandleSubmit = (e) => {
        e.preventDefault();
        const error = this.validate();
        this.setState({ error: error || {} });
        if (error) return;
        this.onSubmit(e);
    };
    renderbutton = (name) => {
        return (
            <button disabled={this.validate()} className="btn btn-primary">
                {name}
            </button>
        );
    };
    renderInput = (name, label, type = "text") => {
        return (
            <Input
                name={name}
                label={label}
                type={type}
                value={this.state.account[name]}
                onChange={this.handleChange}
                error={this.state.error[name]}
            />
        );
    };
}

export default Form;
