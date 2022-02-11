const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    console.log(req.body);
    let check = await Team.findOne({
        teamName: req.body.teamName,
        "team_members.Eemail": req.body.employee.Eemail,
    });
    console.log(check);
    if (check) {
        return res.status(400).send("Employee is already there");
    }
    let team = await Team.findOne({ teamName: req.body.teamName });
    console.log("In add emplyee :  ", team);
    // send invitation to that user and add him only when he accepts
    team.team_members.Eemail.push(req.body.employee.Eemail);
    team.team_members.role.push(req.body.employee.role);
    await team.save();
    return res.status(200).send("added");
});

module.exports = router;
