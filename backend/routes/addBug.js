const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    console.log(req.body);
    let team = await Team.findOne({ teamName: req.body.teamName });
    team.bugs.push(req.body.bug);
    await team.save();
    return res.status(200).send("added");
});

module.exports = router;
