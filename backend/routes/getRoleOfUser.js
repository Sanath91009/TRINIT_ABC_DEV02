const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/", async (req, res) => {
    let check = await Team.findOne({
        teamName: req.body.teamName,
        "team_members.Email": req.body.emailid,
    });
    if (check) {
        let mem = check.team_members.filter((mem) => {
            return mem.Eemail === req.body.emailid;
        });
        return res.status(200).send(mem[0].role);
    }
    return res.status(400).send("There is no employee");
});

module.exports = router;
