const Organization = require("../models/Organizations.js");

// Basic functions for organization services
function getOrganizationByName(name) {
  return Organization.findOne({ name: name });
}

function getOrganizationByEmail(email) {
  return Organization.findOne({ email: email });
}

function createOrganization(userData) {
  const newOrganization = new Organization(userData);
  return newOrganization.save();
}

function updateOrganization(organizationId, updateData) {
  return Organization.findByIdAndUpdate(organizationId, updateData, { new: true });
}

// Specific functions for api routes

// Register a new organization with only its name and admin
async function registerOrganization(name, admin) {
  const existingOrganizationName = await getOrganizationByName(name);
  if (existingOrganizationName) {
    throw new Error("Organization name already exists");
  }
  else {
    return createOrganization({ name: name, admin: admin });
  }
}

module.exports = {
  registerOrganization
};
