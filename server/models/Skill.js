const { Schema, model} = require('mongoose');

const effectSchema = new Schema({
    name: {
        type: String,
    },
    value: {
        type: String,
    }
});

const skillSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    effects: {
        type: [effectSchema]
    },
    heroId: {
        type: Schema.Types.ObjectId,
        ref: 'Hero',
    },
    isRage: Boolean,
    image: String
});

const Skill = model('Skill', skillSchema);

module.exports = Skill;