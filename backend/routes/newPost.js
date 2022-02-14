const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    let team = await Team.findOne({ teamName: req.body.teamName });
    team.bugs[req.body.index].posts.push(req.body.post);
    await team.save();
    return res.status(200).send("post added");
});

module.exports = router;
