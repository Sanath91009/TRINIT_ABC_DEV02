const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
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
