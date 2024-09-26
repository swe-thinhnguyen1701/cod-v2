const { Schema, model } = require("mongoose");

const effectSchema = new Schema({
    name: String,
    value: String
});

const raceSchema = new Schema({
    name: String,
    description: String,
    image: String,
    effects: [effectSchema]
})

const heroSchema = new Schema({
    description: {
        type: String,
        require: true
    },
    fullImage: String,
    isFlying: {
        type: Boolean,
        require: true
    },
    mainTalent: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    race: {
        type: Schema.Types.ObjectId,
        ref: 'Race',
    },
    rank: {
        type: String,
        require: true
    },
    talents: [String],
    title: String
});

const Hero = model("Hero", heroSchema);
module.exports = Hero;