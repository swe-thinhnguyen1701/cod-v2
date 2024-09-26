const {Schema, model} = require("mongoose");

const talentSchema = new Schema({
    name: String,
    description: String,
    icon: String,
});

const Talent = model("Talent", talentSchema);
module.exports = Talent;