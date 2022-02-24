const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/create", async (req, res) => {
    let team = await Team.findOne({ teamName: req.body.teamName });
    team.bugs[req.body.index].posts.push(req.body.post);
    await team.save();
    return res.status(200).send("post added");
});

router.post("/delete", async (req, res) => {
    let team = await Team.findOne({
        teamName: req.body.teamName,
    });

    const posts = team.bugs[req.body.index].posts;
    var idx;
    posts.map((post, index) => {
        if (req.body.post._id === post._id.toString()) idx = index;
    });

    const str = "bugs." + `${req.body.index}` + ".posts";
    const str1 = str + "." + `${idx}`;

    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $unset: {
                [str1]: 1,
            },
        }
    );
    await Team.updateOne(
        {
            teamName: req.body.teamName,
        },
        {
            $pull: {
                [str]: null,
            },
        }
    );
    return res.status(200).send("Post Deleted");
});

module.exports = router;
