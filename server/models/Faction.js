const {Schema, model} = require('mongoose');
const factionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    buff: {
        type: [String],
        required: true,
    }
});

const Faction = model('Faction', factionSchema);
module.exports = Faction;