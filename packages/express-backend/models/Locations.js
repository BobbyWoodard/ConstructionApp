const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const locationSchema = new Schema({
    name: { type: String, required: true, unique: false },
    organization: { type: Schema.Types.ObjectId, ref: 'Organizations', required: true }, // Reference to Organization model
    site: { type: Schema.Types.ObjectId, ref: 'Sites', required: true  }, // Reference to Site model
}, { timestamps: true }, {
  collection: 'Locations' // Explicitly specify the collection name
});

const Locations = mongoose.model('Locations', locationSchema);
module.exports = Locations;