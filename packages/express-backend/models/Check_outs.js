const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const check_outSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // Reference to User model
    tool: { type: Schema.Types.ObjectId, ref: 'Tools', required: true }, // Reference to Tool model
    check_in_time: { type: Date, required: true, default: Date.now },
    check_out_time: { type: Date, required: false },
    organization: { type: Schema.Types.ObjectId, ref: 'Organizations', required: true, index: true }, // Reference to Organization model
    comment: { type: String, required: false },
    location: { type: Schema.Types.ObjectId, ref: 'Locations', required: true }, // Reference to Location model
}, { timestamps: true });

const Check_outs = mongoose.model('Check_outs', check_outSchema);
module.exports = Check_outs;