const mongoose = require('mongoose');
const relationship = require("mongoose-relationship");

// define the Page model schema
const PageSchema = new mongoose.Schema({
    name: String,
    route: { //FullPath
        type: String,
        index: { unique: true }
    },
    info: String,
    parentsPage: {type:mongoose.Schema.ObjectId, ref: "Page", childPath: "childrensPages"},
    childrensPages: [{ type: mongoose.Schema.ObjectId, ref: "Page" }],
});

PageSchema.plugin(relationship, { relationshipPathName:'parentsPage' });

module.exports = mongoose.model('Page', PageSchema);