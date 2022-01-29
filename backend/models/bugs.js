const mongoose = require('mongoose');
// const Schema = mongoose.schema;

const bugSchema = new mongoose.Schema({
    description: String,
    tag: String
});
module.exports = mongoose.model('bug', bugSchema)