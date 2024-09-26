const { Schema, model } = require("mongoose");

const effectSchema = new Schema({
    name: String,
    value: String
})

const raceSchema = new Schema({
    name: String,
    description: String,
    logo: String,
    icon: String,
    effects: [effectSchema],
    heroes: [{
        type: Schema.Types.ObjectId,
        ref: "Hero"
    }]
});

const Race = model("Race", raceSchema);

module.exports = Race;