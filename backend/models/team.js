const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
    teamName: String,
    description: String,
    team_members: [
        {
            Eemail: String,
            username: String,
            role: [String],
        },
    ],
    bugs: [
        {
            title: String,
            description: String,
            NonVisibleRoles: [String],
            tags: [String],
            assigned: [String],
            deadline: Date,
            posts: [
                {
                    msg: String,
                    PostedTime: Date,
                    Eemail: String,
                },
            ],
        },
    ],
});
const Team = mongoose.model("Team", teamSchema);
exports.Team = Team;
