const mongoose = require("mongoose");
const InvitationSchema = new mongoose.Schema([
    {
        teamName: String,
        from: String,
        to: String,
        role: [String],
    },
]);
const Invitation = mongoose.model("Invitation", InvitationSchema);
exports.Invitation = Invitation;
