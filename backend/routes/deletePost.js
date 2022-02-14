const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
var Mongoose = require("mongoose");
const router = express();

router.post("/", async (req, res) => {
    let team = await Team.findOne({
        teamName: req.body.teamName,
    });
    console.log(req.body.post, team.bugs[req.body.index].posts[0]);
    const posts = team.bugs[req.body.index].posts;
    var idx;
    posts.map((post, index) => {
        if (req.body.post._id === post._id.toString()) idx = index;
    });
    console.log("idx : ", idx);
    const str = "bugs." + `${req.body.index}` + ".posts";
    const str1 = str + "." + `${idx}`;
    console.log(str, str1);
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
