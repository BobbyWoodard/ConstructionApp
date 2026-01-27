const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const look_upSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // Reference to User model
    tool: { type: Schema.Types.ObjectId, ref: 'Tools', required: true }, // Reference to Tool model
    look_up_time: { type: Date, required: true, default: Date.now },
    organization: { type: Schema.Types.ObjectId, ref: 'Organizations', required: true }, // Reference to Organization model
    location: { type: Schema.Types.ObjectId, ref: 'Locations', required: true }, // Reference to Location model
    // Geo data could be added here in the future
}, { timestamps: true });

const Look_ups = mongoose.model('Look_ups', look_upSchema);
module.exports = Look_ups;