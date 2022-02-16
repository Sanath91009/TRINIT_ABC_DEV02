const { Invitation } = require("../models/invitation");
const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/get", async (req, res) => {
    console.log(req.body.email_id);
    const invt = await Invitation.find({ to: req.body.email_id });
    return res.status(200).send(invt);
});

router.post("/accept", async (req, res) => {
    console.log("accepting : ", req.body);
    const team = await Team.findOne({ teamName: req.body.teamName });
    const invt = await Invitation.findOne({ _id: req.body._id });
    if (team) {
        console.log("invt : ", invt);
        team.team_members.Eemail.push(invt.to);
        team.team_members.role.push(invt.role);
        await team.save();
        await Invitation.remove(
            {},
            {
                _id: req.body._id,
            }
        );

        return res.status(200).send("Employee added to the team");
    }
    return res.status(400).send("Team doesnot exist anymore");
});

router.post("/reject", async (req, res) => {
    await Invitation.remove(
        {},
        {
            _id: req.body._id,
        }
    );
    return res.status(200).send("rejected");
});
router.post("/create", async (req, res) => {
    console.log(req.body);
    const invt = new Invitation(
        _.pick(req.body, ["to", "from", "role", "teamName"])
    );
    await invt.save();
    return res.status(200).send("Invitation sent");
});

module.exports = router;
