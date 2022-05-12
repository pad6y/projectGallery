const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, 'Must have a project title'] },
    description: {
      type: String,
      required: [true, 'Must have a project description'],
    },
    git_url: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
