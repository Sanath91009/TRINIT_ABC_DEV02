const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const axios = require("axios");
const router = express();

router.post("/create", async (req, res) => {
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
    try {
        axios.post("http://localhost:5000/invitations/create", {
            to: req.body.employee.Eemail,
            role: req.body.employee.role,
            from: req.body.mail_id,
            teamName: req.body.teamName,
        });
    } catch (ex) {
        console.log("error while sending request");
    }
    // team.team_members.Eemail.push(req.body.employee.Eemail);
    // team.team_members.role.push(req.body.employee.role);
    // await team.save();
    return res.status(200).send("Invitation sent");
});
router.post("/delete", async (req, res) => {
    console.log("Delete employee :", req.body);
    let team = await Team.findOne({
        teamName: req.body.teamName,
        "team_members.Eemail": req.body.emailid,
    });
    let idx = team.team_members.Eemail.indexOf(req.body.emailid);
    console.log("idx : ", idx);
    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $pull: {
                "team_members.Eemail": req.body.emailid,
            },
        }
    );
    let str = "team_members.role." + `${idx}`;
    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $unset: {
                [str]: 1,
            },
        }
    );
    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $pull: {
                "team_members.role": null,
            },
        }
    );
    return res.status(200).send("Deleted");
});

router.post("/update", async (req, res) => {
    let idx = req.body.idx;
    let str1 = "team_members.Eemail." + `${idx}`;
    let str2 = "team_members.role." + `${idx}`;
    console.log(str1, str2, req.body);
    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $set: {
                [str1]: req.body.Eemail,
                [str2]: req.body.role,
            },
        }
    );
    return res.status(200).send("Updated");
});

module.exports = router;
