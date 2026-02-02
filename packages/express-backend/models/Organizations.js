const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: { type: String, required: true, unique: true },
    admin: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, // Reference to User model
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }, {registered: Boolean}, {connectionCode: String}], // Array of User references
}, { timestamps: true }, {
  collection: 'Organizations' // Explicitly specify the collection name
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;