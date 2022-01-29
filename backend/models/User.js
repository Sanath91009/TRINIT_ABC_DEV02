const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const Schema = mongoose.schema;

const createSchema = new mongoose.Schema({
    username: String,
    email_id: String,
    password: String,
});
createSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            username: this.username,
            email_id: this.email_id,
        },
        "shhhhh"
    );
    return token;
};
const User = mongoose.model("User", createSchema);
exports.User = User;
