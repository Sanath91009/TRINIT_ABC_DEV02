const { Invitation } = require("../models/invitation");
const { Team } = require("../models/team");
const _ = require("lodash");
const express = require("express");
const router = express();

router.post("/get", async (req, res) => {
    const invt = await Invitation.find({ to: req.body.email_id });
    return res.status(200).send(invt);
});

router.post("/accept", async (req, res) => {
    const team = await Team.findOne({ teamName: req.body.teamName });
    const invt = await Invitation.findOne({ _id: req.body._id });
    if (team) {
        let flag = 0;
        for (let i = 0; i < team.team_members.length; i++) {
            if (team.team_members[i].Eemail === invt.to) {
                team.team_members[i].role = team.team_members[i].role.concat(
                    invt.role
                );
                flag = 1;
                break;
            }
        }
        if (flag === 0) {
            team.team_members.push({ Eemail: invt.to, role: [invt.role] });
        }
        await team.save();
        await Invitation.deleteOne({
            _id: req.body._id,
        });
        return res.status(200).send("Employee added to the team");
    }
    return res.status(400).send("Team doesnot exist anymore");
});

router.post("/reject", async (req, res) => {
    await Invitation.remove({
        _id: req.body._id,
    });
    return res.status(200).send("rejected");
});
router.post("/create", async (req, res) => {
    const invt = new Invitation(
        _.pick(req.body, ["to", "from", "role", "teamName"])
    );
    await invt.save();
    return res.status(200).send("Invitation sent");
});

module.exports = router;
