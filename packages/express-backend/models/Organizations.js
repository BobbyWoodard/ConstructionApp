const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const organizationSchema = new Schema({
    name: { type: String, required: true, unique: true },
    admin: { type: Schema.Types.ObjectId, ref: 'Users' }, // Reference to User model
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }], // Array of User references
}, { timestamps: true });

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;