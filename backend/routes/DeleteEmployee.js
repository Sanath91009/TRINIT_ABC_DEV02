const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
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

module.exports = router;
