const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const siteSchema = new Schema({
    name: { type: String, required: true, unique: false },
    organization: { type: Schema.Types.ObjectId, ref: 'Organizations', required: true }, // Reference to Organization model
    address: { type: String, required: false },
    // Geo data could be added here in the future
}, { timestamps: true }, {
  collection: 'Sites' // Explicitly specify the collection name
});

const Sites = mongoose.model('Sites', siteSchema);
module.exports = Sites;