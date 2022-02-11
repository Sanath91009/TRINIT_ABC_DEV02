const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    let user = await User.findOne({ email_id: req.body.email_id });
    if (user) return res.status(400).send("User already registered.");
    const register = new User(
        _.pick(req.body, ["username", "email_id", "password"])
    );
    const salt = await bcrypt.genSalt(10);
    register.password = await bcrypt.hash(register.password, salt);
    await register.save();
    const token = register.generateAuthToken();
    res.status(200)
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(register, ["_id", "email_id", "username"]));
});

module.exports = router;
