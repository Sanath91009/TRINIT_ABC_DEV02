const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.get("/", async (req, res) => {
    const team = await Team.find({ teamName: req.body.team });
    return res.status(200).send(team);
});

module.exports = router;
