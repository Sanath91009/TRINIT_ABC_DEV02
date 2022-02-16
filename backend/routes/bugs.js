const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/create", async (req, res) => {
    console.log(req.body);
    let team = await Team.findOne({ teamName: req.body.teamName });
    team.bugs.push(req.body.bug);
    await team.save();
    return res.status(200).send("added");
});

router.post("/delete", async (req, res) => {
    console.log(req.body);
    let str = "bugs." + `${req.body.index}`;
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
                bugs: null,
            },
        }
    );
    return res.status(200).send("Deleted");
});

router.post("/update", async (req, res) => {
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
