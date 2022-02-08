const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
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
const addEmployee = require("./routes/addEmployee.js");
const getTeam = require("./routes/getTeam");
app.use(cors(corsOptions));
app.use(express.json());
app.use("/register", users);
app.use("/login", auth);
app.use("/createTeam", createTeam);
app.use("/addEmployee", addEmployee);
app.use("/getAllTeams", allTeams);
app.use("/getTeam", getTeam);
const server = app.listen(5000, () => {
    console.log("on port 5000");
});
module.exports = server;
