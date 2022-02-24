const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const axios = require("axios");
const router = express();

router.post("/create", async (req, res) => {
    try {
        axios.post("http://localhost:5000/invitations/create", {
            to: req.body.employee.Eemail,
            role: req.body.employee.role,
            from: req.body.mail_id,
            teamName: req.body.teamName,
        });
    } catch (ex) {}
    return res.status(200).send("Invitation sent");
});
router.post("/delete", async (req, res) => {
    const team = Team.findOne({ teamName: req.body.teamName });
    const idx = team.team_members.find((mem) => {
        return mem.Eemail === req.body.Eemail;
    });

    const str = "team_members." + `${idx}` + ".role";

    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $pull: {
                [str]: { role: req.body.role },
            },
        }
    );
    return res.status(200).send("Deleted");
});

router.post("/update", async (req, res) => {
    let idx = req.body.idx;
    let str = "team_members." + `${idx}`;
    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $set: {
                [str]: { Eemail: req.body.Eemail, role: req.body.role },
            },
        }
    );
    return res.status(200).send("Updated");
});

module.exports = router;
