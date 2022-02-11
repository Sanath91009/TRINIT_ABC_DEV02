const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    console.log("get All teams : ", req.body);
    const team = await Team.find({
        "team_members.Eemail": req.body.emailid,
    });
    console.log("sending : ", team);
    return res.status(200).send(team);
});

module.exports = router;
