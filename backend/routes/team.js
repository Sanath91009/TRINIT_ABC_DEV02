const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    const team = await Team.findOne({ teamName: req.body.teamName });
    if (team) return res.status(400).send("team already there.");
    const newTeam = new Team(_.pick(req.body, ["teamName"]));
    await newTeam.save();
    return res.status(200).send("Successful");
});

module.exports = router;
