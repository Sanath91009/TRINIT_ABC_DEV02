const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    console.log(req.body);
    let team = await Team.findOne({ teamName: req.body.teamName });
    console.log("In add emplyee :  ", team);
    team.team_members.Eemail.push(req.body.employee.Eemail);
    team.team_members.role.push(req.body.employee.role);
    await team.save();
    res.status(200).send("added");
});

module.exports = router;
