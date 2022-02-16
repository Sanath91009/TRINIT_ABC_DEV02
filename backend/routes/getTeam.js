const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.get("/:teamName", async (req, res) => {
    const team = await Team.findOne({ teamName: req.params.teamName });
    return res.status(200).send(team);
});

module.exports = router;
