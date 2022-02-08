const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamName: String,
    description: String,
    team_members: {
        Eemail: [String],
        role: [String],
    },
});
const Team = mongoose.model("Team", teamSchema);
exports.Team = Team;
