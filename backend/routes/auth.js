const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User } = require("../models/User");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    console.log(req.body);
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
