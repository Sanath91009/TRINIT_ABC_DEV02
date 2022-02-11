const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    console.log(req.body);
    const team = await Team.findOne({ teamName: req.body.teamName });
    return res.status(200).send(team);
});

module.exports = router;
