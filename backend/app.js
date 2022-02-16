const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/BugTracker");
}
const users = require("./routes/User.js");
const allTeams = require("./routes/allTeams.js");
const auth = require("./routes/auth.js");
const createTeam = require("./routes/team.js");
const getTeam = require("./routes/getTeam");
const getRoleOfUser = require("./routes/getRoleOfUser");

app.use(cors(corsOptions));
app.use(express.json());
app.use("/register", users);
app.use("/login", auth);
app.use("/createTeam", createTeam);
app.use("/getAllTeams", allTeams);
app.use("/getTeam", getTeam);
app.use("/getRoleOfUser", getRoleOfUser);
app.use("/bug", require("./routes/bugs"));
app.use("/employee", require("./routes/employee"));
app.use("/post", require("./routes/post"));
app.use("/team", require("./routes/getTeam"));
app.use("/invitations", require("./routes/invitation"));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log("on port ", port);
});
module.exports = server;
