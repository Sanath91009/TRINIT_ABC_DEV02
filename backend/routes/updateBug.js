const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    console.log(req.body);
    let str = "bugs." + `${req.body.index}`;
    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $set: {
                [str]: req.body.bug,
            },
        }
    );
    return res.status(200).send("Updated");
});

module.exports = router;
