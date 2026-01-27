const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const toolSchema = new Schema({
    name: { type: String, required: true, unique: false },
    description: { type: String, required: false },
    organization: { type: Schema.Types.ObjectId, ref: 'Organizations' }, // Reference to Organization model
    type: { type: String, required: true }, // e.g., 'hand tool', 'power tool'
    QR: { type: String, required: false, unique: false }
}, { timestamps: true });

const Tools = mongoose.model('Tool', toolSchema);
module.exports = Tools;