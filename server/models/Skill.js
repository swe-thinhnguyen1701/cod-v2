const { Schema, model } = require('mongoose');

const skillSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: [
        {
            type: String,
            required: true
        }
    ],
    previews: [
        {
            type: String
        }
    ],
    image: {
        type: String,
        required: false
    },
    rage_cost: {
        type: Number,
        required: false
    },
    additional_effect: {
        type: String,
        required: false
    },
    exemplar_effect: {
        type: String,
        required: false
    },
    cooldown: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: false,
    }
});

const Skill = model('Skill', skillSchema);

module.exports = Skill;