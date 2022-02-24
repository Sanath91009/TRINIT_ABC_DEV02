const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/register", async (req, res) => {
    let user = await User.findOne({ email_id: req.body.email_id });
    if (user) return res.status(400).send("User already registered.");
    let user1 = await User.findOne({ username: req.body.username });
    if (user1) return res.status(400).send("Username already exist.");
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

router.post("/getUserName", async (req, res) => {
    const email_id = req.body.email_id;
    let user = await User.findOne({ email_id: email_id });
    if (!user) return res.status(400).send("NO user exist");
    return res.status.send(user.username);
});

router.post("/login", async (req, res) => {
    let user = await User.findOne({ email_id: req.body.email_id });
    if (!user) return res.status(400).send("Invalid User");
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password.");
    const token = user.generateAuthToken();
    res.status(200).send(token);
});
module.exports = router;
